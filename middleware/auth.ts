// middleware/auth.ts - VERSÃO CORRIGIDA E DEFINITIVA
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("🛡️ [AUTH MIDDLEWARE] Executando...");
  console.log("- Rota origem:", from?.path || "nenhuma");
  console.log("- Rota destino:", to.path);

  const { isLoggedIn, loading, user, session } = useAuth();

  // ✅ Log detalhado do estado atual
  console.log("📊 [AUTH MIDDLEWARE] Estado de autenticação:", {
    isLoggedIn: isLoggedIn.value,
    loading: loading.value,
    hasUser: !!user.value,
    hasSession: !!session.value,
    userEmail: user.value?.email || "N/A",
    sessionExpiry: session.value?.expires_at || "N/A",
  });

  // ✅ Aguardar carregamento - CRÍTICO
  if (loading.value) {
    console.log("⏳ [AUTH MIDDLEWARE] Ainda carregando, aguardando...");
    return; // Não redireciona enquanto carrega
  }

  // ✅ Verificar autenticação
  if (!isLoggedIn.value) {
    console.log("🚫 [AUTH MIDDLEWARE] Usuário NÃO autenticado");
    console.log("- Rota protegida tentada:", to.path);
    console.log("- Redirecionando para /login");

    return navigateTo("/login");
  }

  // ✅ Usuário autenticado - permitir acesso
  console.log("✅ [AUTH MIDDLEWARE] Usuário autenticado, permitindo acesso");
  console.log("- Usuário:", user.value?.email);
  console.log("- Acessando:", to.path);
});
