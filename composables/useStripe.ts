// composables/useStripe.ts
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<any> | null = null

export const useStripe = () => {
  const config = useRuntimeConfig()
  
  // Inicializar Stripe apenas uma vez
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(config.public.stripePublishableKey)
    }
    return stripePromise
  }

  // Criar Payment Intent
  const createPaymentIntent = async (amount: number, currency = 'brl', metadata = {}) => {
    try {
      console.log('Chamando API stripe/create-payment-intent com:', { amount: Math.round(amount * 100), currency, metadata })
      
      const data = await $fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        body: {
          amount: Math.round(amount * 100), // Stripe usa centavos
          currency,
          metadata
        }
      })
      
      console.log('Resposta da API:', data)
      return { data, error: null }
    } catch (error: any) {
      console.error('Erro ao criar Payment Intent:', error)
      return { data: null, error: error.message }
    }
  }

  // Confirmar pagamento
  const confirmPayment = async (stripe: any, clientSecret: string, paymentMethod: any) => {
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      return { data: result.paymentIntent, error: null }
    } catch (error: any) {
      console.error('Erro ao confirmar pagamento:', error)
      return { data: null, error: error.message }
    }
  }

  // Criar Payment Method PIX
  const createPixPayment = async (amount: number, metadata = {}) => {
    try {
      console.log('Chamando API stripe/create-pix-payment com:', { amount: Math.round(amount * 100), currency: 'brl', metadata })
      
      const data = await $fetch('/api/stripe/create-pix-payment', {
        method: 'POST',
        body: {
          amount: Math.round(amount * 100),
          currency: 'brl',
          metadata
        }
      })
      
      console.log('Resposta da API PIX:', data)
      return { data, error: null }
    } catch (error: any) {
      console.error('Erro ao criar pagamento PIX:', error)
      return { data: null, error: error.message }
    }
  }

  return {
    getStripe,
    createPaymentIntent,
    confirmPayment,
    createPixPayment
  }
}