<!-- components/AppFooter.vue -->
<template>
  <footer
    class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
  >
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Company Info -->
        <div class="space-y-6">
          <div class="mb-8">
            <img
              src="/marca/ataperaPrincipal.png"
              alt="Atapera - Armas, Pesca & Aventura"
              class="h-16 w-auto object-contain filter drop-shadow-lg"
            />
          </div>
          <p class="text-gray-300 text-sm leading-relaxed max-w-sm">
            Mais de 10 anos fornecendo equipamentos de qualidade para
            aventureiros, caçadores esportivos e pescadores em todo o Brasil.
            Produtos certificados e atendimento especializado.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h4
            class="text-xl font-bold text-white border-b border-red-500 pb-2 inline-block"
          >
            Links Rápidos
          </h4>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                to="/sobre"
                class="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 group"
              >
                <span
                  class="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"
                ></span>
                Sobre Nós
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contato"
                class="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 group"
              >
                <span
                  class="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"
                ></span>
                Contato
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 group"
              >
                <span
                  class="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"
                ></span>
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/rastreamento"
                class="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 group"
              >
                <span
                  class="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"
                ></span>
                Rastreamento
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/troca-devolucao"
                class="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center gap-3 group"
              >
                <span
                  class="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"
                ></span>
                Trocas e Devoluções
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Info -->
        <div class="space-y-6">
          <h4
            class="text-xl font-bold text-white border-b border-red-500 pb-2 inline-block"
          >
            Atendimento
          </h4>
          <div class="space-y-5">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-white font-semibold text-sm">
                  +55 (68) 9282-7730
                </p>
                <p class="text-gray-400 text-xs">WhatsApp</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 text-red-400"
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
              </div>
              <div>
                <p class="text-white font-semibold text-sm">
                  Av. Epaminondas Jácome Centro, 2199
                </p>
                <p class="text-gray-400 text-xs">
                  Cadeia Velha, Rio Branco - AC, 69905-074
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/ataperaac/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white font-semibold text-sm hover:text-red-400 transition-colors"
                >
                  @ataperaac
                </a>
                <p class="text-gray-400 text-xs">Siga-nos no Instagram</p>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="pt-4">
            <p class="text-sm font-semibold mb-3 text-white">
              Formas de Pagamento
            </p>
            <div class="flex items-center gap-3 flex-wrap">
              <div
                class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-4 py-2 text-xs font-bold shadow-lg"
              >
                PIX
              </div>
              <div
                class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-4 py-2 text-xs font-bold shadow-lg"
              >
                Cartão
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Security & Certifications -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center justify-start gap-3">
            <div
              class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
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

          <div class="flex items-center justify-start gap-3">
            <div
              class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
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

          <div class="flex items-center justify-start gap-3">
            <div
              class="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0"
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
              <p class="text-gray-400 text-xs">7 dias para troca</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700/50 bg-black/50">
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

        <!-- Developer Signature -->
        <div class="mt-4 pt-4 border-t border-gray-800/50">
          <div class="flex justify-center">
            <a
              href="https://wa.me/5568992490198"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-all duration-300 hover:scale-105"
              title="Desenvolvido por Garbson Souza"
            >
              <span class="text-gray-600">Desenvolvido por</span>
              <span
                class="font-medium text-gray-400 group-hover:text-white transition-colors"
                >Garbson Souza</span
              >
              <svg
                class="w-3 h-3 text-green-500 opacity-60 group-hover:opacity-100 transition-all"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
