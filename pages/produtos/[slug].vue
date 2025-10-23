<template>
  <div v-if="product" class="bg-white">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-gray-50">
      <div class="container mx-auto px-4 py-3">
        <nav class="text-sm">
          <ol class="flex items-center space-x-2">
            <li>
              <NuxtLink
                to="/"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Início
              </NuxtLink>
            </li>
            <li class="text-gray-400">›</li>
            <li>
              <NuxtLink
                to="/produtos"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Produtos
              </NuxtLink>
            </li>
            <li class="text-gray-400">›</li>
            <li class="text-gray-900">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Galeria de Imagens - Amazon Style -->
        <div class="lg:col-span-5">
          <div class="sticky top-4">
            <!-- Imagem Principal -->
            <div class="mb-4">
              <div
                class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  :src="selectedImage"
                  :alt="product.name"
                  class="w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  @click="openImageModal"
                />
              </div>
            </div>

            <!-- Thumbnails -->
            <div
              v-if="product.images && product.images.length > 1"
              class="grid grid-cols-6 gap-2"
            >
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectImage(image)"
                @dblclick="openImageFromThumbnail(index)"
                class="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
                :class="
                  selectedImage === getProductImage(image)
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-gray-300'
                "
                :title="`Clique duplo para dar zoom na imagem ${index + 1}`"
              >
                <img
                  :src="getProductImage(image, 'small')"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="lg:col-span-4">
          <div class="space-y-4">
            <!-- Título e Marca -->
            <div>
              <div
                v-if="product.brand"
                class="text-sm text-blue-600 font-medium mb-1"
              >
                {{ product.brand }}
              </div>
              <h1 class="text-2xl font-normal text-gray-900 leading-tight">
                {{ product.name }}
              </h1>
            </div>

            <!-- Avaliações (placeholder) -->
            <div class="flex items-center gap-2 text-sm">
              <div class="flex text-orange-400">
                <span class="text-lg">★★★★☆</span>
              </div>
              <span class="text-blue-600 hover:underline cursor-pointer"
                >4.2 de 5 estrelas</span
              >
              <span class="text-gray-500">(127 avaliações)</span>
            </div>

            <!-- Preços - Amazon Style -->
            <div class="space-y-3 py-2">
              <!-- Preço Principal -->
              <div class="flex items-baseline gap-2">
                <span class="text-sm text-gray-600">Preço:</span>
                <div class="flex items-baseline gap-2">
                  <span
                    v-if="hasDiscount"
                    class="text-sm text-gray-500 line-through"
                  >
                    {{ formatCurrency(product.price) }}
                  </span>
                  <span class="text-2xl text-red-700 font-normal">
                    {{ formatCurrency(displayPrice) }}
                  </span>
                </div>
              </div>

              <!-- Economia -->
              <div v-if="pricing.discountPercentage > 0" class="text-sm">
                <span class="text-red-700">
                  Economize {{ formatCurrency(pricing.discount) }} ({{
                    formatDiscount(pricing.discountPercentage)
                  }})
                </span>
                <span class="text-gray-600 ml-1">com PIX ou Débito</span>
              </div>

              <!-- Parcelamento -->
              <div class="text-sm text-gray-700">
                ou
                <span class="font-medium">{{
                  formatInstallment(
                    pricing.installmentValue,
                    pricing.maxInstallments
                  )
                }}</span>
                no cartão
              </div>
            </div>

            <!-- Disponibilidade -->
            <div class="py-2">
              <div class="flex items-center gap-2 text-sm">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="text-green-700 font-medium">Em estoque</span>
              </div>
            </div>

            <!-- Características Principais -->
            <div
              v-if="mainFeatures.length > 0"
              class="border-t border-gray-200 pt-4"
            >
              <h3 class="text-lg font-medium text-gray-900 mb-3">
                Sobre este produto
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="feature in mainFeatures"
                  :key="feature"
                  class="flex items-start gap-2 text-sm"
                >
                  <span class="text-gray-400 mt-1">•</span>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Requisitos de Licença -->
            <div
              v-if="product.requires_license"
              class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <h4 class="font-medium text-yellow-800">
                    Requer Documentação
                  </h4>
                  <p class="text-sm text-yellow-700 mt-1">
                    Este produto requer
                    {{ product.license_type || "documentação específica" }} para
                    compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar de Compra - Amazon Style -->
        <div class="lg:col-span-3">
          <div
            class="border border-gray-300 rounded-lg p-4 bg-white sticky top-4"
          >
            <!-- Preços na Sidebar -->
            <div class="space-y-2 mb-4">
              <div class="text-xl text-red-700 font-normal">
                {{ formatCurrency(displayPrice) }}
              </div>
              <div class="text-sm text-gray-600">
                {{
                  formatInstallment(
                    pricing.installmentValue,
                    pricing.maxInstallments
                  )
                }}
              </div>
              <div
                v-if="pricing.discountPercentage > 0"
                class="text-sm text-green-700"
              >
                {{ formatDiscount(pricing.discountPercentage) }} com PIX/Débito
              </div>
            </div>

            <!-- Seletor de Tamanho -->
            <div v-if="hasVariants" class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Tamanho:
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.size"
                  @click="selectedSize = variant.size"
                  class="px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  :class="
                    selectedSize === variant.size
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  "
                >
                  <div class="text-center">
                    <div class="font-semibold">{{ variant.size }}</div>
                    <div class="text-xs text-gray-600">{{ formatCurrency(variant.price) }}</div>
                  </div>
                </button>
              </div>
              <p v-if="!selectedSize && hasVariants" class="text-sm text-red-600 mt-2">
                Por favor, selecione um tamanho
              </p>
            </div>

            <!-- Seletor de Cor -->
            <div v-if="product.color && product.color.length > 0" class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Cor disponível:
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.color"
                  :key="color"
                  @click="selectedColor = color"
                  class="px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  :class="
                    selectedColor === color
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  "
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Seletor de Quantidade -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Quantidade:</label
              >
              <div
                class="flex items-center border border-gray-300 rounded w-fit"
              >
                <button
                  @click="decreaseQuantity"
                  class="px-3 py-2 hover:bg-gray-100 text-gray-600"
                  :disabled="quantity <= 1"
                >
                  −
                </button>
                <input
                  v-model="quantity"
                  type="number"
                  min="1"
                  max="10"
                  class="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                />
                <button
                  @click="increaseQuantity"
                  class="px-3 py-2 hover:bg-gray-100 text-gray-600"
                  :disabled="quantity >= 10"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="space-y-2">
              <button
                @click="addToCart"
                :disabled="loading || (hasVariants && !selectedSize)"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-50"
              >
                {{ loading ? "Adicionando..." : "Adicionar ao carrinho" }}
              </button>

              <button
                @click="buyNow"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
              >
                Comprar agora
              </button>
            </div>

            <!-- Vendido por -->
            <div
              class="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600"
            >
              <div>
                Vendido por
                <span class="text-blue-600 font-medium">Atapera Oficial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informações Detalhadas -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Descrição Principal -->
        <div class="lg:col-span-3">
          <!-- Tabs de Informações -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
                :class="
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <div class="mt-6">
            <!-- Descrição -->
            <div v-if="activeTab === 'description'" class="prose max-w-none">
              <div
                v-if="product.description"
                v-html="product.description"
              ></div>
              <div v-else-if="product.short_description" class="text-gray-700">
                {{ product.short_description }}
              </div>
              <div v-else class="text-gray-500 italic">
                Descrição não disponível para este produto.
              </div>
            </div>

            <!-- Especificações -->
            <div v-else-if="activeTab === 'specs'" class="space-y-6">
              <!-- Informações Básicas -->
              <div v-if="basicSpecs.length > 0">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Informações do Produto
                </h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div
                      v-for="spec in basicSpecs"
                      :key="spec.label"
                      class="flex justify-between"
                    >
                      <dt class="text-sm text-gray-600">{{ spec.label }}:</dt>
                      <dd class="text-sm font-medium text-gray-900">
                        {{ spec.value }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Especificações Técnicas -->
              <div
                v-if="
                  product.specifications &&
                  Object.keys(product.specifications).length > 0
                "
              >
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Especificações Técnicas
                </h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div
                      v-for="(value, key) in product.specifications"
                      :key="key"
                      class="flex justify-between"
                    >
                      <dt class="text-sm text-gray-600">
                        {{ formatSpecKey(key) }}:
                      </dt>
                      <dd class="text-sm font-medium text-gray-900">
                        {{ value }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <!-- Avaliações -->
            <div v-else-if="activeTab === 'reviews'" class="space-y-6">
              <div class="text-center py-8 text-gray-500">
                <svg
                  class="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <p>Seja o primeiro a avaliar este produto</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar com Mais Informações -->
        <div class="lg:col-span-1">
          <div class="space-y-4">
            <!-- Informações de Segurança -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-medium text-gray-900 mb-3">Compra Segura</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Pagamento 100% seguro</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Produtos de qualidade</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Garantia de qualidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos Relacionados -->
      <div
        v-if="relatedProducts.length > 0"
        class="mt-12 border-t border-gray-200 pt-8"
      >
        <h2 class="text-xl font-medium text-gray-900 mb-6">
          Produtos relacionados
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <NuxtLink :to="`/produtos/${relatedProduct.slug}`" class="block">
              <div
                class="aspect-square bg-gray-50 rounded mb-2 overflow-hidden"
              >
                <img
                  :src="getFirstProductImage(relatedProduct.images)"
                  :alt="relatedProduct.name"
                  class="w-full h-full object-contain hover:scale-105 transition-transform"
                />
              </div>
              <h3 class="text-sm text-gray-900 line-clamp-2 mb-1">
                {{ relatedProduct.name }}
              </h3>
              <div class="text-sm">
                <div class="text-red-700 font-medium">
                  {{
                    formatCurrency(calculatePricing(relatedProduct).avistaPrice)
                  }}
                </div>
                <div class="text-gray-500 text-xs">
                  {{
                    formatInstallment(
                      calculatePricing(relatedProduct).installmentValue,
                      12
                    )
                  }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Modal -->
    <ImageZoomModal
      :is-open="showImageZoom"
      :images="product?.images || []"
      :current-image-index="currentImageIndex"
      :alt-text="product?.name"
      @close="closeImageZoom"
    />
  </div>

  <!-- Loading State -->
  <div v-else class="container mx-auto px-4 py-8">
    <div class="animate-pulse space-y-6">
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="aspect-square bg-gray-200 rounded-lg"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  calculatePricing,
  formatCurrency,
  formatDiscount,
  formatInstallment,
} from "~/utils/pricing";

// Composables
const supabase = useSupabase();
const { getProductImage } = useCloudinary();
const route = useRoute();
const cartStore = useCartStore();

// Estados
const product = ref(null);
const relatedProducts = ref([]);
const selectedImage = ref("");
const quantity = ref(1);
const loading = ref(false);
const activeTab = ref("description");
const selectedColor = ref("");
const selectedSize = ref("");

// Computed
const pricing = computed(() =>
  product.value
    ? calculatePricing(product.value)
    : {
        avistaPrice: 0,
        parceladoPrice: 0,
        discount: 0,
        discountPercentage: 0,
        installmentValue: 0,
        maxInstallments: 12,
      }
);

const hasDiscount = computed(() => {
  return (
    product.value?.sale_price && product.value.sale_price < product.value.price
  );
});

const hasVariants = computed(() => {
  return product.value?.variants && product.value.variants.length > 0;
});

const selectedVariant = computed(() => {
  if (!selectedSize.value || !product.value?.variants) return null;
  return product.value.variants.find(v => v.size === selectedSize.value);
});

const displayPrice = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.price;
  }
  return pricing.value.avistaPrice;
});

