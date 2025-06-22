export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, loading } = useAuth();

  // Aguardar carregamento da autenticação
  if (loading.value) {
    return;
  }

  // Redirecionar para login se não estiver autenticado
  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
