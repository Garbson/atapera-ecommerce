export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  if (!user.value?.user_metadata?.role === "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Acesso negado",
    });
  }
});
