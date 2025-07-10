<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Armas de Fogo</h1>
          <p class="text-xl mb-6">
            Armas registradas com toda documentação necessária. Segurança e
            qualidade garantidas para colecionadores, atiradores e caçadores
            licenciados.
          </p>
          <div class="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">Importante:</span>
            </div>
            <p class="mt-1">
              Todos os produtos requerem registro no Exército e documentação
              válida (CR, CRAF ou Porte).
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
          <li class="text-gray-900 font-medium">Armas de Fogo</li>
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
            <!-- Filtro por Subcategoria -->
            <select
              v-model="filters.subcategory"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Categorias</option>
              <option value="pistolas">Pistolas</option>
              <option value="revolveres">Revólveres</option>
              <option value="rifles">Rifles</option>
              <option value="espingardas">Espingardas</option>
              <option value="carabinas">Carabinas</option>
            </select>

            <!-- Filtro por Calibre -->
            <select
              v-model="filters.caliber"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todos os Calibres</option>
              <option value=".22">.22 LR</option>
              <option value=".32">.32 ACP</option>
              <option value=".38">.38 SPL</option>
              <option value=".380">.380 ACP</option>
              <option value="9mm">9mm</option>
              <option value=".40">.40 S&W</option>
              <option value=".45">.45 ACP</option>
              <option value=".357">.357 Magnum</option>
              <option value="12ga">12 GA</option>
              <option value="20ga">20 GA</option>
            </select>

            <!-- Filtro por Marca -->
            <select
              v-model="filters.brand"
              class="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Todas as Marcas</option>
              <option value="Taurus">Taurus</option>
              <option value="Rossi">Rossi</option>
              <option value="CBC">CBC</option>
              <option value="Imbel">Imbel</option>
              <option value="SIG Sauer">SIG Sauer</option>
              <option value="Glock">Glock</option>
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
            class="text-red-600 hover:text-red-700 text-sm font-medium"
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
                :src="getFirstProductImage(product.images)"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </NuxtLink>

            <!-- Badge de Novo/Promoção -->
            <div class="absolute top-2 left-2 flex flex-col gap-1">
              <span
                v-if="product.is_featured"
                class="bg-green-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Novo
              </span>
              <span
                v-if="product.sale_price"
                class="bg-red-500 text-white px-2 py-1 text-xs rounded-full"
              >
                Oferta
              </span>
            </div>

            <!-- Requisito de Licença -->
            <div class="absolute top-2 right-2">
              <div
                class="bg-yellow-500 text-white p-1 rounded-full"
                title="Requer documentação"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="p-4">
            <div class="mb-2">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ product.caliber || "Calibre não informado" }}
              </span>
              <span class="text-xs text-gray-500 ml-2">
                {{ product.brand || "Marca não informada" }}
              </span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`" class="block">
              <h3
                class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

            <div class="mb-3">
              <div v-if="product.sale_price" class="flex items-center gap-2">
                <span class="text-lg font-bold text-red-600">
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
                class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
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
                ? 'bg-red-600 text-white'
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
              class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">100% Legalizadas</h3>
            <p class="text-gray-600">
              Todas as armas com registro no Exército e documentação completa.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
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
            <h3 class="text-lg font-semibold mb-2">Segurança Garantida</h3>
            <p class="text-gray-600">
              Processo de venda seguro com verificação completa da documentação.
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600"
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
              Nossa equipe auxilia em todo o processo de compra e documentação.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ IMPORTAR SUPABASE E CLOUDINARY
const supabase = useSupabase();
const { getProductImage } = useCloudinary();
const route = useRoute();
const router = useRouter();

// Estados
const loading = ref(true);
const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);

// Filtros
const sortBy = ref("created_at");
const filters = reactive({
  subcategory: "",
  caliber: "",
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

const quickCategories = [
  { id: 1, name: "Carabinas", icon: "🔫", value: "carabinas" },
  { id: 2, name: "Pistolas", icon: "🔫", value: "pistolas" },
  { id: 3, name: "Rifles", icon: "🔫", value: "rifles" },
  { id: 4, name: "Chumbos", icon: "⚫", value: "chumbo" },
  { id: 5, name: "CO2", icon: "🧪", value: "co2" },
  { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
];

// ✅ FUNÇÃO PARA EXIBIR PRIMEIRA IMAGEM DO CLOUDINARY
const getFirstProductImage = (images: string[]) => {
  if (!images || images.length === 0) {
    return "/placeholder-product.jpg";
  }

  // Se for URL do Cloudinary (public_id), usar nosso helper
  if (typeof images[0] === "string" && !images[0].startsWith("http")) {
    return getProductImage(images[0], "medium");
  }

  // Se for URL completa, usar diretamente
  return images[0];
};

// ✅ FUNÇÃO CORRIGIDA - Usar Supabase diretamente
const fetchProducts = async () => {
  loading.value = true;

  try {
    console.log("🔍 Buscando produtos de armas de fogo...");

    // ✅ USAR SUPABASE DIRETAMENTE
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("is_active", true);

    // ✅ FILTRAR POR CATEGORIA "ARMAS DE FOGO" - Usando category_id correto
    // ID da categoria "Armas de Fogo" do seu modal
    query = query.eq("category_id", "3eebaee1-c85d-4b67-9af1-5619764b7307");

    // Aplicar filtros
    if (filters.subcategory) {
      query = query.ilike("name", `%${filters.subcategory}%`);
    }

    if (filters.caliber) {
      query = query.eq("caliber", filters.caliber);
    }

    if (filters.brand) {
      query = query.eq("brand", filters.brand);
    }

    if (filters.minPrice) {
      query = query.gte("price", parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      query = query.lte("price", parseFloat(filters.maxPrice));
    }

    // Ordenação
    const orderColumn =
      sortBy.value === "price_asc"
        ? "price"
        : sortBy.value === "price_desc"
        ? "price"
        : sortBy.value === "name"
        ? "name"
        : "created_at";

    const orderDirection = sortBy.value === "price_desc" ? "desc" : "asc";
    query = query.order(orderColumn, { ascending: orderDirection === "asc" });

    // Paginação
    const limit = 12;
    const offset = (currentPage.value - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Executar query
    const { data, error, count } = await query;

    if (error) {
      console.error("❌ Erro do Supabase:", error);
      throw error;
    }

    console.log("✅ Produtos encontrados:", data?.length || 0);
    console.log("📋 Estrutura do primeiro produto:", data?.[0]);

    products.value = data || [];
    totalPages.value = Math.ceil((count || 0) / limit);
    totalProducts.value = count || 0;
  } catch (error) {
    console.error("❌ Erro ao buscar produtos:", error);
    products.value = [];
    totalPages.value = 1;
    totalProducts.value = 0;
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
  title: "Armas de Fogo - Legalizadas e Registradas | Atapera",
  description:
    "Armas de fogo registradas no Exército. Pistolas, revólveres, rifles e espingardas para colecionadores e atiradores licenciados.",
});
</script>
