<template>
  <div
    v-if="categoryData?.slug && categoryData?.title"
    class="min-h-screen bg-gray-800"
  >
    <!-- Hero Section -->
    <div
      :class="heroClass"
      :style="heroStyle"
      class="relative text-white py-16 bg-cover bg-center bg-no-repeat min-h-[500px]"
    >
      <div
        class="absolute inset-0"
        style="background-color: rgba(0, 0, 0, 0.3)"
      ></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ categoryData?.title || "" }}
          </h1>
          <p class="text-xl mb-6">{{ categoryData?.description || "" }}</p>

          <!-- Warning/Info Box -->
          <div
            v-if="categoryData?.warning"
            :class="warningClass"
            class="p-4 rounded-lg"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  v-if="categoryData?.warningType === 'danger'"
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
                <path
                  v-else
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium"
                >{{ categoryData?.warningTitle || "Atenção" }}:</span
              >
            </div>
            <p class="mt-1">{{ categoryData?.warning }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-white hover:text-gray-100"
              >Início</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-100 font-medium">
            {{ categoryData?.title || "" }}
          </li>
        </ol>
      </nav>


      <!-- Filters and Sorting -->
      <div class="bg-white rounded-xl shadow-lg border-0 mb-6 overflow-hidden">
        <!-- Desktop Filters -->
        <div class="hidden md:block">
          <div class="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">Filtros</h3>
                  <p class="text-sm text-gray-600">Refine sua busca</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                  <span v-if="!loading">{{ totalProducts }} produtos</span>
                  <span v-else>Carregando...</span>
                </div>
                <button
                  v-if="hasActiveFilters"
                  @click="clearAllFilters"
                  class="text-sm text-red-600 hover:text-red-700 bg-white px-4 py-2 rounded-full border border-red-200 hover:border-red-300 transition-all duration-200 font-medium"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              <!-- Dynamic Filters -->
              <div
                v-for="filter in enhancedFilters"
                :key="filter.key"
                class="space-y-2"
              >
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  {{ filter.label }}
                </label>
                <div class="relative">
                  <select
                    :value="filters[filter?.key] || ''"
                    @change="updateFilter(filter?.key, $event.target.value)"
                    class="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="">
                      {{ filter.placeholder || `Todos ${filter.label}` }}
                    </option>
                    <option
                      v-for="option in filter.options || []"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Price Range -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Preço Mínimo
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                  <input
                    v-model="filters.minPrice"
                    type="number"
                    placeholder="0"
                    class="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Preço Máximo
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                  <input
                    v-model="filters.maxPrice"
                    type="number"
                    placeholder="9999"
                    class="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <!-- Sorting -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Ordenar por
                </label>
                <div class="relative">
                  <select
                    v-model="sortBy"
                    class="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="created_at">Mais Recentes</option>
                    <option value="name">Nome A-Z</option>
                    <option value="price_asc">Menor Preço</option>
                    <option value="price_desc">Maior Preço</option>
                    <option value="popularity">Mais Populares</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Filter Button -->
        <div class="md:hidden p-4">
          <button
            @click="showMobileFilters = true"
            class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Filtros
            <span v-if="hasActiveFilters" class="ml-2 bg-white text-red-600 text-xs px-2 py-1 rounded-full font-bold">
              {{ Object.values(filters).filter(v => v !== '' && v !== null).length }}
            </span>
          </button>
          
          <div class="mt-3 flex items-center justify-between">
            <div class="text-sm text-gray-600">
              <span v-if="!loading">{{ totalProducts }} produtos encontrados</span>
              <span v-else>Carregando...</span>
            </div>
            <select
              v-model="sortBy"
              class="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="created_at">Mais Recentes</option>
              <option value="name">Nome A-Z</option>
              <option value="price_asc">Menor Preço</option>
              <option value="price_desc">Maior Preço</option>
              <option value="popularity">Mais Populares</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <svg
          class="mx-auto h-12 w-12 text-red-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 class="text-lg font-medium text-red-800 mb-2">
          Erro ao carregar produtos
        </h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchProducts"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>

      <!-- Products Grid -->
      <div
        v-else-if="products.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @quick-view="openProductModal"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-white rounded-lg border">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6v2"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p class="text-gray-600">
          Tente ajustar os filtros ou remover alguns critérios de busca.
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center gap-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm border border-gray-300 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>

          <span class="px-4 py-2 text-sm text-gray-100">
            Página {{ currentPage }} de {{ totalPages }}
          </span>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm border bg-gray-100 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Próximo
          </button>
        </nav>
      </div>
    </div>
  </div>

  <!-- Loading Fallback -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Carregando categoria...</p>
    </div>
  </div>

  <!-- Mobile Filters Dialog -->
  <div
    v-if="showMobileFilters"
    class="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black bg-opacity-50"
    @click.self="showMobileFilters = false"
  >
    <div class="w-full max-w-lg bg-white rounded-t-2xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800">Filtros</h3>
            <p class="text-sm text-gray-600">{{ totalProducts }} produtos</p>
          </div>
        </div>
        <button
          @click="showMobileFilters = false"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Filters Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
        <div class="space-y-6">
          <!-- Dynamic Filters -->
          <div
            v-for="filter in categoryData?.filters || []"
            :key="filter.key"
            class="space-y-2"
          >
            <label class="block text-sm font-semibold text-gray-700">
              {{ filter.label }}
            </label>
            <div class="relative">
              <select
                :value="filters[filter?.key] || ''"
                @change="updateFilter(filter?.key, $event.target.value)"
                class="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              >
                <option value="">
                  {{ filter.placeholder || `Todos ${filter.label}` }}
                </option>
                <option
                  v-for="option in filter.options || []"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Price Range -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Preço Mínimo
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                <input
                  v-model="filters.minPrice"
                  type="number"
                  placeholder="0"
                  class="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Preço Máximo
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                <input
                  v-model="filters.maxPrice"
                  type="number"
                  placeholder="9999"
                  class="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex gap-3">
          <button
            v-if="hasActiveFilters"
            @click="clearAllFilters"
            class="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Limpar Filtros
          </button>
          <button
            @click="showMobileFilters = false"
            class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Product View Modal -->
  <ProductViewModal
    :is-open="isProductModalOpen"
    :product="selectedProduct"
    @close="closeProductModal"
    @add-to-cart="addToCart"
  />
</template>

<script setup>
const props = defineProps({
  categoryData: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  quickCategories: {
    type: Array,
    default: () => [],
  },
});

// Stores - com verificação de disponibilidade
const productsStore = useProductsStore();
const cartStore = useCartStore();
const categoriesStore = useCategoriesStore();

// Route
const route = useRoute();

// Verificar se as stores estão disponíveis
if (!productsStore) {
  console.error("ProductsStore não disponível");
}
if (!cartStore) {
  console.error("CartStore não disponível");
}
if (!categoriesStore) {
  console.error("CategoriesStore não disponível");
}

// Estado reativo da store - com proteção
const { products, loading, error } = productsStore
  ? storeToRefs(productsStore)
  : {
      products: ref([]),
      loading: ref(false),
      error: ref(null),
    };

const { categories } = categoriesStore
  ? storeToRefs(categoriesStore)
  : {
      categories: ref([]),
    };

// Estado local
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);
const sortBy = ref("created_at");
const showMobileFilters = ref(false);

