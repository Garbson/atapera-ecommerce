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
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Carrinho de Compras
        </h1>
        <p class="text-gray-600">
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
                class="p-6 flex items-center gap-4"
              >
                <!-- Imagem do Produto -->
                <div class="flex-shrink-0">
                  <img
                    :src="item.image || '/placeholder-product.jpg'"
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded-lg border"
                  />
                </div>

                <!-- Informações do Produto -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900 truncate">
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-gray-500 mt-1">{{ item.category }}</p>
                  <p class="text-lg font-semibold text-red-600 mt-2">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>

                <!-- Controles de Quantidade -->
                <div class="flex items-center gap-3">
                  <div class="flex items-center border rounded-lg">
                    <button
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                      class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span class="px-4 py-2 border-l border-r">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      :disabled="item.quantity >= item.maxStock"
                      class="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>

                  <!-- Remover Item -->
                  <button
                    @click="removeItem(item.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h3 class="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span>Subtotal ({{ totalItems }} itens)</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Frete</span>
                <span class="text-green-600">Grátis</span>
              </div>
              <hr />
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-red-600">{{ formatPrice(total) }}</span>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="space-y-3">
              <button
                @click="goToCheckout"
                class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Finalizar Compra
              </button>
              <NuxtLink
                to="/produtos"
                class="w-full block text-center border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continuar Comprando
              </NuxtLink>
            </div>

            <!-- Segurança -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  class="w-5 h-5 text-green-500"
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
