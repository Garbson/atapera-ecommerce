<!-- components/sections/FeaturedProducts.vue -->
<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          Produtos em Destaque
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Os produtos mais procurados pelos nossos clientes. Qualidade
          comprovada e preços especiais.
        </p>
      </div>

      <!-- Filtros -->
      <div class="flex justify-center mb-8">
        <div class="flex bg-gray-100 rounded-lg p-1">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            :class="[
              'px-6 py-2 rounded-md font-medium transition-all duration-200',
              activeFilter === filter.id
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800',
            ]"
          >
            {{ filter.name }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div v-for="i in 8" :key="i" class="animate-pulse">
          <div class="bg-gray-200 aspect-square rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-50">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <!-- Badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-2">
              <span
                v-if="product.isNew"
                class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                NOVO
              </span>
              <span
                v-if="product.discount"
                class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                -{{ product.discount }}%
              </span>
              <span
                v-if="product.requiresLicense"
                class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                LICENÇA
              </span>
            </div>

            <!-- Quick Actions -->
            <div
              class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
              >
                👁️
              </button>
              <button
                class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
              >
                ❤️
              </button>
            </div>

            <!-- Stock Status -->
            <div v-if="product.stock <= 5" class="absolute bottom-3 left-3">
              <span
                class="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                Últimas {{ product.stock }} unidades
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <div class="mb-2">
              <span class="text-xs text-gray-500 uppercase tracking-wide">{{
                product.category
              }}</span>
            </div>

            <h3
              class="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors"
            >
              {{ product.name }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-3">
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i">
                  {{ i <= product.rating ? "★" : "☆" }}
                </span>
              </div>
              <span class="text-sm text-gray-500">({{ product.reviews }})</span>
            </div>

            <!-- Price -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex flex-col">
                <div
                  v-if="product.originalPrice"
                  class="flex items-center gap-2"
                >
                  <span class="text-lg font-bold text-red-600">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span class="text-sm text-gray-400 line-through">
                    {{ formatPrice(product.originalPrice) }}
                  </span>
                </div>
                <span v-else class="text-lg font-bold text-gray-800">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
            </div>

            <!-- Add to Cart -->
            <button
              @click="addToCart(product)"
              :disabled="product.stock === 0"
              class="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {{ product.stock === 0 ? "Esgotado" : "Adicionar ao Carrinho" }}
            </button>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <NuxtLink
          to="/produtos"
          class="inline-flex items-center bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
        >
          Ver Todos os Produtos
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

// Estados
const loading = ref(false);
const activeFilter = ref("all");

// Filtros
const filters = [
  { id: "all", name: "Todos" },
  { id: "armas", name: "Armas" },
  { id: "pesca", name: "Pesca" },
  { id: "outdoor", name: "Outdoor" },
];

// Produtos mock (em produção viria da API/database)
const products = ref([
  {
    id: 1,
    name: "Carabina de Pressão CBC Nitro X 5.5mm",
    category: "Armas de Pressão",
    price: 899.9,
    originalPrice: 1099.9,
    image: "/images/carabina.webp",
    rating: 5,
    reviews: 124,
    stock: 8,
    isNew: true,
    discount: 18,
    requiresLicense: false,
    filterCategory: "armas",
  },
  {
    id: 2,
    name: "Vara de Pesca Telescópica 3.60m",
    category: "Equipamentos de Pesca",
    price: 189.9,
    image: "/images/vara.webp",
    rating: 4,
    reviews: 89,
    stock: 15,
    isNew: false,
    filterCategory: "pesca",
  },
  {
    id: 3,
    name: "Pistola Glock Airsoft G17 GBB",
    category: "Airsoft",
    price: 2499.9,
    originalPrice: 2799.9,
    image: "/images/glock.webp",
    rating: 5,
    reviews: 67,
    stock: 3,
    discount: 11,
    filterCategory: "armas",
  },
  {
    id: 4,
    name: "Molinete Shimano FX 2500",
    category: "Equipamentos de Pesca",
    price: 159.9,
    image: "/images/molinete.webp",
    rating: 4,
    reviews: 156,
    stock: 22,
    filterCategory: "pesca",
  },
  {
    id: 5,
    name: "Arco Recurvo Tradicional 40lbs",
    category: "Caça e Tiro",
    price: 789.9,
    image: "/images/arco.webp",
    rating: 5,
    reviews: 43,
    stock: 7,
    isNew: true,
    filterCategory: "outdoor",
  },
  {
    id: 6,
    name: "Bota Tática Militar Cano Alto",
    category: "Vestuário",
    price: 329.9,
    originalPrice: 399.9,
    image: "/images/bota.webp",
    rating: 4,
    reviews: 203,
    stock: 12,
    discount: 18,
    filterCategory: "outdoor",
  },
  {
    id: 7,
    name: "Kit Iscas Artificiais Completo",
    category: "Equipamentos de Pesca",
    price: 299.9,
    image: "/images/isca.webp",
    rating: 4,
    reviews: 78,
    stock: 25,
    filterCategory: "pesca",
  },
  {
    id: 8,
    name: "Revólver de Pressão Crosman SR357",
    category: "Armas de Pressão",
    price: 1299.9,
    image: "/images/revolverDePressao.webp",
    rating: 5,
    reviews: 91,
    stock: 6,
    isNew: true,
    filterCategory: "armas",
  },
]);

// Computed
const filteredProducts = computed(() => {
  if (activeFilter.value === "all") {
    return products.value;
  }
  return products.value.filter(
    (product) => product.filterCategory === activeFilter.value
  );
});

// Métodos
const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const addToCart = (product) => {
  // Implementar lógica do carrinho
  console.log("Adicionando ao carrinho:", product.name);
  // const cartStore = useCartStore()
  // cartStore.addItem(product)
};

// Simular loading inicial
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
