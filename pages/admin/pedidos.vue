<!-- pages/admin/pedidos.vue -->
<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gerenciar Pedidos</h1>
          <p class="text-gray-600">
            Acompanhe e gerencie todos os pedidos da loja
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="fixPaidOrders"
            class="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Corrigir Status Pagos
          </button>
          <button
            @click="exportOrders"
            class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Número do pedido, email..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <select
              v-model="filters.period"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Todos os períodos</option>
              <option value="today">Hoje</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="quarter">Este trimestre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ações</label>
            <button
              @click="clearFilters"
              class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total de Pedidos</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pendentes</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pending || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Entregues</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.delivered || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center">
            <div class="p-3 bg-emerald-100 rounded-lg">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Receita Total</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(stats.revenue || 0) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Pedido</th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Cliente</th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Data</th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Total</th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                :key="order.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-4 px-6">
                  <div>
                    <p class="font-medium text-gray-800">#{{ order.order_number }}</p>
                    <p class="text-sm text-gray-600">{{ order.items?.length || 0 }} item(s)</p>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <div>
                    <p class="font-medium text-gray-800">{{ order.user?.full_name || order.customer_name }}</p>
                    <p class="text-sm text-gray-600">{{ order.user?.email || order.customer_email }}</p>
                  </div>
                </td>
                <td class="py-4 px-6 text-gray-600">
                  {{ formatDate(order.created_at) }}
                </td>
                <td class="py-4 px-6">
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(order.status)"
                  >
                    {{ getStatusLabel(order.status) }}
                  </span>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-800">
                  {{ formatCurrency(order.total_amount) }}
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewOrder(order)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Ver detalhes"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="updateOrderStatus(order)"
                      class="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Atualizar status"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      v-if="order.status === 'pending'"
                      @click="cancelOrder(order)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Cancelar pedido"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="orders.length === 0 && !loading" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
          <p class="text-gray-600">Não há pedidos que correspondam aos filtros aplicados.</p>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
        >
          <div class="text-sm text-gray-600">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a
            {{ Math.min(currentPage * itemsPerPage, totalOrders) }} de
            {{ totalOrders }} pedidos
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span class="px-3 py-2 text-sm bg-red-600 text-white rounded-lg">{{
              currentPage
            }}</span>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <OrderModal
      v-if="showOrderModal"
      :order="selectedOrder"
      @close="closeOrderModal"
      @update="handleOrderUpdate"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
// Middleware
definePageMeta({
  middleware: "admin-auth",
});

// Composables
const supabase = useSupabase();

// Estados
const orders = ref([]);
const stats = ref({});
const loading = ref(false);
const showOrderModal = ref(false);
const selectedOrder = ref(null);

