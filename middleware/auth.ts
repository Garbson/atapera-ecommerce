// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, loading } = useAuth()

  // Se está carregando, aguarda
  if (loading.value) {
    return // Aguarda a autenticação terminar
  }

  // Se não está logado, redireciona para login
  if (!isLoggedIn.value) {
    return navigateTo(`/login?redirect=${to.path}`)
  }
})