const tabs = computed(() => [
  { id: "description", name: "Descrição" },
  { id: "specs", name: "Especificações" },
  { id: "reviews", name: "Avaliações (0)" },
]);

const mainFeatures = computed(() => {
  const features = [];
  if (product.value?.brand) features.push(`Marca: ${product.value.brand}`);
  if (product.value?.model) features.push(`Modelo: ${product.value.model}`);
  if (selectedColor.value) features.push(`Cor: ${selectedColor.value}`);
  if (product.value?.caliber)
    features.push(`Calibre: ${product.value.caliber}`);
  if (product.value?.weight) features.push(`Peso: ${product.value.weight}kg`);
  if (product.value?.short_description)
    features.push(product.value.short_description);
  return features.slice(0, 5); // Máximo 5 características
});

const basicSpecs = computed(() => {
  const specs = [];
  if (product.value?.brand)
    specs.push({ label: "Marca", value: product.value.brand });
  if (product.value?.model)
    specs.push({ label: "Modelo", value: product.value.model });
  if (selectedColor.value)
    specs.push({ label: "Cor", value: selectedColor.value });

  // SKU sempre presente - todos os produtos têm
  specs.push({ label: "SKU", value: product.value?.sku });

  if (product.value?.caliber)
    specs.push({ label: "Calibre", value: product.value.caliber });
  if (product.value?.weight)
    specs.push({ label: "Peso", value: `${product.value.weight}kg` });


  return specs;
});

