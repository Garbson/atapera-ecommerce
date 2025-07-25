// server/api/stripe/webhook.post.ts
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuração do Stripe incompleta'
    })
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-06-20'
  })

  const body = await readRawBody(event)
  const signature = getHeader(event, 'stripe-signature')

  if (!signature || !body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook inválido'
    })
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeWebhookSecret
    )



    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(stripeEvent.data.object as Stripe.PaymentIntent)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(stripeEvent.data.object as Stripe.PaymentIntent)
        break
      
    }

    return { received: true }
  } catch (error: any) {
    console.error('Erro no webhook:', error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook inválido'
    })
  }
})

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId
    
    if (!orderId) {
      console.error('Order ID não encontrado no metadata')
      return
    }

    // Atualizar status do pedido para pago
    const { createClient } = await import('@supabase/supabase-js')
    const config = useRuntimeConfig()
    
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    )

    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      console.error('Erro ao atualizar pedido:', error)
    } 
  } catch (error) {
    console.error('Erro ao processar pagamento bem-sucedido:', error)
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId
    
    if (!orderId) {
      console.error('Order ID não encontrado no metadata')
      return
    }

    // Atualizar status do pedido para falha no pagamento
    const { createClient } = await import('@supabase/supabase-js')
    const config = useRuntimeConfig()
    
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    )

    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      console.error('Erro ao atualizar pedido:', error)
    }
  } catch (error) {
    console.error('Erro ao processar falha de pagamento:', error)
  }
}