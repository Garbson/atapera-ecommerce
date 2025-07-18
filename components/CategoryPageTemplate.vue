<template>
  <div v-if="categoryData?.slug && categoryData?.title" class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div :class="heroClass" class="text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ categoryData?.title || '' }}</h1>
          <p class="text-xl mb-6">{{ categoryData?.description || '' }}</p>
          
          <!-- Warning/Info Box -->
          <div v-if="categoryData?.warning" :class="warningClass" class="p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="categoryData?.warningType === 'danger'" 
                      fill-rule="evenodd" 
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                      clip-rule="evenodd" />
                <path v-else 
                      fill-rule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                      clip-rule="evenodd" />
              </svg>
              <span class="font-medium">{{ categoryData?.warningTitle || 'Atenção' }}:</span>
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
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Início</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">{{ categoryData?.title || '' }}</li>
        </ol>
      </nav>

      <!-- Quick Categories -->
      <div v-if="quickCategories?.length" class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Categorias</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="category in quickCategories"
            :key="category.id"
            @click="updateFilter('subcategory', category.value)"
            :class="[
              'p-4 rounded-lg border text-center hover:border-blue-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300',
            ]"
          >
            <div class="text-2xl mb-2">{{ category.icon }}</div>
            <div class="text-sm font-medium">{{ category.name }}</div>
          </button>
        </div>
      </div>

      <!-- Filters and Sorting -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Filtros</h3>
          <div class="flex gap-2">
            <button 
              @click="forceRefresh"
              class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              🔄 Recarregar
            </button>
            <button 
              v-if="hasActiveFilters" 
              @click="clearAllFilters"
              class="text-sm text-gray-600 hover:text-gray-800">
              Limpar Filtros
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <!-- Dynamic Filters -->
          <div v-for="filter in (categoryData?.filters || [])" :key="filter.key" class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">{{ filter.label }}</label>
            <select
              :value="filters[filter?.key] || ''"
              @change="updateFilter(filter?.key, $event.target.value)"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{{ filter.placeholder || `Todos ${filter.label}` }}</option>
              <option v-for="option in (filter.options || [])" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Price Range -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Preço Mínimo</label>
            <input
              v-model="filters.minPrice"
              type="number"
              placeholder="R$ 0"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Preço Máximo</label>
            <input
              v-model="filters.maxPrice"
              type="number"
              placeholder="R$ 9999"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Sorting -->
        <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-600">
            <div v-if="!loading">{{ totalProducts }} produtos encontrados</div>
            <div v-else>Carregando...</div>
            <div class="text-xs text-blue-600 mt-1">
              Debug: {{ products.length }} em cache | Categoria: {{ categoryData?.slug }}
            </div>
          </div>
          
          <select
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_at">Mais Recentes</option>
            <option value="name">Nome A-Z</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
            <option value="popularity">Mais Populares</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-medium text-red-800 mb-2">Erro ao carregar produtos</h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="fetchProducts" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Tentar Novamente
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @add-to-wishlist="addToWishlist"
          @quick-view="openProductModal"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-white rounded-lg border">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6v2" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
        <p class="text-gray-600">Tente ajustar os filtros ou remover alguns critérios de busca.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav class="flex items-center gap-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>
          
          <span class="px-4 py-2 text-sm text-gray-600">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Carregando categoria...</p>
    </div>
  </div>

  <!-- Product View Modal -->
  <ProductViewModal
    :is-open="isProductModalOpen"
    :product="selectedProduct"
    @close="closeProductModal"
    @add-to-cart="addToCart"
    @add-to-wishlist="addToWishlist"
  />
</template>

<script setup>
const props = defineProps({
  categoryData: {
    type: Object,
    required: false,
    default: () => ({})
  },
  quickCategories: {
    type: Array,
    default: () => []
  }
});

// Stores - com verificação de disponibilidade
const productsStore = useProductsStore();
const cartStore = useCartStore();
const categoriesStore = useCategoriesStore();

// Route
const route = useRoute();