// Métodos
const selectImage = (image: string) => {
  selectedImage.value = getProductImage(image);
};

const showImageZoom = ref(false);
const currentImageIndex = ref(0);

const openImageModal = () => {
  // Find the current image index
  if (product.value?.images?.length) {
    const currentImg = selectedImage.value;
    const foundIndex = product.value.images.findIndex(
      (img) =>
        getProductImage(img) === currentImg ||
        getProductImage(img, "large") === currentImg
    );
    currentImageIndex.value = foundIndex >= 0 ? foundIndex : 0;
  }
  showImageZoom.value = true;
};

const closeImageZoom = () => {
  showImageZoom.value = false;
};

const openImageFromThumbnail = (index: number) => {
  currentImageIndex.value = index;
  showImageZoom.value = true;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  if (quantity.value < 10) quantity.value++;
};

const addToCart = async () => {
  // Validar se cor foi selecionada quando há cores disponíveis
  if (product.value.color && product.value.color.length > 0 && !selectedColor.value) {
    const { error } = useNotifications();
    error("Selecione uma cor", "Por favor, escolha uma cor antes de adicionar ao carrinho");
    return;
  }

  // Validar se tamanho foi selecionado quando há variações disponíveis
  if (hasVariants.value && !selectedSize.value) {
    const { error } = useNotifications();
    error("Selecione um tamanho", "Por favor, escolha um tamanho antes de adicionar ao carrinho");
    return;
  }

  loading.value = true;
  try {
    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      price: selectedVariant.value ? selectedVariant.value.price : pricing.value.parceladoPrice,
      avistaPrice: selectedVariant.value ? selectedVariant.value.price : pricing.value.avistaPrice,
      parceladoPrice: selectedVariant.value ? selectedVariant.value.price : pricing.value.parceladoPrice,
      image: product.value.images?.[0] || "/placeholder-product.jpg",
      category: product.value.categories?.slug || "produto",
      product_id: product.value.id,
      slug: product.value.slug,
      selectedColor: selectedColor.value, // Incluir cor selecionada
      availableColors: product.value.color || [], // Incluir cores disponíveis
      selectedSize: selectedSize.value, // Incluir tamanho selecionado
      availableSizes: product.value.variants || [], // Incluir variações disponíveis
      variantPrice: selectedVariant.value?.price, // Preço da variação
      products: {
        categories: {
          slug: product.value.categories?.slug,
        },
        requires_license: product.value.requires_license,
      },
    };

    await cartStore.addItem(cartItem, quantity.value);

    // Feedback
    const { success } = useNotifications();
    const sizeText = selectedSize.value ? ` (${selectedSize.value})` : '';
    const colorText = selectedColor.value ? ` - ${selectedColor.value}` : '';
    success(
      "Produto adicionado!",
      `${product.value.name}${sizeText}${colorText} foi adicionado ao carrinho`
    );
  } catch (error: any) {
    console.error("Erro ao adicionar ao carrinho:", error);
    const { error: showError } = useNotifications();
    showError("Erro", error.message || "Erro ao adicionar produto ao carrinho");
  } finally {
    loading.value = false;
  }
};

