<!-- components/AppHeader.vue - VERSÃO COMPLETA CORRIGIDA -->
<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <!-- Main Header -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Atapera</h1>
            <p class="text-xs text-gray-500">Armas, Pesca & Aventura</p>
          </div>
        </NuxtLink>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar produtos..."
              class="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              @keyup.enter="performSearch"
            />
            <button
              @click="performSearch"
              class="absolute right-0 top-0 h-full px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- User Menu -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              data-user-menu-button
              class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span class="hidden sm:block text-sm text-gray-700">
                {{ isLoggedIn ? "Minha Conta" : "Entrar" }}
              </span>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              v-click-outside="handleClickOutside"
              class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
            >
              <!-- Usuário Logado -->
              <template v-if="isLoggedIn">
                <div class="px-4 py-3 border-b border-gray-100">
                  <div
                    class="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1"
                  >
                    Conta
                  </div>
                  <div class="text-sm text-gray-900 font-medium break-all">
                    {{ user?.email }}
                  </div>
                </div>

                <div class="py-1">
                  <button
                    @click="goToMinhaAccount"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >person</span
                    >
                    Minha Conta
                  </button>
                  <button
                    @click="goToPedidos"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >inventory_2</span
                    >
                    Meus Pedidos
                  </button>
                  <button
                    @click="goToEnderecos"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >location_on</span
                    >
                    Endereços
                  </button>
                </div>

                <hr class="my-1 border-gray-100" />

                <div class="py-1">
                  <button
                    @click="logout"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-red-400 mr-3 text-lg"
                      >logout</span
                    >
                    Sair
                  </button>
                </div>
              </template>

              <!-- Usuário NÃO Logado -->
              <template v-else>
                <div class="py-1">
                  <button
                    @click="goToLogin"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >login</span
                    >
                    Entrar
                  </button>
                  <button
                    @click="goToCadastro"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >person_add</span
                    >
                    Criar Conta
                  </button>
                </div>

                <hr class="my-1 border-gray-100" />

                <div class="py-1">
                  <button
                    @click="goToAdmin"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-blue-400 mr-3 text-lg"
                      >admin_panel_settings</span
                    >
                    Admin
                  </button>
                </div>
              </template>
            </div>
          </div>

          <!-- Cart -->
          <NuxtLink
            to="/carrinho"
            class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span class="material-icons-outlined text-gray-700"
              >shopping_cart</span
            >
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartItemsCount }}
            </span>
          </NuxtLink>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              v-if="!showMobileMenu"
              class="w-6 h-6"
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
            <svg
              v-else
              class="w-6 h-6"
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
      </div>

      <!-- Navigation -->
      <nav class="hidden md:block mt-4 pt-4 border-t border-gray-200">
        <ul class="flex items-center gap-8">
          <li>
            <NuxtLink
              to="/categoria/armas-fogo"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Armas de Fogo</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/armas-pressao"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Armas de Pressão</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/pesca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Pesca</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/airsoft"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Airsoft</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/caca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Caça</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/vestuario"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Vestuário</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/ofertas"
              class="text-red-600 hover:text-red-700 font-medium transition-colors"
              >🔥 Ofertas</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Mobile Search -->
      <div v-if="showMobileSearch" class="md:hidden mt-4">
        <div class="flex">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar produtos..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            @keyup.enter="performSearch"
          />
          <button
            @click="performSearch"
            class="px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="md:hidden bg-white border-t border-gray-200"
    >
      <nav class="container mx-auto px-4 py-4">
        <ul class="space-y-4">
          <li>
            <button
              @click="showMobileSearch = !showMobileSearch"
              class="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar
            </button>
          </li>

          <!-- Mobile Auth Section -->
          <li v-if="!isLoggedIn" class="border-b pb-4">
            <div class="space-y-2">
              <button
                @click="goToLogin"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2 cursor-pointer"
              >
                👤 Entrar
              </button>
              <button
                @click="goToCadastro"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2 cursor-pointer"
              >
                📝 Criar Conta
              </button>
            </div>
          </li>

          <li v-else class="border-b pb-4">
            <div class="space-y-2">
              <div class="text-sm text-gray-500 py-2">
                {{ user.value?.email }}
              </div>
              <button
                @click="goToMinhaAccount"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2 cursor-pointer"
              >
                👤 Minha Conta
              </button>
              <button
                @click="goToPedidos"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2 cursor-pointer"
              >
                📦 Meus Pedidos
              </button>
              <button
                @click="logout"
                class="block text-red-600 hover:text-red-700 transition-colors py-2 cursor-pointer"
              >
                🚪 Sair
              </button>
            </div>
          </li>

          <!-- Navigation Links -->
          <li>
            <NuxtLink
              to="/categoria/armas-fogo"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Armas de Fogo</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/armas-pressao"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Armas de Pressão</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/pesca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Pesca</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/airsoft"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Airsoft</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/caca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Caça</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/vestuario"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="closeMobileMenu"
              >Vestuário</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/ofertas"
              class="block text-red-600 hover:text-red-700 transition-colors"
              @click="closeMobileMenu"
              >🔥 Ofertas</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 🔧 SOLUÇÃO: Usar o auth diretamente e reagir às mudanças
