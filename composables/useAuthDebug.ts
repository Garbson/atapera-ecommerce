// composables/useAuthDebug.ts - Debug helper para problemas de autenticação
export const useAuthDebug = () => {
  const { session, user, loading } = useAuth();

  // Log detalhado do estado atual
  const logCurrentState = () => {
    console.group("🔍 Estado Atual da Autenticação");
    console.log("Loading:", loading.value);
    console.log("Sessão existe:", !!session.value);
    console.log("Usuário existe:", !!user.value);

    if (session.value) {
      console.log("Access Token:", session.value.access_token?.substring(0, 20) + "...");
      console.log("Expira em:", new Date(session.value.expires_at! * 1000));
      console.log("Token expira em (ms):", (session.value.expires_at! * 1000) - Date.now());
    }

    // Verificar storage do browser
    if (typeof localStorage !== 'undefined') {
      const supabaseKeys = Object.keys(localStorage).filter(key => key.includes('supabase'));
      console.log("Chaves Supabase no localStorage:", supabaseKeys);
    }

    if (typeof sessionStorage !== 'undefined') {
      const supabaseKeys = Object.keys(sessionStorage).filter(key => key.includes('supabase'));
      console.log("Chaves Supabase no sessionStorage:", supabaseKeys);
    }

    console.groupEnd();
  };

  // Testar conectividade com Supabase
  const testConnection = async () => {
    console.group("🔗 Teste de Conectividade Supabase");

    try {
      const supabase = useSupabase();
      const { data, error } = await supabase.auth.getSession();

      console.log("getSession() resultado:");
      console.log("- Data:", data);
      console.log("- Error:", error);

      if (data.session) {
        console.log("✅ Sessão ativa encontrada no Supabase");
      } else {
        console.log("❌ Nenhuma sessão ativa no Supabase");
      }

    } catch (error) {
      console.error("❌ Erro ao testar conexão:", error);
    }

    console.groupEnd();
  };

  // Forçar sincronização de sessão
  const forceSyncSession = async () => {
    console.log("🔄 Forçando sincronização de sessão...");
    const { checkAndRestoreSession } = useAuth();
    await checkAndRestoreSession();
    logCurrentState();
  };

  // Limpar tudo e reinicializar
  const resetAuth = async () => {
    console.log("♻️ Resetando sistema de autenticação...");
    const { reinitAuth } = useAuth();
    await reinitAuth();
    logCurrentState();
  };

  // Comando para debug no console
  const debugCommands = {
    state: logCurrentState,
    test: testConnection,
    sync: forceSyncSession,
    reset: resetAuth
  };

  // Disponibilizar comandos globalmente para debug
  if (typeof window !== 'undefined') {
    (window as any).authDebug = debugCommands;
    console.log("🔧 Comandos de debug disponíveis em window.authDebug:", Object.keys(debugCommands));
  }

  return {
    logCurrentState,
    testConnection,
    forceSyncSession,
    resetAuth,
    debugCommands
  };
};