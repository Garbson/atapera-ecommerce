<!-- pages/carrinho.vue -->
<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumbs Amazon Style -->
      <nav class="mb-4">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <NuxtLink to="/" class="text-blue-600 hover:text-orange-600 hover:underline">
              Início
            </NuxtLink>
          </li>
          <li class="text-gray-400">›</li>
          <li class="text-gray-900">Carrinho de compras</li>
        </ol>
      </nav>

      <!-- Header Amazon Style -->
      <div class="mb-6">
        <h1 class="text-3xl font-normal text-gray-900">
          Carrinho de compras
        </h1>
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

      <!-- Carrinho com Itens - Amazon Style -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Lista de Produtos (3 colunas) -->
        <div class="lg:col-span-3">
          <!-- Header do carrinho -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-6 gap-2">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span class="text-base sm:text-lg font-normal text-gray-900">
                {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'itens' }}
              </span>
            </div>
            <div class="text-right hidden sm:block">
              <span class="text-sm text-gray-600">Preço</span>
            </div>
          </div>

          <!-- Lista de produtos Amazon style -->
          <div class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-sm transition-shadow"
            >
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Imagem do produto -->
                <div class="flex-shrink-0 mx-auto sm:mx-0">
                  <NuxtLink :to="`/produtos/${item.slug}`" class="block">
                    <img
                      :src="item.image || '/placeholder-product.jpg'"
                      :alt="item.name"
                      class="w-24 h-24 sm:w-32 sm:h-32 object-contain border border-gray-200 rounded"
                    />
                  </NuxtLink>
                </div>

                <!-- Informações do produto -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-col lg:flex-row lg:justify-between">
                    <div class="flex-1 lg:pr-4">
                      <!-- Nome do produto -->
                      <h3 class="text-sm lg:text-lg font-normal text-blue-600 hover:text-orange-600 mb-2 line-clamp-2">
                        <NuxtLink :to="`/produtos/${item.slug}`">
                          {{ item.name }}
                        </NuxtLink>
                      </h3>

                      <!-- Status -->
                      <div class="flex items-center gap-2 text-sm text-green-700 mb-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span class="font-medium">Em estoque</span>
                      </div>

                      <!-- Categoria -->
                      <p class="text-sm text-gray-600 mb-3">
                        Categoria: {{ item.category }}
                      </p>

                      <!-- Ações do produto -->
                      <div class="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm">
                        <!-- Quantidade -->
                        <div class="flex items-center gap-2">
                          <span class="text-gray-600">Qtd:</span>
                          <div class="flex items-center border border-gray-300 rounded">
                            <button
                              @click="updateQuantity(item.id, item.quantity - 1)"
                              :disabled="item.quantity <= 1"
                              class="px-2 lg:px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
                            >
                              −
                            </button>
                            <span class="px-2 lg:px-3 py-1 border-l border-r border-gray-300 bg-gray-50 min-w-[2.5rem] lg:min-w-[3rem] text-center text-xs lg:text-sm">
                              {{ item.quantity }}
                            </span>
                            <button
                              @click="updateQuantity(item.id, item.quantity + 1)"
                              :disabled="item.quantity >= (item.maxStock || 10)"
                              class="px-2 lg:px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs lg:text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <!-- Separador -->
                        <span class="text-gray-300 hidden sm:inline">|</span>

                        <!-- Remover -->
                        <button
                          @click="removeItem(item.id)"
                          class="text-blue-600 hover:text-orange-600 hover:underline text-xs lg:text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <!-- Preço -->
                    <div class="text-right mt-2 lg:mt-0">
                      <div class="text-lg lg:text-xl font-bold text-red-700">
                        {{ formatPrice(item.price) }}
                      </div>
                      <div v-if="item.avistaPrice && item.avistaPrice < item.price" class="text-xs lg:text-sm text-gray-600 mt-1">
                        {{ formatPrice(item.avistaPrice) }} à vista
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido - Amazon Style -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-gray-200 rounded-lg p-4 lg:sticky lg:top-24">
            <!-- Total -->
            <div class="text-center mb-4">
              <div class="text-sm text-gray-600 mb-1">
                Subtotal ({{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }}):
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ formatPrice(total) }}
              </div>
            </div>

            <!-- Informação de entrega -->
            <div class="flex items-center justify-center gap-2 text-sm text-blue-700 mb-4">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">Entregamos AC, RO e AM</span>
            </div>

            <!-- Checkbox de presente -->
            <div class="mb-4">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span>Este pedido é um presente</span>
              </label>
            </div>

            <!-- Botão principal -->
            <button
              @click="goToCheckout"
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-full text-sm transition-colors mb-3"
            >
              Fechar pedido
            </button>

            <!-- Botão secundário -->
            <button
              @click="goToCheckout"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full text-sm transition-colors mb-4"
            >
              Comprar agora
            </button>


            <!-- Informações adicionais -->
            <div class="border-t border-gray-200 pt-4 mt-4 space-y-2 text-xs text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <span>Transação 100% segura</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span>Múltiplas formas de pagamento</span>
              </div>

              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8.5 13a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" clip-rule="evenodd" />
                </svg>
                <span>Entrega rastreada</span>
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
const total = computed(() => cartStore.totalValue);

// Calcular total à vista
const avistaTotal = computed(() => {
  return cartStore.items.reduce((total, item) => {
    const avistaPrice = item.avistaPrice || item.price;
    return total + avistaPrice * item.quantity;
  }, 0);
});

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

// Funções de pagamento removidas - serão definidas no checkout

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
