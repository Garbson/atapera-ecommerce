// plugins/token-refresh.client.ts
export default defineNuxtPlugin(() => {
  // Inicializar sistema de renovação de token apenas no client
  if (process.client) {
    // Evitar inicialização múltipla do plugin em HMR/navegações
    if ((window as any).__tokenRefreshPluginInitialized) {
      return;
    }
    (window as any).__tokenRefreshPluginInitialized = true;

    const { session } = useAuth();
    const { startPeriodicCheck, isTokenExpiringSoon, refreshToken } =
      useTokenRefresh();

    // Verificar token imediatamente se usuário já está logado
    if (session.value) {
      console.log("🔐 Token Refresh Plugin: Usuário logado detectado");

      // Se token está próximo de expirar, renovar imediatamente
      if (isTokenExpiringSoon(session.value as any)) {
        console.log("⏰ Token expirando em breve, renovando...");
        refreshToken();
      }

      // Iniciar verificação periódica
      startPeriodicCheck();
    }

    // Listener para mudanças de foco da janela (renovar se necessário)
    const handleVisibilityChange = () => {
      if (
        !document.hidden &&
        session.value &&
        isTokenExpiringSoon(session.value as any)
      ) {
        console.log("👁️ Usuário voltou para a aba, verificando token...");
        refreshToken();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup seguro no descarregamento da janela (não usar onBeforeUnmount em plugin)
    const handleBeforeUnload = () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Nota: como usamos um guard global de inicialização e HMR, evitar múltiplos listeners já está coberto

    console.log("✅ Token Refresh Plugin inicializado");
  }
});
