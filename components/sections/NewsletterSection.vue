<!-- components/sections/NewsletterSection.vue -->
<template>
  <section
    class="py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg
        class="w-full h-full"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="newsletter-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="30" cy="30" r="1.5" fill="white" />
            <circle cx="0" cy="0" r="1" fill="white" />
            <circle cx="60" cy="60" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#newsletter-pattern)" />
      </svg>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Icon -->
        <div
          class="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center"
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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <!-- Heading -->
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Fique por dentro das
          <span
            class="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
          >
            novidades
          </span>
        </h2>

        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Receba ofertas exclusivas, lançamentos em primeira mão e dicas de
          especialistas direto no seu e-mail. Sem spam, apenas conteúdo de
          qualidade.
        </p>

        <!-- Newsletter Form -->
        <div class="max-w-md mx-auto mb-8">
          <form
            @submit.prevent="subscribe"
            class="flex flex-col sm:flex-row gap-4"
          >
            <div class="flex-1 relative">
              <input
                v-model="email"
                type="email"
                required
                placeholder="Digite seu melhor e-mail"
                class="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                :disabled="loading"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading || !email"
              class="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <span v-if="!loading" class="flex items-center gap-2">
                Inscrever-se
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <span v-else class="flex items-center gap-2">
                <svg
                  class="animate-spin w-5 h-5"
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
                Inscrevendo...
              </span>
            </button>
          </form>

          <!-- Success Message -->
          <div
            v-if="success"
            class="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
          >
            <div class="flex items-center gap-2 text-green-400">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium">Inscrição realizada com sucesso!</span>
            </div>
            <p class="text-green-300 text-sm mt-1">
              Verifique seu e-mail para confirmar a inscrição.
            </p>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <div class="flex items-center gap-2 text-red-400">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium">{{ error }}</span>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0"
            >
              🎯
            </div>
            <div class="text-left">
              <div class="font-semibold">Ofertas Exclusivas</div>
              <div class="text-sm text-gray-400">
                Descontos especiais para assinantes
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0"
            >
              🚀
            </div>
            <div class="text-left">
              <div class="font-semibold">Lançamentos</div>
              <div class="text-sm text-gray-400">Seja o primeiro a saber</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0"
            >
              💡
            </div>
            <div class="text-left">
              <div class="font-semibold">Dicas de Especialistas</div>
              <div class="text-sm text-gray-400">
                Conteúdo educativo semanal
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Note -->
        <p class="text-sm text-gray-400">
          📧 Enviamos no máximo 1 e-mail por semana.
          <NuxtLink
            to="/privacidade"
            class="text-red-400 hover:text-red-300 underline"
          >
            Política de Privacidade
          </NuxtLink>
        </p>

        <!-- Social Proof -->
        <div class="mt-8 pt-8 border-t border-gray-700">
          <p class="text-gray-400 mb-4">
            Junte-se a mais de 25.000 aventureiros:
          </p>
          <div class="flex justify-center items-center gap-6 text-gray-500">
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c0 2.208-1.789 3.997-3.997 3.997z"
                />
                <path
                  d="M16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941C.583 3.458.16 5.171.069 7.114c-.103 2.208-.098 7.677 0 9.887.091 1.942.56 3.655 1.941 5.036 1.441 1.441 3.113 1.85 5.036 1.941 2.208.103 7.677.098 9.887 0 1.942-.091 3.655-.56 5.036-1.941C23.441 20.595 23.864 18.883 23.955 16.94c.103-2.208.098-7.677 0-9.887-.091-1.942-.56-3.655-1.941-5.036C20.595.583 18.883.16 16.948.076zM19.099 7.993c0 2.208.103 7.677 0 9.887-.091 1.942-.56 3.655-1.941 5.036-1.441 1.441-3.113 1.85-5.036 1.941-2.208.103-7.677.098-9.887 0-1.942-.091-3.655-.56-5.036-1.941C1.758 21.475 1.349 19.803 1.258 17.88c-.103-2.208-.098-7.677 0-9.887.091-1.942.56-3.655 1.941-5.036C4.64 1.516 6.312 1.107 8.235 1.016c2.208-.103 7.677-.098 9.887 0 1.942.091 3.655.56 5.036 1.941 1.441 1.441 1.85 3.113 1.941 5.036z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div
      class="absolute top-10 left-10 w-20 h-20 bg-red-600/10 rounded-full blur-xl"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-32 h-32 bg-orange-600/10 rounded-full blur-xl"
    ></div>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Estados
const email = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref("");

// Métodos
const subscribe = async () => {
  if (!email.value) return;

  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Em produção, fazer a chamada real para a API
    // const response = await $fetch('/api/newsletter/subscribe', {
    //   method: 'POST',
    //   body: { email: email.value }
    // })

    success.value = true;
    email.value = "";

    // Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "newsletter_signup", {
        event_category: "engagement",
        event_label: "newsletter",
      });
    }
  } catch (err) {
    error.value = "Erro ao realizar inscrição. Tente novamente.";
    console.error("Newsletter subscription error:", err);
  } finally {
    loading.value = false;
  }
};

// Auto hide success message
watch(success, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      success.value = false;
    }, 5000);
  }
});
</script>

<style scoped>
/* Input focus effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Button hover effects */
button:hover:not(:disabled) {
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
}

/* Animation for success/error messages */
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for benefits */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.w-10.h-10.bg-red-600\/20 {
  animation: pulse 3s infinite;
}
</style>
