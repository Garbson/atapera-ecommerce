<!-- pages/admin/index.vue -->
<template>
  <AdminLayout>
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
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-gray-600">Vendas Hoje</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-800">
                {{ formatCurrency(stats.vendasHoje) }}
              </p>
              <p class="text-xs sm:text-sm text-green-600 mt-1">Até agora hoje</p>
            </div>
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
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

        <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-gray-600">Pedidos Pendentes</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-800">
                {{ stats.pedidosPendentes }}
              </p>
              <p class="text-xs sm:text-sm text-orange-600 mt-1">
                Requer atenção
              </p>
            </div>
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"
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

        <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-gray-600">Produtos Ativos</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-800">
                {{ stats.produtosAtivos }}
              </p>
              <p class="text-xs sm:text-sm text-blue-600 mt-1">
                {{ stats.produtosBaixoEstoque }} baixo estoque
              </p>
            </div>
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
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

        <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-gray-600">Novos Usuários</p>
              <p class="text-lg sm:text-2xl font-bold text-gray-800">
                {{ stats.novosUsuarios }}
              </p>
              <p class="text-xs sm:text-sm text-purple-600 mt-1">Esta semana</p>
            </div>
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"
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
      <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 class="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Ações Rápidas
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <NuxtLink
            to="/admin/produtos"
            class="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-red-100 rounded-lg mr-3 flex-shrink-0">
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
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
              <p class="text-sm sm:text-base font-medium text-gray-800">
                Gerenciar Produtos
              </p>
              <p class="text-xs sm:text-sm text-gray-600">
                Adicionar, editar e organizar produtos
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/admin/categorias"
            class="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
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
              <p class="text-sm sm:text-base font-medium text-gray-800">
                Categorias
              </p>
              <p class="text-xs sm:text-sm text-gray-600">
                Organizar categorias de produtos
              </p>
            </div>
          </NuxtLink>

          <button
            class="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-green-100 rounded-lg mr-3 flex-shrink-0">
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
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
              <p class="text-sm sm:text-base font-medium text-gray-800">
                Relatórios
              </p>
              <p class="text-xs sm:text-sm text-gray-600">
                Visualizar estatísticas e relatórios
              </p>
            </div>
          </button>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Produtos Mais Recentes
        </h3>
        <div class="overflow-x-auto -mx-4 sm:mx-0">
          <table class="w-full min-w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th
                  class="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm"
                >
                  Produto
                </th>
                <th
                  class="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm hidden sm:table-cell"
                >
                  Categoria
                </th>
                <th
                  class="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm"
                >
                  Preço
                </th>
                <th
                  class="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm"
                >
                  Estoque
                </th>
                <th
                  class="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-600 text-xs sm:text-sm hidden md:table-cell"
                >
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
                <td class="py-2 sm:py-3 px-2 sm:px-4">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-4 h-4 sm:w-6 sm:h-6 text-gray-400"
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
                    <div class="min-w-0">
                      <p
                        class="text-xs sm:text-sm font-medium text-gray-800 truncate"
                      >
                        {{ product.name }}
                      </p>
                      <p class="text-xs text-gray-600 sm:hidden">
                        {{ getCategoryName(product.category_id) }}
                      </p>
                      <p class="text-xs text-gray-600 hidden sm:block">
                        SKU: {{ product.sku }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell"
                >
                  {{ getCategoryName(product.category_id) }}
                </td>
                <td
                  class="py-2 sm:py-3 px-2 sm:px-4 font-medium text-green-600 text-xs sm:text-sm"
                >
                  {{ formatCurrency(product.price) }}
                </td>
                <td class="py-2 sm:py-3 px-2 sm:px-4">
                  <span
                    class="inline-block px-1 sm:px-2 py-1 text-xs rounded-full"
                    :class="getStockClass(product.stock)"
                  >
                    {{ product.stock }}
                  </span>
                </td>
                <td class="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">
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
  </AdminLayout>
</template>

<script setup lang="ts">
// Middleware para verificar se é admin
definePageMeta({
  middleware: "admin-auth",
});

const supabase = useSupabase();
const user = useSupabase();
const authStore = useAuth();

// Estados
const loading = ref(true);
const stats = ref({
  vendasHoje: 0,
  pedidosPendentes: 0,
  produtosAtivos: 0,
  produtosBaixoEstoque: 0,
  novosUsuarios: 0,
});

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  is_active: boolean;
  category_id: string;
  created_at: string;
}

const recentProducts = ref<Product[]>([]);

// Métodos utilitários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const categoriesStore = useCategoriesStore();

const getCategoryName = (categoryId: string) => {
  const category = categoriesStore.getCategoryById(categoryId);
  return category?.name || "Categoria não encontrada";
};

const getStockClass = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-800";
  if (stock <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const logout = async () => {
  try {
    await authStore.signOut();
  } catch (error) {
    console.error("🐛 MINHA-CONTA - Erro no logout:", error);
  }
};

// Carregar dados do dashboard
const loadDashboardData = async () => {
  try {
    loading.value = true;

    // 0. Carregar categorias primeiro para o mapeamento
    await categoriesStore.fetchCategories();

    // 1. Carregar estatísticas dos produtos
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, price, stock, is_active, category_id, name, sku, created_at")
      .order("created_at", { ascending: false });

    if (productsError) throw productsError;

    if (products) {
      // Calcular estatísticas de produtos
      stats.value.produtosAtivos = products.filter((p: Product) => p.is_active).length;
      stats.value.produtosBaixoEstoque = products.filter(
        (p: Product) => p.stock <= 5
      ).length;

      // Produtos mais recentes (últimos 5)
      recentProducts.value = products.slice(0, 5);
    }

    // 2. Carregar vendas de hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const { data: vendasHoje, error: vendasError } = await supabase
      .from("orders")
      .select("total")
      .gte("created_at", hoje.toISOString())
      .lt("created_at", amanha.toISOString())
      .eq("status", "paid");

    if (!vendasError && vendasHoje) {
      stats.value.vendasHoje = vendasHoje.reduce(
        (total: number, order: any) => total + (order.total || 0),
        0
      );
    }

    // 3. Carregar pedidos pendentes
    const { count: pedidosPendentes, error: pedidosError } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "processing", "confirmed"]);

    if (!pedidosError) {
      stats.value.pedidosPendentes = pedidosPendentes || 0;
    }

    // 4. Carregar novos usuários desta semana
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);

    const { count: novosUsuarios, error: usuariosError } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", umaSemanaAtras.toISOString());

    if (!usuariosError) {
      stats.value.novosUsuarios = novosUsuarios || 0;
    }
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
    // Em caso de erro, manter zeros em vez de dados fictícios
    stats.value = {
      vendasHoje: 0,
      pedidosPendentes: 0,
      produtosAtivos: 0,
      produtosBaixoEstoque: 0,
      novosUsuarios: 0,
    };
  } finally {
    loading.value = false;
  }
};

// Carregar dados ao montar
onMounted(() => {
  loadDashboardData();
});
</script>
