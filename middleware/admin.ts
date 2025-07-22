export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  const isAdmin = await authStore.checkAdminRole();
  
  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: "Acesso negado",
    });
  }
});