// Verificar se as stores estão disponíveis
if (!productsStore) {
  console.error('ProductsStore não disponível');
}
if (!cartStore) {
  console.error('CartStore não disponível');
}
if (!categoriesStore) {
  console.error('CategoriesStore não disponível');
}

// Estado reativo da store - com proteção
const { products, loading, error } = productsStore ? storeToRefs(productsStore) : {
  products: ref([]),
  loading: ref(false),
  error: ref(null)
};

const { categories } = categoriesStore ? storeToRefs(categoriesStore) : {
  categories: ref([])
};

// Estado local
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);
const sortBy = ref('created_at');

// Modal state
const isProductModalOpen = ref(false);
const selectedProduct = ref(null);

// Filtros baseados na configuração da categoria
const filters = reactive({
  minPrice: null,
  maxPrice: null,
  subcategory: '',
  // Adicionar filtros dinâmicos de forma segura
  ...(props.categoryData?.filters?.reduce((acc, filter) => {
    if (filter?.key) {
      acc[filter.key] = '';
    }
    return acc;
  }, {}) || {})
});

// Computed
const heroClass = computed(() => {
  if (!props.categoryData?.color) {
    return 'bg-gradient-to-r from-gray-900 to-gray-700';
  }
  
  const colorMap = {
    green: 'bg-gradient-to-r from-green-900 to-green-700',
    red: 'bg-gradient-to-r from-red-900 to-red-700',
    blue: 'bg-gradient-to-r from-blue-900 to-blue-700',
    orange: 'bg-gradient-to-r from-orange-900 to-orange-700',
    gray: 'bg-gradient-to-r from-gray-900 to-gray-700',
    purple: 'bg-gradient-to-r from-purple-900 to-purple-700'
  };
  return colorMap[props.categoryData.color] || 'bg-gradient-to-r from-gray-900 to-gray-700';
});

const warningClass = computed(() => {
  if (props.categoryData?.warningType === 'danger') {
    return 'bg-yellow-100 text-yellow-800';
  }
  return 'bg-green-100 text-green-800';
});

const hasActiveFilters = computed(() => {
  return Object.values(filters).some(value => value !== '' && value !== null);
});

// Methods
const updateFilter = (key, value) => {
  if (key && key in filters) {
    filters[key] = value;
    currentPage.value = 1;
  }
};

const clearAllFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key] = ['minPrice', 'maxPrice'].includes(key) ? null : '';
  });
  currentPage.value = 1;
};

// Força reload dos produtos (útil para debug)
const forceRefresh = async () => {
  console.log('🔄 Forçando refresh dos produtos...');
  currentPage.value = 1;
  await fetchProducts();
};

