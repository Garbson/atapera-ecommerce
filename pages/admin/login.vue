<!-- pages/admin/login.vue - VERSÃO CORRIGIDA -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Admin - Atapera</h1>
        <p class="text-gray-600 mt-2">
          Faça login para acessar o painel administrativo
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-red-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-red-700 text-sm">{{ error }}</span>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="success"
        class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-green-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-green-700 text-sm">{{ success }}</span>
        </div>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" novalidate>
        <div class="space-y-6">
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none"
              :class="{
                'border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent':
                  !errors.email,
                'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500':
                  errors.email,
              }"
              placeholder="admin@atapera.shop"
              :disabled="loading"
              @blur="validateEmail"
              @input="clearError('email')"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 border rounded-lg transition-colors focus:outline-none"
                :class="{
                  'border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent':
                    !errors.password,
                  'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500':
                    errors.password,
                }"
                placeholder="••••••••"
                :disabled="loading"
                @blur="validatePassword"
                @input="clearError('password')"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="loading"
                tabindex="-1"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                :disabled="loading"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                Lembrar-me
              </label>
            </div>
            <a
              href="/"
              class="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              ← Voltar ao site
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200"
            :class="{
              'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500':
                !loading && isFormValid,
              'bg-gray-400 cursor-not-allowed': loading || !isFormValid,
            }"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
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
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ loading ? "Entrando..." : "Entrar" }}
          </button>
        </div>
      </form>

      <!-- Footer -->
      <div class="mt-8 pt-6 border-t border-gray-200 text-center">
        <p class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} Atapera. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta e Layout
definePageMeta({
  layout: false,
  middleware: "guest", // Mudado de "admin-auth" para "guest"
});

// Head
useHead({
  title: "Admin Login - Atapera",
  meta: [{ name: "description", content: "Acesso administrativo da Atapera" }],
});

// ✅ USAR O SISTEMA USEAUTH CORRETO
const { signIn, signOut, isLoggedIn, isAdmin } = useAuth();
const router = useRouter();
const route = useRoute();

// Reactive Data
const loading = ref(false);
const showPassword = ref(false);
const error = ref("");
const success = ref("");

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
});

// Computed
const isFormValid = computed(() => {
  return (
    form.email &&
    form.password &&
    !errors.email &&
    !errors.password &&
    form.email.includes("@") &&
    form.password.length >= 6
  );
});

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const clearError = (field) => {
  if (errors[field]) {
    errors[field] = "";
  }
  if (error.value) {
    error.value = "";
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email) {
    errors.email = "Email é obrigatório";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Email inválido";
  } else {
    errors.email = "";
  }
};

const validatePassword = () => {
  if (!form.password) {
    errors.password = "Senha é obrigatória";
  } else if (form.password.length < 6) {
    errors.password = "Senha deve ter pelo menos 6 caracteres";
  } else {
    errors.password = "";
  }
};

const validateForm = () => {
  validateEmail();
  validatePassword();
  return !errors.email && !errors.password;
};

// ✅ FUNÇÃO DE LOGIN CORRIGIDA - Parâmetros corretos
const handleLogin = async () => {
  // Reset messages
  error.value = "";
  success.value = "";

  // Validate form
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    // ✅ CORREÇÃO: Usar o useAuth correto
    const result = await signIn(form.email, form.password);

    if (!result.success) {
      throw new Error(result.error);
    }

    // Aguardar um momento para isAdmin carregar
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!isAdmin.value) {
      await signOut();
      error.value = "Acesso negado. Este usuário não tem permissões de administrador.";
      return;
    }

    success.value = "Login realizado com sucesso!";

    // Redirect após sucesso
    setTimeout(() => {
      const redirectTo = route.query.redirect || "/admin";
      router.push(redirectTo);
    }, 1500);
  } catch (err) {
    console.error("[Admin Login] Erro no login:", err);

    // Tratamento de erros do Supabase
    if (err.message?.includes("Invalid login credentials")) {
      error.value = "Email ou senha inválidos";
    } else if (err.message?.includes("Email not confirmed")) {
      error.value = "Email não confirmado. Verifique sua caixa de entrada.";
    } else if (err.message?.includes("Too many requests")) {
      error.value = "Muitas tentativas. Tente novamente em alguns minutos.";
    } else {
      error.value = err.message || "Erro no login. Tente novamente.";
    }
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Verificar se já está logado
  if (isLoggedIn.value) {
    router.push("/admin");
    return;
  }

  // Auto-focus no primeiro campo
  nextTick(() => {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.focus();
    }
  });
});
</script>

<style scoped>
/* Animações personalizadas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loading spinner customizado */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Melhorar acessibilidade */
input:focus {
  outline: none;
}

button:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Responsividade adicional */
@media (max-width: 480px) {
  .bg-white {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
