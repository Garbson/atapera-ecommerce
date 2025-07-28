<!-- pages/pagamento.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Finalizar Pagamento
          </h1>

          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Carregando formulário de pagamento...</p>
          </div>

          <div v-else-if="error" class="text-center py-8">
            <div class="text-red-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Erro no Pagamento</h2>
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
            <p class="text-gray-600 mb-4">Seu pedido foi processado com sucesso.</p>
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

          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Stripe Elements será montado aqui -->
            <div id="card-element" class="p-3 border border-gray-300 rounded-lg"></div>
            
            <div id="card-errors" class="text-red-600 text-sm"></div>

            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Total a pagar:</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(amount) }}</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="processing || !stripe || !clientSecret"
              class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processing" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
              <span v-else>Pagar {{ formatPrice(amount) }}</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 1L3 6v11a1 1 0 001 1h12a1 1 0 001-1V6l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              Pagamento seguro com Stripe
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
const { getStripe } = useStripe()

// Estados
const loading = ref(true)
const processing = ref(false)
const error = ref('')
const success = ref(false)
const stripe = ref<any>(null)
const elements = ref<any>(null)
const cardElement = ref<any>(null)

// Parâmetros da URL
const clientSecret = route.query.intent as string
const orderId = route.query.order as string
const amount = route.query.total ? parseFloat(route.query.total as string) : cartStore.totalValue

// Verificar se temos os parâmetros necessários
if (!clientSecret || !orderId) {
  error.value = 'Parâmetros de pagamento inválidos'
  loading.value = false
}

onMounted(async () => {
  if (error.value) return

  try {
    // Aguardar um pouco para garantir que o DOM está pronto
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Inicializar Stripe
    stripe.value = await getStripe()
    
    if (!stripe.value) {
      throw new Error('Erro ao carregar Stripe')
    }

    // Criar elementos com configuração para Brasil
    elements.value = stripe.value.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#dc2626',
        },
      },
      locale: 'pt-BR'
    })

    // Criar elemento do cartão com configuração para Brasil
    cardElement.value = elements.value.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
      },
      hidePostalCode: false,
      iconStyle: 'default',
      hideIcon: false,
      // Configurações para Brasil
      fields: {
        postalCode: 'always'
      }
    })

    // Aguardar o DOM estar pronto antes de montar
    await nextTick()
    
    // Aguardar o loading ser definido como false primeiro
    loading.value = false
    await nextTick()
    
    // Tentar encontrar o elemento com retry
    let cardElementContainer = null
    let attempts = 0
    while (!cardElementContainer && attempts < 10) {
      cardElementContainer = document.getElementById('card-element')
      if (!cardElementContainer) {
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
    }
    
    if (!cardElementContainer) {
      console.error('DOM atual:', document.body.innerHTML)
      throw new Error('Elemento #card-element não encontrado após múltiplas tentativas')
    }
    
    // Montar elemento do cartão
    cardElement.value.mount('#card-element')

    // Escutar mudanças
    cardElement.value.on('change', ({ error }: any) => {
      const displayError = document.getElementById('card-errors')
      if (displayError) {
        if (error) {
          displayError.textContent = error.message
        } else {
          displayError.textContent = ''
        }
      }
    })
  } catch (err: any) {
    console.error('Erro ao inicializar Stripe:', err)
    error.value = err.message || 'Erro ao carregar formulário de pagamento'
    loading.value = false
  }
})

const handleSubmit = async () => {
  if (!stripe.value || !cardElement.value) return

  processing.value = true
  error.value = ''

  try {
    const { error: submitError, paymentIntent } = await stripe.value.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement.value,
        }
      }
    )

    if (submitError) {
      error.value = submitError.message
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Pagamento bem-sucedido
      success.value = true
      
      // Limpar carrinho
      cartStore.clearCart()
      
      // Opcional: redirecionar após alguns segundos
      setTimeout(() => {
        navigateTo('/minha-conta/pedidos')
      }, 3000)
    }
  } catch (err: any) {
    console.error('Erro ao processar pagamento:', err)
    error.value = err.message || 'Erro ao processar pagamento'
  } finally {
    processing.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

// SEO
useSeoMeta({
  title: 'Pagamento - Atapera',
  description: 'Finalize seu pagamento de forma segura'
})
</script>