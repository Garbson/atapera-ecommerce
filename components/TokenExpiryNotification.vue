<template>
  <Teleport to="body">
    <div
      v-if="showNotification"
      class="fixed top-4 right-4 z-50 max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-yellow-800">
              Sessão expirando em breve
            </p>
            <p class="mt-1 text-sm text-yellow-700">
              Sua sessão expira em {{ timeRemaining }}. Clique em "Renovar" para continuar.
            </p>
            <div class="mt-3 flex space-x-2">
              <button
                @click="renewSession"
                :disabled="renewing"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                <svg
                  v-if="renewing"
                  class="animate-spin -ml-1 mr-1 h-3 w-3 text-yellow-800"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {{ renewing ? 'Renovando...' : 'Renovar' }}
              </button>
              <button
                @click="dismissNotification"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-800 bg-transparent hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Dispensar
              </button>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="dismissNotification"
              class="bg-yellow-50 rounded-md inline-flex text-yellow-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const { session } = useAuth();
const { refreshToken, isTokenExpiringSoon } = useTokenRefresh();

const showNotification = ref(false);
const renewing = ref(false);
const timeRemaining = ref('');
const dismissed = ref(false);

// Verificar periodicamente se deve mostrar notificação
const checkTokenExpiry = () => {
  if (!session.value || dismissed.value) {
    showNotification.value = false;
    return;
  }

  const expiringSoon = isTokenExpiringSoon(session.value);

  if (expiringSoon) {
    showNotification.value = true;
    updateTimeRemaining();
  } else {
    showNotification.value = false;
    dismissed.value = false; // Reset dismissed when token is fresh
  }
};

// Calcular tempo restante
const updateTimeRemaining = () => {
  if (!session.value?.expires_at) return;

  const expirationTime = session.value.expires_at * 1000;
  const currentTime = Date.now();
  const diff = expirationTime - currentTime;

  if (diff <= 0) {
    timeRemaining.value = 'agora';
    return;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (minutes > 0) {
    timeRemaining.value = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    timeRemaining.value = `${seconds} segundo${seconds > 1 ? 's' : ''}`;
  }
};

// Renovar sessão
const renewSession = async () => {
  renewing.value = true;
  try {
    const success = await refreshToken();
    if (success) {
      showNotification.value = false;
      dismissed.value = false;

      const { success: notifySuccess } = useNotifications();
      notifySuccess('Sessão renovada!', 'Sua sessão foi renovada com sucesso.');
    } else {
      const { error } = useNotifications();
      error('Erro', 'Não foi possível renovar a sessão. Faça login novamente.');
    }
  } catch (error) {
    console.error('Erro ao renovar sessão:', error);
    const { error: showError } = useNotifications();
    showError('Erro', 'Não foi possível renovar a sessão. Faça login novamente.');
  } finally {
    renewing.value = false;
  }
};

// Dispensar notificação
const dismissNotification = () => {
  showNotification.value = false;
  dismissed.value = true;

  // Auto reset dismissed após 5 minutos
  setTimeout(() => {
    dismissed.value = false;
  }, 5 * 60 * 1000);
};

// Iniciar verificação quando componente é montado
onMounted(() => {
  const interval = setInterval(() => {
    checkTokenExpiry();
    if (showNotification.value) {
      updateTimeRemaining();
    }
  }, 30000); // Verificar a cada 30 segundos

  onUnmounted(() => {
    clearInterval(interval);
  });

  // Verificação inicial
  checkTokenExpiry();
});

// Observar mudanças na sessão
watch(session, () => {
  dismissed.value = false;
  checkTokenExpiry();
});
</script>