// middleware/auth.ts - VERSÃO CORRIGIDA E DEFINITIVA
export default defineNuxtRouteMiddleware((to, from) => {


  const { isLoggedIn, loading, user, session } = useAuth();



  // ✅ Aguardar carregamento - CRÍTICO
  if (loading.value) {
    return; // Não redireciona enquanto carrega
  }

  // ✅ Verificar autenticação
  if (!isLoggedIn.value) {


    return navigateTo("/login");
  }
});
