<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            🔥 Ofertas Imperdíveis
          </h1>
          <p class="text-xl mb-6">
            Descontos especiais em equipamentos selecionados! Aproveite preços
            promocionais em armas, equipamentos de pesca, caça e muito mais.
          </p>
          <div class="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">Atenção:</span>
            </div>
            <p class="mt-1">
              Ofertas por tempo limitado! Produtos sujeitos à disponibilidade de
              estoque.
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
          <li class="text-gray-900 font-medium">Ofertas</li>
        </ol>
      </nav>

      <!-- Banners de Destaque -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg"
        >
          <h3 class="text-xl font-bold mb-2">Até 50% OFF</h3>
          <p class="text-sm mb-4">Em equipamentos de pesca selecionados</p>
          <button
            @click="filters.category = 'pesca'"
            class="bg-white text-red-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100"
          >
            Ver Ofertas
          </button>
        </div>

        <div
          class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg"
        >
          <h3 class="text-xl font-bold mb-2">Liquidação</h3>
          <p class="text-sm mb-4">Equipamentos de Airsoft com desconto</p>
          <button
            @click="filters.category = 'airsoft'"
            class="bg-white text-green-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100"
          >
            Aproveitar
          </button>
        </div>

        <div
          class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg"
        >
          <h3 class="text-xl font-bold mb-2">Frete Grátis</h3>
          <p class="text-sm mb-4">Em compras acima de R$ 299</p>
          <button
            class="bg-white text-purple-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100"
          >
            Comprar Agora
          </button>
        </div>
      </div>

      <!-- Filtros e Ordenação -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex flex-wrap gap-4">
            <!-- Filtro por Categoria -->
            <select
              v-model="filters.category"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Categorias</option>
              <option value="armas-fogo">Armas de Fogo</option>
              <option value="armas-pressao">Armas de Pressão</option>
              <option value="pesca">Pesca</option>
              <option value="airsoft">Airsoft</option>
              <option value="caca">Caça</option>
              <option value="vestuario">Vestuário</option>
            </select>

            <!-- Filtro por Desconto -->
            <select
              v-model="filters.discount"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Descontos</option>
              <option value="10-20">10% - 20%</option>
              <option value="20-30">20% - 30%</option>
              <option value="30-40">30% - 40%</option>
              <option value="40-50">40% - 50%</option>
              <option value="50+">Mais de 50%</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Taurus">Taurus</option>
              <option value="CBC">CBC</option>
              <option value="Shimano">Shimano</option>
              <option value="Daiwa">Daiwa</option>
              <option value="Cyma">Cyma</option>
              <option value="Invictus">Invictus</option>
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
            <option value="discount_desc">Maior Desconto</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
            <option value="created_at">Mais Recentes</option>
            <option value="ending_soon">Terminando Primeiro</option>
          </select>
        </div>

        <!-- Botão Limpar Filtros -->
        <div class="mt-4 pt-4 border-t border-gray-200" v-if="hasActiveFilters">
          <button
            @click="clearFilters"
            class="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Limpar todos os filtros
          </button>
        </div>
      </div>

      <!-- Contador de Resultados -->
      <div class="mb-4 flex justify-between items-center">
        <p class="text-gray-600">
          {{ totalProducts }}
          {{
            totalProducts === 1 ? "oferta encontrada" : "ofertas encontradas"
          }}
        </p>
        <div class="text-sm text-gray-600">
          💡 Economia total:
          <span class="font-bold text-green-600">{{
            formatPrice(totalSavings)
          }}</span>
        </div>
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

      <!-- Grid de Produtos em Oferta -->
      <div
        v-else-if="products.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group relative"
        >
          <!-- Badge de Desconto -->
          <div class="absolute top-2 right-2 z-10">
            <div
              class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
            >
              -{{ product.discount_percentage }}%
            </div>
          </div>

          <!-- Timer de Oferta (se aplicável) -->
          <div v-if="product.offer_ends_at" class="absolute top-2 left-2 z-10">
            <div
              class="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium"
            >
              ⏰ {{ getTimeRemaining(product.offer_ends_at) }}
            </div>
          </div>

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

            <!-- Overlay de Oferta -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            ></div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2 flex justify-between items-center">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ product.category_name }}
              </span>
              <span class="text-xs text-gray-500">
                {{ product.brand }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <!-- Preços -->
            <div class="mb-3">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl font-bold text-red-600">
                  {{ formatPrice(product.sale_price) }}
                </span>
                <span class="text-lg text-gray-500 line-through">
                  {{ formatPrice(product.original_price) }}
                </span>
              </div>
              <div class="text-sm text-green-600 font-medium">
                Você economiza
                {{ formatPrice(product.original_price - product.sale_price) }}
              </div>
            </div>

            <!-- Status de Estoque e Vendas -->
            <div class="mb-3">
              <div class="flex justify-between text-xs text-gray-600 mb-1">
                <span>{{ product.sold_count || 0 }} vendidos</span>
                <span
                  :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
                >
                  {{
                    product.stock > 0
                      ? `${product.stock} disponíveis`
                      : "Esgotado"
                  }}
                </span>
              </div>

              <!-- Barra de Estoque -->
              <div
                v-if="product.stock > 0"
                class="w-full bg-gray-200 rounded-full h-2"
              >
                <div
                  class="bg-red-500 h-2 rounded-full transition-all duration-300"
                  :style="`width: ${Math.min(
                    ((product.sold_count || 0) /
                      (product.stock + (product.sold_count || 0))) *
                      100,
                    100
                  )}%`"
                ></div>
              </div>
            </div>

            <!-- Botão de Compra -->
            <button
              @click="addToCart(product)"
              :disabled="product.stock === 0"
              class="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {{ product.stock === 0 ? "Esgotado" : "Aproveitar Oferta" }}
            </button>
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
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Nenhuma oferta encontrada
        </h3>
        <p class="text-gray-600 mb-6">
          Tente ajustar os filtros ou volte mais tarde para novas promoções.
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="clearFilters"
            class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Ver Todas as Ofertas
          </button>
          <NuxtLink
            to="/produtos"
            class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Ver Todos os Produtos
          </NuxtLink>
        </div>
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
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Newsletter de Ofertas -->
    <div class="bg-red-600 text-white">
      <div class="container mx-auto px-4 py-12 text-center">
        <!-- Newsletter de Ofertas -->
        <div class="bg-red-600 text-white">
          <div class="container mx-auto px-4 py-12 text-center">
            <h2 class="text-2xl font-bold mb-4">
              📧 Não Perca Nenhuma Oferta!
            </h2>
            <p class="text-xl mb-6">
              Cadastre-se e receba as melhores promoções em primeira mão
            </p>
            <div class="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                class="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                class="bg-yellow-500 text-red-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400"
              >
                Cadastrar
              </button>
            </div>
            <p class="text-sm mt-3 opacity-90">
              Promoções exclusivas • Sem spam • Cancele quando quiser
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
const totalSavings = ref(0);

// Filtros
const sortBy = ref("discount_desc");
const filters = reactive({
  category: "",
  discount: "",
  brand: "",
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

const getTimeRemaining = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return "Oferta encerrada";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
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
    const { data } = await $fetch("/api/products/offers", {
      query: {
        page: currentPage.value,
        sort: sortBy.value,
        category: filters.category,
        discount: filters.discount,
        brand: filters.brand,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
      },
    });

    products.value = data.products || [];
    totalPages.value = data.totalPages || 1;
    totalProducts.value = data.total || 0;
    totalSavings.value = data.totalSavings || 0;
  } catch (error) {
    console.error("Erro ao buscar ofertas:", error);
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
  title: "Ofertas Imperdíveis - Descontos em Equipamentos | Atapera",
  description:
    "Aproveite as melhores ofertas em armas, equipamentos de pesca, caça, airsoft e muito mais. Descontos de até 50% por tempo limitado!",
});
</script>
