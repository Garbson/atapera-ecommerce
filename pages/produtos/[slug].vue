<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <Breadcrumbs :items="breadcrumbs" />

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

        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = image"
            class="aspect-square bg-gray-100 rounded border-2"
            :class="
              selectedImage === image ? 'border-red-500' : 'border-transparent'
            "
          >
            <img
              :src="image"
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

        <!-- Estoque -->
        <div class="flex items-center gap-2">
          <div
            :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
            class="flex items-center gap-1"
          >
            <div
              class="w-2 h-2 rounded-full"
              :class="product.stock > 0 ? 'bg-green-600' : 'bg-red-600'"
            ></div>
            {{
              product.stock > 0
                ? `${product.stock} em estoque`
                : "Fora de estoque"
            }}
          </div>
        </div>

        <!-- Campos Específicos -->
        <div
          v-if="product.requires_license"
          class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div class="flex items-center gap-2 text-yellow-800">
            <ExclamationTriangleIcon class="h-5 w-5" />
            <span class="font-medium">Requer Licença</span>
          </div>
          <p class="text-sm text-yellow-700 mt-1">
            Este produto requer {{ product.license_type }} para compra.
          </p>
        </div>

        <!-- Especificações Técnicas -->
        <div v-if="product.specifications" class="border rounded-lg p-4">
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
                :max="product.stock"
                class="w-16 text-center border-l border-r px-2 py-2"
              />
              <button
                @click="quantity = Math.min(product.stock, quantity + 1)"
                class="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              @click="addToCart"
              :disabled="product.stock === 0 || loading"
              class="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ loading ? "Adicionando..." : "Adicionar ao Carrinho" }}
            </button>

            <button
              @click="toggleFavorite"
              class="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <HeartIcon
                :class="
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                "
                class="h-6 w-6"
              />
            </button>
          </div>
        </div>

        <!-- Compartilhar -->
        <div class="flex items-center gap-4 pt-4 border-t">
          <span class="text-sm text-gray-600">Compartilhar:</span>
          <div class="flex gap-2">
            <button class="p-2 text-blue-600 hover:bg-blue-50 rounded">
              <ShareIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Descrição Detalhada -->
    <div class="prose max-w-none mb-12">
      <h2 class="text-2xl font-bold mb-4">Descrição</h2>
      <div v-html="product.description"></div>
    </div>

    <!-- Produtos Relacionados -->
    <RelatedProducts
      :category-id="product.category_id"
      :current-product-id="product.id"
    />

    <!-- Avaliações -->
    <ProductReviews :product-id="product.id" />
  </div>

  <div v-else class="container mx-auto px-4 py-8">
    <ProductSkeleton />
  </div>
</template>

<script setup lang="ts">
import {
  ExclamationTriangleIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const { addItem } = useCartStore();

// Estados
const product = ref(null);
const selectedImage = ref("");
const quantity = ref(1);
const loading = ref(false);
const isFavorite = ref(false);

// Computed
const breadcrumbs = computed(() => {
  if (!product.value) return [];

  return [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/produtos" },
    {
      name: product.value.category_name,
      href: `/categoria/${product.value.category_slug}`,
    },
    { name: product.value.name, href: route.path },
  ];
});

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
    addItem({
      id: product.value.id,
      name: product.value.name,
      price: product.value.sale_price || product.value.price,
      image: product.value.images[0],
      category: product.value.category_name,
      maxStock: product.value.stock,
      quantity: quantity.value,
    });
  } finally {
    loading.value = false;
  }
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // Implementar lógica de favoritos
};

// Fetch produto
const fetchProduct = async () => {
  try {
    const { data } = await $fetch(`/api/products/${route.params.slug}`);
    product.value = data;
    selectedImage.value = data.images[0];
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Produto não encontrado",
    });
  }
};

// Lifecycle
await fetchProduct();

// SEO
useSeoMeta({
  title: `${product.value.name} - Atapera`,
  description: product.value.short_description || product.value.description,
  ogTitle: product.value.name,
  ogDescription: product.value.short_description,
  ogImage: product.value.images[0],
  ogType: "product",
});

// Schema.org
useSchemaOrg([
  defineProduct({
    name: product.value.name,
    description: product.value.description,
    image: product.value.images,
    sku: product.value.sku,
    brand: product.value.brand,
    offers: {
      price: product.value.sale_price || product.value.price,
      priceCurrency: "BRL",
      availability: product.value.stock > 0 ? "InStock" : "OutOfStock",
    },
  }),
]);
</script>
