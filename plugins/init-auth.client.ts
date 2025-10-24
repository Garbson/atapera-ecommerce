export default defineNuxtPlugin(async () => {
  // Só executa no client-side
  if (process.server) return;

  console.log("🔧 Inicializando sistema de auth...");

  const { initAuth } = useAuth();

  try {
    await initAuth();
    console.log("✅ Sistema de auth inicializado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao inicializar auth:", error);
  }
});