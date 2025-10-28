// middleware/session-check.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Só executa no client
  if (typeof window === 'undefined') return;

  // Não verificar na primeira navegação
  if (!from || !from.name) return;

  const { session, loading } = useAuth();

  // Verificação simples e rápida - só para rotas que realmente requerem auth
  if (to.meta.requiresAuth && !loading.value && !session.value) {
    console.log("🚫 Rota requer autenticação mas não há sessão válida");
    return navigateTo('/auth/login');
  }

  // Se não há sessão local mas não é uma rota protegida,
  // deixar o onAuthStateChange lidar com isso automaticamente
});