const filters = ref({
  search: "",
  status: "",
  period: "",
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalOrders = ref(0);
const totalPages = computed(() =>
  Math.ceil(totalOrders.value / itemsPerPage.value)
);

// Funções do Supabase
const fetchOrders = async () => {
  loading.value = true;
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        user:user_id(full_name, email),
        order_items(*)
      `)
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters.value.search) {
      query = query.or(`order_number.ilike.%${filters.value.search}%,customer_email.ilike.%${filters.value.search}%`);
    }

    if (filters.value.status) {
      query = query.eq('status', filters.value.status);
    }

    if (filters.value.period) {
      const now = new Date();
      let startDate;
      
      switch (filters.value.period) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
      }
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
    }

    // Paginação
    const from = (currentPage.value - 1) * itemsPerPage.value;
    const to = from + itemsPerPage.value - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    orders.value = (data || []).map(order => ({
      ...order,
      items: order.order_items || []
    }));
    
    totalOrders.value = count || 0;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    alert('Erro ao carregar pedidos');
  } finally {
    loading.value = false;
  }
};

const fetchStats = async () => {
  try {
    // Buscar estatísticas
    const { data: statsData, error } = await supabase
      .from('orders')
      .select('status, total_amount');

    if (error) throw error;

    const ordersData = statsData || [];
    
    stats.value = {
      total: ordersData.length,
      pending: ordersData.filter(o => o.status === 'pending').length,
      delivered: ordersData.filter(o => o.status === 'delivered').length,
      revenue: ordersData.reduce((sum, o) => sum + (o.total_amount || 0), 0)
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
  }
};

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

const getStatusLabel = (status: string) => {
  const labels = {
    pending: "Pendente",
    confirmed: "Confirmado",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return labels[status] || status;
};

const clearFilters = () => {
  filters.value = {
    search: "",
    status: "",
    period: "",
  };
  currentPage.value = 1;
  fetchOrders();
};

const viewOrder = (order: any) => {
  selectedOrder.value = order;
  showOrderModal.value = true;
};

const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedOrder.value = null;
};

const handleOrderUpdate = async () => {
  await fetchOrders();
  await fetchStats();
  closeOrderModal();
};

const updateOrderStatus = async (order: any) => {
  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'processing', label: 'Processando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregue' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const newStatus = prompt(
    `Status atual: ${getStatusLabel(order.status)}\n\nNovo status:\n${statusOptions.map((s, i) => `${i + 1}. ${s.label}`).join('\n')}\n\nDigite o número da opção:`
  );

  if (newStatus && newStatus >= 1 && newStatus <= 6) {
    const selectedStatus = statusOptions[parseInt(newStatus) - 1];
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: selectedStatus.value })
        .eq('id', order.id);

      if (error) throw error;

      await fetchOrders();
      await fetchStats();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do pedido');
    }
  }
};

const cancelOrder = async (order: any) => {
  if (confirm(`Tem certeza que deseja cancelar o pedido #${order.order_number}?`)) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', order.id);

      if (error) throw error;

      await fetchOrders();
      await fetchStats();
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      alert('Erro ao cancelar pedido');
    }
  }
};

const fixPaidOrders = async () => {
  if (!confirm('Esta ação irá corrigir o status de todos os pedidos pagos. Deseja continuar?')) {
    return;
  }

  loading.value = true;
  
  try {
    // Buscar pedidos que têm payment_status 'paid' mas status ainda é 'pending'
    const { data: paidOrders, error: fetchError } = await supabase
      .from('orders')
      .select('id, order_number, status, payment_status')
      .eq('payment_status', 'paid')
      .neq('status', 'confirmed');

    if (fetchError) throw fetchError;

    if (!paidOrders || paidOrders.length === 0) {
      alert('Não foram encontrados pedidos pagos com status incorreto.');
      return;
    }

    console.log(`Encontrados ${paidOrders.length} pedidos pagos para corrigir status`);

    // Atualizar todos os pedidos pagos para status 'confirmed'
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('payment_status', 'paid')
      .neq('status', 'confirmed');

    if (updateError) throw updateError;

    alert(`${paidOrders.length} pedidos foram atualizados para status "Confirmado".`);

    // Recarregar dados
    await fetchOrders();
    await fetchStats();

  } catch (error) {
    console.error('Erro ao corrigir status dos pedidos:', error);
    alert('Erro ao corrigir status dos pedidos pagos');
  } finally {
    loading.value = false;
  }
};

const exportOrders = () => {
  // Implementar exportação CSV/Excel
  const csv = orders.value
    .map(order =>
      `${order.order_number},${order.customer_name || order.user?.full_name},${order.customer_email || order.user?.email},${formatDate(order.created_at)},${getStatusLabel(order.status)},${order.total_amount}`
    )
    .join("\n");

  const blob = new Blob([`Pedido,Cliente,Email,Data,Status,Total\n${csv}`], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pedidos.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

// Watchers
watch(
  () => filters.value,
  () => {
    currentPage.value = 1;
    fetchOrders();
  },
  { deep: true }
);

watch(currentPage, () => {
  fetchOrders();
});

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchOrders(),
    fetchStats()
  ]);
});
</script>