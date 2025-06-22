<!-- components/sections/HeroSection.vue -->
<template>
  <section
    class="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
      </svg>
    </div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <div class="max-w-4xl mx-auto">
        <!-- Badge -->
        <div
          class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
        >
          <span class="text-sm font-medium"
            >🇧🇷 Produtos certificados no Brasil</span
          >
        </div>

        <!-- Main Title -->
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Equipamentos de Qualidade para
          <span
            class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
          >
            Sua Aventura
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          Armas registradas, equipamentos de pesca e acessórios para caça
          esportiva. Mais de 10 anos equipando grandes aventuras.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <NuxtLink
            to="/produtos"
            class="group bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span class="flex items-center justify-center gap-2">
              Ver Todos os Produtos
              <svg
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          </NuxtLink>

          <NuxtLink
            to="/categoria/armas-fogo"
            class="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
          >
            <span class="flex items-center justify-center gap-2">
              🔫 Armas de Fogo
            </span>
          </NuxtLink>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="flex items-center justify-center gap-3 text-white/80">
            <div
              class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              ✅
            </div>
            <span class="font-medium">Produtos Certificados</span>
          </div>

          <div class="flex items-center justify-center gap-3 text-white/80">
            <div
              class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              🚚
            </div>
            <span class="font-medium">Entrega Nacional</span>
          </div>

          <div class="flex items-center justify-center gap-3 text-white/80">
            <div
              class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              🏆
            </div>
            <span class="font-medium">Qualidade Garantida</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-auto"
      >
        <path
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill="white"
        />
      </svg>
    </div>
  </section>
</template>

<script setup>
// Dados do componente se necessário
</script>

<style scoped>
/* Animação de fade in */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container > div {
  animation: fadeInUp 0.8s ease-out;
}
</style>
