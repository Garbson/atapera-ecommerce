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
// Inicializar stores
const { initAuth } = useAuth();
const cartStore = useCartStore();

onMounted(async () => {
  try {
    // Inicializar autenticação
    await initAuth();

    // Carregar carrinho do localStorage
    cartStore.loadFromLocalStorage();

    console.log("✅ Layout inicializado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao inicializar layout:", error);
  }
});
</script>
