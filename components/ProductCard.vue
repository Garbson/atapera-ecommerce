<template>
  <div
    class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col h-full"
  >
    <!-- Image Container -->
    <div class="relative aspect-square bg-white overflow-hidden">
      <img
        v-if="selectedImage"
        :src="selectedImage"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="onImageError"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-white"
      >
        <svg
          class="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span
          v-if="product.is_featured"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
        >
          Destaque
        </span>
        <span
          v-if="pricing.discountPercentage > 0"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
        >
          {{ formatDiscount(pricing.discountPercentage) }}
        </span>
      </div>

      <!-- Quick Actions -->
      <div
        class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          @click="$emit('add-to-wishlist', product)"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="Adicionar à lista de desejos"
        >
          <svg
            class="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <button
          @click="quickView"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="Visualização rápida"
        >
          <svg
            class="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>

      <!-- Link overlay -->
      <NuxtLink
        :to="`/produtos/${product.slug}`"
        class="absolute inset-0 z-10"
        :title="product.name"
      />
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <!-- Title - Desktop: 1 linha com tooltip, Mobile: 2 linhas -->
      <div class="font-medium text-gray-900 mb-3 leading-6 sm:h-6 h-12 overflow-hidden">
        <NuxtLink 
          :to="`/produtos/${product.slug}`" 
          class="hover:text-blue-600 block sm:truncate line-clamp-2 sm:line-clamp-none"
          :title="product.name"
        >
          {{ product.name }}
        </NuxtLink>
      </div>

      <!-- Brand and SKU - Altura fixa -->
      <div class="flex items-center justify-between text-sm text-gray-600 mb-3 h-5">
        <span v-if="product.brand" class="font-medium truncate">{{
          product.brand
        }}</span>
        <span class="text-xs flex-shrink-0">SKU: {{ product.sku }}</span>
      </div>

      <!-- Price Section - Altura fixa -->
      <div class="mb-4 h-20">
        <!-- Preço principal -->
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-xl font-bold text-gray-900">
            {{ formatCurrency(pricing.avistaPrice) }}
          </span>
          <!-- Preço original riscado (se houver promoção) -->
          <span v-if="hasDiscount" class="text-sm text-gray-500 line-through">
            {{ formatCurrency(product.price) }}
          </span>
        </div>

        <!-- Informações adicionais discretas -->
        <div class="space-y-1">
          <!-- Desconto à vista (se houver) -->
          <div
            v-if="pricing.discountPercentage > 0"
            class="text-xs text-green-600 h-4"
          >
            {{ formatDiscount(pricing.discountPercentage) }} no PIX ou débito
          </div>
          <div v-else class="h-4"></div>

          <!-- Parcelamento -->
          <div class="text-xs text-gray-600 h-4">
            em até {{ pricing.maxInstallments }}x de
            {{ formatCurrency(pricing.installmentValue) }} no cartão
          </div>
        </div>
      </div>

      <!-- License Info - Altura fixa para manter alinhamento -->
      <div class="mb-3 h-12 flex items-start">
        <div
          v-if="product.requires_license"
          class="w-full p-2 bg-yellow-50 border border-yellow-200 rounded-md"
        >
          <div class="flex items-center text-xs text-yellow-800">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-medium"
              >Requer {{ product.license_type || "documentação" }}</span
            >
          </div>
        </div>
      </div>

      <!-- Add to Cart Button - Sempre na parte inferior -->
      <button
        @click="handleAddToCart"
        :disabled="addingToCart"
        class="w-full py-2 px-4 rounded-md font-medium text-sm transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        <span v-if="addingToCart" class="flex items-center justify-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Adicionando...
        </span>
        <span style="cursor: pointer;" v-else>Adicionar ao Carrinho</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  calculatePricing,
  formatCurrency,
  formatDiscount,
} from "~/utils/pricing";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart", "add-to-wishlist", "quick-view"]);

// Estado local
const addingToCart = ref(false);
const selectedImage = ref("");

// Composables
const { getProductImage } = useCloudinary();

// Computed
const pricing = computed(() => calculatePricing(props.product));

const productImages = computed(() => {
  let images = props.product.images;

  // Se for string, tentar converter para array
  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch (e) {
      console.error("Erro ao converter string de imagens para array:", e);
      return [];
    }
  }

  // Garantir que é array
  if (!Array.isArray(images)) {
    return [];
  }

  return images;
});

const hasDiscount = computed(() => {
  return (
    props.product.sale_price && props.product.sale_price < props.product.price
  );
});

// Methods
const handleAddToCart = async () => {
  if (addingToCart.value) return;

  addingToCart.value = true;

  try {
    // Preparar produto com informações de preço
    const productWithPricing = {
      ...props.product,
      avistaPrice: pricing.value.avistaPrice,
      parceladoPrice: pricing.value.parceladoPrice,
      // Preço padrão é sempre o parcelado (será ajustado no checkout)
      price: pricing.value.parceladoPrice,
    };
    await emit("add-to-cart", productWithPricing);
  } finally {
    addingToCart.value = false;
  }
};

const quickView = () => {
  emit("quick-view", props.product);
};

const onImageError = (event) => {
  console.error("Erro ao carregar imagem:", {
    src: event.target.src,
    product: props.product.name,
    images: props.product.images,
  });
};

// Watcher para atualizar selectedImage quando o produto muda
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct?.images?.length) {
      // Usar getProductImage para gerar a URL correta do Cloudinary
      selectedImage.value = getProductImage(newProduct.images[0], "medium");
    } else {
      selectedImage.value = "";
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (typeof props.product.images === "string") {
    console.warn(
      "⚠️ Imagens estão como string, não como array:",
      props.product.images
    );
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
