<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Conteúdo das páginas -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Componentes globais -->
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
const { initAuth } = useAuth();
const cartStore = useCartStore();

onMounted(async () => {
  try {
    await initAuth();
    await cartStore.initCart();
  } catch (error) {
    console.error("❌ Erro ao inicializar layout:", error);
  }
});
</script>
