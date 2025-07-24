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
          v-for="product in products"
          :key="product.id"
          class="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-50">
            <NuxtLink :to="`/produtos/${product.slug}`">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </NuxtLink>

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

          </div>

          <!-- Product Info -->
          <div class="p-4">
            <div class="mb-2">
              <span class="text-xs text-gray-500 uppercase tracking-wide">{{
                getCategoryName(product.category_id)
              }}</span>
            </div>

            <NuxtLink :to="`/produtos/${product.slug}`">
              <h3
                class="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>

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
              class="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Adicionar ao Carrinho
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
// Stores
const productsStore = useProductsStore()
const cartStore = useCartStore()
const categoriesStore = useCategoriesStore()

// Composables
const { getProductImage } = useCloudinary()

// Estado reativo
const { categories } = storeToRefs(categoriesStore)

// Estados locais - usar estado local para featured products
const featuredProducts = ref([])
const loading = ref(false)
const error = ref(null)

// Produtos filtrados e processados
const products = computed(() => {
  if (!featuredProducts.value) return []
  
  return featuredProducts.value
    .filter(product => product.is_featured && product.is_active)
    .slice(0, 8) // Limitar a 8 produtos
    .map(product => ({
      ...product,
      image: product.images?.[0] ? getProductImage(product.images[0], 'medium') : '/placeholder-product.jpg',
      originalPrice: product.sale_price ? product.price : null,
      price: product.sale_price || product.price,
      discount: product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : null,
      isNew: isNewProduct(product.created_at),
      requiresLicense: product.requires_license,
      rating: 4 + Math.random(), // Temporário até implementar avaliações
      reviews: Math.floor(Math.random() * 200) + 10, // Temporário
    }))
})


// Métodos auxiliares
const isNewProduct = (createdAt) => {
  if (!createdAt) return false
  const created = new Date(createdAt)
  const now = new Date()
  const daysDiff = (now - created) / (1000 * 60 * 60 * 24)
  return daysDiff <= 30 // Produto é "novo" se foi criado nos últimos 30 dias
}


const getCategoryName = (categoryId) => {
  if (!categories.value || !categoryId) return "Produto"
  
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.title || "Produto"
}

// Métodos
const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

const addToCart = async (product) => {
  try {
    await cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      product_id: product.id,
      slug: product.slug,
      sale_price: product.sale_price,
      category: product.categories?.slug || "produto",
    }, 1)

  } catch (error) {
    console.error("❌ Erro ao adicionar produto ao carrinho:", error)
    // TODO: Mostrar notificação de erro
  }
}

// Função para buscar produtos em destaque separadamente
const fetchFeaturedProducts = async () => {

  
  try {
    loading.value = true
    error.value = null
    
    // Carregar categorias se não estiverem carregadas
    if (categories.value.length === 0) {
      await categoriesStore.fetchCategories()
    }
    
    // ✅ BUSCAR PRODUTOS DIRETAMENTE - SEM USAR A STORE GLOBAL
    const supabase = useSupabase()
    const { data, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(20)
      .order("created_at", { ascending: false })
    
    if (fetchError) throw fetchError
    
    featuredProducts.value = data || []
    
  } catch (err) {
    console.error("❌ Erro ao carregar produtos em destaque:", err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Carregar dados ao montar
onMounted(async () => {
  await fetchFeaturedProducts()
})
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
