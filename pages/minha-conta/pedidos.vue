<template>
  <div class="bg-white min-h-screen">
    <!-- Header Amazon Style -->
    <div class="border-b border-gray-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-normal text-gray-900">Seus pedidos</h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ orders.length }}
              {{ orders.length === 1 ? "pedido" : "pedidos" }}
            </p>
          </div>

          <!-- Filtros Amazon Style -->
          <div class="flex items-center gap-4">
            <!-- Busca por pedido -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar pedidos..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Filtro de período -->
            <select
              v-model="periodFilter"
              class="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todos os períodos</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último ano</option>
            </select>

            <!-- Filtro de status -->
            <select
              v-model="statusFilter"
              class="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Todos os status</option>
              <option value="pending">Aguardando pagamento</option>
              <option value="confirmed">Confirmado</option>
              <option value="processing">Preparando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Loading State Amazon Style -->
      <div v-if="loading" class="space-y-6">
        <div
          v-for="i in 3"
          :key="i"
          class="border border-gray-200 rounded-lg overflow-hidden animate-pulse"
        >
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between">
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-32"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div class="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div class="p-6">
            <div class="flex gap-4">
              <div class="w-20 h-20 bg-gray-200 rounded"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Pedidos Amazon Style -->
      <div v-else-if="filteredOrders.length > 0" class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
        >
          <!-- Header do Pedido Amazon Style -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div
                  class="text-xs text-gray-600 uppercase font-medium mb-1 tracking-wide"
                >
                  Pedido Feito
                </div>
                <div class="text-gray-900">
                  {{ formatDate(order.created_at) }}
                </div>
              </div>

              <div>
                <div
                  class="text-xs text-gray-600 uppercase font-medium mb-1 tracking-wide"
                >
                  Total
                </div>
                <div class="text-gray-900 font-medium">
                  {{ formatPrice(order.total) }}
                </div>
              </div>

              <div>
                <div
                  class="text-xs text-gray-600 uppercase font-medium mb-1 tracking-wide"
                >
                  Enviar Para
                </div>
                <div class="text-gray-900">{{ order.customer_name }}</div>
              </div>

              <div class="text-right">
                <div
                  class="text-xs text-gray-600 uppercase font-medium mb-1 tracking-wide"
                >
                  Nº do Pedido
                </div>
                <div
                  class="text-blue-600 hover:text-orange-600 font-medium cursor-pointer"
                  @click="viewOrderDetails(order.id)"
                >
                  #{{ order.order_number || order.id }}
                </div>
              </div>
            </div>
          </div>

          <!-- Status e Entrega -->
          <div class="px-6 py-4 bg-white border-b border-gray-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  :class="getStatusClass(order.status)"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                >
                  <div
                    class="w-2 h-2 rounded-full mr-2"
                    :class="getStatusDotClass(order.status)"
                  ></div>
                  {{ getStatusText(order.status) }}
                </div>

                <div v-if="order.tracking_code" class="text-sm text-gray-600">
                  Código:
                  <span class="font-mono">{{ order.tracking_code }}</span>
                </div>
              </div>

              <div class="flex gap-2">
                <button
                  v-if="order.tracking_code"
                  @click="trackOrder(order.tracking_code)"
                  class="text-blue-600 hover:text-orange-600 text-sm font-medium hover:underline"
                >
                  Rastrear pacote
                </button>
              </div>
            </div>
          </div>

          <!-- Produtos do Pedido Amazon Style -->
          <div class="px-6 py-4">
            <div class="space-y-4">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex gap-4 hover:bg-blue-50/30 -mx-2 px-3 py-3 rounded-lg bg-gray-50/50"
              >
                <!-- Imagem do produto -->
                <div class="flex-shrink-0">
                  <div
                    class="w-20 h-20 rounded border border-gray-200 bg-white overflow-hidden shadow-sm"
                  >
                    <img
                      v-if="productImages[item.product_id]"
                      :src="productImages[item.product_id]"
                      :alt="item.product_name"
                      :data-product-id="item.product_id"
                      class="w-full h-full object-contain"
                      @error="onImageError"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-gray-300"
                    >
                      <svg
                        class="w-8 h-8"
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
                  </div>
                </div>

                <!-- Informações do produto -->
                <div class="flex-1 min-w-0">
                  <h4
                    class="text-blue-600 hover:text-orange-600 font-normal cursor-pointer line-clamp-2"
                  >
                    {{ item.product_name }}
                  </h4>
                  <div
                    class="flex items-center gap-4 mt-2 text-sm text-gray-600"
                  >
                    <span>Qtd: {{ item.quantity }}</span>
                    <span
                      >{{
                        formatPrice(item.unit_price || item.price)
                      }}
                      cada</span
                    >
                  </div>
                </div>

                <!-- Preço do item -->
                <div class="text-right">
                  <div class="font-medium text-gray-900">
                    {{
                      formatPrice(
                        (item.unit_price || item.price) * item.quantity
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Ações do Pedido Amazon Style -->
            <div
              class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200"
            >
              <div class="flex gap-4">
                <button
                  @click="viewOrderDetails(order.id)"
                  class="text-blue-600 hover:text-orange-600 text-sm font-medium hover:underline"
                >
                  Ver detalhes do pedido
                </button>

                <button
                  v-if="order.status === 'delivered'"
                  class="text-blue-600 hover:text-orange-600 text-sm font-medium hover:underline"
                >
                  Fazer devolução ou troca
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado Vazio Amazon Style -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div
            class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          <h3 class="text-xl font-normal text-gray-900 mb-3">
            {{
              searchQuery || statusFilter || periodFilter
                ? "Nenhum pedido encontrado"
                : "Você ainda não fez nenhum pedido"
            }}
          </h3>

          <p class="text-gray-600 mb-8 leading-relaxed">
            {{
              searchQuery || statusFilter || periodFilter
                ? "Tente ajustar seus filtros para encontrar o que você está procurando."
                : "Quando você fizer um pedido, ele aparecerá aqui para que você possa acompanhar o progresso da entrega."
            }}
          </p>

          <div class="space-y-3">
            <NuxtLink
              to="/produtos"
              class="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded text-sm"
            >
              Começar a comprar
            </NuxtLink>

            <div v-if="searchQuery || statusFilter || periodFilter">
              <button
                @click="clearFilters"
                class="block mx-auto text-blue-600 hover:text-orange-600 text-sm hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginação Amazon Style -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <nav class="flex items-center gap-1">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹ Anterior
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-2 text-sm font-medium rounded',
              currentPage === page
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 hover:bg-gray-100',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo ›
          </button>
        </nav>
      </div>
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
const searchQuery = ref("");
const periodFilter = ref("");
const currentPage = ref(1);
const ordersPerPage = 10;
const productImages = ref<Record<string, string>>({});

// Computed
const filteredOrders = computed(() => {
  let filtered = orders.value;

  // Filtro por status
  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value);
  }

  // Filtro por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.id.toString().includes(query) ||
        order.order_number?.toLowerCase().includes(query) ||
        order.customer_name?.toLowerCase().includes(query) ||
        order.items?.some((item) =>
          item.product_name?.toLowerCase().includes(query)
        )
    );
  }

  // Filtro por período
  if (periodFilter.value) {
    const days = parseInt(periodFilter.value);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    filtered = filtered.filter(
      (order) => new Date(order.created_at) >= cutoffDate
    );
  }

  // Paginação
  const start = (currentPage.value - 1) * ordersPerPage;
  const end = start + ordersPerPage;

  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  let filtered = orders.value;

  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.id.toString().includes(query) ||
        order.order_number?.toLowerCase().includes(query) ||
        order.customer_name?.toLowerCase().includes(query) ||
        order.items?.some((item) =>
          item.product_name?.toLowerCase().includes(query)
        )
    );
  }
  if (periodFilter.value) {
    const days = parseInt(periodFilter.value);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    filtered = filtered.filter(
      (order) => new Date(order.created_at) >= cutoffDate
    );
  }

  return Math.ceil(filtered.length / ordersPerPage);
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages.filter(
    (page) => page !== "..." || pages.indexOf(page) === pages.lastIndexOf(page)
  );
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
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    processing: "bg-purple-100 text-purple-800 border-purple-200",
    shipped: "bg-orange-100 text-orange-800 border-orange-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };
  return classes[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getStatusDotClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    processing: "bg-purple-500",
    shipped: "bg-orange-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };
  return classes[status] || "bg-gray-500";
};

