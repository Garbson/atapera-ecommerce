// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, loading } = useAuth();

  // Aguardar carregamento da autenticação
  if (loading.value) {
    return;
  }

  // Se já estiver logado, redirecionar para admin
  if (isLoggedIn.value) {
    return navigateTo("/admin");
  }
});
