// server/api/stripe/create-payment-intent.post.ts
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    if (!config.stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Chave secreta do Stripe não configurada'
      })
    }

    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2024-06-20'
    })

    const body = await readBody(event)
    const { amount, currency = 'brl', metadata = {} } = body

    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valor inválido'
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Stripe usa centavos
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }
  } catch (error: any) {
    console.error('Erro ao criar Payment Intent:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erro interno do servidor'
    })
  }
})