const getStatusText = (status: string) => {
  const texts = {
    pending: "Aguardando pagamento",
    confirmed: "Pedido confirmado",
    processing: "Preparando envio",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return texts[status] || "Status desconhecido";
};

const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  periodFilter.value = "";
  currentPage.value = 1;
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
      .from("products")
      .select("id, images")
      .in("id", Array.from(productIds));

    if (error) {
      console.error("Erro ao buscar imagens dos produtos:", error);
      return;
    }

    // Processar e armazenar as imagens
    products?.forEach((product: any) => {
      let images = product.images;

      // Se as imagens são string, tentar converter para array
      if (typeof images === "string") {
        try {
          images = JSON.parse(images);
        } catch (e) {
          console.error("Erro ao converter imagens:", e);
          return;
        }
      }

      // Se há imagens válidas, usar a primeira
      if (Array.isArray(images) && images.length > 0) {
        const imageUrl = getCloudinaryImage(images[0], "small");
        productImages.value[product.id] = imageUrl;
      }
    });
  } catch (error) {
    console.error("Erro ao carregar imagens dos produtos:", error);
  }
};

const onImageError = (event: Event) => {
  // Remove a imagem com erro para mostrar o placeholder SVG
  const img = event.target as HTMLImageElement;
  const productId = img.getAttribute("data-product-id");
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
onMounted(async () => {
  // Aguardar autenticação estar pronta antes de buscar pedidos
  const { isLoggedIn } = useAuth();

  let attempts = 0;
  while (!isLoggedIn.value && attempts < 20) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    attempts++;
  }

  if (isLoggedIn.value) {
    fetchOrders();
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
