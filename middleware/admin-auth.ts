// middleware/admin-auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Aguardar carregamento da autenticação
  if (authStore.loading) {
    return;
  }

  // Verificar se está logado
  if (!authStore.isAuthenticated) {
    return navigateTo("/admin/login");
  }

  // Verificar role de admin
  const isAdmin = await authStore.checkAdminRole();
  
  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Acesso negado. Você não tem permissão para acessar esta área.",
    });
  }
});
