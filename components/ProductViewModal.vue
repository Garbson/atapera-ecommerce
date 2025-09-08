<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 overflow-y-auto"
    @click="closeModal"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

      <!-- Modal content -->
      <div 
        class="relative inline-block w-full max-w-4xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6"
        @click.stop
      >
        <!-- Close button -->
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            @click="closeModal"
            class="p-2 text-gray-400 bg-white rounded-md hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Product content -->
        <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Images Section -->
          <div class="space-y-4">
            <!-- Main image -->
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                v-if="selectedImage"
                :src="selectedImage" 
                :alt="product.name"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Thumbnails -->
            <div v-if="product.images?.length > 1" class="flex gap-2 overflow-x-auto">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectedImage = image"
                :class="[
                  'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2',
                  selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                ]"
              >
                <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover">
              </button>
            </div>
          </div>

          <!-- Product Info Section -->
          <div class="space-y-4">
            <!-- Header -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span v-if="product.brand" class="text-sm text-gray-600 font-medium">{{ product.brand }}</span>
                <span v-if="product.model" class="text-sm text-gray-500">{{ product.model }}</span>
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h2>
              <p class="text-sm text-gray-600">SKU: {{ product.sku }}</p>
            </div>

            <!-- Price -->
            <div class="border-t border-b border-gray-200 py-4">
              <div v-if="hasDiscount" class="space-y-1">
                <div class="flex items-baseline gap-3">
                  <span class="text-3xl font-bold text-green-600">
                    {{ formatCurrency(product.sale_price) }}
                  </span>
                  <span class="text-lg text-gray-500 line-through">
                    {{ formatCurrency(product.price) }}
                  </span>
                </div>
                <div class="text-sm text-green-600 font-medium">
                  Economize {{ formatCurrency(product.price - product.sale_price) }} ({{ discountPercentage }}% OFF)
                </div>
              </div>
              <div v-else class="text-3xl font-bold text-gray-900">
                {{ formatCurrency(product.price) }}
              </div>
            </div>


            <!-- License Warning -->
            <div v-if="product.requires_license" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h4 class="font-medium text-yellow-800">Documentação Necessária</h4>
                  <p class="text-sm text-yellow-700 mt-1">
                    Este produto requer {{ product.license_type || 'documentação especial' }} para compra.
                  </p>
                </div>
              </div>
            </div>

            <!-- Product Details -->
            <div class="space-y-3">
              <!-- Short Description -->
              <div v-if="product.short_description">
                <h4 class="font-medium text-gray-900 mb-2">Descrição</h4>
                <p class="text-gray-700 text-sm">{{ product.short_description }}</p>
              </div>

              <!-- Specifications -->
              <div v-if="hasSpecifications" class="space-y-2">
                <h4 class="font-medium text-gray-900">Especificações</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div v-if="product.caliber">
                    <span class="text-gray-600">Calibre:</span>
                    <span class="ml-1 font-medium">{{ product.caliber }}</span>
                  </div>
                  <div v-if="product.fishing_type">
                    <span class="text-gray-600">Tipo de Pesca:</span>
                    <span class="ml-1 font-medium">{{ product.fishing_type }}</span>
                  </div>
                  <div v-if="product.weight">
                    <span class="text-gray-600">Peso:</span>
                    <span class="ml-1 font-medium">{{ product.weight }}kg</span>
                  </div>
                  <div v-if="product.target_species?.length">
                    <span class="text-gray-600">Espécies:</span>
                    <span class="ml-1 font-medium">{{ product.target_species.join(', ') }}</span>
                  </div>
                </div>
              </div>

              <!-- Additional Specifications from JSON -->
              <div v-if="product.specifications && Object.keys(product.specifications).length" class="space-y-2">
                <h4 class="font-medium text-gray-900">Detalhes Técnicos</h4>
                <div class="grid grid-cols-1 gap-1 text-sm">
                  <div v-for="(value, key) in product.specifications" :key="key" class="flex justify-between">
                    <span class="text-gray-600 capitalize">{{ formatSpecKey(key) }}:</span>
                    <span class="font-medium">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 space-y-3">
              <!-- Quantity Selector -->
              <div class="flex items-center gap-3">
                <label class="text-sm font-medium text-gray-700">Quantidade:</label>
                <div class="flex items-center border border-gray-300 rounded-md">
                  <button
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                    class="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    class="w-16 py-2 text-center border-0 focus:ring-0"
                  >
                  <button
                    @click="increaseQuantity"
                    class="p-2 text-gray-600 hover:text-gray-800"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button 
                  @click="handleAddToCart"
                  :disabled="addingToCart"
                  class="flex-1 py-3 px-6 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <span v-if="addingToCart" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adicionando...
                  </span>
                  <span v-else>
                    Adicionar ao Carrinho
                  </span>
                </button>

              </div>

              <!-- View Full Details -->
              <div class="pt-2">
                <NuxtLink 
                  :to="`/produtos/${product.slug}`"
                  class="block w-full text-center py-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  @click="closeModal"
                >
                  Ver página completa do produto →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'add-to-cart', 'add-to-wishlist']);

// Estado local
const selectedImage = ref('');
const quantity = ref(1);
const addingToCart = ref(false);

// Watchers
watch(() => props.product, (newProduct) => {
  if (newProduct?.images?.length) {
    selectedImage.value = newProduct.images[0];
  } else {
    selectedImage.value = '';
  }
  quantity.value = 1;
}, { immediate: true });

// Computed
const hasDiscount = computed(() => {
  return props.product?.sale_price && props.product.sale_price < props.product.price;
});

const discountPercentage = computed(() => {
  if (!hasDiscount.value) return 0;
  
  const discount = props.product.price - props.product.sale_price;
  return Math.round((discount / props.product.price) * 100);
});

const hasSpecifications = computed(() => {
  const p = props.product;
  return p?.caliber || p?.fishing_type || p?.weight || p?.target_species?.length;
});

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatSpecKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const closeModal = () => {
  emit('close');
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleAddToCart = async () => {
  if (addingToCart.value) return;
  
  addingToCart.value = true;
  
  try {
    await emit('add-to-cart', {
      product: props.product,
      quantity: quantity.value
    });
  } finally {
    addingToCart.value = false;
  }
};

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal();
    }
  };
  
  document.addEventListener('keydown', handleEscape);
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
  });
});
</script>