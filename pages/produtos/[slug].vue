<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        <li>
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700"
            >Início</NuxtLink
          >
        </li>
        <li class="text-gray-400">/</li>
        <li>
          <NuxtLink to="/produtos" class="text-gray-500 hover:text-gray-700"
            >Produtos</NuxtLink
          >
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 font-medium">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Galeria de Imagens -->
      <div class="space-y-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            :src="selectedImage"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="grid grid-cols-4 gap-2"
          v-if="product.images && product.images.length > 1"
        >
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = getProductImage(image)"
            class="aspect-square bg-gray-100 rounded border-2"
            :class="
              selectedImage === getProductImage(image)
                ? 'border-red-500'
                : 'border-transparent'
            "
          >
            <img
              :src="getProductImage(image, 'small')"
              :alt="`${product.name} ${index + 1}`"
              class="w-full h-full object-cover rounded"
            />
          </button>
        </div>
      </div>

      <!-- Informações do Produto -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-gray-600">SKU: {{ product.sku }}</p>
        </div>

        <!-- Preço -->
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span
              v-if="product.sale_price"
              class="text-2xl font-bold text-red-600"
            >
              {{ formatPrice(product.sale_price) }}
            </span>
            <span
              :class="
                product.sale_price
                  ? 'text-lg text-gray-500 line-through'
                  : 'text-2xl font-bold text-gray-900'
              "
            >
              {{ formatPrice(product.price) }}
            </span>
          </div>

          <div v-if="product.sale_price" class="text-sm text-green-600">
            Economize {{ formatPrice(product.price - product.sale_price) }}
          </div>
        </div>


        <!-- Campos Específicos -->
        <div
          v-if="product.requires_license"
          class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div class="flex items-center gap-2 text-yellow-800">
            <span class="material-icons text-yellow-600">warning</span>
            <span class="font-medium">Requer Licença</span>
          </div>
          <p class="text-sm text-yellow-700 mt-1">
            Este produto requer
            {{ product.license_type || "documentação" }} para compra.
          </p>
        </div>

        <!-- Especificações Técnicas -->
        <div
          v-if="
            product.specifications &&
            Object.keys(product.specifications).length > 0
          "
          class="border rounded-lg p-4"
        >
          <h3 class="font-semibold mb-3">Especificações Técnicas</h3>
          <dl class="space-y-2">
            <div
              v-for="(value, key) in product.specifications"
              :key="key"
              class="flex justify-between"
            >
              <dt class="text-gray-600">{{ formatSpecKey(key) }}:</dt>
              <dd class="font-medium">{{ value }}</dd>
            </div>
          </dl>
        </div>

        <!-- Informações do Produto -->
        <div
          v-if="product.brand || product.caliber"
          class="border rounded-lg p-4"
        >
          <h3 class="font-semibold mb-3">Informações</h3>
          <dl class="space-y-2">
            <div v-if="product.brand" class="flex justify-between">
              <dt class="text-gray-600">Marca:</dt>
              <dd class="font-medium">{{ product.brand }}</dd>
            </div>
            <div v-if="product.model" class="flex justify-between">
              <dt class="text-gray-600">Modelo:</dt>
              <dd class="font-medium">{{ product.model }}</dd>
            </div>
            <div v-if="product.caliber" class="flex justify-between">
              <dt class="text-gray-600">Calibre:</dt>
              <dd class="font-medium">{{ product.caliber }}</dd>
            </div>
            <div v-if="product.weight" class="flex justify-between">
              <dt class="text-gray-600">Peso:</dt>
              <dd class="font-medium">{{ product.weight }}kg</dd>
            </div>
          </dl>
        </div>

        <!-- Adicionar ao Carrinho -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium">Quantidade:</label>
            <div class="flex items-center border rounded">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <input
                v-model="quantity"
                type="number"
                min="1"
                class="w-16 text-center border-l border-r px-2 py-2"
              />
              <button
                @click="quantity++"
                class="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              @click="addToCart"
              :disabled="loading"
              class="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {{ loading ? "Adicionando..." : "Adicionar ao Carrinho" }}
            </button>

            <button
              @click="toggleFavorite"
              class="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <span
                class="material-icons"
                :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
              >
                {{ isFavorite ? "favorite" : "favorite_border" }}
              </span>
            </button>
          </div>
        </div>

        <!-- Simulador de Frete -->
        <ShippingCalculator :product="product" :weight="1" />
      </div>
    </div>

    <!-- Descrição Detalhada -->
    <div v-if="product.description" class="prose max-w-none mb-12">
      <h2 class="text-2xl font-bold mb-4">Descrição</h2>
      <div v-html="product.description"></div>
    </div>

    <!-- Produtos Relacionados -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Produtos Relacionados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300"
        >
          <div class="aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
            <NuxtLink :to="`/produtos/${relatedProduct.slug}`">
              <img
                :src="getFirstProductImage(relatedProduct.images)"
                :alt="relatedProduct.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </NuxtLink>
          </div>
          <div class="p-4">
            <NuxtLink :to="`/produtos/${relatedProduct.slug}`">
              <h3
                class="font-medium text-gray-900 mb-2 hover:text-red-600 transition-colors"
              >
                {{ relatedProduct.name }}
              </h3>
            </NuxtLink>
            <p class="text-lg font-bold text-red-600">
              {{
                formatPrice(relatedProduct.sale_price || relatedProduct.price)
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container mx-auto px-4 py-8">
    <div class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="aspect-square bg-gray-200 rounded-lg"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-full"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2"></div>
          <div class="h-12 bg-gray-200 rounded w-full"></div>
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

// Estados
const product = ref(null);
const relatedProducts = ref([]);
const selectedImage = ref("");
const quantity = ref(1);
const loading = ref(false);
const isFavorite = ref(false);

// Métodos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const formatSpecKey = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const addToCart = async () => {
  loading.value = true;

  try {
    const cartStore = useCartStore();

    // Preparar dados do produto para o carrinho
    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      price: product.value.sale_price || product.value.price,
      image: product.value.images?.[0] || "/placeholder-product.jpg",
      category: product.value.categories?.slug || "produto", // Categoria real do produto
      product_id: product.value.id,
    };

    // Adicionar ao carrinho usando a store
    await cartStore.addItem(cartItem, quantity.value);

    // Feedback visual
    const originalText = "Produto adicionado ao carrinho!";
    alert(originalText);

    // Opcional: abrir carrinho automaticamente
    // cartStore.openCart();
  } catch (error: any) {
    console.error("Erro ao adicionar ao carrinho:", error);
    alert(error.message || "Erro ao adicionar produto ao carrinho");
  } finally {
    loading.value = false;
  }
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

// ✅ FUNÇÃO PARA EXIBIR PRIMEIRA IMAGEM DO CLOUDINARY
const getFirstProductImage = (images: string[]) => {
  if (!images || images.length === 0) {
    return "/placeholder-product.jpg";
  }

  if (typeof images[0] === "string" && !images[0].startsWith("http")) {
    return getProductImage(images[0], "medium");
  }

  return images[0];
};

// ✅ FUNÇÃO CORRIGIDA - Buscar produto usando Supabase
const fetchProduct = async () => {
  try {

    // ✅ USAR SUPABASE DIRETAMENTE
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", route.params.slug)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("❌ Erro do Supabase:", error);
      throw error;
    }

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: "Produto não encontrado",
      });
    }

    product.value = data;

    // Definir imagem selecionada
    if (data.images && data.images.length > 0) {
      selectedImage.value = getProductImage(data.images[0], "large");
    } else {
      selectedImage.value = "/placeholder-product.jpg";
    }

    // Buscar produtos relacionados
    await fetchRelatedProducts(data.category_id, data.id);
  } catch (error) {
    console.error("❌ Erro ao buscar produto:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Produto não encontrado",
    });
  }
};

// ✅ BUSCAR PRODUTOS RELACIONADOS
const fetchRelatedProducts = async (
  categoryId: string,
  currentProductId: string
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, slug, price, sale_price, images")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .neq("id", currentProductId)
      .limit(4);

    if (error) {
      console.error("❌ Erro ao buscar produtos relacionados:", error);
      return;
    }

    relatedProducts.value = data || [];
  } catch (error) {
    console.error("❌ Erro ao buscar produtos relacionados:", error);
  }
};

// Lifecycle - buscar produto
await fetchProduct();

// SEO
if (product.value) {
  useSeoMeta({
    title: `${product.value.name} - Atapera`,
    description: product.value.short_description || product.value.description,
    ogTitle: product.value.name,
    ogDescription: product.value.short_description,
    ogImage: selectedImage.value,
    ogType: "product",
  });
}
</script>
