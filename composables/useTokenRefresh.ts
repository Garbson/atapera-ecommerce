// composables/useTokenRefresh.ts
import type { Session } from "@supabase/supabase-js";

// Estados globais para o refresh de token
const refreshPromise = ref<Promise<void> | null>(null);
const lastRefreshAttempt = ref<number>(0);

export const useTokenRefresh = () => {
  const supabase = useSupabase();
  const { session } = useAuth();

  // Verificar se o token está próximo de expirar (15 minutos antes)
  const isTokenExpiringSoon = (session: Session | null): boolean => {
    if (!session?.expires_at) return false;

    const expirationTime = session.expires_at * 1000; // Converter para milliseconds
    const currentTime = Date.now();
    const fifteenMinutes = 15 * 60 * 1000; // 15 minutos em milliseconds

    return (expirationTime - currentTime) < fifteenMinutes;
  };

  // Verificar se o token já expirou
  const isTokenExpired = (session: Session | null): boolean => {
    if (!session?.expires_at) return false;

    const expirationTime = session.expires_at * 1000;
    const currentTime = Date.now();

    return currentTime > expirationTime;
  };

  // Renovar o token de forma segura (evitar múltiplas tentativas simultâneas)
  const refreshToken = async (): Promise<boolean> => {
    // Se já há uma tentativa de refresh em andamento, aguardar ela
    if (refreshPromise.value) {
      try {
        await refreshPromise.value;
        return true;
      } catch {
        return false;
      }
    }

    // Evitar tentativas muito frequentes (max 1 por minuto)
    const now = Date.now();
    if (now - lastRefreshAttempt.value < 60000) {
      console.log("🔄 Token refresh cooldown ativo");
      return false;
    }

    lastRefreshAttempt.value = now;

    // Criar promise de refresh
    refreshPromise.value = performTokenRefresh();

    try {
      await refreshPromise.value;
      console.log("✅ Token renovado com sucesso");
      return true;
    } catch (error) {
      console.error("❌ Erro ao renovar token:", error);
      return false;
    } finally {
      refreshPromise.value = null;
    }
  };

  // Função que efetivamente faz o refresh
  const performTokenRefresh = async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error("❌ Erro no refresh session:", error);

        // Se o refresh falhar, pode ser que a sessão seja inválida
        if (error.message.includes('refresh_token_not_found') ||
            error.message.includes('invalid_grant')) {
          console.log("🚪 Sessão inválida, fazendo logout");
          await useAuth().signOut();
        }

        throw error;
      }

      if (!data.session) {
        throw new Error("Sessão não retornada após refresh");
      }

      console.log("✅ Token renovado, nova expiração:", new Date(data.session.expires_at! * 1000));
    } catch (error) {
      console.error("❌ Erro detalhado no refresh:", error);
      throw error;
    }
  };

  // Interceptor para requisições do Supabase
  const withTokenRefresh = async <T>(
    operation: () => Promise<T>,
    retryCount = 0
  ): Promise<T> => {
    console.log(`🔐 [withTokenRefresh] Iniciando (tentativa ${retryCount + 1})`);

    try {
      // Verificar se precisa renovar o token antes da requisição
      if (session.value && isTokenExpiringSoon(session.value)) {
        console.log("⏰ [withTokenRefresh] Token expirando em breve, renovando...");
        await refreshToken();
      }

      // Executar a operação
      console.log("🔄 [withTokenRefresh] Executando operação...");
      const result = await operation();
      console.log("✅ [withTokenRefresh] Operação concluída com sucesso");
      return result;
    } catch (error: any) {
      console.error("❌ [withTokenRefresh] Erro capturado:", error);

      // Se o erro for de token expirado e ainda não tentamos fazer retry
      if (retryCount === 0 && isTokenError(error)) {
        console.log("🔄 [withTokenRefresh] Token expirado detectado, tentando renovar...");

        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          console.log("🔄 [withTokenRefresh] Fazendo retry da operação...");
          return await withTokenRefresh(operation, retryCount + 1);
        } else {
          console.error("❌ [withTokenRefresh] Falha no refresh do token");
        }
      }

      console.error("❌ [withTokenRefresh] Relançando erro:", error);
      throw error;
    }
  };

  // Verificar se o erro é relacionado a token
  const isTokenError = (error: any): boolean => {
    const errorMessage = error?.message?.toLowerCase() || '';
    const errorCode = error?.code;

    return (
      errorCode === 'PGRST301' || // JWT expirado
      errorCode === 401 ||
      errorMessage.includes('jwt') ||
      errorMessage.includes('expired') ||
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('invalid_grant')
    );
  };

  // Configurar verificação periódica (a cada 5 minutos)
  const startPeriodicCheck = () => {
    const checkInterval = setInterval(() => {
      if (session.value && isTokenExpiringSoon(session.value)) {
        console.log("⏰ Verificação periódica: renovando token que expira em breve");
        refreshToken();
      }
    }, 5 * 60 * 1000); // 5 minutos

    // Limpar o interval quando não precisar mais
    onUnmounted(() => {
      clearInterval(checkInterval);
    });

    return checkInterval;
  };

  return {
    refreshToken,
    isTokenExpiringSoon,
    isTokenExpired,
    withTokenRefresh,
    startPeriodicCheck,
  };
};