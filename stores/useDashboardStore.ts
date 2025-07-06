// stores/useDashboardStore.ts
export const useDashboardStore = defineStore("dashboard", () => {
  const supabase = useSupabaseClient();

  // Estado
  const loading = ref(false);
  const error = ref(null);
  const stats = ref({
    vendasHoje: 0,
    vendasMes: 0,
    vendasAno: 0,
    pedidosPendentes: 0,
    pedidosProcessando: 0,
    pedidosEntregues: 0,
    produtosAtivos: 0,
    produtosInativos: 0,
    produtosBaixoEstoque: 0,
    produtosSemEstoque: 0,
    novosUsuarios: 0,
    totalUsuarios: 0,
    totalCategorias: 0,
  });

  const recentProducts = ref([]);
  const recentOrders = ref([]);
  const salesChart = ref([]);
  const topProducts = ref([]);

  // Types
  interface DashboardStats {
    vendasHoje: number;
    vendasMes: number;
    vendasAno: number;
    pedidosPendentes: number;
    pedidosProcessando: number;
    pedidosEntregues: number;
    produtosAtivos: number;
    produtosInativos: number;
    produtosBaixoEstoque: number;
    produtosSemEstoque: number;
    novosUsuarios: number;
    totalUsuarios: number;
    totalCategorias: number;
  }

  interface SalesData {
    date: string;
    day: string;
    sales: number;
    orders: number;
  }

  interface RecentProduct {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    category_id: string;
    is_active: boolean;
    created_at: string;
  }

  interface RecentOrder {
    id: string;
    number: string;
    customer: string;
    total: number;
    status: string;
    created_at: string;
  }

  interface TopProduct {
    id: string;
    name: string;
    sku: string;
    category: string;
    sales: number;
    revenue: number;
    stock: number;
  }

  // Actions
  const loadDashboardData = async () => {
    try {
      loading.value = true;
      error.value = null;

      await Promise.all([
        loadProductStats(),
        loadRecentProducts(),
        loadSalesData(),
        // loadOrderStats(),
        // loadUserStats(),
      ]);
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao carregar dados do dashboard:", err);
    } finally {
      loading.value = false;
    }
  };

  const loadProductStats = async () => {
    try {
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, stock, min_stock, is_active, price, category_id");

      if (productsError) throw productsError;

      if (products) {
        const active = products.filter((p) => p.is_active);
        const inactive = products.filter((p) => !p.is_active);
        const lowStock = products.filter((p) => p.stock <= (p.min_stock || 5));
        const outOfStock = products.filter((p) => p.stock === 0);

        stats.value.produtosAtivos = active.length;
        stats.value.produtosInativos = inactive.length;
        stats.value.produtosBaixoEstoque = lowStock.length;
        stats.value.produtosSemEstoque = outOfStock.length;

        // Contar categorias únicas
        const categories = new Set(products.map((p) => p.category_id));
        stats.value.totalCategorias = categories.size;
      }
    } catch (err: any) {
      console.error("Erro ao carregar estatísticas de produtos:", err);
    }
  };

  const loadRecentProducts = async () => {
    try {
      const { data, error: productsError } = await supabase
        .from("products")
        .select(
          "id, name, sku, price, stock, category_id, is_active, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(5);

      if (productsError) throw productsError;

      recentProducts.value = data || [];
    } catch (err: any) {
      console.error("Erro ao carregar produtos recentes:", err);
    }
  };

  const loadSalesData = async () => {
    try {
      // Simular dados de vendas dos últimos 7 dias
      // Em uma implementação real, você buscaria da tabela de pedidos
      const last7Days = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

        last7Days.push({
          date: date.toISOString().split("T")[0],
          day: dayNames[date.getDay()],
          sales: Math.random() * 5000 + 1000, // Simular vendas
          orders: Math.floor(Math.random() * 20) + 5, // Simular pedidos
        });
      }

      salesChart.value = last7Days;

      // Simular estatísticas de vendas
      stats.value.vendasHoje = last7Days[6]?.sales || 0;
      stats.value.vendasMes =
        last7Days.reduce((sum, day) => sum + day.sales, 0) * 4;
      stats.value.vendasAno = stats.value.vendasMes * 12;
    } catch (err: any) {
      console.error("Erro ao carregar dados de vendas:", err);
    }
  };

  const loadOrderStats = async () => {
    try {
      // Quando tiver tabela de pedidos, implementar aqui
      // const { data: orders, error } = await supabase
      //   .from('orders')
      //   .select('id, status, total, created_at')

      // Por enquanto, simular dados
      stats.value.pedidosPendentes = Math.floor(Math.random() * 15) + 5;
      stats.value.pedidosProcessando = Math.floor(Math.random() * 10) + 2;
      stats.value.pedidosEntregues = Math.floor(Math.random() * 50) + 20;

      // Simular pedidos recentes
      recentOrders.value = [
        {
          id: "1",
          number: "2025-001",
          customer: "João Silva",
          total: 899.9,
          status: "pending",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          number: "2025-002",
          customer: "Maria Santos",
          total: 1299.5,
          status: "processing",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
    } catch (err: any) {
      console.error("Erro ao carregar estatísticas de pedidos:", err);
    }
  };

  const loadUserStats = async () => {
    try {
      // Quando tiver tabela de usuários, implementar aqui
      // const { data: users, error } = await supabase
      //   .from('profiles')
      //   .select('id, created_at')

      // Por enquanto, simular dados
      stats.value.totalUsuarios = Math.floor(Math.random() * 1000) + 500;
      stats.value.novosUsuarios = Math.floor(Math.random() * 30) + 10;
    } catch (err: any) {
      console.error("Erro ao carregar estatísticas de usuários:", err);
    }
  };

  const loadTopProducts = async () => {
    try {
      // Quando tiver dados de vendas, implementar consulta real
      // Por enquanto, buscar produtos e simular vendas
      const { data: products, error } = await supabase
        .from("products")
        .select("id, name, sku, category_id, price, stock")
        .eq("is_active", true)
        .limit(10);

      if (error) throw error;

      if (products) {
        topProducts.value = products
          .map((product) => ({
            ...product,
            category: getCategoryName(product.category_id),
            sales: Math.floor(Math.random() * 100) + 10,
            revenue: (Math.floor(Math.random() * 100) + 10) * product.price,
          }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
      }
    } catch (err: any) {
      console.error("Erro ao carregar produtos mais vendidos:", err);
    }
  };

  const refreshStats = async () => {
    await loadDashboardData();
  };

  const getRevenueStats = () => {
    return {
      today: stats.value.vendasHoje,
      month: stats.value.vendasMes,
      year: stats.value.vendasAno,
      growth: {
        daily: 12, // Simular crescimento
        monthly: 8,
        yearly: 15,
      },
    };
  };

  const getProductStats = () => {
    return {
      total: stats.value.produtosAtivos + stats.value.produtosInativos,
      active: stats.value.produtosAtivos,
      inactive: stats.value.produtosInativos,
      lowStock: stats.value.produtosBaixoEstoque,
      outOfStock: stats.value.produtosSemEstoque,
      categories: stats.value.totalCategorias,
    };
  };

  const getOrderStats = () => {
    return {
      pending: stats.value.pedidosPendentes,
      processing: stats.value.pedidosProcessando,
      delivered: stats.value.pedidosEntregues,
      total:
        stats.value.pedidosPendentes +
        stats.value.pedidosProcessando +
        stats.value.pedidosEntregues,
    };
  };

  const getUserStats = () => {
    return {
      total: stats.value.totalUsuarios,
      new: stats.value.novosUsuarios,
      growth: Math.round(
        (stats.value.novosUsuarios / stats.value.totalUsuarios) * 100
      ),
    };
  };

  // Utility functions
  const getCategoryName = (categoryId: string) => {
    const categories = {
      "3eebaee1-c85d-4b67-9af1-5619764b7307": "Armas de Fogo",
      "d3f1376d-92ea-4a9b-a367-80456b9f0063": "Armas de Pressão",
      "3b6c5fb9-e0f3-474b-8cc2-e36dd327d2aa": "Pesca",
      "uuid-airsoft": "Airsoft",
      "e3afc893-b4c0-43a6-9900-c1208b1372ed": "Caça",
      "2a6c0a33-0025-4cce-a306-db578a19a4f2": "Vestuário",
    };
    return categories[categoryId] || categoryId;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const clearError = () => {
    error.value = null;
  };

  // Getters computados
  const totalRevenue = computed(() => stats.value.vendasAno);
  const totalProducts = computed(
    () => stats.value.produtosAtivos + stats.value.produtosInativos
  );
  const totalOrders = computed(
    () =>
      stats.value.pedidosPendentes +
      stats.value.pedidosProcessando +
      stats.value.pedidosEntregues
  );

  return {
    // Estado
    loading: readonly(loading),
    error: readonly(error),
    stats: readonly(stats),
    recentProducts: readonly(recentProducts),
    recentOrders: readonly(recentOrders),
    salesChart: readonly(salesChart),
    topProducts: readonly(topProducts),

    // Getters
    totalRevenue,
    totalProducts,
    totalOrders,

    // Actions
    loadDashboardData,
    loadProductStats,
    loadRecentProducts,
    loadSalesData,
    loadOrderStats,
    loadUserStats,
    loadTopProducts,
    refreshStats,

    // Utility functions
    getRevenueStats,
    getProductStats,
    getOrderStats,
    getUserStats,
    getCategoryName,
    formatCurrency,
    formatDate,
    clearError,
  };
});
