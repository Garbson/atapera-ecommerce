// plugins/token-refresh.client.ts
export default defineNuxtPlugin(() => {
  // Inicializar sistema de renovação de token apenas no client
  if (process.client) {
    const { session } = useAuth();
    const { startPeriodicCheck, isTokenExpiringSoon, refreshToken } = useTokenRefresh();

    // Verificar token imediatamente se usuário já está logado
    if (session.value) {
      console.log("🔐 Token Refresh Plugin: Usuário logado detectado");

      // Se token está próximo de expirar, renovar imediatamente
      if (isTokenExpiringSoon(session.value)) {
        console.log("⏰ Token expirando em breve, renovando...");
        refreshToken();
      }

      // Iniciar verificação periódica
      startPeriodicCheck();
    }

    // Listener para mudanças de foco da janela (renovar se necessário)
    const handleVisibilityChange = () => {
      if (!document.hidden && session.value && isTokenExpiringSoon(session.value)) {
        console.log("👁️ Usuário voltou para a aba, verificando token...");
        refreshToken();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    console.log("✅ Token Refresh Plugin inicializado");
  }
});