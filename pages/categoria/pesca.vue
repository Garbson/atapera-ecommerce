<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Equipamentos de Pesca
          </h1>
          <p class="text-xl mb-6">
            Tudo para a sua pescaria! Varas, molinetes, iscas, anzóis e
            acessórios das melhores marcas para pesca esportiva e profissional.
          </p>
          <div class="flex gap-4 text-sm">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Equipamentos Profissionais</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Marcas Reconhecidas</span>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <li class="text-gray-900 font-medium">Pesca</li>
        </ol>
      </nav>

      <!-- Categorias Rápidas -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Categorias</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="category in quickCategories"
            :key="category.id"
            @click="filters.subcategory = category.value"
            :class="[
              'p-4 rounded-lg border text-center hover:border-blue-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200',
            ]"
          >
            <div class="text-2xl mb-2">{{ category.icon }}</div>
            <div class="text-sm font-medium">{{ category.name }}</div>
          </button>
        </div>
      </div>

      <!-- Filtros e Ordenação -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <!-- Filtro por Tipo -->
            <select
              v-model="filters.subcategory"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Tipos</option>
              <option value="varas">Varas de Pesca</option>
              <option value="molinetes">Molinetes e Carretilhas</option>
              <option value="iscas">Iscas e Anzóis</option>
              <option value="linhas">Linhas e Leaders</option>
              <option value="acessorios">Acessórios</option>
              <option value="caixas">Caixas e Estojo</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Shimano">Shimano</option>
              <option value="Daiwa">Daiwa</option>
              <option value="Abu Garcia">Abu Garcia</option>
              <option value="Maruri">Maruri</option>
              <option value="Albatroz">Albatroz</option>
              <option value="Decoy">Decoy</option>
            </select>

            <!-- Filtro por Modalidade -->
            <select
              v-model="filters.modality"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Modalidades</option>
              <option value="agua-doce">Água Doce</option>
              <option value="agua-salgada">Água Salgada</option>
              <option value="fly-fishing">Fly Fishing</option>
              <option value="surf-casting">Surf Casting</option>
              <option value="trolling">Trolling</option>
            </select>

            <!-- Filtro por Preço -->
            <div class="flex gap-2 items-center">
              <input
                v-model="filters.minPrice"
                type="number"
                placeholder="Preço min"
                class="w-24 border border-gray-300 rounded-lg px-3 py-2"
              />
              <span class="text-gray-400">até</span>
              <input
                v-model="filters.maxPrice"
                type="number"
                placeholder="Preço max"
                class="w-24 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <!-- Ordenação -->
          <select
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="created_at">Mais Recentes</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
            <option value="name">Nome A-Z</option>
            <option value="popular">Mais Populares</option>
          </select>
        </div>

        <!-- Botão Limpar Filtros -->
        <div class="mt-4 pt-4 border-t border-gray-200" v-if="hasActiveFilters">
          <button
            @click="clearFilters"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Limpar todos os filtros
          </button>
        </div>
      </div>

      <!-- Contador de Resultados -->
      <div class="mb-4">
        <p class="text-gray-600">
          {{ totalProducts }}
          {{
            totalProducts === 1 ? "produto encontrado" : "produtos encontrados"
          }}
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="i in 12"
          :key="i"
          class="bg-white rounded-lg shadow-sm border animate-pulse"
        >
          <div class="aspect-square bg-gray-200 rounded-t-lg"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Grid de Produtos -->
      <div
        v-else-if="products.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>

      <!-- Estado Vazio -->
      <div v-else class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg
            class="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p class="text-gray-600 mb-6">
          Tente ajustar os filtros ou fazer uma nova busca.
        </p>
        <button
          @click="clearFilters"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Limpar Filtros
        </button>
      </div>

      <!-- Paginação -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <nav class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Seção Informativa -->
    <div class="bg-white border-t">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Qualidade Garantida</h3>
            <p class="text-gray-600">
              Equipamentos testados e aprovados por pescadores experientes.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
                <path
                  d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Entrega Rápida</h3>
            <p class="text-gray-600">
              Receba seus equipamentos rapidamente e com segurança.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Suporte Técnico</h3>
            <p class="text-gray-600">
              Dicas e orientações de especialistas em pesca esportiva.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// Estados
const loading = ref(true);
const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);

// Categorias rápidas
const quickCategories = [
  { id: 1, name: "Varas", icon: "🎣", value: "varas" },
  { id: 2, name: "Molinetes", icon: "⚙️", value: "molinetes" },
  { id: 3, name: "Iscas", icon: "🪝", value: "iscas" },
  { id: 4, name: "Linhas", icon: "🧵", value: "linhas" },
  { id: 5, name: "Acessórios", icon: "🔧", value: "acessorios" },
  { id: 6, name: "Caixas", icon: "📦", value: "caixas" },
];

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  brand: "",
  modality: "",
  minPrice: null,
  maxPrice: null,
});

// Computed
const hasActiveFilters = computed(() => {
  return Object.values(filters).some((value) => value !== "" && value !== null);
});

// Métodos
const clearFilters = () => {
  Object.keys(filters).forEach((key) => {
    filters[key] = ["minPrice", "maxPrice"].includes(key) ? null : "";
  });
  currentPage.value = 1;
};

const addToCart = (product) => {
  // Implementar adição ao carrinho
  console.log("Adicionar ao carrinho:", product);
};

const fetchProducts = async () => {
  loading.value = true;

  try {
    const { data } = await $fetch("/api/products", {
      query: {
        category: "pesca",
        page: currentPage.value,
        sort: sortBy.value,
        subcategory: filters.subcategory,
        brand: filters.brand,
        modality: filters.modality,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
      },
    });

    products.value = data.products || [];
    totalPages.value = data.totalPages || 1;
    totalProducts.value = data.total || 0;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  } finally {
    loading.value = false;
  }
};

// Watchers
watch([sortBy, filters, currentPage], fetchProducts, { deep: true });

// Lifecycle
onMounted(() => {
  fetchProducts();
});

// SEO
useSeoMeta({
  title: "Equipamentos de Pesca - Varas, Molinetes e Acessórios | Atapera",
  description:
    "Equipamentos completos para pesca esportiva. Varas, molinetes, iscas, anzóis e acessórios das melhores marcas para água doce e salgada.",
});
</script>
