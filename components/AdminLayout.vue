<!-- components/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Admin -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-30">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <!-- Logo -->
            <NuxtLink to="/admin" class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"
              >
                <span class="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-800">Admin Atapera</h1>
              </div>
            </NuxtLink>

            <!-- Breadcrumb -->
            <nav
              class="hidden md:flex items-center gap-2 text-sm text-gray-600"
            >
              <NuxtLink to="/admin" class="hover:text-red-600 transition-colors"
                >Dashboard</NuxtLink
              >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span class="text-gray-800 font-medium">{{
                currentPageName
              }}</span>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div
                  class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-sm font-medium">{{
                    userInitials
                  }}</span>
                </div>
                <div class="hidden sm:block text-left">
                  <p class="text-sm font-medium text-gray-800">
                    {{ user?.email?.split("@")[0] }}
                  </p>
                  <p class="text-xs text-gray-600">Administrador</p>
                </div>
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                v-click-outside="() => (showUserMenu = false)"
                class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <NuxtLink
                  to="/admin/perfil"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Meu Perfil
                </NuxtLink>
                <NuxtLink
                  to="/admin/configuracoes"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Configurações
                </NuxtLink>
                <NuxtLink
                  to="/"
                  target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Ver Site
                </NuxtLink>
                <hr class="my-2" />
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="w-64 bg-white shadow-sm h-screen sticky top-16 overflow-y-auto"
      >
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
                <span
                  v-if="stats.produtosBaixoEstoque > 0"
                  class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-auto"
                >
                  {{ stats.produtosBaixoEstoque }}
                </span>
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

          <!-- Quick Stats -->
          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-700 mb-3">
              Resumo Rápido
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Produtos</span>
                <span class="font-medium">{{ stats.produtosAtivos }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Pedidos Hoje</span>
                <span class="font-medium">{{ stats.pedidosHoje }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Vendas Hoje</span>
                <span class="font-medium text-green-600">{{
                  formatCurrency(stats.vendasHoje)
                }}</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, signOut } = useAuth();
const route = useRoute();
const authStore = useAuth();

// Estados
const showUserMenu = ref(false);

// Stats mockados (em produção, viriam do Supabase)
const stats = ref({
  produtosAtivos: 156,
  produtosBaixoEstoque: 12,
  pedidosPendentes: 8,
  pedidosHoje: 15,
  vendasHoje: 15750.5,
});

// Computed
const currentPageName = computed(() => {
  const pathMap = {
    "/admin": "Dashboard",
    "/admin/produtos": "Produtos",
    "/admin/pedidos": "Pedidos",
    "/admin/usuarios": "Usuários",
    "/admin/financeiro": "Financeiro",
    "/admin/configuracoes": "Configurações",
  };

  return pathMap[route.path] || "Admin";
});

const userInitials = computed(() => {
  if (!user.value?.email) return "A";
  return user.value.email.charAt(0).toUpperCase();
});

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const logout = async () => {

  try {
    await authStore.signOut();
  } catch (error) {
    console.error("🐛 MINHA-CONTA - Erro no logout:", error);
  }
};

// Click outside directive
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
</script>
