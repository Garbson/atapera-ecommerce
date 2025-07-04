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
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
          ></div>
        </div>

        <!-- Dashboard Content -->
        <div v-else>
          <!-- Stats Cards -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
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

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Ações Rápidas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NuxtLink
                to="/admin/produtos"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="p-2 bg-red-100 rounded-lg mr-3">
                  <svg
                    class="w-5 h-5 text-red-600"
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
                <div>
                  <p class="font-medium text-gray-800">Gerenciar Produtos</p>
                  <p class="text-sm text-gray-600">
                    Adicionar, editar e organizar produtos
                  </p>
                </div>
              </NuxtLink>

              <button
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="p-2 bg-blue-100 rounded-lg mr-3">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Categorias</p>
                  <p class="text-sm text-gray-600">
                    Organizar categorias de produtos
                  </p>
                </div>
              </button>

              <button
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="p-2 bg-green-100 rounded-lg mr-3">
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Relatórios</p>
                  <p class="text-sm text-gray-600">
                    Visualizar estatísticas e relatórios
                  </p>
                </div>
              </button>
            </div>
          </div>

          <!-- Top Products -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Produtos Mais Recentes
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
                      Preço
                    </th>
                    <th class="text-left py-3 px-4 font-medium text-gray-600">
                      Estoque
                    </th>
                    <th class="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="product in recentProducts"
                    :key="product.id"
                    class="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                        >
                          <svg
                            class="w-6 h-6 text-gray-400"
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
                      {{ getCategoryName(product.category_id) }}
                    </td>
                    <td class="py-3 px-4 font-medium text-green-600">
                      {{ formatCurrency(product.price) }}
                    </td>
                    <td class="py-3 px-4">
                      <span
                        class="inline-block px-2 py-1 text-xs rounded-full"
                        :class="getStockClass(product.stock)"
                      >
                        {{ product.stock }} un.
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span
                        class="inline-block px-2 py-1 text-xs rounded-full"
                        :class="
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        "
                      >
                        {{ product.is_active ? "Ativo" : "Inativo" }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

const supabase = useSupabase();
const user = useSupabase();

// Estados
const loading = ref(true);
const stats = ref({
  vendasHoje: 0,
  pedidosPendentes: 0,
  produtosAtivos: 0,
  produtosBaixoEstoque: 0,
  novosUsuarios: 0,
});

const recentProducts = ref([]);

// Métodos utilitários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getCategoryName = (categoryId: string) => {
  const categories = {
    "uuid-armas-fogo": "Armas de Fogo",
    "uuid-armas-pressao": "Armas de Pressão",
    "uuid-pesca": "Pesca",
    "uuid-airsoft": "Airsoft",
    "uuid-caca": "Caça",
    "uuid-vestuario": "Vestuário",
  };
  return categories[categoryId] || categoryId;
};

const getStockClass = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-800";
  if (stock <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const logout = async () => {
  try {
    await supabase.auth.signOut();
    await navigateTo("/admin/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

// Carregar dados do dashboard
const loadDashboardData = async () => {
  try {
    loading.value = true;

    // Carregar estatísticas dos produtos
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, price, stock, is_active, category_id, name, sku, created_at")
      .order("created_at", { ascending: false });

    if (productsError) throw productsError;

    if (products) {
      // Calcular estatísticas
      stats.value.produtosAtivos = products.filter((p) => p.is_active).length;
      stats.value.produtosBaixoEstoque = products.filter(
        (p) => p.stock <= 5
      ).length;

      // Produtos mais recentes (últimos 5)
      recentProducts.value = products.slice(0, 5);
    }

    // Aqui você pode adicionar outras consultas para:
    // - Pedidos pendentes
    // - Vendas do dia
    // - Novos usuários

    // Simular alguns dados para demonstração
    stats.value.vendasHoje = 15750.5;
    stats.value.pedidosPendentes = 8;
    stats.value.novosUsuarios = 23;
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
  } finally {
    loading.value = false;
  }
};

// Carregar dados ao montar
onMounted(() => {
  loadDashboardData();
});
</script>
