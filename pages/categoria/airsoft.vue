<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Airsoft</h1>
          <p class="text-xl mb-6">
            Equipamentos completos para Airsoft! Armas, munições, equipamentos
            táticos e acessórios para simulação militar e jogos esportivos.
          </p>
          <div class="bg-green-100 text-green-800 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">Atenção:</span>
            </div>
            <p class="mt-1">
              Equipamentos para uso esportivo e simulação. Sempre use
              equipamentos de proteção adequados.
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
          <li class="text-gray-900 font-medium">Airsoft</li>
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
              'p-4 rounded-lg border text-center hover:border-green-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-green-500 bg-green-50'
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
              <option value="rifles">Rifles Airsoft</option>
              <option value="pistolas">Pistolas Airsoft</option>
              <option value="shotguns">Shotguns Airsoft</option>
              <option value="snipers">Snipers Airsoft</option>
              <option value="municoes">Munições BBs</option>
              <option value="colete">Coletes Táticos</option>
              <option value="mascaras">Máscaras e Óculos</option>
              <option value="acessorios">Acessórios</option>
            </select>

            <!-- Filtro por Sistema -->
            <select
              v-model="filters.system"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Sistemas</option>
              <option value="spring">Spring</option>
              <option value="eletrico">Elétrico (AEG)</option>
              <option value="gas">Gás (GBB)</option>
              <option value="co2">CO2</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Cyma">Cyma</option>
              <option value="G&G">G&G</option>
              <option value="Tokyo Marui">Tokyo Marui</option>
              <option value="KWA">KWA</option>
              <option value="ASG">ASG</option>
              <option value="WE">WE</option>
            </select>

            <!-- Filtro por FPS -->
            <select
              v-model="filters.fps"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os FPS</option>
              <option value="0-300">0-300 FPS</option>
              <option value="300-400">300-400 FPS</option>
              <option value="400-500">400-500 FPS</option>
              <option value="500+">500+ FPS</option>
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
            class="text-green-600 hover:text-green-700 text-sm font-medium"
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
                v-if="product.fps"
                class="bg-blue-500 text-white px-2 py-1 text-xs rounded-full"
              >
                {{ product.fps }} FPS
              </span>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ product.system || "Sistema" }}
              </span>
              <span class="text-xs text-gray-500">
                {{ product.brand }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <!-- Especificações -->
            <div class="text-xs text-gray-600 mb-3">
              <div v-if="product.fps">FPS: {{ product.fps }}</div>
              <div v-if="product.caliber">Calibre: {{ product.caliber }}</div>
            </div>

            <div class="mb-3">
              <div v-if="product.sale_price" class="flex items-center gap-2">
                <span class="text-lg font-bold text-green-600">
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
                class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
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
                ? 'bg-green-600 text-white'
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
              class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
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
            <h3 class="text-lg font-semibold mb-2">
              Segurança em Primeiro Lugar
            </h3>
            <p class="text-gray-600">
              Equipamentos de proteção e orientações para prática segura do
              Airsoft.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
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
            <h3 class="text-lg font-semibold mb-2">Produtos Testados</h3>
            <p class="text-gray-600">
              Equipamentos testados e aprovados pela comunidade Airsoft.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
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
            <h3 class="text-lg font-semibold mb-2">Suporte Especializado</h3>
            <p class="text-gray-600">
              Dicas e orientações de jogadores experientes de Airsoft.
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
  { id: 1, name: "Rifles", icon: "🔫", value: "rifles" },
  { id: 2, name: "Pistolas", icon: "🔫", value: "pistolas" },
  { id: 3, name: "Munições", icon: "⚪", value: "municoes" },
  { id: 4, name: "Coletes", icon: "🦺", value: "colete" },
  { id: 5, name: "Máscaras", icon: "🥽", value: "mascaras" },
  { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
];

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  system: "",
  brand: "",
  fps: "",
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
        category: "airsoft",
        page: currentPage.value,
        sort: sortBy.value,
        subcategory: filters.subcategory,
        system: filters.system,
        brand: filters.brand,
        fps: filters.fps,
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
  title: "Airsoft - Equipamentos e Acessórios Táticos | Atapera",
  description:
    "Equipamentos completos para Airsoft. Rifles, pistolas, munições BBs, coletes táticos e acessórios para simulação militar e jogos esportivos.",
});
</script>
