<!-- components/CartSidebar.vue -->
<template>
  <!-- Overlay -->
  <Teleport to="body">
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      @click="cartStore.closeCart()"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <!-- Sidebar -->
      <div
        class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300"
        @click.stop
      >
        <!-- Header -->
        <div class="border-b border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800">
              Carrinho ({{ cartStore.totalItems }})
            </h2>
            <button
              @click="cartStore.closeCart()"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                class="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col h-full">
          <!-- Empty State -->
          <div
            v-if="cartStore.isEmpty"
            class="flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <svg
              class="w-24 h-24 text-gray-300 mb-4"
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
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              Carrinho vazio
            </h3>
            <p class="text-gray-500 mb-6">
              Adicione produtos para continuar comprando
            </p>
            <button
              @click="cartStore.closeCart()"
              class="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>

          <!-- Items List -->
          <div v-else class="flex-1 overflow-y-auto p-6 space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <!-- Product Image -->
              <div
                class="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden"
              >
                <img
                  v-if="getItemImage(item)"
                  :src="getItemImage(item)"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                  @error="onImageError"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-400"
                >
                  📦
                </div>
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-800 truncate">
                  {{ item.name }}
                </h4>
                <p v-if="item.category" class="text-sm text-gray-500">
                  {{ item.category }}
                </p>
                <p class="text-lg font-semibold text-red-600 mt-1">
                  {{ formatPrice(item.price) }}
                </p>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-3 mt-3">
                  <button
                    @click="cartStore.decreaseQuantity(item.id)"
                    class="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>

                  <span class="w-8 text-center font-medium">{{
                    item.quantity
                  }}</span>

                  <button
                    @click="cartStore.increaseQuantity(item.id)"
                    :disabled="item.maxStock && item.quantity >= item.maxStock"
                    class="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>

                  <!-- Remove Button -->
                  <button
                    @click="cartStore.removeItem(item.id)"
                    class="ml-auto text-red-500 hover:text-red-700 p-1"
                    title="Remover item"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer with Total and Checkout -->
          <div
            v-if="!cartStore.isEmpty"
            class="border-t border-gray-200 p-6 bg-white"
          >
            <!-- Total -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-medium text-gray-800">Total:</span>
              <span class="text-2xl font-bold text-red-600">
                {{ cartStore.totalValueFormatted }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="goToCheckout"
                class="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Finalizar Compra
              </button>

              <button
                @click="cartStore.closeCart()"
                class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

// Composables
const { getProductImage } = useCloudinary();

// Formatação de preço
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

// Obter imagem do item do carrinho
const getItemImage = (item: any) => {
  if (!item.image) return null;
  
  // Se já é uma URL completa, retornar diretamente
  if (item.image.startsWith('http')) {
    return item.image;
  }
  
  // Se for um ID do Cloudinary, converter para URL
  if (typeof item.image === 'string' && !item.image.startsWith('/')) {
    return getProductImage(item.image, 'small');
  }
  
  // Fallback para imagens locais
  return item.image;
};

// Handler de erro de imagem
const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  console.error('Erro ao carregar imagem do carrinho:', target.src);
  
  // Substituir por placeholder SVG inline
  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23CBD5E0' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
  target.src = placeholder;
};

// Ir para checkout
const goToCheckout = () => {
  try {
    const checkoutData = cartStore.prepareCheckout();
    cartStore.closeCart();

    // Navegar para página de checkout
    navigateTo("/checkout");

    // Ou integrar com gateway de pagamento
    // Exemplo com análise de dados
    if (typeof gtag !== "undefined") {
      gtag("event", "begin_checkout", {
        currency: "BRL",
        value: checkoutData.total,
        items: checkoutData.items,
      });
    }
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
    alert("Erro ao processar checkout. Tente novamente.");
  }
};

// Fechar carrinho com ESC
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && cartStore.isOpen) {
      cartStore.closeCart();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
