// plugins/token-refresh.client.ts - Simplificado para trabalhar com auth-system
export default defineNuxtPlugin({
  name: 'token-refresh',
  dependsOn: ['auth-system'],
  setup() {
    // Só executa no client-side
    if (typeof window === 'undefined') return;

    // Guard para evitar inicialização múltipla
    if ((globalThis as any).__tokenRefreshInitialized) {
      return;
    }
    (globalThis as any).__tokenRefreshInitialized = true;

    console.log("🔐 Inicializando sistema de renovação de token...");

    const { session } = useAuth();
    const { startPeriodicCheck, isTokenExpiringSoon, refreshToken } = useTokenRefresh();

    // Aguardar próximo tick para garantir que auth-system foi inicializado
    nextTick(() => {
      // Verificar token imediatamente se usuário já está logado
      if (session.value) {
        console.log("🔐 Token Refresh: Usuário logado detectado");

        // Se token está próximo de expirar, renovar imediatamente
        if (isTokenExpiringSoon(session.value as any)) {
          console.log("⏰ Token expirando em breve, renovando...");
          refreshToken();
        }

        // Iniciar verificação periódica
        startPeriodicCheck();
      }
    });

    console.log("✅ Sistema de renovação de token inicializado");
  }
});
