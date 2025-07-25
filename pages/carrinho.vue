<!-- pages/carrinho.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700"
              >Início</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">Carrinho</li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Carrinho de Compras
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Revise seus itens antes de finalizar a compra
        </p>
      </div>

      <!-- Carrinho Vazio -->
      <div v-if="cartItems.length === 0" class="text-center py-16">
        <div class="mb-6">
          <svg
            class="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          Seu carrinho está vazio
        </h2>
        <p class="text-gray-600 mb-6">
          Adicione alguns produtos incríveis ao seu carrinho!
        </p>
        <NuxtLink
          to="/produtos"
          class="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Continuar Comprando
        </NuxtLink>
      </div>

      <!-- Carrinho com Itens -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Lista de Produtos -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold">
                Itens no Carrinho ({{ cartItems.length }})
              </h2>
            </div>

            <div class="divide-y divide-gray-200">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="p-4 sm:p-6"
              >
                <!-- Layout Mobile: Flex Column -->
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <!-- Row 1: Imagem + Info Principal -->
                  <div class="flex items-start gap-3 flex-1">
                    <!-- Imagem do Produto -->
                    <div class="flex-shrink-0">
                      <img
                        :src="item.image || '/placeholder-product.jpg'"
                        :alt="item.name"
                        class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
                      />
                    </div>

                    <!-- Informações do Produto -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-medium text-gray-900 leading-tight overflow-hidden">
                        <span class="line-clamp-2">{{ item.name }}</span>
                      </h3>
                      <p class="text-xs sm:text-sm text-gray-500 mt-1">{{ item.category }}</p>
                      <p class="text-lg sm:text-xl font-semibold text-red-600 mt-1 sm:mt-2">
                        {{ formatPrice(item.price) }}
                      </p>
                    </div>
                  </div>

                  <!-- Row 2: Controles (Mobile empilhados, Desktop na linha) -->
                  <div class="flex items-center justify-between sm:justify-end sm:gap-3">
                    <!-- Controles de Quantidade -->
                    <div class="flex items-center border rounded-lg">
                      <button
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                        class="px-2 sm:px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        -
                      </button>
                      <span class="px-3 sm:px-4 py-2 border-l border-r text-sm sm:text-base">{{
                        item.quantity
                      }}</span>
                      <button
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        :disabled="item.quantity >= item.maxStock"
                        class="px-2 sm:px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>

                    <!-- Remover Item -->
                    <button
                      @click="removeItem(item.id)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group ml-2"
                      title="Remover item"
                    >
                      <svg
                        class="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:sticky lg:top-24">
            <h3 class="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div class="flex justify-between text-sm sm:text-base">
                <span>Subtotal ({{ totalItems }} itens)</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm sm:text-base">
                <span>Frete</span>
                <span class="text-green-600">Grátis</span>
              </div>
              <hr />
              <div class="flex justify-between text-base sm:text-lg font-semibold">
                <span>Total</span>
                <span class="text-red-600">{{ formatPrice(total) }}</span>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="space-y-2 sm:space-y-3">
              <button
                @click="goToCheckout"
                class="w-full bg-red-600 text-white py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
              >
                Ir para Pagamento
              </button>
              <NuxtLink
                to="/produtos"
                class="w-full block text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Continuar Comprando
              </NuxtLink>
            </div>

            <!-- Segurança -->
            <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1L3 6v11a1 1 0 001 1h12a1 1 0 001-1V6l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                Compra 100% segura e protegida
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const auth = useAuth();

// Usar dados da store em vez de mock data
const cartItems = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const subtotal = computed(() => cartStore.totalValue);
const total = computed(() => cartStore.totalValue); // Adicionar frete se necessário

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const updateQuantity = async (itemId: string, newQuantity: number) => {
  try {
    await cartStore.updateQuantity(itemId, newQuantity);
  } catch (error: any) {
    alert(error.message);
  }
};

const removeItem = async (itemId: string) => {
  try {
    await cartStore.removeItem(itemId);
  } catch (error: any) {
    alert(error.message);
  }
};

const goToCheckout = async () => {
  // Verificar se está logado
  if (!auth.isLoggedIn.value) {
    await navigateTo("/login?redirect=/checkout");
    return;
  }

  // Verificar se carrinho não está vazio
  if (cartStore.isEmpty) {
    alert("Seu carrinho está vazio");
    return;
  }

  await navigateTo("/checkout");
};

// SEO
useSeoMeta({
  title: "Carrinho de Compras - Atapera",
  description: "Revise seus itens no carrinho antes de finalizar a compra",
});
</script>

<style>
/* Garantir que line-clamp funcione */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