const auth = useAuth();
const cartStore = useCartStore();

// 🔧 VERSÃO REATIVA - não usar .value nos computed
const isLoggedIn = computed(() => auth.isLoggedIn.value);
const user = computed(() => auth.user.value);
const authStore = useAuth();

// Estados
const searchQuery = ref("");
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const showMobileSearch = ref(false);

// 🔧 USAR STORE DO CARRINHO
const cartItemsCount = computed(() => cartStore.totalItems);

// 🔧 CORRIGIDO: Métodos de navegação usando navigateTo
const goToLogin = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToLogin] Navegando para /login...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/login");
};

const goToCadastro = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToCadastro] Navegando para /cadastro...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/cadastro");
};

const goToMinhaAccount = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToMinhaAccount] Navegando para /minha-conta...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta");
};

const goToPedidos = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToPedidos] Navegando para /minha-conta/pedidos...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta/pedidos");
};

const goToEnderecos = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToEnderecos] Navegando para /minha-conta/enderecos...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta/enderecos");
};

const goToAdmin = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToAdmin] Navegando para /admin/login...");
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/admin/login");
};

// Outros métodos
const performSearch = async () => {
  if (searchQuery.value.trim()) {
    console.log("🔍 [performSearch] Buscando por:", searchQuery.value);
    await navigateTo(`/busca?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

const toggleUserMenu = (event?: Event) => {
  if (event) {
    event.stopPropagation();
  }
  console.log(
    "🔍 [toggleUserMenu] Menu toggled, estado atual:",
    showUserMenu.value
  );
  console.log("🔍 [toggleUserMenu] isLoggedIn:", isLoggedIn.value);
  console.log(
    "🔍 [toggleUserMenu] auth.isLoggedIn.value:",
    auth.isLoggedIn.value
  );
  console.log("🔍 [toggleUserMenu] auth.user.value:", auth.user.value);
  showUserMenu.value = !showUserMenu.value;
  console.log("🔍 [toggleUserMenu] Novo estado:", showUserMenu.value);
};

const closeUserMenu = () => {
  console.log("🔍 [closeUserMenu] Fechando menu");
  showUserMenu.value = false;
};

const handleClickOutside = (event: Event) => {
  const userMenuButton = document.querySelector("[data-user-menu-button]");
  if (
    userMenuButton &&
    (userMenuButton.contains(event.target as Node) ||
      userMenuButton === event.target)
  ) {
    return;
  }
  closeUserMenu();
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  if (showMobileMenu.value) {
    showMobileSearch.value = false;
  }
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
  showMobileSearch.value = false;
};

const logout = async () => {
  console.log("🐛 MINHA-CONTA - Fazendo logout...");

  try {
    await authStore.signOut();
    console.log("🐛 MINHA-CONTA - Logout realizado com sucesso");
  } catch (error) {
    console.error("🐛 MINHA-CONTA - Erro no logout:", error);
  }
};

// Click outside directive
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!document.contains(el)) {
        return;
      }
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", el.clickOutsideEvent);
    }, 100);
  },
  unmounted(el: any) {
    if (el.clickOutsideEvent) {
      document.removeEventListener("click", el.clickOutsideEvent);
    }
  },
};

// Fechar menus quando a rota mudar
const route = useRoute();
watch(
  () => route.path,
  () => {
    closeUserMenu();
    closeMobileMenu();
  }
);

// Debug no mount
onMounted(() => {
  console.log("✅ [AppHeader] Header montado!");
  console.log("✅ [AppHeader] isLoggedIn.value:", isLoggedIn.value);
  console.log("✅ [AppHeader] user.value:", user.value);
  console.log("✅ [AppHeader] auth.isLoggedIn.value:", auth.isLoggedIn.value);
  console.log("✅ [AppHeader] auth.user.value:", auth.user.value);

  // Garantir que auth inicializa
  if (!auth.user.value) {
    console.log("🔄 [AppHeader] Chamando initAuth...");
    auth.initAuth();
  }

  // Watch para mudanças no estado de autenticação - DIRETO DO AUTH
  watch(
    [() => auth.isLoggedIn.value, () => auth.user.value],
    ([newIsLoggedIn, newUser]) => {
      console.log("🔄 [AppHeader] Auth state changed:", {
        isLoggedIn: newIsLoggedIn,
        user: newUser?.email,
      });
    },
    { immediate: true }
  );
});

// TODO: Implementar contagem real do carrinho
// const cartStore = useCartStore();
// cartItemsCount.value = cartStore.itemCount;
</script>
