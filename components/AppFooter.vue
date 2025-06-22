<!-- components/AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h3 class="text-xl font-bold">Atapera</h3>
              <p class="text-sm text-gray-400">Armas, Pesca & Aventura</p>
            </div>
          </div>

          <p class="text-gray-400 text-sm leading-relaxed">
            Mais de 10 anos fornecendo equipamentos de qualidade para
            aventureiros, caçadores esportivos e pescadores em todo o Brasil.
            Produtos certificados e atendimento especializado.
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-4">
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c0 2.208-1.789 3.997-3.997 3.997z"
                />
                <path
                  d="M16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941C.583 3.458.16 5.171.069 7.114c-.103 2.208-.098 7.677 0 9.887.091 1.942.56 3.655 1.941 5.036 1.441 1.441 3.113 1.85 5.036 1.941 2.208.103 7.677.098 9.887 0 1.942-.091 3.655-.56 5.036-1.941 1.441-1.441 1.85-3.113 1.941-5.036.103-2.208.098-7.677 0-9.887-.091-1.942-.56-3.655-1.941-5.036C20.595.583 18.883.16 16.948.076zM19.099 7.993c0 2.208.103 7.677 0 9.887-.091 1.942-.56 3.655-1.941 5.036-1.441 1.441-3.113 1.85-5.036 1.941-2.208.103-7.677.098-9.887 0-1.942-.091-3.655-.56-5.036-1.941C1.758 21.475 1.349 19.803 1.258 17.88c-.103-2.208-.098-7.677 0-9.887.091-1.942.56-3.655 1.941-5.036C4.64 1.516 6.312 1.107 8.235 1.016c2.208-.103 7.677-.098 9.887 0 1.942.091 3.655.56 5.036 1.941 1.441 1.441 1.85 3.113 1.941 5.036z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Links Rápidos</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/sobre"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Sobre Nós</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contato"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Contato</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >FAQ</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/rastreamento"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Rastreamento</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/troca-devolucao"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Trocas e Devoluções</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/garantia"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Garantia</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Categorias</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/categoria/armas-fogo"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Armas de Fogo</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/categoria/armas-pressao"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Armas de Pressão</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/categoria/pesca"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Equipamentos de Pesca</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/categoria/airsoft"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Airsoft</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/categoria/caca"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Caça</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/categoria/vestuario"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                >Vestuário Outdoor</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact & Info -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Atendimento</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p class="text-white font-medium text-sm">(11) 99999-9999</p>
                <p class="text-gray-400 text-xs">Segunda a Sexta: 8h às 18h</p>
                <p class="text-gray-400 text-xs">Sábado: 8h às 14h</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
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
              <div>
                <p class="text-white font-medium text-sm">
                  contato@atapera.shop
                </p>
                <p class="text-gray-400 text-xs">Resposta em até 24h</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p class="text-white font-medium text-sm">São Paulo - SP</p>
                <p class="text-gray-400 text-xs">Entrega para todo Brasil</p>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="pt-4">
            <p class="text-sm font-medium mb-3">Formas de Pagamento</p>
            <div class="flex items-center gap-2 flex-wrap">
              <div
                class="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium"
              >
                PIX
              </div>
              <div
                class="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium"
              >
                Cartão
              </div>
              <div
                class="bg-white rounded px-2 py-1 text-xs text-gray-800 font-medium"
              >
                Boleto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security & Certifications -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div class="flex items-center justify-center gap-3">
            <div
              class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-white font-medium text-sm">
                Produtos Certificados
              </p>
              <p class="text-gray-400 text-xs">
                Registro no Exército Brasileiro
              </p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3">
            <div
              class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-white font-medium text-sm">Compra Segura</p>
              <p class="text-gray-400 text-xs">SSL e criptografia 256-bit</p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3">
            <div
              class="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-white font-medium text-sm">Satisfação Garantida</p>
              <p class="text-gray-400 text-xs">30 dias para troca</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800 bg-gray-950">
      <div class="container mx-auto px-4 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="flex items-center gap-6">
            <p class="text-gray-400 text-sm">
              © {{ currentYear }} Atapera. Todos os direitos reservados.
            </p>
          </div>

          <div class="flex items-center gap-6">
            <NuxtLink
              to="/privacidade"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Política de Privacidade
            </NuxtLink>
            <NuxtLink
              to="/termos"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Termos de Uso
            </NuxtLink>
            <NuxtLink
              to="/cookies"
              class="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
