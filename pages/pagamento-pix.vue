<!-- pages/pagamento-pix.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Pagamento via PIX
          </h1>

          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Gerando código PIX...</p>
          </div>

          <div v-else-if="error" class="text-center py-8">
            <div class="text-red-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Erro no PIX</h2>
            <p class="text-gray-600 mb-4">{{ error }}</p>
            <NuxtLink 
              to="/checkout" 
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Voltar ao Checkout
            </NuxtLink>
          </div>

          <div v-else-if="success" class="text-center py-8">
            <div class="text-green-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Pagamento Confirmado!</h2>
            <p class="text-gray-600 mb-4">Seu PIX foi processado com sucesso.</p>
            <div class="space-y-3">
              <NuxtLink 
                to="/minha-conta/pedidos" 
                class="block w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-center"
              >
                Ver Meus Pedidos
              </NuxtLink>
              <NuxtLink 
                to="/" 
                class="block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-center"
              >
                Continuar Comprando
              </NuxtLink>
            </div>
          </div>

          <div v-else class="space-y-6">
            <!-- Valor a pagar -->
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h2 class="text-lg font-semibold text-red-800 mb-2">Valor a pagar</h2>
              <p class="text-2xl font-bold text-red-600">{{ formatPrice(amount) }}</p>
            </div>

            <!-- QR Code (simulado) -->
            <div class="text-center">
              <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                <svg class="w-32 h-32 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V5a1 1 0 100-2H4zm2 2v10h8V5H6z" clip-rule="evenodd"/>
                </svg>
                <p class="text-sm text-gray-500 mt-2">QR Code PIX</p>
              </div>
              <p class="text-sm text-gray-600">
                Escaneie o código QR com seu app do banco ou Pix
              </p>
            </div>

            <!-- Código PIX para copiar -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Ou copie o código PIX
              </label>
              <div class="flex">
                <input
                  v-model="pixCode"
                  type="text"
                  readonly
                  class="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50 text-sm"
                  placeholder="Gerando código PIX..."
                />
                <button
                  @click="copyPixCode"
                  class="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                  </svg>
                </button>
              </div>
              <p v-if="copied" class="text-sm text-green-600 mt-1">Código copiado!</p>
            </div>

            <!-- Instruções -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="text-sm font-medium text-blue-800 mb-2">Como pagar:</h3>
              <ol class="text-sm text-blue-700 space-y-1">
                <li>1. Abra seu app do banco ou carteira digital</li>
                <li>2. Selecione a opção PIX</li>
                <li>3. Escaneie o QR Code ou cole o código</li>
                <li>4. Confirme o pagamento</li>
              </ol>
            </div>

            <!-- Tempo limite -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                ⏱️ Este PIX expira em {{ formatTime(timeLeft) }}
              </p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  class="bg-red-600 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: `${(timeLeft / totalTime) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- Aguardando pagamento -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div class="animate-pulse flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-yellow-800">Aguardando pagamento...</span>
              </div>
            </div>

            <!-- Botão manual para verificar pagamento -->
            <button
              @click="checkPaymentStatus"
              :disabled="checking"
              class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <span v-if="checking">Verificando...</span>
              <span v-else>Verificar Status do Pagamento</span>
            </button>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 1L3 6v11a1 1 0 001 1h12a1 1 0 001-1V6l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              PIX seguro via Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const cartStore = useCartStore()

// Estados
const loading = ref(true)
const checking = ref(false)
const error = ref('')
const success = ref(false)
const copied = ref(false)
const pixCode = ref('')

// Timer
const totalTime = 900 // 15 minutos em segundos
const timeLeft = ref(totalTime)
const timer = ref<NodeJS.Timeout | null>(null)

// Parâmetros da URL
const clientSecret = route.query.intent as string
const orderId = route.query.order as string
const amount = cartStore.totalValue

// Verificar se temos os parâmetros necessários
if (!clientSecret || !orderId) {
  error.value = 'Parâmetros de pagamento inválidos'
  loading.value = false
}

onMounted(async () => {
  if (error.value) return

  try {
    // Simular geração do código PIX
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Gerar código PIX simulado
    pixCode.value = generatePixCode()
    
    loading.value = false
    
    // Iniciar timer
    startTimer()
    
    // Iniciar verificação automática de pagamento
    startPaymentPolling()
  } catch (err: any) {
    console.error('Erro ao gerar PIX:', err)
    error.value = err.message || 'Erro ao gerar código PIX'
    loading.value = false
  }
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

const generatePixCode = () => {
  // Simular código PIX
  return `00020126580014br.gov.bcb.pix01368${Math.random().toString(36).substring(2, 15)}520400005303986540${amount.toFixed(2)}5802BR5925ATAPERA COMERCIO LTDA6014BELO HORIZONTE62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`
}

const startTimer = () => {
  timer.value = setInterval(() => {
    timeLeft.value--
    
    if (timeLeft.value <= 0) {
      clearInterval(timer.value!)
      error.value = 'PIX expirado. Tente novamente.'
    }
  }, 1000)
}

const startPaymentPolling = () => {
  // Verificar status a cada 5 segundos
  const pollInterval = setInterval(async () => {
    if (success.value || error.value) {
      clearInterval(pollInterval)
      return
    }
    
    await checkPaymentStatus(false)
  }, 5000)
  
  // Parar polling após 15 minutos
  setTimeout(() => {
    clearInterval(pollInterval)
  }, totalTime * 1000)
}

const checkPaymentStatus = async (manual = true) => {
  if (manual) {
    checking.value = true
  }
  
  try {
    // Simular verificação de pagamento
    // Em produção, seria uma chamada real para a API do Stripe
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular pagamento bem-sucedido após um tempo (para demonstração)
    const random = Math.random()
    if (random > 0.7) {
      success.value = true
      cartStore.clearCart()
      
      if (timer.value) {
        clearInterval(timer.value)
      }
    }
  } catch (err) {
    console.error('Erro ao verificar status:', err)
  } finally {
    if (manual) {
      checking.value = false
    }
  }
}

const copyPixCode = async () => {
  try {
    await navigator.clipboard.writeText(pixCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// SEO
useSeoMeta({
  title: 'Pagamento PIX - Atapera',
  description: 'Finalize seu pagamento via PIX de forma segura'
})
</script>