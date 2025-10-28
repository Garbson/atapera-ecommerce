// composables/useSupabaseHealthCheck.ts
export const useSupabaseHealthCheck = () => {
  const isConnected = ref(true);
  const lastSuccessfulCheck = ref(Date.now());
  const consecutiveFailures = ref(0);

  // Health check real fazendo uma operação simples
  const checkConnection = async (timeoutMs = 3000): Promise<boolean> => {
    try {
      const supabase = useSupabase();

      // Fazer uma operação simples e rápida - apenas verificar se o cliente responde
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const { error } = await supabase.auth.getSession();
      clearTimeout(timeoutId);

      if (error) {
        console.warn("⚠️ Health check: erro na sessão:", error.message);
        // Alguns erros são aceitáveis (usuário não logado, etc)
        if (error.message.includes('network') || error.message.includes('timeout')) {
          throw error;
        }
      }

      // Sucesso
      isConnected.value = true;
      lastSuccessfulCheck.value = Date.now();
      consecutiveFailures.value = 0;
      return true;

    } catch (error: any) {
      console.error("❌ Health check falhou:", error.message);
      consecutiveFailures.value++;

      // Se muitas falhas consecutivas, marcar como desconectado
      if (consecutiveFailures.value >= 3) {
        isConnected.value = false;
      }

      return false;
    }
  };

  // Verificar se a conexão está "stale" (muito tempo sem sucesso)
  const isConnectionStale = () => {
    const now = Date.now();
    const timeSinceLastSuccess = now - lastSuccessfulCheck.value;
    return timeSinceLastSuccess > 60000; // 1 minuto
  };

  // Verificar se precisa reinicializar o cliente
  const needsClientReset = () => {
    return !isConnected.value || isConnectionStale() || consecutiveFailures.value >= 3;
  };

  // Forçar reset da conexão
  const resetConnection = async () => {
    console.log("🔄 Resetando conexão Supabase...");

    try {
      // Limpar cache do Supabase
      const { refreshSupabaseInstance } = await import('./useSupabase');
      refreshSupabaseInstance();

      // Reset dos contadores
      consecutiveFailures.value = 0;
      isConnected.value = true;
      lastSuccessfulCheck.value = Date.now();

      // Verificar se o reset funcionou
      const success = await checkConnection();
      if (success) {
        console.log("✅ Conexão Supabase resetada com sucesso");
      } else {
        console.error("❌ Reset da conexão falhou");
      }

      return success;
    } catch (error) {
      console.error("❌ Erro ao resetar conexão:", error);
      return false;
    }
  };

  // Health check com retry inteligente
  const healthCheckWithRetry = async (maxRetries = 2): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const success = await checkConnection();

      if (success) {
        return true;
      }

      if (attempt < maxRetries) {
        // Backoff exponencial: 1s, 2s, 4s...
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`⏳ Tentativa ${attempt} falhou, tentando novamente em ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Se todas as tentativas falharam, tentar reset
    if (needsClientReset()) {
      console.log("🔄 Tentativas esgotadas, resetando cliente...");
      return await resetConnection();
    }

    return false;
  };

  return {
    isConnected: readonly(isConnected),
    consecutiveFailures: readonly(consecutiveFailures),
    lastSuccessfulCheck: readonly(lastSuccessfulCheck),
    checkConnection,
    healthCheckWithRetry,
    needsClientReset,
    resetConnection,
    isConnectionStale
  };
};