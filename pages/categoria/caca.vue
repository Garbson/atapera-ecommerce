<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Equipamentos de Caça
          </h1>
          <p class="text-xl mb-6">
            Equipamentos completos para caça esportiva e controle de fauna.
            Facas, lanternas, equipamentos de camping e acessórios para
            caçadores.
          </p>
          <div class="bg-amber-100 text-amber-800 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">Importante:</span>
            </div>
            <p class="mt-1">
              Respeite sempre as leis de caça e conservação ambiental. Pratique
              caça responsável.
            </p>
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
          <li class="text-gray-900 font-medium">Caça</li>
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
              'p-4 rounded-lg border text-center hover:border-amber-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-amber-500 bg-amber-50'
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
            <!-- Filtro por Categoria -->
            <select
              v-model="filters.subcategory"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Categorias</option>
              <option value="facas">Facas e Canivetes</option>
              <option value="lanternas">Lanternas Táticas</option>
              <option value="binóculos">Binóculos</option>
              <option value="camping">Camping</option>
              <option value="roupas">Roupas de Caça</option>
              <option value="boots">Botas e Calçados</option>
              <option value="mochila">Mochilas</option>
              <option value="armadilhas">Armadilhas</option>
              <option value="chamadas">Chamadas</option>
              <option value="acessorios">Acessórios</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Nautika">Nautika</option>
              <option value="Invictus">Invictus</option>
              <option value="Trilhas & Rumos">Trilhas & Rumos</option>
              <option value="Albatroz">Albatroz</option>
              <option value="Poker">Poker</option>
              <option value="Guepardo">Guepardo</option>
            </select>

            <!-- Filtro por Material -->
            <select
              v-model="filters.material"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Materiais</option>
              <option value="aco-inox">Aço Inox</option>
              <option value="aco-carbono">Aço Carbono</option>
              <option value="titanio">Titânio</option>
              <option value="aluminio">Alumínio</option>
              <option value="plastico">Plástico</option>
              <option value="nylon">Nylon</option>
            </select>

            <!-- Filtro por Uso -->
            <select
              v-model="filters.use"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Usos</option>
              <option value="caca-menor">Caça Menor</option>
              <option value="caca-maior">Caça Maior</option>
              <option value="camping">Camping</option>
              <option value="sobrevivencia">Sobrevivência</option>
              <option value="tatico">Tático</option>
              <option value="colecao">Coleção</option>
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
            class="text-amber-600 hover:text-amber-700 text-sm font-medium"
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
                v-if="product.waterproof"
                class="bg-blue-500 text-white px-2 py-1 text-xs rounded-full"
              >
                À Prova D'água
              </span>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ product.category_name || "Caça" }}
              </span>
              <span class="text-xs text-gray-500">
                {{ product.brand }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <!-- Especificações -->
            <div class="text-xs text-gray-600 mb-3">
              <div v-if="product.material">
                Material: {{ product.material }}
              </div>
              <div v-if="product.size">Tamanho: {{ product.size }}</div>
            </div>

            <div class="mb-3">
              <div v-if="product.sale_price" class="flex items-center gap-2">
                <span class="text-lg font-bold text-amber-600">
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
                class="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
          class="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
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
                ? 'bg-amber-600 text-white'
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
              class="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Equipamentos Resistentes</h3>
            <p class="text-gray-600">
              Produtos desenvolvidos para condições extremas e uso intenso.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Caça Responsável</h3>
            <p class="text-gray-600">
              Apoiamos a caça sustentável e o manejo responsável da fauna.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-amber-600"
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
            <h3 class="text-lg font-semibold mb-2">Orientação Especializada</h3>
            <p class="text-gray-600">
              Dicas e conselhos de caçadores experientes para melhor resultado.
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
  { id: 1, name: "Facas", icon: "🔪", value: "facas" },
  { id: 2, name: "Lanternas", icon: "🔦", value: "lanternas" },
  { id: 3, name: "Binóculos", icon: "🔭", value: "binoculos" },
  { id: 4, name: "Camping", icon: "⛺", value: "camping" },
  { id: 5, name: "Roupas", icon: "👕", value: "roupas" },
  { id: 6, name: "Acessórios", icon: "🎒", value: "acessorios" },
];

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  brand: "",
  material: "",
  use: "",
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
        category: "caca",
        page: currentPage.value,
        sort: sortBy.value,
        subcategory: filters.subcategory,
        brand: filters.brand,
        material: filters.material,
        use: filters.use,
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
  title: "Equipamentos de Caça - Facas, Lanternas e Acessórios | Atapera",
  description:
    "Equipamentos completos para caça esportiva. Facas táticas, lanternas, binóculos, equipamentos de camping e acessórios para caçadores.",
});
</script>
