<!-- components/AppHeader.vue - VERSÃO COMPLETA CORRIGIDA -->
<template>
  <header class="bg-gray-800 shadow-sm sticky top-0 z-40">
    <!-- Main Header -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img
            src="public/marca/ataperaWhite.png"
            alt="Atapera - Armas, Pesca & Aventura"
            class="h-16 w-auto object-contain"
          />
        </NuxtLink>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar produtos..."
              class="w-full px-4 py-3 border border-white rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              @keyup.enter="performSearch"
            />
            <button
              @click="performSearch"
              class="absolute right-0 top-0 h-full border border-white  px-6 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors"
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
                class="w-6 h-6 text-white"
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
              <span class="hidden sm:block text-sm text-white">
                {{ isLoggedIn ? "Minha Conta" : "Entrar" }}
              </span>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              v-click-outside="handleClickOutside"
              class="absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-600 py-2 z-50"
            >
              <!-- Usuário Logado -->
              <template v-if="isLoggedIn">
                <div class="px-4 py-3 border-b border-gray-100">
                  <div
                    class="text-xs text-white uppercase tracking-wider font-medium mb-1"
                  >
                    Conta
                  </div>
                  <div class="text-sm text-white font-medium break-all">
                    {{ authStore.userEmail }}
                  </div>
                </div>

                <div class="py-1">
                  <button
                    @click="goToMinhaAccount"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-white mr-3 text-lg"
                      >person</span
                    >
                    Minha Conta
                  </button>
                  <button
                    @click="goToPedidos"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-white mr-3 text-lg"
                      >inventory_2</span
                    >
                    Meus Pedidos
                  </button>
                  <button
                    @click="goToEnderecos"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >location_on</span
                    >
                    Endereços
                  </button>
                  
                  <!-- Admin Panel Option -->
                  <button
                    v-if="isAdmin"
                    @click="goToAdminPanel"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-blue-400 mr-3 text-lg"
                      >admin_panel_settings</span
                    >
                    Painel Admin
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
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >login</span
                    >
                    Entrar
                  </button>
                  <button
                    @click="goToCadastro"
                    class="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span
                      class="material-icons-outlined text-gray-400 mr-3 text-lg"
                      >person_add</span
                    >
                    Criar Conta
                  </button>
                </div>

              </template>
            </div>
          </div>

          <!-- Cart -->
          <NuxtLink
            to="/carrinho"
            class="relative p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span class="material-icons-outlined text-white"
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
        <ul class="flex items-center text-white gap-8">
          <li>
            <NuxtLink
              to="/categoria/armas-fogo"
              class=" hover:text-red-600 font-medium transition-colors"
              >Armas de Fogo</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/armas-pressao"
              class=" hover:text-red-600 font-medium transition-colors"
              >Armas de Pressão</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/pesca"
              class=" hover:text-red-600 font-medium transition-colors"
              >Pesca</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/airsoft"
              class=" hover:text-red-600 font-medium transition-colors"
              >Airsoft</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/caca"
              class=" hover:text-red-600 font-medium transition-colors"
              >Caça</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/vestuario"
              class=" hover:text-red-600 font-medium transition-colors"
              >Vestuário</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/camping"
              class=" hover:text-red-600 font-medium transition-colors"
              >Camping</NuxtLink
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
            class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-white"
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
      class="md:hidden bg-white border-t border-gray-200 shadow-lg"
    >
      <nav class="container mx-auto px-4 py-6">
        <!-- Header do Menu -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Categorias</h3>
          <p class="text-sm text-gray-500">Navegue por nossos produtos</p>
        </div>

        <!-- Buscar -->
        <div class="mb-6">
          <button
            @click="showMobileSearch = !showMobileSearch"
            class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="font-medium">Buscar produtos</span>
          </button>
        </div>

        <!-- Categorias Grid -->
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink
            to="/categoria/armas-fogo"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:from-red-100 hover:to-red-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Armas de Fogo</span>
            </div>
            <span class="text-xs text-gray-600">Pistolas, Rifles</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/armas-pressao"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Armas Pressão</span>
            </div>
            <span class="text-xs text-gray-600">Chumbinho, CO2</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/pesca"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 hover:from-cyan-100 hover:to-cyan-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Pesca</span>
            </div>
            <span class="text-xs text-gray-600">Varas, Iscas</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/airsoft"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Airsoft</span>
            </div>
            <span class="text-xs text-gray-600">Réplicas, BBs</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/caca"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 hover:from-amber-100 hover:to-amber-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Caça</span>
            </div>
            <span class="text-xs text-gray-600">Equipamentos</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/vestuario"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Vestuário</span>
            </div>
            <span class="text-xs text-gray-600">Roupas, Botas</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/camping"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-125 transition-transform"></div>
              <span class="font-semibold text-gray-800 text-sm">Camping</span>
            </div>
            <span class="text-xs text-gray-600">Barracas, Mochilas</span>
          </NuxtLink>

          <NuxtLink
            to="/categoria/ofertas"
            @click="closeMobileMenu"
            class="group p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-xl border-2 border-red-300 hover:from-red-200 hover:to-red-300 transition-all duration-200 relative overflow-hidden"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-red-600 rounded-full group-hover:scale-125 transition-transform animate-pulse"></div>
              <span class="font-bold text-red-800 text-sm">🔥 Ofertas</span>
            </div>
            <span class="text-xs text-red-700 font-medium">Promoções especiais</span>
            <div class="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span class="text-white text-xs font-bold">%</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Footer do Menu -->
        <div class="mt-6 pt-4 border-t border-gray-100">
          <p class="text-xs text-gray-500 text-center">
            Use o ícone de usuário para acessar sua conta
          </p>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 🔧 SOLUÇÃO: Usar o authStore diretamente
const authStore = useAuthStore();
const cartStore = useCartStore();

// 🔧 VERSÃO REATIVA - usar authStore
const isLoggedIn = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.profile);
const isAdmin = computed(() => authStore.isAdmin);

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
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/login");
};

const goToCadastro = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/cadastro");
};

const goToMinhaAccount = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta");
};

const goToPedidos = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta/pedidos");
};

const goToEnderecos = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/minha-conta/enderecos");
};

const goToAdmin = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/admin/login");
};

const goToAdminPanel = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  closeUserMenu();
  closeMobileMenu();
  await navigateTo("/admin");
};

// Outros métodos
const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await navigateTo(`/busca?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

const toggleUserMenu = (event?: Event) => {
  if (event) {
    event.stopPropagation();
  }
  showUserMenu.value = !showUserMenu.value;
};

const closeUserMenu = () => {
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

// Inicialização removida para evitar sobrecarga
// A inicialização deve ser feita apenas uma vez no plugin ou layout principal

</script>
