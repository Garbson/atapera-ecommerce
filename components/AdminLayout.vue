<!-- components/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <div
      class="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            @click="toggleMobileSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-lg font-semibold text-gray-800">
            {{ currentPageName }}
          </h1>
        </div>
        <button
          @click="logout"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            class="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="showMobileSidebar"
      class="lg:hidden fixed inset-0 z-50 flex"
      @click="closeMobileSidebar"
    >
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <nav
        class="relative flex flex-col w-80 max-w-xs bg-white shadow-xl"
        @click.stop
      >
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <h2 class="text-lg font-semibold text-gray-800">Menu Admin</h2>
          <button
            @click="closeMobileSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/admin"
                @click="closeMobileSidebar"
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
                @click="closeMobileSidebar"
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
                @click="closeMobileSidebar"
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
                to="/admin/configuracoes"
                @click="closeMobileSidebar"
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
        </div>
      </nav>
    </div>

    <div class="flex">
      <!-- Desktop Sidebar -->
      <aside
        class="hidden lg:flex w-64 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto"
      >
        <nav class="w-full p-6">
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
      <main class="flex-1 p-4 lg:p-6 min-w-0 max-w-full">
        <slot />
      </main>
    </div>

    <!-- Token Expiry Notification -->
    <TokenExpiryNotification />
  </div>
</template>

<script setup lang="ts">
const { user, signOut } = useAuth();
const route = useRoute();
const authStore = useAuth();

// Estados
const showUserMenu = ref(false);
const showMobileSidebar = ref(false);

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

const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value;
};

const closeMobileSidebar = () => {
  showMobileSidebar.value = false;
};

const logout = async () => {
  try {
    await authStore.signOut();
  } catch (error) {
    console.error("🐛 MINHA-CONTA - Erro no logout:", error);
  }
};

// Fechar sidebar mobile quando a rota muda
watch(
  () => route.path,
  () => {
    closeMobileSidebar();
  }
);

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
