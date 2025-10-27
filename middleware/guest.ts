// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, loading } = useAuth();

  // No servidor, não bloquear; apenas respeitar estado atual
  if (process.server) {
    if (isLoggedIn.value) {
      return navigateTo("/minha-conta");
    }
    return;
  }

  // No cliente, aguarda brevemente o fim da inicialização sem usar setInterval
  if (loading.value) {
    const start = Date.now();
    const timeoutMs = 1500;
    while (loading.value && Date.now() - start < timeoutMs) {
      await new Promise((r) => setTimeout(r, 50));
    }
  }

  if (isLoggedIn.value) {
    return navigateTo("/minha-conta");
  }
});
