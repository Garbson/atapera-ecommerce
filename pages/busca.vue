<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header de Busca -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Resultados da Busca
        </h1>

        <!-- Barra de Busca -->
        <div class="max-w-2xl">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Buscar produtos..."
              class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>

        <!-- Info dos Resultados -->
        <div v-if="currentQuery" class="mt-4 text-gray-600">
          <span v-if="!loading">
            {{ totalProducts }}
            {{
              totalProducts === 1
                ? "resultado encontrado"
                : "resultados encontrados"
            }}
            para "<strong>{{ currentQuery }}</strong
            >"
          </span>
          <span v-else>Buscando...</span>
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
        <h3 class="text-lg font-medium text-red-800 mb-2">Erro na busca</h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="performSearch"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>

      <!-- Resultados -->
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

      <!-- Estado Vazio -->
      <div
        v-else-if="currentQuery"
        class="text-center py-12 bg-white rounded-lg border"
      >
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p class="text-gray-600 mb-4">
          Tente buscar com outros termos ou navegue pelas categorias.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <svg
            class="w-4 h-4 mr-2"
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
          Voltar ao Início
        </NuxtLink>
      </div>

      <!-- Estado Inicial -->
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Digite algo para buscar
        </h3>
        <p class="text-gray-600">
          Encontre produtos de armas, pesca, caça e muito mais.
        </p>
      </div>

      <!-- Paginação -->
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

    <!-- Product View Modal -->
    <ProductViewModal
      :is-open="isProductModalOpen"
      :product="selectedProduct"
      @close="closeProductModal"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// Stores
const productsStore = useProductsStore();
const cartStore = useCartStore();

// Estado reativo da store
const { products, loading, error } = storeToRefs(productsStore);

// Estado local
const searchQuery = ref("");
const currentQuery = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);

// Modal state
const isProductModalOpen = ref(false);
const selectedProduct = ref(null);

// Inicializar busca com query da URL
onMounted(() => {
  const urlQuery = route.query.q as string;
  if (urlQuery) {
    searchQuery.value = urlQuery;
    currentQuery.value = urlQuery;
    performSearch();
  }
});

// Watcher para query na URL
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery && newQuery !== searchQuery.value) {
      searchQuery.value = newQuery as string;
      currentQuery.value = newQuery as string;
      currentPage.value = 1;
      performSearch();
    }
  }
);

// Watcher para paginação
watch(currentPage, () => {
  if (currentQuery.value) {
    performSearch();
  }
});

// Métodos
const performSearch = async () => {
  if (!searchQuery.value.trim()) return;

  currentQuery.value = searchQuery.value;

  // Atualizar URL sem recarregar a página
  if (route.query.q !== searchQuery.value) {
    await router.push({ query: { q: searchQuery.value } });
  }

  try {
    const result = await productsStore.fetchProducts({
      search: searchQuery.value,
      page: currentPage.value,
      limit: 12,
    });

    if (result?.data) {
      totalPages.value = result.data.totalPages || 1;
      totalProducts.value = result.data.total || 0;
    }
  } catch (err) {
    console.error("❌ Erro na busca:", err);
  }
};

const addToCart = async (product: any) => {
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
        category: product.categories?.slug || "produto",
      },
      1
    );

    // TODO: Mostrar notificação de sucesso
  } catch (err) {
    console.error("Erro ao adicionar ao carrinho:", err);
    // TODO: Mostrar notificação de erro
  }
};

const openProductModal = (product: any) => {
  selectedProduct.value = product;
  isProductModalOpen.value = true;
};

const closeProductModal = () => {
  isProductModalOpen.value = false;
  selectedProduct.value = null;
};

// SEO
useSeoMeta({
  title: currentQuery.value
    ? `Busca: ${currentQuery.value} | Atapera`
    : "Buscar Produtos | Atapera",
  description:
    "Encontre os melhores produtos de armas, pesca, caça e aventura na Atapera.",
});
</script>