// Filtros dinâmicos
const dynamicBrands = ref([]);
const dynamicCalibers = ref([]);

// Modal state
const isProductModalOpen = ref(false);
const selectedProduct = ref(null);

// Filtros baseados na configuração da categoria
const filters = reactive({
  minPrice: null,
  maxPrice: null,
  subcategory: "",
  // Adicionar filtros dinâmicos de forma segura
  ...(props.categoryData?.filters?.reduce((acc, filter) => {
    if (filter?.key) {
      acc[filter.key] = "";
    }
    return acc;
  }, {}) || {}),
});

// Computed
const heroClass = computed(() => {
  // Se há uma imagem de background, não aplicar gradient
  if (props.categoryData?.backgroundImage) {
    return "";
  }

  // Fallback para cores se não houver imagem
  if (!props.categoryData?.color) {
    return "bg-gradient-to-r from-gray-900 to-gray-700";
  }

  const colorMap = {
    green: "bg-gradient-to-r from-green-900 to-green-700",
    red: "bg-gradient-to-r from-red-900 to-red-700",
    blue: "bg-gradient-to-r from-blue-900 to-blue-700",
    orange: "bg-gradient-to-r from-orange-900 to-orange-700",
    gray: "bg-gradient-to-r from-gray-900 to-gray-700",
    purple: "bg-gradient-to-r from-purple-900 to-purple-700",
  };
  return (
    colorMap[props.categoryData.color] ||
    "bg-gradient-to-r from-gray-900 to-gray-700"
  );
});

const heroStyle = computed(() => {
  if (props.categoryData?.backgroundImage) {
    return {
      backgroundImage: `url('${props.categoryData.backgroundImage}')`,
    };
  }
  return {};
});

const warningClass = computed(() => {
  if (props.categoryData?.warningType === "danger") {
    return "bg-yellow-100 text-yellow-800";
  }
  return "bg-green-100 text-green-800";
});

const hasActiveFilters = computed(() => {
  return Object.values(filters).some((value) => value !== "" && value !== null);
});

