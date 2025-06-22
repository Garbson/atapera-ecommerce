// middleware/admin-auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user, isLoggedIn, loading } = useAuth();

  // Aguardar carregamento da autenticação
  if (loading.value) {
    return;
  }

  // Verificar se está logado
  if (!isLoggedIn.value) {
    return navigateTo("/admin/login");
  }

  // Lista de emails autorizados como admin
  const adminEmails = [
    "admin@atapera.shop",
    "contato@atapera.shop",
    "garbsonsouza2602@gmail.com", // Adicione seu email aqui
  ];

  // Verificar se o usuário é admin
  if (!user.value?.email || !adminEmails.includes(user.value.email)) {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Acesso negado. Você não tem permissão para acessar esta área.",
    });
  }
});
