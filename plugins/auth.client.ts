export default defineNuxtPlugin(async () => {
  // Só executa no client-side
  if (process.server) return;
  const authStore = useAuthStore();
  await authStore.initialize();
});
