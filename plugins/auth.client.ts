export default defineNuxtPlugin(async () => {
  // Só executa no client-side
  if (process.server) return;

  try {
    const { initAuth } = useAuth();
    await initAuth();
    console.log("✅ Autenticação inicializada com sucesso");
  } catch (error) {
    console.error("❌ Erro ao inicializar autenticação:", error);
  }
});
