<!-- pages/login.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-white font-bold text-2xl">A</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Bem-vindo de volta!</h1>
        <p class="text-gray-600 mt-2">Entre na sua conta da Atapera</p>
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
              placeholder="seu@email.com"
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

          <!-- Remember Me & Forgot Password -->
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
            <NuxtLink
              to="/esqueci-senha"
              class="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              Esqueceu a senha?
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            @click.prevent="handleLogin"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200"
            :class="{
              'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500':
                !loading && isFormValid,
              'bg-gray-400 cursor-not-allowed': loading,
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

      <!-- Divider -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>
      </div>

      <!-- Social Login -->
      <div class="mt-6 flex justify-center">
        <button
          @click="handleGoogleLogin"
          :disabled="loading"
          class="w-full max-w-sm flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <svg class="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Entrar com Google</span>
        </button>
      </div>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Não tem uma conta?
          <NuxtLink
            to="/cadastro"
            class="font-medium text-red-600 hover:text-red-500 transition-colors"
          >
            Cadastre-se aqui
          </NuxtLink>
        </p>
      </div>

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
  middleware: "guest",
});

// Head
useHead({
  title: "Login - Atapera",
  meta: [{ name: "description", content: "Entre na sua conta da Atapera" }],
});

// Imports
const { signIn, signInWithGoogle } = useAuth();
import {
  clearSupabaseCache,
  getRememberPreference,
  setRememberPreference,
} from "~/composables/useSupabase";
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

const handleLogin = async () => {
  // Reset messages
  error.value = "";
  success.value = "";

  // Validate form
  if (!validateForm()) {
    error.value = "Verifique os campos e tente novamente.";
    return;
  }

  loading.value = true;

  try {
    // Definir persistência conforme "Lembrar-me" e reinicializar cliente
    setRememberPreference(!!form.remember);
    clearSupabaseCache();
    const result = await signIn(form.email, form.password);

    if (result.success) {
      const redirectTo = route.query.redirect || "/minha-conta";
      await router.push(redirectTo);
      return;
    } else {
      error.value = result.error || "Email ou senha inválidos";
    }
  } catch (err) {
    console.error("Erro no login:", err);
    error.value = "Erro interno do servidor. Tente novamente.";
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const result = await signInWithGoogle();

    if (!result.success) {
      error.value = result.error || "Erro ao fazer login com Google";
    }
    // O redirecionamento é feito automaticamente pelo Supabase
  } catch (err) {
    console.error("Erro no login Google:", err);
    error.value = "Erro ao conectar com Google";
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Auto-focus no primeiro campo
  nextTick(() => {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.focus();
    }
  });
  // Sincroniza o checkbox com a preferência salva
  try {
    form.remember = getRememberPreference();
  } catch {}
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
