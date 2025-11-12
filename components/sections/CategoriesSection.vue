<!-- components/sections/CategoriesSection.vue -->
<template>
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-100 mb-4">
          Nossas Especialidades
        </h2>
        <p class="text-xl text-gray-100 max-w-2xl mx-auto">
          Equipamentos de qualidade para cada tipo de aventura e modalidade
          esportiva
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Loading State -->
        <div
          v-if="loading"
          v-for="i in 6"
          :key="i"
          class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="h-6 bg-gray-200 rounded mb-3"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Categories -->
        <div
          v-else
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
            <img
              :src="category.image"
              :alt="category.name"
              class="relative z-10 w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300 filter brightness-110"
            />

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
            <p class="text-gray-800 mb-4 leading-relaxed">
              {{ category.description }}
            </p>

            <!-- Features -->
            <ul
              v-if="category.features"
              class="text-sm text-gray-800 mb-4 space-y-1"
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
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-12">
        <p class="text-gray-100 mb-6">Não encontrou o que procura?</p>
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
const categoriesStore = useCategoriesStore()
const loading = ref(true)

// Dados padrão das categorias para exibição
const categoriesData = {
  1: {
    description:
      "Pistolas, revólveres e rifles registrados com documentação completa e suporte especializado.",
    image: "/images/armas.jpg",
    bgClass: "bg-gradient-to-br from-gray-800 to-gray-900",
    productCount: 250,
    badge: "Licença Req.",
    features: [
      "Documentação completa",
      "Registro no Exército",
      "Suporte especializado",
    ],
  },
  2: {
    description:
      "Carabinas e pistolas de pressão certificadas pelo Exército brasileiro para tiro esportivo.",
    image: "/images/cacaC.jpg",
    bgClass: "bg-gradient-to-br from-blue-600 to-blue-800",
    productCount: 180,
    features: [
      "Certificadas pelo Exército",
      "Tiro esportivo",
      "Várias potências",
    ],
  },
  3: {
    description:
      "Varas, molinetes, iscas e acessórios para pesca em água doce, salgada e esportiva.",
    image: "/images/pescaC.jpg",
    bgClass: "bg-gradient-to-br from-green-600 to-green-800",
    productCount: 420,
    features: ["Água doce e salgada", "Pesca esportiva", "Marcas premium"],
  },
  4: {
    description:
      "Equipamentos táticos, réplicas e acessórios para airsoft e simulação militar.",
    image: "/images/airsoftC.jpg",
    bgClass: "bg-gradient-to-br from-purple-600 to-purple-800",
    productCount: 320,
    features: [
      "Réplicas realistas",
      "Equipamentos táticos",
      "Acessórios completos",
    ],
  },
  5: {
    description:
      "Equipamentos de lazer e entretenimento para atividades recreativas e hobbies diversos.",
    image: "/images/lazer.jpg",
    bgClass: "bg-gradient-to-br from-indigo-600 to-indigo-800",
    productCount: 0,
    features: ["Entretenimento", "Hobbies diversos", "Qualidade garantida"],
  },
  6: {
    description:
      "Roupas táticas, calçados e equipamentos para aventuras outdoor e atividades ao ar livre.",
    image: "/images/vestuarioC.jpg",
    bgClass: "bg-gradient-to-br from-yellow-600 to-yellow-800",
    productCount: 280,
    features: ["Roupas táticas", "Calçados outdoor", "Resistente e durável"],
  },
  7: {
    description:
      "Motores de popa, estacionários, motobombas e acessórios. Equipamentos completos para embarcações, geradores e bombas d'água.",
    image: "/images/motoresBg.jpg",
    bgClass: "bg-gradient-to-br from-teal-600 to-teal-800",
    productCount: 85,
    features: ["Motores de popa", "Motores estacionários", "Motobombas e geradores"],
  },
}

// Computar categorias para exibição
const categories = computed(() => {
  return categoriesStore.activeCategories.map(category => {
    const categoryData = categoriesData[category.id] || {}
    return {
      ...category,
      ...categoryData,
      link: `/categoria/${category.slug}`,
    }
  })
})

// Carregar categorias ao montar o componente
onMounted(async () => {
  try {
    await categoriesStore.fetchCategories()
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  } finally {
    loading.value = false
  }
})
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
.group:nth-child(7) {
  animation-delay: 0.6s;
}
</style>
