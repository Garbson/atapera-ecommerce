<!-- components/sections/AboutSection.vue -->
<template>
  <section class="py-16  bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-100 mb-4">
            Por que escolher a Atapera?
          </h2>
          <p class="text-xl text-gray-100 max-w-3xl mx-auto">
            Mais de 10 anos de experiência fornecendo equipamentos de qualidade
            para aventureiros, caçadores esportivos e pescadores em todo o
            Brasil.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">10+</div>
            <div class="text-sm text-gray-100 uppercase tracking-wide">
              Anos de Experiência
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">50k+</div>
            <div class="text-sm text-gray-100 uppercase tracking-wide">
              Clientes Satisfeitos
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div class="text-sm text-gray-100 uppercase tracking-wide">
              Produtos Disponíveis
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">99%</div>
            <div class="text-sm text-gray-100 uppercase tracking-wide">
              Aprovação dos Clientes
            </div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="group text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl"
              :class="feature.bgColor"
            >
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              {{ feature.description }}
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li
                v-for="benefit in feature.benefits"
                :key="benefit"
                class="flex items-center justify-center gap-2"
              >
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Certifications & Trust -->
        <div class="bg-white rounded-2xl p-8 shadow-sm">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Certificações e Segurança
            </h3>
            <p class="text-gray-600">
              Todos os nossos produtos seguem rigorosamente a legislação
              brasileira
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="text-center p-4">
              <div
                class="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
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
              <h4 class="font-semibold text-gray-800 mb-1">
                Registro Exército
              </h4>
              <p class="text-sm text-gray-600">Produtos certificados</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
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
              <h4 class="font-semibold text-gray-800 mb-1">Pagamento Seguro</h4>
              <p class="text-sm text-gray-600">SSL e criptografia</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">Entrega Rápida</h4>
              <p class="text-sm text-gray-600">Interestadual</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v2m0 16v2m9-9h-2M5 12H3"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">Suporte 24/7</h4>
              <p class="text-sm text-gray-600">Atendimento especializado</p>
            </div>
          </div>
        </div>

        <!-- Testimonial -->
        <div class="mt-16 text-center">
          <div class="max-w-4xl mx-auto">
            <blockquote class="text-2xl italic text-gray-100 mb-6">
              "A Atapera não é apenas uma loja, é um parceiro para nossas
              aventuras. Qualidade excepcional e atendimento que realmente
              entende nossas necessidades."
            </blockquote>
            <div class="flex items-center justify-center gap-4">
              <img
                src="/images/joao.jpeg"
                alt="João Silva"
                class="w-12 h-12 rounded-full"
              />
              <div class="text-left">
                <div class="font-semibold text-white">João Silva</div>
                <div class="text-sm text-gray-100">Pescador Esportivo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    id: 1,
    icon: "✅",
    title: "Produtos Certificados",
    description:
      "Todos os produtos seguem rigorosamente a legislação brasileira e possuem certificações necessárias.",
    bgColor: "bg-green-100",
    benefits: [
      "Registro no Exército",
      "Documentação completa",
      "Garantia de qualidade",
    ],
  },
  {
    id: 2,
    icon: "🚚",
    title: "Entrega Interestadual",
    description:
      "Entregamos com segurança para Acre, Rondonia e Amazonas através dos Correios e transportadoras parceiras.",
    bgColor: "bg-blue-100",
    benefits: ["Embalagem segura", "Rastreamento online", "Seguro incluído"],
  },
  {
    id: 3,
    icon: "🏆",
    title: "Qualidade Garantida",
    description:
      "Trabalhamos apenas com marcas reconhecidas no mercado e oferecemos garantia em todos os produtos.",
    bgColor: "bg-yellow-100",
    benefits: ["Marcas premium", "Garantia estendida", "Produtos testados"],
  },
  {
    id: 4,
    icon: "📞",
    title: "Suporte Especializado",
    description:
      "Nossa equipe é formada por especialistas que praticam as modalidades e conhecem os produtos.",
    bgColor: "bg-purple-100",
    benefits: [
      "Consultoria técnica",
      "Suporte pós-venda",
      "Conhecimento prático",
    ],
  },
  {
    id: 5,
    icon: "💳",
    title: "Pagamento Facilitado",
    description:
      "Aceitamos diversas formas de pagamento incluindo PIX, cartões e parcelamento sem juros.",
    bgColor: "bg-indigo-100",
    benefits: ["Parcelamento 12x", "Pagamento seguro", "Transferência PIX"],
  },
  {
    id: 6,
    icon: "🔒",
    title: "Ambiente Seguro",
    description:
      "Sua privacidade e segurança são nossa prioridade. Site protegido e dados criptografados.",
    bgColor: "bg-red-100",
    benefits: ["SSL certificado", "Dados protegidos", "Compra segura"],
  },
];
</script>

<style scoped>
/* Animation delays for features */
.group:nth-child(1) {
  animation-delay: 0.1s;
}
.group:nth-child(2) {
  animation-delay: 0.2s;
}
.group:nth-child(3) {
  animation-delay: 0.3s;
}
.group:nth-child(4) {
  animation-delay: 0.4s;
}
.group:nth-child(5) {
  animation-delay: 0.5s;
}
.group:nth-child(6) {
  animation-delay: 0.6s;
}

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
  animation: fadeInUp 0.6s ease-out both;
}
</style>
