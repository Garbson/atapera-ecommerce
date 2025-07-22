<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Meus Pedidos</h2>

      <!-- Filtros -->
      <select
        v-model="statusFilter"
        class="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="">Todos os Status</option>
        <option value="pending">Pendente</option>
        <option value="confirmed">Confirmado</option>
        <option value="processing">Processando</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregue</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="border rounded-lg p-4 animate-pulse">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Lista de Pedidos -->
    <div v-else-if="filteredOrders.length > 0" class="space-y-4">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Header do Pedido -->
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-medium text-gray-900">Pedido #{{ order.id }}</h3>
              <p class="text-sm text-gray-600">
                Feito em {{ formatDate(order.created_at) }}
              </p>
            </div>

            <div class="text-right">
              <span
                :class="getStatusClass(order.status)"
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ getStatusText(order.status) }}
              </span>
              <p class="text-sm font-medium text-gray-900 mt-1">
                {{ formatPrice(order.total) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Produtos do Pedido -->
        <div class="p-4">
          <div class="space-y-3">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4"
            >
              <!-- Imagem do produto ou placeholder -->
              <div class="w-16 h-16 rounded-lg border bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  v-if="productImages[item.product_id]"
                  :src="productImages[item.product_id]"
                  :alt="item.product_name"
                  :data-product-id="item.product_id"
                  class="w-full h-full object-cover"
                  @error="onImageError"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div class="flex-1">
                <h4 class="font-medium text-gray-900">
                  {{ item.product_name }}
                </h4>
                <p class="text-sm text-gray-600">
                  Quantidade: {{ item.quantity }} ×
                  {{ formatPrice(item.price) }}
                </p>
              </div>

              <div class="text-right">
                <p class="font-medium">
                  {{ formatPrice(item.quantity * item.price) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Ações do Pedido -->
          <div
            class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200"
          >
            <div class="flex gap-2">
              <button
                @click="viewOrderDetails(order.id)"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Ver Detalhes
              </button>

              <button
                v-if="order.tracking_code"
                @click="trackOrder(order.tracking_code)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Rastrear Pedido
              </button>
            </div>

            <div class="flex gap-2">
              <button
                v-if="canCancel(order.status)"
                @click="cancelOrder(order.id)"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Cancelar
              </button>

              <button
                v-if="canReorder(order.status)"
                @click="reorderItems(order.id)"
                class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
              >
                Comprar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado Vazio -->
    <div v-else class="text-center py-12">
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Nenhum pedido encontrado
      </h3>
      <p class="text-gray-600 mb-6">
        Você ainda não fez nenhum pedido ou não há pedidos com o filtro
        selecionado.
      </p>
      <NuxtLink
        to="/produtos"
        class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
      >
        Começar a Comprar
      </NuxtLink>
    </div>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-2 rounded-lg text-sm',
            currentPage === page
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ page }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { getProductImage: getCloudinaryImage } = useCloudinary();

// Estados
const loading = ref(true);
const orders = ref([]);
const statusFilter = ref("");
const currentPage = ref(1);
const ordersPerPage = 10;
const productImages = ref<Record<string, string>>({});

// Computed
const filteredOrders = computed(() => {
  let filtered = orders.value;

  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value);
  }

  const start = (currentPage.value - 1) * ordersPerPage;
  const end = start + ordersPerPage;

  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  let filtered = orders.value;
  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value);
  }
  return Math.ceil(filtered.length / ordersPerPage);
});

// Métodos
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const getStatusClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status: string) => {
  const texts = {
    pending: "Pendente",
    confirmed: "Confirmado",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return texts[status] || "Desconhecido";
};

const canCancel = (status: string) => {
  return ["pending", "processing"].includes(status);
};

const canReorder = (status: string) => {
  return ["delivered", "cancelled"].includes(status);
};

const viewOrderDetails = (orderId: string) => {
  navigateTo(`/minha-conta/pedidos/${orderId}`);
};

const trackOrder = (trackingCode: string) => {
  // Implementar rastreamento
  window.open(
    `https://rastreamento.correios.com.br/objeto/${trackingCode}`,
    "_blank"
  );
};

const cancelOrder = async (orderId: string) => {
  if (!confirm("Tem certeza que deseja cancelar este pedido?")) return;

  try {
    // Usar o store de pedidos em vez de API direta
    const ordersStore = useOrdersStore();
    const { error } = await ordersStore.cancelOrder(orderId);
    
    if (error) {
      throw new Error(error);
    }

    // Recarregar pedidos
    await fetchOrders();
    alert("Pedido cancelado com sucesso!");
  } catch (error) {
    alert("Erro ao cancelar pedido");
  }
};

const reorderItems = async (orderId: string) => {
  try {
    // Usar o store de pedidos em vez de API direta
    const ordersStore = useOrdersStore();
    const { error } = await ordersStore.reorderItems(orderId);
    
    if (error) {
      throw new Error(error);
    }

    navigateTo("/carrinho");
  } catch (error) {
    alert("Erro ao adicionar itens ao carrinho");
  }
};

// Função para carregar imagens dos produtos
const loadProductImages = async () => {
  const supabase = useSupabase();
  
  try {
    // Extrair todos os product_ids únicos dos pedidos
    const productIds = new Set<string>();
    orders.value.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        if (item.product_id) {
          productIds.add(item.product_id);
        }
      });
    });

    if (productIds.size === 0) return;

    // Buscar todas as imagens dos produtos de uma vez
    const { data: products, error } = await supabase
      .from('products')
      .select('id, images')
      .in('id', Array.from(productIds));

    if (error) {
      console.error('Erro ao buscar imagens dos produtos:', error);
      return;
    }

    // Processar e armazenar as imagens
    products?.forEach((product: any) => {
      let images = product.images;
      
      // Se as imagens são string, tentar converter para array
      if (typeof images === 'string') {
        try {
          images = JSON.parse(images);
        } catch (e) {
          console.error('Erro ao converter imagens:', e);
          return;
        }
      }

      // Se há imagens válidas, usar a primeira
      if (Array.isArray(images) && images.length > 0) {
        const imageUrl = getCloudinaryImage(images[0], 'small');
        productImages.value[product.id] = imageUrl;
      }
    });

  } catch (error) {
    console.error('Erro ao carregar imagens dos produtos:', error);
  }
};

const onImageError = (event: Event) => {
  // Remove a imagem com erro para mostrar o placeholder SVG
  const img = event.target as HTMLImageElement;
  const productId = img.getAttribute('data-product-id');
  if (productId && productImages.value[productId]) {
    delete productImages.value[productId];
  }
};

const fetchOrders = async () => {
  loading.value = true;

  try {
    // Usar o store de pedidos em vez de API direta
    const ordersStore = useOrdersStore();
    const { data, error } = await ordersStore.fetchUserOrders();
    
    if (error) {
      console.error("Erro ao buscar pedidos:", error);
    } else {
      orders.value = data || [];
      
      // Carregar imagens dos produtos após carregar os pedidos
      await loadProductImages();
    }
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
  } finally {
    loading.value = false;
  }
};

// Watchers
watch(statusFilter, () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(() => {
  fetchOrders();
});
</script>
