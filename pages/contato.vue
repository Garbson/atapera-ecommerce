<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Entre em Contato</h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            Nossa equipe especializada está pronta para ajudar você com informações técnicas, 
            dúvidas sobre produtos ou suporte pós-venda.
          </p>
        </div>
      </div>
    </section>

    <!-- Informações de Contato -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Formulário de Contato -->
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-8">Envie sua Mensagem</h2>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      v-model="form.whatsapp"
                      type="tel"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+55 (68) 9282-7730"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+55 (68) 9282-7730"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <select
                      v-model="form.subject"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Selecione o assunto</option>
                      <option value="duvida-produto">Dúvida sobre Produto</option>
                      <option value="suporte-tecnico">Suporte Técnico</option>
                      <option value="pos-venda">Pós-venda</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="sugestao">Sugestão</option>
                      <option value="parcerias">Parcerias</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    v-model="form.message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Descreva sua dúvida ou solicitação..."
                  ></textarea>
                </div>

                <div class="flex items-center gap-3">
                  <input
                    v-model="form.privacy"
                    type="checkbox"
                    id="privacy"
                    required
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label for="privacy" class="text-sm text-gray-600">
                    Concordo com a 
                    <NuxtLink to="/politica-privacidade" class="text-red-600 hover:underline">
                      Política de Privacidade
                    </NuxtLink>
                    *
                  </label>
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
                </button>
              </form>
            </div>

            <!-- Informações de Contato -->
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-8">Informações de Contato</h2>
              
              <div class="space-y-6">
                <!-- WhatsApp -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-2">WhatsApp</h3>
                    <p class="text-gray-600 mb-1">
                      <strong>Atendimento:</strong> +55 (68) 9282-7730
                    </p>
                    <p class="text-sm text-gray-500">
                      Segunda a Sexta: 8h às 18h<br>
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>

                <!-- Instagram -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-2">Instagram</h3>
                    <p class="text-gray-600 mb-1">
                      <strong>Siga-nos:</strong> @atapera.oficial
                    </p>
                    <p class="text-sm text-gray-500">
                      Novidades, promoções e dicas
                    </p>
                  </div>
                </div>

                <!-- Endereço -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-2">Endereço</h3>
                    <p class="text-gray-600">
                      Rua das Armas, 1234<br>
                      Centro - São Paulo/SP<br>
                      CEP: 01234-567
                    </p>
                  </div>
                </div>

              </div>

              <!-- Horários Especiais -->
              <div class="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 class="font-semibold text-gray-800 mb-3">⚠️ Horários Especiais</h3>
                <div class="text-sm text-gray-600 space-y-1">
                  <p><strong>Feriados:</strong> Fechado</p>
                  <p><strong>Final de Ano:</strong> Horário reduzido</p>
                  <p><strong>Carnaval:</strong> Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Rápido -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
            Perguntas Frequentes
          </h2>
          
          <div class="space-y-4">
            <div class="bg-white rounded-lg shadow-sm">
              <button 
                @click="toggleFaq(0)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold text-gray-800">
                  Qual o prazo de entrega dos produtos?
                </span>
                <svg 
                  class="w-5 h-5 text-gray-500 transform transition-transform"
                  :class="{ 'rotate-180': openFaq === 0 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="openFaq === 0" class="px-6 pb-6">
                <p class="text-gray-600">
                  O prazo de entrega varia conforme a região: Sudeste (2-5 dias úteis), 
                  demais regiões (5-10 dias úteis). Produtos especiais podem ter prazo estendido.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm">
              <button 
                @click="toggleFaq(1)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold text-gray-800">
                  Como acompanhar meu pedido?
                </span>
                <svg 
                  class="w-5 h-5 text-gray-500 transform transition-transform"
                  :class="{ 'rotate-180': openFaq === 1 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="openFaq === 1" class="px-6 pb-6">
                <p class="text-gray-600">
                  Após a confirmação do pagamento, você receberá as informações de rastreamento pelo WhatsApp. 
                  Também pode acompanhar na área "Meus Pedidos" do site.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm">
              <button 
                @click="toggleFaq(2)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold text-gray-800">
                  Vocês fazem atendimento presencial?
                </span>
                <svg 
                  class="w-5 h-5 text-gray-500 transform transition-transform"
                  :class="{ 'rotate-180': openFaq === 2 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="openFaq === 2" class="px-6 pb-6">
                <p class="text-gray-600">
                  No momento, trabalhamos apenas com vendas online. Entre em contato pelo WhatsApp 
                  +55 (68) 9282-7730 para atendimento personalizado.
                </p>
              </div>
            </div>
          </div>

          <div class="text-center mt-8">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5568928277300" 
                target="_blank"
                class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Falar no WhatsApp
              </a>
              <NuxtLink
                to="/faq" 
                class="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                Ver FAQ
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Estados
const form = reactive({
  name: '',
  whatsapp: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
})

const loading = ref(false)
const openFaq = ref(null)

// Métodos
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const submitForm = async () => {
  loading.value = true
  
  try {
    // Aqui você implementaria o envio do formulário
    // Para agora, vamos simular um delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    
    // Limpar formulário
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
  } catch (error) {
    alert('Erro ao enviar mensagem. Tente novamente.')
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Contato - Atapera',
  meta: [
    {
      name: 'description',
      content: 'Entre em contato com a Atapera. SAC, vendas, suporte técnico e atendimento especializado. WhatsApp e Instagram da loja.'
    },
    {
      property: 'og:title',
      content: 'Contato - Atapera'
    },
    {
      property: 'og:description',
      content: 'Fale conosco! Equipe especializada pronta para ajudar com dúvidas técnicas, suporte pós-venda e informações sobre produtos.'
    }
  ]
})
</script>