const buyNow = async () => {
  await addToCart();
  if (!loading.value) {
    navigateTo("/checkout");
  }
};

const toggleWishlist = () => {
  // TODO: Implementar lista de desejos
  const { success } = useNotifications();
  success("Lista de desejos", "Produto adicionado à lista de desejos");
};

const formatSpecKey = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const getFirstProductImage = (images: string[]) => {
  if (!images || images.length === 0) {
    return "/placeholder-product.jpg";
  }
  return getProductImage(images[0], "medium");
};

// Buscar produto
const fetchProduct = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", route.params.slug)
      .eq("is_active", true)
      .single();

    if (error) throw error;
    if (!data)
      throw createError({
        statusCode: 404,
        statusMessage: "Produto não encontrado",
      });

    product.value = data;


    // Definir imagem selecionada
    if (data.images && data.images.length > 0) {
      selectedImage.value = getProductImage(data.images[0], "large");
    } else {
      selectedImage.value = "/placeholder-product.jpg";
    }

    // Definir primeira cor como selecionada
    if (data.color && data.color.length > 0) {
      selectedColor.value = data.color[0];
    }

    // Buscar produtos relacionados
    await fetchRelatedProducts(data.category_id, data.id);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Produto não encontrado",
    });
  }
};

const fetchRelatedProducts = async (
  categoryId: string,
  currentProductId: string
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, sale_price, avista_price, parcelado_price, images"
      )
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .neq("id", currentProductId)
      .limit(5);

    if (error) {
      console.error("Erro ao buscar produtos relacionados:", error);
      return;
    }

    relatedProducts.value = data || [];
  } catch (error) {
    console.error("Erro ao buscar produtos relacionados:", error);
  }
};

// Lifecycle
await fetchProduct();

// SEO
if (product.value) {
  useSeoMeta({
    title: `${product.value.name} - Atapera`,
    description: product.value.short_description || product.value.description,
    ogTitle: product.value.name,
    ogDescription: product.value.short_description,
    ogImage: selectedImage.value,
    ogType: "product",
  });
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
