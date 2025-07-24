<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Rastreamento de Pedidos</h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            Acompanhe seu pedido em tempo real desde a confirmação até a entrega. 
            Digite o código de rastreamento e veja todas as etapas do envio.
          </p>
        </div>
      </div>
    </section>

    <!-- Formulário de Rastreamento -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              Digite o Código de Rastreamento
            </h2>
            
            <form @submit.prevent="trackOrder" class="space-y-6">
              <div class="flex gap-4">
                <input
                  v-model="trackingCode"
                  type="text"
                  placeholder="Digite o código de rastreamento (ex: AA123456789BR)"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase"
                  maxlength="13"
                />
                <button
                  type="submit"
                  :disabled="!trackingCode || loading"
                  class="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{ loading ? 'Rastreando...' : 'Rastrear' }}
                </button>
              </div>
              
              <div class="text-center">
                <p class="text-gray-600 text-sm">
                  O código de rastreamento foi enviado pelo WhatsApp após a confirmação do pagamento.
                </p>
              </div>
            </form>
          </div>

          <!-- Resultado do Rastreamento -->
          <div v-if="trackingResult" class="mb-12">
            <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-800">
                  Código: {{ trackingResult.code }}
                </h3>
                <span 
                  :class="getStatusColor(trackingResult.status)"
                  class="px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {{ getStatusText(trackingResult.status) }}
                </span>
              </div>

              <!-- Timeline -->
              <div class="space-y-6">
                <div 
                  v-for="(event, index) in trackingResult.events" 
                  :key="index"
                  class="flex gap-4"
                >
                  <div class="flex flex-col items-center">
                    <div 
                      :class="index === 0 ? 'bg-red-600' : 'bg-gray-300'"
                      class="w-4 h-4 rounded-full flex-shrink-0"
                    ></div>
                    <div 
                      v-if="index < trackingResult.events.length - 1"
                      class="w-0.5 h-16 bg-gray-200 mt-2"
                    ></div>
                  </div>
                  
                  <div class="flex-1 pb-6">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-800">{{ event.status }}</h4>
                      <div class="text-sm text-gray-500">
                        {{ formatDate(event.date) }} às {{ event.time }}
                      </div>
                    </div>
                    <p class="text-gray-600 mb-1">{{ event.description }}</p>
                    <p v-if="event.location" class="text-sm text-gray-500">
                      📍 {{ event.location }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Informações de Entrega -->
              <div v-if="trackingResult.delivery" class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Entrega Realizada
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Data:</strong> {{ formatDate(trackingResult.delivery.date) }}
                  </div>
                  <div>
                    <strong>Horário:</strong> {{ trackingResult.delivery.time }}
                  </div>
                  <div>
                    <strong>Recebedor:</strong> {{ trackingResult.delivery.recipient }}
                  </div>
                  <div v-if="trackingResult.delivery.document">
                    <strong>Documento:</strong> {{ trackingResult.delivery.document }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="trackingError" class="mb-12">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6">
              <div class="flex items-center gap-3 mb-3">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="font-semibold text-red-800">Código não encontrado</h3>
              </div>
              <p class="text-red-700 mb-4">
                Não foi possível encontrar informações para este código de rastreamento. 
                Verifique se o código está correto ou tente novamente em alguns minutos.
              </p>
              <div class="text-sm text-red-600">
                <p><strong>Possíveis causas:</strong></p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>Código digitado incorretamente</li>
                  <li>Pedido ainda não foi postado</li>
                  <li>Sistema dos Correios temporariamente indisponível</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Como Rastrear -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Como Rastrear seu Pedido</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Passo 1 -->
              <div class="text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">1. Receba o Código</h3>
                <p class="text-gray-600 leading-relaxed">
                  Após a confirmação do pagamento, você receberá o código de rastreamento por e-mail.
                </p>
              </div>

              <!-- Passo 2 -->
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">2. Digite o Código</h3>
                <p class="text-gray-600 leading-relaxed">
                  Cole ou digite o código de rastreamento no campo acima e clique em "Rastrear".
                </p>
              </div>

              <!-- Passo 3 -->
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-3">3. Acompanhe</h3>
                <p class="text-gray-600 leading-relaxed">
                  Veja todas as etapas do envio desde a postagem até a entrega final.
                </p>
              </div>
            </div>
          </div>

          <!-- Status Explicados -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Status de Envio</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-yellow-800">Objeto Postado</h4>
                    <p class="text-sm text-yellow-700">Pedido foi enviado e está a caminho</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-blue-800">Em Trânsito</h4>
                    <p class="text-sm text-blue-700">Produto em deslocamento entre centros</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-purple-800">Saiu para Entrega</h4>
                    <p class="text-sm text-purple-700">Produto está com o carteiro</p>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-green-800">Entregue</h4>
                    <p class="text-sm text-green-700">Produto foi entregue ao destinatário</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-red-800">Tentativa de Entrega</h4>
                    <p class="text-sm text-red-700">Ninguém estava no endereço</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <h4 class="font-semibold text-orange-800">Aguardando Retirada</h4>
                    <p class="text-sm text-orange-700">Disponível na agência dos Correios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dúvidas Frequentes -->
          <div class="bg-gray-50 rounded-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Dúvidas sobre Rastreamento</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">
                  📧 Não recebi o código de rastreamento
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  O código é enviado pelo WhatsApp após a confirmação do pagamento. 
                  Se não recebeu, entre em contato conosco pelo WhatsApp +55 (68) 9282-7730.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-800 mb-2">
                  ⏰ Há quanto tempo não há atualizações?
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  É normal haver intervalos de 1-2 dias sem atualizações, especialmente finais de semana. 
                  Se passar de 5 dias úteis, entre em contato conosco.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-800 mb-2">
                  🏠 Ninguém estava em casa na tentativa de entrega
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  O produto ficará disponível na agência dos Correios por até 7 dias. 
                  Leve um documento com foto para retirar.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-800 mb-2">
                  📱 Posso rastrear pelo app dos Correios?
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Sim! Você pode usar o app oficial dos Correios ou nosso sistema de rastreamento 
                  para acompanhar seu pedido.
                </p>
              </div>
            </div>

            <div class="mt-8 text-center">
              <h3 class="font-semibold text-gray-800 mb-4">Ainda tem dúvidas?</h3>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/5568928277300" 
                  class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp
                </a>
                <NuxtLink 
                  to="/contato" 
                  class="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                >
                  Entre em Contato
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Estados
const trackingCode = ref('')
const loading = ref(false)
const trackingResult = ref(null)
const trackingError = ref(false)

// Métodos
const trackOrder = async () => {
  if (!trackingCode.value) return
  
  loading.value = true
  trackingError.value = false
  trackingResult.value = null
  
  try {
    // Simulação de chamada da API dos Correios
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Exemplo de dados simulados
    if (trackingCode.value.length >= 10) {
      trackingResult.value = {
        code: trackingCode.value.toUpperCase(),
        status: 'delivered',
        events: [
          {
            date: '2024-01-15',
            time: '14:30',
            status: 'Objeto entregue ao destinatário',
            description: 'Objeto entregue ao destinatário',
            location: 'São Paulo/SP'
          },
          {
            date: '2024-01-15',
            time: '08:15',
            status: 'Objeto saiu para entrega',
            description: 'Objeto saiu para entrega ao destinatário',
            location: 'CDD São Paulo/SP'
          },
          {
            date: '2024-01-14',
            time: '16:45',
            status: 'Objeto em trânsito',
            description: 'Objeto em trânsito - por favor aguarde',
            location: 'CTE São Paulo/SP'
          },
          {
            date: '2024-01-13',
            time: '10:20',
            status: 'Objeto postado',
            description: 'Objeto postado pela empresa remetente',
            location: 'São Paulo/SP'
          }
        ],
        delivery: {
          date: '2024-01-15',
          time: '14:30',
          recipient: 'João Silva',
          document: 'CPF: ***.***.***-**'
        }
      }
    } else {
      trackingError.value = true
    }
  } catch (error) {
    trackingError.value = true
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'in_transit':
      return 'bg-blue-100 text-blue-800'
    case 'out_for_delivery':
      return 'bg-purple-100 text-purple-800'
    case 'attempted':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'delivered':
      return 'Entregue'
    case 'in_transit':
      return 'Em Trânsito'
    case 'out_for_delivery':
      return 'Saiu para Entrega'
    case 'attempted':
      return 'Tentativa de Entrega'
    default:
      return 'Em Processamento'
  }
}

// SEO
useHead({
  title: 'Rastreamento de Pedidos - Atapera',
  meta: [
    {
      name: 'description',
      content: 'Rastreie seu pedido da Atapera em tempo real. Digite o código de rastreamento e acompanhe todas as etapas do envio até a entrega.'
    },
    {
      property: 'og:title',
      content: 'Rastreamento de Pedidos - Atapera'
    },
    {
      property: 'og:description',
      content: 'Acompanhe seu pedido desde a confirmação até a entrega. System de rastreamento em tempo real.'
    }
  ]
})
</script>