<!-- components/AppHeader.vue - ROTAS CORRIGIDAS -->
<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <!-- Top Bar -->
    <div class="bg-red-600 text-white text-sm">
      <div class="container mx-auto px-4 py-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-6">
            <span>📞 (11) 99999-9999</span>
            <span>📧 contato@atapera.shop</span>
          </div>
          <div class="flex items-center gap-4">
            <span>🚚 Frete grátis acima de R$ 299</span>
          </div>
        </div>
      </div>
    </div>

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
                {{ authStore.isLoggedIn ? "Minha Conta" : "Entrar" }}
              </span>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              v-click-outside="closeUserMenu"
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <template v-if="authStore.isLoggedIn">
                <NuxtLink
                  to="/minha-conta"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  Minha Conta
                </NuxtLink>
                <NuxtLink
                  to="/minha-conta/pedidos"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  Meus Pedidos
                </NuxtLink>
                <hr class="my-2" />
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sair
                </button>
              </template>
              <template v-else>
                <!-- ✅ CORRIGIDO: Rotas corretas -->
                <NuxtLink
                  to="/login"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  Entrar
                </NuxtLink>
                <NuxtLink
                  to="/cadastro"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  Criar Conta
                </NuxtLink>
                <hr class="my-2" />
                <!-- Admin link separado -->
                <NuxtLink
                  to="/admin/login"
                  class="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  @click="closeUserMenu"
                >
                  Acesso Admin
                </NuxtLink>
              </template>
            </div>
          </div>

          <!-- Cart -->
          <button
            @click="cartStore.openCart()"
            class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

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
            >
              Armas de Fogo
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categoria/armas-pressao"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Armas de Pressão
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categoria/pesca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Pesca
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categoria/airsoft"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Airsoft
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categoria/caca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Caça
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categoria/vestuario"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Vestuário
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/ofertas"
              class="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              🔥 Ofertas
            </NuxtLink>
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
              class="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
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

          <!-- ✅ Seção de login no mobile -->
          <li v-if="!authStore.isLoggedIn" class="border-b pb-4">
            <div class="space-y-2">
              <NuxtLink
                to="/login"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2"
                @click="showMobileMenu = false"
              >
                👤 Entrar
              </NuxtLink>
              <NuxtLink
                to="/cadastro"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2"
                @click="showMobileMenu = false"
              >
                📝 Criar Conta
              </NuxtLink>
            </div>
          </li>

          <li v-else class="border-b pb-4">
            <div class="space-y-2">
              <NuxtLink
                to="/minha-conta"
                class="block text-gray-700 hover:text-red-600 transition-colors py-2"
                @click="showMobileMenu = false"
              >
                👤 Minha Conta
              </NuxtLink>
              <button
                @click="logout"
                class="block text-red-600 hover:text-red-700 transition-colors py-2"
              >
                🚪 Sair
              </button>
            </div>
          </li>

          <li>
            <NuxtLink
              to="/categoria/armas-fogo"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Armas de Fogo</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/armas-pressao"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Armas de Pressão</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/pesca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Pesca</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/airsoft"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Airsoft</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/caca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Caça</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/categoria/vestuario"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              @click="showMobileMenu = false"
              >Vestuário</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/ofertas"
              class="block text-red-600 hover:text-red-700 transition-colors"
              @click="showMobileMenu = false"
              >🔥 Ofertas</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// ✅ CORRIGIDO: Usar os composables corretos
const cartStore = useCartStore();
const authStore = useAuth();

// States
const searchQuery = ref("");
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const showMobileSearch = ref(false);

// Methods
const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/busca?q=${encodeURIComponent(searchQuery.value)}`);
    showMobileMenu.value = false;
    showMobileSearch.value = false;
  }
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const closeUserMenu = () => {
  showUserMenu.value = false;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  if (showMobileMenu.value) {
    showMobileSearch.value = false;
  }
};

const logout = async () => {
  await authStore.signOut();
  showUserMenu.value = false;
  showMobileMenu.value = false;
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

// Close mobile menu on route change
watch(
  () => useRoute().path,
  () => {
    showMobileMenu.value = false;
    showMobileSearch.value = false;
    showUserMenu.value = false;
  }
);
</script>
