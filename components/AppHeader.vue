<!-- components/AppHeader.vue - VERSÃO CORRIGIDA -->
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
        <a href="/" class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Atapera</h1>
            <p class="text-xs text-gray-500">Armas, Pesca & Aventura</p>
          </div>
        </a>

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
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <!-- Usuário Logado -->
              <template v-if="isLoggedIn">
                <div class="px-4 py-2 text-sm text-gray-500 border-b">
                  {{ user?.email }}
                </div>
                <button
                  @click="goToMinhaAccount"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  👤 Minha Conta
                </button>
                <button
                  @click="goToPedidos"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  📦 Meus Pedidos
                </button>
                <button
                  @click="goToEnderecos"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  📍 Endereços
                </button>
                <hr class="my-2" />
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  🚪 Sair
                </button>
              </template>

              <!-- Usuário NÃO Logado -->
              <template v-else>
                <button
                  @click="goToLogin"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  👤 Entrar
                </button>
                <button
                  @click="goToCadastro"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  📝 Criar Conta
                </button>
                <hr class="my-2" />
                <button
                  @click="goToAdmin"
                  class="w-full text-left block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer"
                >
                  🔧 Admin
                </button>
              </template>
            </div>
          </div>

          <!-- Cart -->
          <button
            @click="openCart"
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
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartItemsCount }}
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
            <a
              href="/categoria/armas-fogo"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Armas de Fogo</a
            >
          </li>
          <li>
            <a
              href="/categoria/armas-pressao"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Armas de Pressão</a
            >
          </li>
          <li>
            <a
              href="/categoria/pesca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Pesca</a
            >
          </li>
          <li>
            <a
              href="/categoria/airsoft"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Airsoft</a
            >
          </li>
          <li>
            <a
              href="/categoria/caca"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Caça</a
            >
          </li>
          <li>
            <a
              href="/categoria/vestuario"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >Vestuário</a
            >
          </li>
          <li>
            <a
              href="/categoria/ofertas"
              class="text-red-600 hover:text-red-700 font-medium transition-colors"
              >🔥 Ofertas</a
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
              <div class="text-sm text-gray-500 py-2">{{ user?.email }}</div>
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
            <a
              href="/categoria/armas-fogo"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Armas de Fogo</a
            >
          </li>
          <li>
            <a
              href="/categoria/armas-pressao"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Armas de Pressão</a
            >
          </li>
          <li>
            <a
              href="/categoria/pesca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Pesca</a
            >
          </li>
          <li>
            <a
              href="/categoria/airsoft"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Airsoft</a
            >
          </li>
          <li>
            <a
              href="/categoria/caca"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Caça</a
            >
          </li>
          <li>
            <a
              href="/categoria/vestuario"
              class="block text-gray-700 hover:text-red-600 transition-colors"
              >Vestuário</a
            >
          </li>
          <li>
            <a
              href="/categoria/ofertas"
              class="block text-red-600 hover:text-red-700 transition-colors"
              >🔥 Ofertas</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const auth = useAuth();
const { user, isLoggedIn } = auth;

// Estados
const searchQuery = ref("");
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const showMobileSearch = ref(false);
const cartItemsCount = ref(0);

// ✅ MÉTODOS CORRIGIDOS com event.preventDefault() e mais logs
const goToLogin = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToLogin] Navegando para /login...");
  console.log("📍 [goToLogin] Estado atual - isLoggedIn:", isLoggedIn.value);
  closeUserMenu();
  closeMobileMenu();

  // Força a navegação
  setTimeout(() => {
    console.log("📍 [goToLogin] Executando navegação...");
    window.location.href = "/login";
  }, 100);
};

const goToCadastro = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToCadastro] Navegando para /cadastro...");
  closeUserMenu();
  closeMobileMenu();

  setTimeout(() => {
    window.location.href = "/cadastro";
  }, 100);
};

const goToMinhaAccount = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToMinhaAccount] Navegando para /minha-conta...");
  closeUserMenu();
  closeMobileMenu();

  setTimeout(() => {
    window.location.href = "/minha-conta";
  }, 100);
};

const goToPedidos = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToPedidos] Navegando para /minha-conta/pedidos...");
  closeUserMenu();
  closeMobileMenu();

  setTimeout(() => {
    window.location.href = "/minha-conta/pedidos";
  }, 100);
};

const goToEnderecos = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToEnderecos] Navegando para /minha-conta/enderecos...");
  closeUserMenu();
  closeMobileMenu();

  setTimeout(() => {
    window.location.href = "/minha-conta/enderecos";
  }, 100);
};

const goToAdmin = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("📍 [goToAdmin] Navegando para /admin/login...");
  closeUserMenu();
  closeMobileMenu();

  setTimeout(() => {
    window.location.href = "/admin/login";
  }, 100);
};

// Outros métodos
const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("🔍 [performSearch] Buscando por:", searchQuery.value);
    window.location.href = `/busca?q=${encodeURIComponent(searchQuery.value)}`;
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
  showUserMenu.value = !showUserMenu.value;
  console.log("🔍 [toggleUserMenu] Novo estado:", showUserMenu.value);
};

const closeUserMenu = () => {
  console.log("🔍 [closeUserMenu] Fechando menu");
  showUserMenu.value = false;
};

const handleClickOutside = (event: Event) => {
  // Verifica se o clique foi no botão do menu do usuário
  const userMenuButton = document.querySelector("[data-user-menu-button]");
  if (
    userMenuButton &&
    (userMenuButton.contains(event.target as Node) ||
      userMenuButton === event.target)
  ) {
    return; // Não fecha o menu se clicou no próprio botão
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
};

const openCart = () => {
  console.log("🛒 [openCart] Abrindo carrinho");
  // Implementar abertura do carrinho
};

const logout = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  console.log("🚪 [logout] Fazendo logout...");
  await auth.signOut();
  closeUserMenu();
  closeMobileMenu();
};

// Click outside directive - VERSÃO MELHORADA
const vClickOutside = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      // Verifica se o elemento ainda existe no DOM
      if (!document.contains(el)) {
        return;
      }

      // Verifica se o clique foi fora do elemento
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    // Adiciona o listener com um pequeno delay para evitar conflitos
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

// Close menus on route change
onMounted(() => {
  console.log("✅ [AppHeader] Header montado e funcionando!");
  console.log("✅ [AppHeader] Estado inicial - isLoggedIn:", isLoggedIn.value);
  console.log("✅ [AppHeader] User:", user.value);
});
</script>
