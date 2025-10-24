<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">{{ statusMessage }}</p>

      <!-- Botão de emergência após timeout -->
      <button
        v-if="showEmergencyButton"
        @click="forceRedirect"
        class="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Continuar para o site
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, session, loading } = useAuth();
const supabase = useSupabase();

const statusMessage = ref("Processando login...");
const showEmergencyButton = ref(false);
const processed = ref(false);

// Timeout de emergência para evitar carregamento infinito
const emergencyTimeout = setTimeout(() => {
  if (!processed.value) {
    statusMessage.value = "Login demorou mais que o esperado";
    showEmergencyButton.value = true;
  }
}, 10000); // 10 segundos

const forceRedirect = () => {
  processed.value = true;
  clearTimeout(emergencyTimeout);
  navigateTo("/");
};

const processCallback = async () => {
  if (processed.value) return;

  try {
    statusMessage.value = "Processando autenticação...";

    // 1. Verificar se há sessão do auth callback
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("❌ Erro no callback:", error);
      statusMessage.value = "Erro na autenticação";

      setTimeout(() => {
        processed.value = true;
        navigateTo("/auth/login");
      }, 2000);
      return;
    }

    if (data.session) {
      statusMessage.value = "Login realizado com sucesso!";

      // Aguardar um momento para o sistema processar
      await new Promise(resolve => setTimeout(resolve, 1000));

      processed.value = true;
      clearTimeout(emergencyTimeout);

      // Redirecionar com sucesso
      await navigateTo("/");
    } else {
      console.warn("⚠️ Nenhuma sessão encontrada no callback");
      statusMessage.value = "Nenhuma sessão encontrada";

      setTimeout(() => {
        processed.value = true;
        navigateTo("/auth/login");
      }, 2000);
    }

  } catch (error) {
    console.error("❌ Erro no processCallback:", error);
    statusMessage.value = "Erro inesperado";

    setTimeout(() => {
      processed.value = true;
      navigateTo("/auth/login");
    }, 2000);
  }
};

onMounted(() => {
  // Aguardar um momento antes de processar para evitar problemas de timing
  setTimeout(() => {
    processCallback();
  }, 500);
});

// Cleanup no unmount
onUnmounted(() => {
  clearTimeout(emergencyTimeout);
});
</script>
