<!-- components/sections/CategoriesSection.vue -->
<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          Nossas Especialidades
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Equipamentos de qualidade para cada tipo de aventura e modalidade
          esportiva
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="category in categories"
          :key="category.id"
          class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <!-- Image/Icon Header -->
          <div
            class="relative h-48 flex items-center justify-center overflow-hidden"
            :class="category.bgClass"
          >
            <div class="absolute inset-0 bg-black/20"></div>
            <div
              class="relative z-10 text-white text-6xl group-hover:scale-110 transition-transform duration-300"
            >
              {{ category.icon }}
            </div>

            <!-- Badge se necessário -->
            <div
              v-if="category.badge"
              class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {{ category.badge }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3
              class="text-xl font-semibold mb-3 text-gray-800 group-hover:text-red-600 transition-colors"
            >
              {{ category.name }}
            </h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              {{ category.description }}
            </p>

            <!-- Features -->
            <ul
              v-if="category.features"
              class="text-sm text-gray-500 mb-4 space-y-1"
            >
              <li
                v-for="feature in category.features"
                :key="feature"
                class="flex items-center gap-2"
              >
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {{ feature }}
              </li>
            </ul>

            <!-- CTA -->
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="category.link"
                class="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors group"
              >
                Ver produtos
                <svg
                  class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
              </NuxtLink>

              <span class="text-sm text-gray-400">
                {{ category.productCount }}+ produtos
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-6">Não encontrou o que procura?</p>
        <NuxtLink
          to="/produtos"
          class="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Ver Todos os Produtos
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: "Armas de Fogo",
    description:
      "Pistolas, revólveres e rifles registrados com documentação completa e suporte especializado.",
    icon: "🔫",
    bgClass: "bg-gradient-to-br from-gray-800 to-gray-900",
    link: "/categoria/armas-fogo",
    productCount: 250,
    badge: "Licença Req.",
    features: [
      "Documentação completa",
      "Registro no Exército",
      "Suporte especializado",
    ],
  },
  {
    id: 2,
    name: "Armas de Pressão",
    description:
      "Carabinas e pistolas de pressão certificadas pelo Exército brasileiro para tiro esportivo.",
    icon: "🎯",
    bgClass: "bg-gradient-to-br from-blue-600 to-blue-800",
    link: "/categoria/armas-pressao",
    productCount: 180,
    features: [
      "Certificadas pelo Exército",
      "Tiro esportivo",
      "Várias potências",
    ],
  },
  {
    id: 3,
    name: "Equipamentos de Pesca",
    description:
      "Varas, molinetes, iscas e acessórios para pesca em água doce, salgada e esportiva.",
    icon: "🎣",
    bgClass: "bg-gradient-to-br from-green-600 to-green-800",
    link: "/categoria/pesca",
    productCount: 420,
    features: ["Água doce e salgada", "Pesca esportiva", "Marcas premium"],
  },
  {
    id: 4,
    name: "Airsoft",
    description:
      "Equipamentos táticos, réplicas e acessórios para airsoft e simulação militar.",
    icon: "⚔️",
    bgClass: "bg-gradient-to-br from-purple-600 to-purple-800",
    link: "/categoria/airsoft",
    productCount: 320,
    features: [
      "Réplicas realistas",
      "Equipamentos táticos",
      "Acessórios completos",
    ],
  },
  {
    id: 5,
    name: "Caça",
    description:
      "Arco e flecha, equipamentos e acessórios para caça esportiva e modalidades tradicionais.",
    icon: "🏹",
    bgClass: "bg-gradient-to-br from-orange-600 to-orange-800",
    link: "/categoria/caca",
    productCount: 150,
    features: ["Arco e flecha", "Caça tradicional", "Equipamentos premium"],
  },
  {
    id: 6,
    name: "Vestuário Outdoor",
    description:
      "Roupas táticas, calçados e equipamentos para aventuras outdoor e atividades ao ar livre.",
    icon: "👕",
    bgClass: "bg-gradient-to-br from-yellow-600 to-yellow-800",
    link: "/categoria/vestuario",
    productCount: 280,
    features: ["Roupas táticas", "Calçados outdoor", "Resistente e durável"],
  },
];
</script>

<style scoped>
/* Hover effects */
.group:hover .bg-gradient-to-br {
  background-size: 110% 110%;
}

/* Card animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: fadeInUp 0.6s ease-out;
}

.group:nth-child(2) {
  animation-delay: 0.1s;
}
.group:nth-child(3) {
  animation-delay: 0.2s;
}
.group:nth-child(4) {
  animation-delay: 0.3s;
}
.group:nth-child(5) {
  animation-delay: 0.4s;
}
.group:nth-child(6) {
  animation-delay: 0.5s;
}
</style>
