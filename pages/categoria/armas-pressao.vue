<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div
      class="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-16"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Armas de Pressão</h1>
          <p class="text-xl mb-6">
            Carabinas e pistolas de pressão para tiro ao alvo, controle de
            pragas e lazer. Equipamentos de qualidade para iniciantes e
            atiradores experientes.
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
              <span>Não requer registro</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Ideal para iniciantes</span>
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
          <li class="text-gray-900 font-medium">Armas de Pressão</li>
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
              'p-4 rounded-lg border text-center hover:border-orange-500 transition-colors',
              filters.subcategory === category.value
                ? 'border-orange-500 bg-orange-50'
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
              <option value="carabinas">Carabinas de Pressão</option>
              <option value="pistolas">Pistolas de Pressão</option>
              <option value="rifles">Rifles de Pressão</option>
              <option value="revolveres">Revólveres de Pressão</option>
              <option value="chumbo">Chumbos</option>
              <option value="acessorios">Acessórios</option>
            </select>

            <!-- Filtro por Sistema -->
            <select
              v-model="filters.system"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Sistemas</option>
              <option value="mola">Mola</option>
              <option value="gas-ram">Gás Ram</option>
              <option value="co2">CO2</option>
              <option value="pcp">PCP</option>
              <option value="multi-pump">Multi Pump</option>
            </select>

            <!-- Filtro por Calibre -->
            <select
              v-model="filters.caliber"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Calibres</option>
              <option value="4.5">.177 (4.5mm)</option>
              <option value="5.5">.22 (5.5mm)</option>
              <option value="6.35">.25 (6.35mm)</option>
              <option value="9">.357 (9mm)</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="CBC">CBC</option>
              <option value="Crosman">Crosman</option>
              <option value="Gamo">Gamo</option>
              <option value="Hatsan">Hatsan</option>
              <option value="Rossi">Rossi</option>
              <option value="Artemis">Artemis</option>
            </select>

            <!-- Filtro por Potência -->
            <select
              v-model="filters.power"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Potências</option>
              <option value="baixa">Baixa (até 7J)</option>
              <option value="media">Média (7-14J)</option>
              <option value="alta">Alta (14J+)</option>
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
            class="text-orange-600 hover:text-orange-700 text-sm font-medium"
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
                v-if="product.power"
                class="bg-orange-500 text-white px-2 py-1 text-xs rounded-full"
              >
                {{ product.power }}J
              </span>
            </div>

            <!-- Badge de Sistema -->
            <div class="absolute top-2 right-2">
              <span class="bg-gray-800 text-white px-2 py-1 text-xs rounded">
                {{ product.system || "Pressão" }}
              </span>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Cal. {{ product.caliber }}
              </span>
              <span class="text-xs text-gray-500">
                {{ product.brand }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <!-- Especificações -->
            <div class="text-xs text-gray-600 mb-3">
              <div v-if="product.velocity">
                Velocidade: {{ product.velocity }} fps
              </div>
              <div v-if="product.power">Potência: {{ product.power }}J</div>
            </div>

            <div class="mb-3">
              <div v-if="product.sale_price" class="flex items-center gap-2">
                <span class="text-lg font-bold text-orange-600">
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
                class="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
          class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
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
                ? 'bg-orange-600 text-white'
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
              class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Sem Registro</h3>
            <p class="text-gray-600">
              Armas de pressão não requerem registro, facilitando a compra para
              tiro esportivo.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-orange-600"
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
            <h3 class="text-lg font-semibold mb-2">Ideal para Iniciantes</h3>
            <p class="text-gray-600">
              Equipamentos perfeitos para quem está começando no tiro esportivo.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Qualidade Comprovada</h3>
            <p class="text-gray-600">
              Marcas reconhecidas mundialmente com garantia e suporte técnico.
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
  { id: 1, name: "Carabinas", icon: "🔫", value: "carabinas" },
  { id: 2, name: "Pistolas", icon: "🔫", value: "pistolas" },
  { id: 3, name: "Rifles", icon: "🔫", value: "rifles" },
  { id: 4, name: "Chumbos", icon: "⚫", value: "chumbo" },
  { id: 5, name: "CO2", icon: "🧪", value: "co2" },
  { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
];

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  system: "",
  caliber: "",
  brand: "",
  power: "",
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
        category: "armas-pressao",
        page: currentPage.value,
        sort: sortBy.value,
        subcategory: filters.subcategory,
        system: filters.system,
        caliber: filters.caliber,
        brand: filters.brand,
        power: filters.power,
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
  title: "Armas de Pressão - Carabinas e Pistolas de Pressão | Atapera",
  description:
    "Armas de pressão para tiro esportivo. Carabinas, pistolas e rifles de pressão das melhores marcas. Não requer registro.",
});
</script>
