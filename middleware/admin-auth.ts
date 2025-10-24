// middleware/admin-auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Só executar no client
  if (process.server) return;

  const { user, isAdmin, loading } = useAuth();

  // Aguardar auth carregar se necessário (máximo 2 segundos)
  if (loading.value) {
    let attempts = 0;
    while (loading.value && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }

  // Verificar se está logado
  if (!user.value) {
    return navigateTo("/auth/login");
  }

  // Verificar se é admin
  if (!isAdmin.value) {
    throw createError({
      statusCode: 403,
      statusMessage: "Acesso negado. Você não tem permissão para acessar esta área.",
    });
  }
});