// Computed para filtros mesclados (estáticos + dinâmicos)
const enhancedFilters = computed(() => {
  if (!props.categoryData?.filters) return [];
  
  // Categorias que suportam filtros dinâmicos
  const categoriesWithDynamicFilters = ['armas-fogo', 'armas-pressao', 'airsoft', 'pesca', 'caca', 'vestuario', 'motores'];
  const hasDynamicFilters = categoriesWithDynamicFilters.includes(props.categoryData.slug);
  
  return props.categoryData.filters.map(filter => {
    // Aplicar marcas dinâmicas para todas as categorias suportadas
    if (filter.key === 'brand' && hasDynamicFilters) {
      return {
        ...filter,
        options: dynamicBrands.value.map(brand => ({
          value: brand.value,
          label: `${brand.label} (${brand.count})`
        }))
      };
    }
    
    // Aplicar calibres dinâmicos apenas para categorias com calibre
    const categoriesWithCaliber = ['armas-fogo', 'armas-pressao'];
    if (filter.key === 'caliber' && categoriesWithCaliber.includes(props.categoryData.slug)) {
      return {
        ...filter,
        options: dynamicCalibers.value.map(caliber => ({
          value: caliber.value,
          label: `${caliber.label} (${caliber.count})`
        }))
      };
    }
    
    // Retornar filtro original para outros casos
    return filter;
  });
});

// Methods
const updateFilter = (key, value) => {
  if (key && key in filters) {
    filters[key] = value;
    currentPage.value = 1;
  }
};

const clearAllFilters = () => {
  Object.keys(filters).forEach((key) => {
    filters[key] = ["minPrice", "maxPrice"].includes(key) ? null : "";
  });
  currentPage.value = 1;
};

// Buscar filtros dinâmicos
const fetchDynamicFilters = async () => {
  if (!productsStore) {
    return;
  }

  try {
    // Mapa de UUIDs das categorias
    const categoryUUIDs = {
      'armas-fogo': '3eebaee1-c85d-4b67-9af1-5619764b7307',
      'armas-pressao': 'd3f1376d-92ea-4a9b-a367-80456b9f0063',
      'airsoft': 'b8ce0b20-63ad-44a2-b0a0-f383d5f8ec32',
      'pesca': '3b6c5fb9-e0f3-474b-8cc2-e36dd327d2aa',
      'caca': 'e3afc893-b4c0-43a6-9900-c1208b1372ed',
      'vestuario': '2a6c0a33-0025-4cce-a306-db578a19a4f2',
      'motores': 'd64fe34d-3996-40c7-adf6-e530f259f4ee'
    };
    
    const categoryUUID = categoryUUIDs[props.categoryData?.slug];
    
    if (!categoryUUID) {
      return;
    }
    
    // Buscar marcas únicas para a categoria
    const brands = await productsStore.getUniqueBrands(categoryUUID);
    dynamicBrands.value = brands;

    // Buscar calibres únicos apenas para categorias que usam calibre
    const categoriesWithCaliber = ['armas-fogo', 'armas-pressao'];
    if (categoriesWithCaliber.includes(props.categoryData?.slug)) {
      const calibers = await productsStore.getUniqueCalibers(categoryUUID);
      dynamicCalibers.value = calibers;
    }

  } catch (error) {
    console.error('Erro ao buscar filtros dinâmicos:', error);
  }
};


const fetchProducts = async () => {
  if (!productsStore || !categoriesStore) {
    console.error("Stores não disponíveis para fetchProducts");
    return;
  }

  productsStore.clearProductsCache();

  // Lógica especial para categorias como "ofertas"
  const filterParams = {
    ...filters,
    page: currentPage.value,
    limit: 12,
    // ✅ TIMESTAMP ÚNICO PARA FORÇAR NOVA REQUISIÇÃO
    _timestamp: Date.now(),
  };

  // Verificar se é uma categoria especial (como ofertas)
  if (props.categoryData?.slug === 'ofertas') {
    // Para ofertas, buscar produtos em promoção (com sale_price)
    filterParams.has_sale = true; // Novo filtro para produtos com desconto

    
    // Se um filtro de categoria específica foi selecionado na página de ofertas
    if (filters.category && filters.category !== '') {
      // Buscar o ID da categoria pelo slug do filtro
      await categoriesStore.fetchCategories();
      const targetCategory = categoriesStore.getCategoryBySlug(filters.category);
      if (targetCategory?.id) {
        filterParams.category = targetCategory.id;
      }
    }
  } else {
    // Para categorias normais, buscar category_id pelo slug
    let categoryId = null;
    if (props.categoryData?.slug) {
      const category = categoriesStore.getCategoryBySlug(props.categoryData.slug);
      categoryId = category?.id;

      // Se não encontrou a categoria no cache, tentar buscar
      if (!categoryId) {
        await categoriesStore.fetchCategories();
        const categoryAfterFetch = categoriesStore.getCategoryBySlug(
          props.categoryData.slug
        );
        categoryId = categoryAfterFetch?.id;
      }
    }
    
    filterParams.category = categoryId;
  }

  // Adicionar ordenação
  if (sortBy.value === "price_asc") {
    filterParams.sort = "price";
    filterParams.order = "asc";
  } else if (sortBy.value === "price_desc") {
    filterParams.sort = "price";
    filterParams.order = "desc";
  } else if (sortBy.value === "name") {
    filterParams.sort = "name";
    filterParams.order = "asc";
  } else {
    filterParams.sort = "created_at";
    filterParams.order = "desc";
  }



  try {
    const result = await productsStore.fetchProducts(filterParams);
    if (result?.data) {
      totalPages.value = result.data.totalPages || 1;
      totalProducts.value = result.data.total || 0;
    }
  } catch (err) {
    console.error("❌ Erro ao buscar produtos:", err);
    error.value = "Erro ao carregar produtos";
  }
};