const fetchProducts = async () => {
  console.log('🔄 Iniciando fetchProducts:', {
    hasProductsStore: !!productsStore,
    hasCategoriesStore: !!categoriesStore,
    categorySlug: props.categoryData?.slug,
    categoryTitle: props.categoryData?.title
  });

  if (!productsStore || !categoriesStore) {
    console.error('Stores não disponíveis para fetchProducts');
    return;
  }

  // Buscar category_id pelo slug
  let categoryId = null;
  if (props.categoryData?.slug) {
    console.log('🔍 Buscando categoria por slug:', props.categoryData.slug);
    
    const category = categoriesStore.getCategoryBySlug(props.categoryData.slug);
    categoryId = category?.id;
    
    console.log('📋 Categoria encontrada no cache:', { category, categoryId });
    
    // Se não encontrou a categoria no cache, tentar buscar
    if (!categoryId) {
      console.log('⚠️ Categoria não encontrada no cache, buscando no servidor...');
      await categoriesStore.fetchCategories();
      const categoryAfterFetch = categoriesStore.getCategoryBySlug(props.categoryData.slug);
      categoryId = categoryAfterFetch?.id;
      console.log('📋 Categoria após fetch:', { categoryAfterFetch, categoryId });
    }
  }

  const filterParams = {
    ...filters,
    category: categoryId, // Usar category_id em vez de slug
    page: currentPage.value,
    limit: 12
  };

  // Adicionar ordenação
  if (sortBy.value === 'price_asc') {
    filterParams.sort = 'price';
    filterParams.order = 'asc';
  } else if (sortBy.value === 'price_desc') {
    filterParams.sort = 'price';
    filterParams.order = 'desc';
  } else if (sortBy.value === 'name') {
    filterParams.sort = 'name';
    filterParams.order = 'asc';
  } else {
    filterParams.sort = 'created_at';
    filterParams.order = 'desc';
  }

  console.log('📤 Enviando filtros para API:', filterParams);

  try {
    const result = await productsStore.fetchProducts(filterParams);
    
    console.log('📥 Resposta da API:', {
      result,
      productsCount: result?.data?.data?.length || 0,
      totalProducts: result?.data?.total || 0
    });
    
    if (result?.data) {
      totalPages.value = result.data.totalPages || 1;
      totalProducts.value = result.data.total || 0;
    }

    // Log dos produtos encontrados
    if (products.value?.length > 0) {
      console.log('✅ Produtos carregados:', products.value.map(p => ({
        name: p.name,
        hasImages: p.images?.length > 0,
        images: p.images
      })));
    } else {
      console.log('⚠️ Nenhum produto encontrado');
    }
  } catch (err) {
    console.error('❌ Erro ao buscar produtos:', err);
    error.value = 'Erro ao carregar produtos';
  }
};

const addToCart = async (product) => {
  if (!cartStore) {
    console.error('CartStore não disponível para addToCart');
    return;
  }
  
  try {
    await cartStore.addToCart(product.id, 1);
  } catch (err) {
    console.error('Erro ao adicionar ao carrinho:', err);
  }
};

const addToWishlist = (product) => {
  // TODO: Implementar wishlist
  console.log('Adicionar à lista de desejos:', product);
};

const openProductModal = (product) => {
  selectedProduct.value = product;
  isProductModalOpen.value = true;
};

const closeProductModal = () => {
  isProductModalOpen.value = false;
  selectedProduct.value = null;
};

// Watchers
watch([sortBy, filters, currentPage], () => {
  if (productsStore && categoriesStore && props.categoryData?.slug && props.categoryData?.title) {
    fetchProducts();
  }
}, { deep: true });

// Watcher para quando categoryData mudar
watch(() => props.categoryData, (newCategoryData, oldCategoryData) => {
  console.log('📂 CategoryData mudou:', {
    old: oldCategoryData?.slug,
    new: newCategoryData?.slug,
    hasStores: !!(productsStore && categoriesStore)
  });
  
  if (newCategoryData?.slug && newCategoryData?.title && productsStore && categoriesStore) {
    // Reset página para 1 quando mudar categoria
    currentPage.value = 1;
    fetchProducts();
  }
}, { immediate: true, deep: true });

// Watcher para route changes (importante para navegação entre categorias)
watch(() => route.path, (newPath, oldPath) => {
  console.log('🛣️ Rota mudou:', { old: oldPath, new: newPath });
  
  if (newPath !== oldPath && newPath.includes('/categoria/') && props.categoryData?.slug) {
    currentPage.value = 1;
    fetchProducts();
  }
});

// Lifecycle
onMounted(async () => {
  console.log('🎬 CategoryPageTemplate montado:', {
    categorySlug: props.categoryData?.slug,
    categoryTitle: props.categoryData?.title,
    hasStores: !!(productsStore && categoriesStore)
  });

  if (productsStore && categoriesStore && props.categoryData?.slug && props.categoryData?.title) {
    // Garantir que as categorias estejam carregadas primeiro
    if (categories.value.length === 0) {
      console.log('📚 Carregando categorias...');
      await categoriesStore.fetchCategories();
    }
    
    // Reset página e força busca de produtos
    currentPage.value = 1;
    await fetchProducts();
  }
});

// SEO
useSeoMeta({
  title: `${props.categoryData?.title || 'Categoria'} | Atapera`,
  description: props.categoryData?.description || ''
});
</script>