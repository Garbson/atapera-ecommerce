<!-- pages/admin/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Admin -->
    <header class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
            <p class="text-gray-600">Painel de controle - Atapera</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Logado como</p>
              <p class="font-semibold text-gray-800">{{ user?.email }}</p>
            </div>
            <button
              @click="logout"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-sm h-screen sticky top-0">
        <nav class="p-6">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/admin"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{ 'bg-red-100 text-red-700': $route.path === '/admin' }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2H3a2 2 0 000 4zm0 0h14m-5 3a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/produtos"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-red-100 text-red-700':
                    $route.path.includes('/admin/produtos'),
                }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Produtos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/pedidos"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-red-100 text-red-700':
                    $route.path.includes('/admin/pedidos'),
                }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Pedidos
                <span
                  v-if="stats.pedidosPendentes > 0"
                  class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto"
                >
                  {{ stats.pedidosPendentes }}
                </span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/usuarios"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-red-100 text-red-700':
                    $route.path.includes('/admin/usuarios'),
                }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                Usuários
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/financeiro"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-red-100 text-red-700':
                    $route.path.includes('/admin/financeiro'),
                }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Financeiro
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/configuracoes"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                :class="{
                  'bg-red-100 text-red-700': $route.path.includes(
                    '/admin/configuracoes'
                  ),
                }"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Configurações
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Vendas Hoje</p>
                <p class="text-2xl font-bold text-gray-800">
                  {{ formatCurrency(stats.vendasHoje) }}
                </p>
                <p class="text-sm text-green-600 mt-1">+12% vs ontem</p>
              </div>
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Pedidos Pendentes</p>
                <p class="text-2xl font-bold text-gray-800">
                  {{ stats.pedidosPendentes }}
                </p>
                <p class="text-sm text-orange-600 mt-1">Requer atenção</p>
              </div>
              <div
                class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Produtos Ativos</p>
                <p class="text-2xl font-bold text-gray-800">
                  {{ stats.produtosAtivos }}
                </p>
                <p class="text-sm text-blue-600 mt-1">
                  {{ stats.produtosBaixoEstoque }} baixo estoque
                </p>
              </div>
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Novos Usuários</p>
                <p class="text-2xl font-bold text-gray-800">
                  {{ stats.novosUsuarios }}
                </p>
                <p class="text-sm text-purple-600 mt-1">Esta semana</p>
              </div>
              <div
                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Tables Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Sales Chart -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Vendas dos Últimos 7 Dias
            </h3>
            <div class="h-64 flex items-end justify-between gap-2">
              <div
                v-for="(day, index) in salesChart"
                :key="index"
                class="bg-red-500 rounded-t flex-1 relative group cursor-pointer hover:bg-red-600 transition-colors"
                :style="{
                  height: `${
                    (day.sales / Math.max(...salesChart.map((d) => d.sales))) *
                    100
                  }%`,
                }"
              >
                <div
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {{ formatCurrency(day.sales) }}
                </div>
                <div
                  class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600"
                >
                  {{ day.day }}
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Pedidos Recentes
              </h3>
              <NuxtLink
                to="/admin/pedidos"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Ver todos
              </NuxtLink>
            </div>
            <div class="space-y-4">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p class="font-medium text-gray-800">#{{ order.number }}</p>
                  <p class="text-sm text-gray-600">{{ order.customer }}</p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(order.date) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-800">
                    {{ formatCurrency(order.total) }}
                  </p>
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(order.status)"
                  >
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Produtos Mais Vendidos
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 font-medium text-gray-600">
                    Produto
                  </th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600">
                    Categoria
                  </th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600">
                    Vendas
                  </th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600">
                    Receita
                  </th>
                  <th class="text-left py-3 px-4 font-medium text-gray-600">
                    Estoque
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in topProducts"
                  :key="product.id"
                  class="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p class="font-medium text-gray-800">
                          {{ product.name }}
                        </p>
                        <p class="text-sm text-gray-600">
                          SKU: {{ product.sku }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-gray-600">
                    {{ product.category }}
                  </td>
                  <td class="py-3 px-4 font-medium text-gray-800">
                    {{ product.sales }}
                  </td>
                  <td class="py-3 px-4 font-medium text-green-600">
                    {{ formatCurrency(product.revenue) }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="inline-block px-2 py-1 text-xs rounded-full"
                      :class="
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ product.stock }} un.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Middleware para verificar se é admin
definePageMeta({
  middleware: "admin-auth",
});

const { user, signOut } = useAuth();

// Estados
const stats = ref({
  vendasHoje: 15750.5,
  pedidosPendentes: 8,
  produtosAtivos: 156,
  produtosBaixoEstoque: 12,
  novosUsuarios: 23,
});

const salesChart = ref([
  { day: "Seg", sales: 2500 },
  { day: "Ter", sales: 3200 },
  { day: "Qua", sales: 2800 },
  { day: "Qui", sales: 4100 },
  { day: "Sex", sales: 3800 },
  { day: "Sáb", sales: 5200 },
  { day: "Dom", sales: 4300 },
]);

const recentOrders = ref([
  {
    id: 1,
    number: "2025-001",
    customer: "João Silva",
    date: new Date("2025-01-22"),
    total: 899.9,
    status: "pending",
  },
  {
    id: 2,
    number: "2025-002",
    customer: "Maria Santos",
    date: new Date("2025-01-22"),
    total: 1299.5,
    status: "processing",
  },
  {
    id: 3,
    number: "2025-003",
    customer: "Carlos Oliveira",
    date: new Date("2025-01-21"),
    total: 750.0,
    status: "shipped",
  },
  {
    id: 4,
    number: "2025-004",
    customer: "Ana Costa",
    date: new Date("2025-01-21"),
    total: 2100.0,
    status: "delivered",
  },
]);

const topProducts = ref([
  {
    id: 1,
    name: "Pistola Glock G17",
    sku: "GLK-G17-001",
    category: "Armas de Fogo",
    sales: 45,
    revenue: 67500.0,
    stock: 8,
    image: "https://via.placeholder.com/40x40/374151/ffffff?text=G17",
  },
  {
    id: 2,
    name: "Vara Telescópica 3.6m",
    sku: "VAR-TEL-360",
    category: "Pesca",
    sales: 89,
    revenue: 16900.0,
    stock: 23,
    image: "https://via.placeholder.com/40x40/059669/ffffff?text=VAR",
  },
  {
    id: 3,
    name: "Carabina de Pressão CBC",
    sku: "CBC-CAR-001",
    category: "Armas de Pressão",
    sales: 34,
    revenue: 25500.0,
    stock: 0,
    image: "https://via.placeholder.com/40x40/2563eb/ffffff?text=CBC",
  },
]);

// Métodos utilitários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getStatusClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status as keyof typeof classes] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status: string) => {
  const labels = {
    pending: "Pendente",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return labels[status as keyof typeof labels] || status;
};

const logout = async () => {
  await signOut();
  await navigateTo("/admin/login");
};

// Carregar dados ao montar
onMounted(async () => {
  await loadDashboardData();
});

const loadDashboardData = async () => {
  try {
    // Aqui você carregaria os dados reais do Supabase
    // const { data } = await supabase.from('orders').select('*').limit(10);
    console.log("Dashboard carregado");
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  }
};
</script>
