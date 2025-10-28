// composables/useSupabaseWithAutoReconnect.ts
export const useSupabaseWithAutoReconnect = () => {
  let supabase = useSupabase();
  const { checkAndRestoreSession, session } = useAuth();

  // Wrapper robusto para TODAS as operações Supabase
  const withAutoReconnect = async <T>(
    operation: () => Promise<{ data: T; error: any }>,
    retryCount = 0,
    maxRetries = 3
  ): Promise<{ data: T; error: any }> => {
    try {
      // Verificar health da conexão antes de operações críticas
      const { healthCheckWithRetry, needsClientReset, resetConnection } = useSupabaseHealthCheck();

      // Se já tivemos falhas, verificar health primeiro
      if (retryCount > 0) {
        const isHealthy = await healthCheckWithRetry();
        if (!isHealthy && needsClientReset()) {
          console.log("🔄 Conexão não saudável, resetando cliente...");
          await resetConnection();
          // Atualizar referência local do supabase
          supabase = useSupabase();
        }
      }

      // Executar a operação
      const result = await operation();

      // Verificar se houve erro
      if (result.error) {
        const isNetworkError = isNetworkError(result.error);
        const isAuthError = isAuthenticationError(result.error);

        if (isNetworkError || isAuthError) {
          console.log(`🔄 ${isNetworkError ? 'Erro de rede' : 'Erro de auth'} detectado:`, result.error.message);

          if (retryCount < maxRetries) {
            // Backoff exponencial
            const delay = Math.pow(2, retryCount) * 1000;
            console.log(`⏳ Tentativa ${retryCount + 1}/${maxRetries}, aguardando ${delay}ms...`);

            await new Promise(resolve => setTimeout(resolve, delay));

            if (isAuthError) {
              // Tentar recuperar sessão
              await checkAndRestoreSession();
            } else if (isNetworkError) {
              // Reset da conexão para erros de rede
              await resetConnection();
              supabase = useSupabase();
            }

            return await withAutoReconnect(operation, retryCount + 1, maxRetries);
          }
        }
      }

      return result;

    } catch (error: any) {
      console.error("❌ Erro crítico na operação Supabase:", error);

      // Se é erro de rede e ainda podemos tentar
      if (retryCount < maxRetries && isNetworkError(error)) {
        console.log("🔄 Erro de rede, tentando recovery...");

        const { resetConnection } = useSupabaseHealthCheck();
        await resetConnection();
        supabase = useSupabase();

        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        return await withAutoReconnect(operation, retryCount + 1, maxRetries);
      }

      throw error;
    }
  };

  // Verificar se é erro de rede/conectividade
  const isNetworkError = (error: any): boolean => {
    if (!error) return false;

    const errorMessage = error.message?.toLowerCase() || '';
    const errorCode = error.code;

    return (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('unreachable') ||
      errorCode === 'NETWORK_ERROR' ||
      error.name === 'NetworkError'
    );
  };

  // Verificar se é erro de autenticação
  const isAuthenticationError = (error: any): boolean => {
    if (!error) return false;

    const errorMessage = error.message?.toLowerCase() || '';
    const errorCode = error.code;

    return (
      errorCode === 'PGRST301' || // JWT expirado
      errorCode === 401 ||
      errorMessage.includes('jwt') ||
      errorMessage.includes('expired') ||
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('invalid_grant') ||
      errorMessage.includes('session not found') ||
      errorMessage.includes('refresh_token_not_found')
    );
  };

  // Cliente Supabase que sempre usa a instância mais recente
  const getClient = () => useSupabase();

  // Métodos wrapper para operações comuns do Supabase
  const query = {
    from: (table: string) => ({
      select: (columns = '*') => ({
        execute: () => withAutoReconnect(() => getClient().from(table).select(columns)),
        eq: (column: string, value: any) => ({
          execute: () => withAutoReconnect(() => getClient().from(table).select(columns).eq(column, value))
        }),
        single: () => ({
          execute: () => withAutoReconnect(() => getClient().from(table).select(columns).single())
        }),
        maybeSingle: () => ({
          execute: () => withAutoReconnect(() => getClient().from(table).select(columns).maybeSingle())
        })
      }),
      insert: (data: any) => ({
        execute: () => withAutoReconnect(() => getClient().from(table).insert(data)),
        select: () => ({
          execute: () => withAutoReconnect(() => getClient().from(table).insert(data).select())
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          execute: () => withAutoReconnect(() => getClient().from(table).update(data).eq(column, value)),
          select: () => ({
            execute: () => withAutoReconnect(() => getClient().from(table).update(data).eq(column, value).select())
          })
        })
      }),
      upsert: (data: any) => ({
        execute: () => withAutoReconnect(() => getClient().from(table).upsert(data)),
        select: () => ({
          execute: () => withAutoReconnect(() => getClient().from(table).upsert(data).select())
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          execute: () => withAutoReconnect(() => getClient().from(table).delete().eq(column, value))
        })
      })
    })
  };

  return {
    supabase: getClient(),
    withAutoReconnect,
    query,
    // Exponha o cliente original para casos especiais
    raw: getClient
  };
};