<template>
  <div>
    <!-- Cabeçalho de Boas-vindas -->
    <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 mb-8">
      <div class="flex items-center gap-4">
        <div
          class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
        >
          {{ userInitials }}
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            Olá, {{ userName }}! 👋
          </h2>
          <p class="text-gray-600">
            Bem-vindo(a) à sua área pessoal da Atapera
          </p>
        </div>
      </div>
    </div>

    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total de Pedidos -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total de Pedidos</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalOrders }}
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Valor Total Gasto -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Gasto</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatPrice(stats.totalSpent) }}
            </p>
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
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Pedidos Pendentes -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pedidos Pendentes</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.pendingOrders }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Economia Total -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Economia Total</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatPrice(stats.totalSavings) }}
            </p>
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Seções Principais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Pedidos Recentes -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Pedidos Recentes
            </h3>
            <NuxtLink
              to="/minha-conta/pedidos"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Ver todos
            </NuxtLink>
          </div>
        </div>

        <div class="p-6">
          <div v-if="loading.orders" class="space-y-4">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-200 rounded"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="recentOrders.length > 0" class="space-y-4">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    Pedido #{{ order.id }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">
                  {{ formatPrice(order.total) }}
                </p>
                <span
                  :class="getStatusClass(order.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <svg
              class="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            <p class="text-gray-600 mb-4">Você ainda não fez nenhum pedido</p>
            <NuxtLink
              to="/produtos"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 inline-block"
            >
              Começar a Comprar
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Dados do Perfil -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Dados do Perfil</h3>
            <button
              @click="showEditProfile = !showEditProfile"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              {{ showEditProfile ? "Cancelar" : "Editar" }}
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Modo Visualização -->
          <div v-if="!showEditProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nome Completo</label
              >
              <p class="text-gray-900">
                {{ profileData.name || "Não informado" }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >E-mail</label
              >
              <p class="text-gray-900">{{ profileData.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >CPF</label
              >
              <p class="text-gray-900">
                {{ profileData.cpf || "Não informado" }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Telefone</label
              >
              <p class="text-gray-900">
                {{ profileData.phone || "Não informado" }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Membro desde</label
              >
              <p class="text-gray-900">
                {{ formatDate(profileData.created_at) }}
              </p>
            </div>
          </div>

          <!-- Modo Edição -->
          <form v-else @submit.prevent="updateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nome Completo</label
              >
              <input
                v-model="editProfileData.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >CPF</label
              >
              <input
                v-model="editProfileData.cpf"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Telefone</label
              >
              <input
                v-model="editProfileData.phone"
                type="tel"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="loading.profile"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {{ loading.profile ? "Salvando..." : "Salvar" }}
              </button>
              <button
                type="button"
                @click="cancelEdit"
                class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          to="/minha-conta/pedidos"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
        >
          <div
            class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
          >
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900">Ver Pedidos</p>
            <p class="text-sm text-gray-600">Acompanhe seus pedidos</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/minha-conta/enderecos"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
        >
          <div
            class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
          >
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900">Meus Endereços</p>
            <p class="text-sm text-gray-600">Gerencie seus endereços</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/produtos"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
        >
          <div
            class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
          >
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900">Continuar Comprando</p>
            <p class="text-sm text-gray-600">Explore nossos produtos</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, updateProfile } = useAuth();

// Estados
const loading = reactive({
  orders: true,
  profile: false,
});

const showEditProfile = ref(false);

const stats = reactive({
  totalOrders: 0,
  totalSpent: 0,
  pendingOrders: 0,
  totalSavings: 0,
});

const recentOrders = ref([]);

const profileData = reactive({
  name: "",
  email: "",
  cpf: "",
  phone: "",
  created_at: "",
});

const editProfileData = reactive({
  name: "",
  cpf: "",
  phone: "",
});

// Computed
const userName = computed(() => {
  if (!profileData.name) return "Usuário";
  return profileData.name.split(" ")[0];
});

const userInitials = computed(() => {
  if (!profileData.name) return "U";
  const names = profileData.name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
});

// Métodos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getStatusClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status: string) => {
  const texts = {
    pending: "Pendente",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return texts[status] || "Desconhecido";
};

const cancelEdit = () => {
  showEditProfile.value = false;
  // Resetar dados de edição
  editProfileData.name = profileData.name;
  editProfileData.cpf = profileData.cpf;
  editProfileData.phone = profileData.phone;
};

const updateProfileHandler = async () => {
  loading.profile = true;

  try {
    const result = await updateProfile({
      name: editProfileData.name,
      cpf: editProfileData.cpf,
      phone: editProfileData.phone,
    });

    if (result.success) {
      // Atualizar dados locais
      profileData.name = editProfileData.name;
      profileData.cpf = editProfileData.cpf;
      profileData.phone = editProfileData.phone;

      showEditProfile.value = false;
    } else {
      console.error("Erro ao atualizar perfil:", result.error);
    }
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
  } finally {
    loading.profile = false;
  }
};

const fetchUserData = async () => {
  if (!user.value) return;

  try {
    // Buscar dados do perfil
    const { data: profile } = await $fetch("/api/user/profile");
    if (profile) {
      Object.assign(profileData, profile);
      Object.assign(editProfileData, {
        name: profile.name || "",
        cpf: profile.cpf || "",
        phone: profile.phone || "",
      });
    }

    // Buscar estatísticas e pedidos recentes
    const { data: dashboard } = await $fetch("/api/user/dashboard");
    if (dashboard) {
      Object.assign(stats, dashboard.stats);
      recentOrders.value = dashboard.recentOrders || [];
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
  } finally {
    loading.orders = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchUserData();
});

// Watchers
watch(
  user,
  (newUser) => {
    if (newUser) {
      profileData.email = newUser.email || "";
      fetchUserData();
    }
  },
  { immediate: true }
);
</script>
