<!-- pages/minha-conta.vue - VERSÃO COM DEBUG -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Minha Conta</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Sidebar -->
      <div class="md:col-span-1">
        <nav class="space-y-2">
          <NuxtLink
            to="/minha-conta"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Dados Pessoais
          </NuxtLink>
          <NuxtLink
            to="/minha-conta/pedidos"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Meus Pedidos
          </NuxtLink>
          <NuxtLink
            to="/minha-conta/enderecos"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Endereços
          </NuxtLink>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-red-600"
          >
            Sair
          </button>
        </nav>
      </div>

      <!-- Conteúdo -->
      <div class="md:col-span-2">
        <div v-if="!hasChildRoutes" class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h2 class="text-xl font-semibold mb-4">Dados Pessoais</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  type="email"
                  :value="authStore.user?.email || ''"
                  readonly
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nome</label
                >
                <input
                  type="text"
                  :value="authStore.user?.user_metadata?.name || ''"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Seu nome completo"
                />
              </div>
              <button
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h2 class="text-xl font-semibold mb-4">Estatísticas da Conta</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-red-600">0</div>
                <div class="text-sm text-gray-600">Pedidos</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-red-600">R$ 0,00</div>
                <div class="text-sm text-gray-600">Total Gasto</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ Conteúdo das sub-rotas -->
        <NuxtPage v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


definePageMeta({
  middleware: "auth",
});

const authStore = useAuth();
const route = useRoute();

// ✅ DEBUG: Verificar se middleware está ativo
const pageMetaAuth = true; // Sempre true neste caso

// ✅ DEBUG: Verificar se há sub-rotas
const hasChildRoutes = computed(() => {
  return route.matched.length > 1;
});

const handleLogout = async () => {

  try {
    await authStore.signOut();
  } catch (error) {
    console.error("🐛 MINHA-CONTA - Erro no logout:", error);
  }
};



</script>
