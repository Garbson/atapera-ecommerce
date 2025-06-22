<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <Breadcrumbs :items="breadcrumbs" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Todos os Produtos</h1>

      <!-- Filtros e Ordenação -->
      <div class="flex gap-4">
        <select v-model="sortBy" class="border rounded px-3 py-2">
          <option value="created_at">Mais Recentes</option>
          <option value="price_asc">Menor Preço</option>
          <option value="price_desc">Maior Preço</option>
          <option value="name">Nome A-Z</option>
        </select>

        <button @click="toggleFilters" class="bg-gray-200 px-4 py-2 rounded">
          Filtros
        </button>
      </div>
    </div>

    <div class="flex gap-6">
      <!-- Sidebar Filtros -->
      <aside v-if="showFilters" class="w-64 space-y-6">
        <!-- Filtro por Categoria -->
        <div>
          <h3 class="font-semibold mb-3">Categorias</h3>
          <div class="space-y-2">
            <label
              v-for="category in categories"
              :key="category.id"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :value="category.id"
                v-model="filters.categories"
                class="mr-2"
              />
              {{ category.name }}
            </label>
          </div>
        </div>

        <!-- Filtro por Preço -->
        <div>
          <h3 class="font-semibold mb-3">Faixa de Preço</h3>
          <div class="space-y-2">
            <input
              v-model="filters.minPrice"
              type="number"
              placeholder="Preço mínimo"
              class="w-full border rounded px-3 py-2"
            />
            <input
              v-model="filters.maxPrice"
              type="number"
              placeholder="Preço máximo"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- Filtro por Marca -->
        <div>
          <h3 class="font-semibold mb-3">Marcas</h3>
          <div class="space-y-2">
            <label
              v-for="brand in brands"
              :key="brand"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :value="brand"
                v-model="filters.brands"
                class="mr-2"
              />
              {{ brand }}
            </label>
          </div>
        </div>
      </aside>

      <!-- Grid de Produtos -->
      <main class="flex-1">
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ProductCardSkeleton v-for="i in 12" :key="i" />
        </div>

        <div v-else-if="products.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">Nenhum produto encontrado</p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Paginação -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="handlePageChange"
          class="mt-8"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// Estados
const loading = ref(true);
const showFilters = ref(false);
const products = ref([]);
const categories = ref([]);
const brands = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  categories: [],
  brands: [],
  minPrice: null,
  maxPrice: null,
  search: route.query.q || "",
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
]);

// Watchers para atualizar URL
watch(
  [sortBy, filters, currentPage],
  () => {
    updateURL();
  },
  { deep: true }
);

// Métodos
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const updateURL = () => {
  const query = {
    ...route.query,
    page: currentPage.value > 1 ? currentPage.value : undefined,
    sort: sortBy.value !== "created_at" ? sortBy.value : undefined,
    categories:
      filters.categories.length > 0 ? filters.categories.join(",") : undefined,
    brands: filters.brands.length > 0 ? filters.brands.join(",") : undefined,
    min_price: filters.minPrice || undefined,
    max_price: filters.maxPrice || undefined,
  };

  router.push({ query });
};

const fetchProducts = async () => {
  loading.value = true;

  try {
    // Implementar busca de produtos com filtros
    const { data } = await $fetch("/api/products", {
      query: {
        page: currentPage.value,
        sort: sortBy.value,
        categories: filters.categories.join(","),
        brands: filters.brands.join(","),
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
        search: filters.search,
      },
    });

    products.value = data.products;
    totalPages.value = data.totalPages;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchProducts();
});

// SEO
useSeoMeta({
  title: "Produtos - Atapera",
  description: "Confira todos os nossos produtos de armas, pesca e caça",
});
</script>
