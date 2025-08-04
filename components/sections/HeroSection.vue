<!-- components/sections/HeroSection.vue -->
<template>
  <section class="relative h-200 md:h-screen overflow-hidden">
    <!-- Carousel Background -->
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/70"></div>
      </div>
    </div>


    <!-- Content Overlay -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <div class="container mx-auto px-4 text-center text-white">
        <div class="max-w-4xl mx-auto">
          <!-- Badge -->
          <div
            class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
          >
            <span class="text-sm font-medium">🇧🇷 Produtos certificados no Brasil</span>
          </div>

          <!-- Dynamic Title -->
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {{ slides[currentSlide]?.title }}
            <span
              class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
            >
              {{ slides[currentSlide]?.highlight }}
            </span>
          </h1>

          <!-- Dynamic Subtitle -->
          <p class="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {{ slides[currentSlide]?.description }}
          </p>


        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const currentSlide = ref(0)
let autoSlideInterval = null

const slides = [
  {
    id: 1,
    image: '/images/armas.jpg',
    title: 'Armas de Fogo',
    highlight: 'Certificadas',
    description: 'Pistolas, revólveres e rifles registrados com documentação completa e suporte especializado. Mais de 10 anos equipando grandes aventuras.',
    primaryAction: {
      text: 'Ver Armas',
      link: '/categoria/armas-fogo'
    },
    secondaryAction: {
      text: 'Documentação',
      link: '/sobre'
    }
  },
  {
    id: 2,
    image: '/images/pescaC.jpg',
    title: 'Equipamentos de',
    highlight: 'Pesca',
    description: 'Varas, molinetes, iscas e acessórios para pesca em água doce, salgada e esportiva. Equipamentos de qualidade para sua pescaria.',
    primaryAction: {
      text: 'Ver Equipamentos',
      link: '/categoria/pesca'
    },
    secondaryAction: {
      text: 'Dicas de Pesca',
      link: '/blog'
    }
  },
  {
    id: 3,
    image: '/images/airsoftC.jpg',
    title: 'Airsoft e',
    highlight: 'Tactical',
    description: 'Equipamentos táticos, réplicas e acessórios para airsoft e simulação militar. Tudo para sua experiência tática.',
    primaryAction: {
      text: 'Ver Airsoft',
      link: '/categoria/airsoft'
    },
    secondaryAction: {
      text: 'Equipamentos',
      link: '/categoria/vestuario'
    }
  },
  {
    id: 4,
    image: '/images/caca4.jpg',
    title: 'Caça e',
    highlight: 'Aventura',
    description: 'Arco e flecha, equipamentos e acessórios para caça esportiva e modalidades tradicionais. Sua próxima aventura começa aqui.',
    primaryAction: {
      text: 'Ver Equipamentos',
      link: '/categoria/caca'
    },
    secondaryAction: {
      text: 'Aventuras',
      link: '/produtos'
    }
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // 5 segundos
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
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
