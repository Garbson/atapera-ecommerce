// plugins/auth-system.client.ts - Sistema unificado de autenticação
export default defineNuxtPlugin({
  name: 'auth-system',
  async setup() {
    // Só executa no client-side
    if (typeof window === 'undefined') return;

    // Guard global para evitar múltiplas inicializações
    if ((globalThis as any).__authSystemInitialized) {
      console.log("🔄 Sistema de auth já inicializado globalmente");
      return;
    }

    console.log("🚀 Inicializando sistema unificado de autenticação...");

    try {
      // Marcar como inicializado ANTES de começar para evitar condições de corrida
      (globalThis as any).__authSystemInitialized = true;

      const { initAuth, checkAndRestoreSession } = useAuth();

      // Inicializar sistema de autenticação
      await initAuth();

      // Configurar verificação de sessão quando a página ganha foco
      const handleFocus = async () => {
        console.log("👁️ Página ganhou foco, verificando sessão...");
        await checkAndRestoreSession();
      };

      // Listeners de foco da janela para detectar quando usuário volta
      window.addEventListener('focus', handleFocus);
      window.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          handleFocus();
        }
      });

      // Verificação periódica MUITO menos agressiva - apenas para casos extremos
      const sessionCheckInterval = setInterval(async () => {
        // Só verificar se a janela está ativa E se não há sessão local
        if (!document.hidden && !session.value) {
          try {
            console.log("🔄 Verificação periódica de emergência - sem sessão local");
            await checkAndRestoreSession();
          } catch (error) {
            console.error("❌ Erro na verificação periódica:", error);
          }
        }
      }, 600000); // 10 minutos (muito menos agressivo)

      // Cleanup adequado seguindo práticas do Supabase
      const cleanup = () => {
        window.removeEventListener('focus', handleFocus);
        clearInterval(sessionCheckInterval);

        // Unsubscribe do listener de auth seguindo documentação oficial
        const { reinitAuth } = useAuth();
        try {
          reinitAuth(); // Isso vai fazer unsubscribe interno
        } catch (error) {
          console.error("❌ Erro no cleanup:", error);
        }
      };

      window.addEventListener('beforeunload', cleanup);

      // Cleanup também no pagehide para mobile
      window.addEventListener('pagehide', cleanup);

      // Inicializar debug em desenvolvimento
      if (process.dev) {
        const { debugCommands } = useAuthDebug();
        console.log("🔧 Sistema de debug de autenticação ativado");
        console.log("Use window.authDebug para comandos de debug");
      }

      console.log("✅ Sistema unificado de autenticação inicializado com sucesso");

    } catch (error) {
      console.error("❌ Erro ao inicializar sistema de autenticação:", error);
      // Em caso de erro, permitir nova tentativa
      (globalThis as any).__authSystemInitialized = false;
    }
  }
});