const addToCart = async (product) => {
  if (!cartStore) {
    console.error("CartStore não disponível para addToCart");
    return;
  }

  try {
    const { getProductImage } = useCloudinary();

    await cartStore.addItem(
      {
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        image: product.images?.[0]
          ? getProductImage(product.images[0], "small")
          : "/placeholder-product.jpg",
        maxStock: product.stock,
        product_id: product.id,
        slug: product.slug,
        sale_price: product.sale_price,
        category: props.categoryData?.slug || product.categories?.slug || "produto",
        products: {
          categories: {
            slug: props.categoryData?.slug || product.categories?.slug
          },
          requires_license: product.requires_license
        }
      },
      1
    );
  } catch (err) {
    console.error("Erro ao adicionar ao carrinho:", err);
  }
};

const openProductModal = (product) => {
  selectedProduct.value = product;
  isProductModalOpen.value = true;
};

const closeProductModal = () => {
  isProductModalOpen.value = false;
  selectedProduct.value = null;
};

// Função debounced para filtros de preço
const debouncedFetchProducts = (() => {
  let timeoutId = null;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (
        productsStore &&
        categoriesStore &&
        props.categoryData?.slug &&
        props.categoryData?.title
      ) {
        fetchProducts();
      }
    }, 500);
  };
})();

// Watchers
watch(
  [sortBy, currentPage],
  () => {
    if (
      productsStore &&
      categoriesStore &&
      props.categoryData?.slug &&
      props.categoryData?.title
    ) {
      fetchProducts();
    }
  }
);

// Watcher separado para filtros com debounce nos preços
watch(
  () => filters,
  (newFilters, oldFilters) => {
    // Se mudou apenas preço, usar debounce
    const priceChanged = newFilters.minPrice !== oldFilters?.minPrice || 
                        newFilters.maxPrice !== oldFilters?.maxPrice;
    
    if (priceChanged && Object.keys(newFilters).filter(key => 
      key !== 'minPrice' && key !== 'maxPrice' && 
      newFilters[key] !== oldFilters?.[key]
    ).length === 0) {
      // Apenas preço mudou, usar debounce
      debouncedFetchProducts();
    } else {
      // Outros filtros mudaram, buscar imediatamente
      if (
        productsStore &&
        categoriesStore &&
        props.categoryData?.slug &&
        props.categoryData?.title
      ) {
        currentPage.value = 1;
        fetchProducts();
      }
    }
  },
  { deep: true }
);

// Watcher para mudanças de rota
watch(
  () => route.path,
  async () => {

    // Extrair slug da rota diretamente
    const routeSlug = route.params.slug || route.path.split("/").pop();

    if (!productsStore || !categoriesStore || !routeSlug) {
      console.error("❌ Dados insuficientes para fetch");
      return;
    }

    productsStore.clearProductsCache();
    await categoriesStore.fetchCategories();

    // Buscar categoria pelo slug da rota
    const category = categoriesStore.getCategoryBySlug(routeSlug);

    if (category) {
      currentPage.value = 1;
      await fetchProducts();
    }
  }
);

// Lifecycle
onMounted(async () => {
  if (
    productsStore &&
    categoriesStore &&
    props.categoryData?.slug &&
    props.categoryData?.title
  ) {
    // ✅ LIMPAR CACHE AO MONTAR COMPONENTE
    productsStore.clearProductsCache();

    // Garantir que as categorias estejam carregadas primeiro
    if (categories.value.length === 0) {
      await categoriesStore.fetchCategories();
    }

    // Buscar filtros dinâmicos
    await fetchDynamicFilters();

    // Reset página e força busca de produtos
    currentPage.value = 1;
    await fetchProducts();
  }
});

// SEO
useSeoMeta({
  title: `${props.categoryData?.title || "Categoria"} | Atapera`,
  description: props.categoryData?.description || "",
});
</script>
