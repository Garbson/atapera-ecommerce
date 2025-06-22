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
// Inicializar auth e cart
const { initAuth } = useAuth();
const cartStore = useCartStore();

onMounted(async () => {
  await initAuth();
  cartStore.loadFromLocalStorage();
});
</script>
