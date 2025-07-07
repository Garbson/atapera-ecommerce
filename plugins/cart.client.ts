// plugins/cart.client.ts
export default defineNuxtPlugin(async () => {
  const cartStore = useCartStore();
  const auth = useAuth();

  // ✅ INICIALIZAR CARRINHO NA PRIMEIRA CARGA
  await cartStore.initCart();

  // ✅ WATCH PARA MUDANÇAS DE AUTENTICAÇÃO
  watch(
    () => auth.isLoggedIn.value,
    async (isLoggedIn, wasLoggedIn) => {
      console.log("🛒 [CartPlugin] Auth mudou:", { isLoggedIn, wasLoggedIn });

      if (isLoggedIn && !wasLoggedIn) {
        // ✅ USUÁRIO FEZ LOGIN: Sincronizar carrinho
        await cartStore.syncCartOnLogin();
      } else if (!isLoggedIn && wasLoggedIn) {
        // ✅ USUÁRIO FEZ LOGOUT: Migrar para sessão
        await cartStore.migrateToSession();
      }
    }
  );

  console.log("✅ [CartPlugin] Plugin do carrinho inicializado");
});
