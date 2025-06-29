// middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, loading } = useAuth();

  // Aguardar carregamento da autenticação
  if (loading.value) {
    return;
  }

  // Redirecionar para minha conta se já estiver logado
  if (isLoggedIn.value) {
    return navigateTo("/minha-conta");
  }
});
