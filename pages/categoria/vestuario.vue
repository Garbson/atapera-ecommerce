<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div
      class="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Vestuário Tático e Outdoor
          </h1>
          <p class="text-xl mb-6">
            Roupas e acessórios para atividades outdoor, tático e esportivo.
            Camisetas, bonés, patches e equipamentos para aventureiros.
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
              <span>Materiais Resistentes</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Conforto e Funcionalidade</span>
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
          <li class="text-gray-900 font-medium">Vestuário</li>
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
              'p-4 rounded-lg border text-center hover:border-purple-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-purple-500 bg-purple-50'
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
              <option value="camisetas">Camisetas</option>
              <option value="polos">Camisas Polo</option>
              <option value="jaquetas">Jaquetas</option>
              <option value="calcas">Calças</option>
              <option value="bermudas">Bermudas</option>
              <option value="bones">Bonés</option>
              <option value="patches">Patches</option>
              <option value="cintos">Cintos</option>
              <option value="meias">Meias</option>
              <option value="luvas">Luvas</option>
            </select>

            <!-- Filtro por Tamanho -->
            <select
              v-model="filters.size"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Tamanhos</option>
              <option value="PP">PP</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
              <option value="XGG">XGG</option>
              <option value="UNICO">Único</option>
            </select>

            <!-- Filtro por Cor -->
            <select
              v-model="filters.color"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Cores</option>
              <option value="preto">Preto</option>
              <option value="verde">Verde</option>
              <option value="marrom">Marrom</option>
              <option value="caqui">Caqui</option>
              <option value="cinza">Cinza</option>
              <option value="azul">Azul</option>
              <option value="camuflado">Camuflado</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Invictus">Invictus</option>
              <option value="Atapera">Atapera</option>
              <option value="Dacs">Dacs</option>
              <option value="Bélica">Bélica</option>
              <option value="5.11">5.11</option>
              <option value="Condor">Condor</option>
            </select>

            <!-- Filtro por Material -->
            <select
              v-model="filters.material"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Materiais</option>
              <option value="algodao">Algodão</option>
              <option value="poliester">Poliéster</option>
              <option value="tactel">Tactel</option>
              <option value="dryfit">Dry Fit</option>
              <option value="ripstop">Ripstop</option>
              <option value="couro">Couro</option>
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
            class="text-purple-600 hover:text-purple-700 text-sm font-medium"
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
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group"
        >
          <!-- Imagem do Produto -->
          <div
            class="relative aspect-square overflow-hidden bg-gray-50 rounded-t-lg"
          >
            <NuxtLink :to="`/produtos/${product.slug}`">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </NuxtLink>

            <!-- Badges -->
            <div class="absolute top-2 left-2 flex flex-col gap-1">
              <span
                v-if="product.is_new"
                class="bg-green-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Novo
              </span>
              <span
                v-if="product.on_sale"
                class="bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Oferta
              </span>
              <span
                v-if="product.limited_edition"
                class="bg-purple-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Edição Limitada
              </span>
            </div>

            <!-- Cores Disponíveis -->
            <div
              v-if="product.colors && product.colors.length > 1"
              class="absolute bottom-2 left-2"
            >
              <div class="flex gap-1">
                <div
                  v-for="color in product.colors.slice(0, 3)"
                  :key="color"
                  :class="getColorClass(color)"
                  class="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                ></div>
                <span
                  v-if="product.colors.length > 3"
                  class="text-xs text-white bg-black bg-opacity-50 px-1 rounded"
                >
                  +{{ product.colors.length - 3 }}
                </span>
              </div>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ product.category_name || "Vestuário" }}
              </span>
              <span class="text-xs text-gray-500">
                {{ product.brand }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <!-- Tamanhos Disponíveis -->
            <div v-if="product.sizes" class="text-xs text-gray-600 mb-3">
              <span>Tamanhos: {{ product.sizes.join(", ") }}</span>
            </div>

            <div class="mb-3">
              <div v-if="product.sale_price" class="flex items-center gap-2">
                <span class="text-lg font-bold text-purple-600">
                  {{ formatPrice(product.sale_price) }}
                </span>
                <span class="text-sm text-gray-500 line-through">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
              <div v-else>
                <span class="text-lg font-bold text-gray-900">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
            </div>

            <!-- Status de Estoque -->
            <div class="flex items-center justify-between">
              <div
                :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
                class="text-sm"
              >
                {{ product.stock > 0 ? "Em estoque" : "Fora de estoque" }}
              </div>

              <button
                @click="addToCart(product)"
                :disabled="product.stock === 0"
                class="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
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
          class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
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
                ? 'bg-purple-600 text-white'
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
              class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600"
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
            <h3 class="text-lg font-semibold mb-2">Qualidade Premium</h3>
            <p class="text-gray-600">
              Produtos desenvolvidos com materiais de alta qualidade e
              durabilidade.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600"
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
            <h3 class="text-lg font-semibold mb-2">Entrega Expressa</h3>
            <p class="text-gray-600">
              Receba suas roupas rapidamente com nossa logística especializada.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Troca Facilitada</h3>
            <p class="text-gray-600">
              Não ficou satisfeito? Trocamos ou devolvemos sem complicação.
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
  { id: 1, name: "Camisetas", icon: "👕", value: "camisetas" },
  { id: 2, name: "Bonés", icon: "🧢", value: "bones" },
  { id: 3, name: "Jaquetas", icon: "🧥", value: "jaquetas" },
  { id: 4, name: "Calças", icon: "👖", value: "calcas" },
  { id: 5, name: "Patches", icon: "🏷️", value: "patches" },
  { id: 6, name: "Acessórios", icon: "👔", value: "acessorios" },
];

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  size: "",
  color: "",
  brand: "",
  material: "",
  minPrice: null,
  maxPrice: null,
});

// Computed
const hasActiveFilters = computed(() => {
  return Object.values(filters).some((value) => value !== "" && value !== null);
});

// Métodos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const getColorClass = (color: string) => {
  const colorClasses = {
    preto: "bg-black",
    verde: "bg-green-600",
    marrom: "bg-yellow-800",
    caqui: "bg-yellow-600",
    cinza: "bg-gray-500",
    azul: "bg-blue-600",
    camuflado: "bg-gradient-to-r from-green-800 to-yellow-800",
  };
  return colorClasses[color] || "bg-gray-400";
};

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
        category: "vestuario",
        page: currentPage.value,
        sort: sortBy.value,
        subcategory: filters.subcategory,
        size: filters.size,
        color: filters.color,
        brand: filters.brand,
        material: filters.material,
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
  title: "Vestuário Tático e Outdoor - Roupas e Acessórios | Atapera",
  description:
    "Vestuário tático e outdoor para aventureiros. Camisetas, bonés, jaquetas, calças e acessórios para atividades esportivas e táticas.",
});
</script>
