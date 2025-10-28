// composables/useEnsureAuth.ts
export const useEnsureAuth = () => {
  const { session, user, loading } = useAuth();

  // Apenas verificar o estado atual, sem forçar checks
  const isAuthenticated = computed(() => !!session.value);

  // Aguardar loading terminar na primeira vez
  const waitForInit = async () => {
    if (loading.value) {
      await new Promise<void>(resolve => {
        const unwatch = watch(loading, (newLoading) => {
          if (!newLoading) {
            unwatch();
            resolve();
          }
        }, { immediate: true });
      });
    }
  };

  // Status reativo da sessão
  const sessionWatcher = computed(() => ({
    isAuthenticated: !!session.value,
    user: user.value,
    session: session.value,
    loading: loading.value
  }));

  return {
    waitForInit,
    sessionWatcher: readonly(sessionWatcher),
    // Estados diretos para conveniência
    isAuthenticated,
    user: readonly(user),
    session: readonly(session),
    loading: readonly(loading)
  };
};