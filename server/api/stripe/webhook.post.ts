// server/api/stripe/webhook.post.ts
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  console.log('🔄 Webhook recebido:', new Date().toISOString())
  
  const config = useRuntimeConfig()
  
  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    console.error('❌ Configuração do Stripe incompleta')
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

  console.log('📝 Webhook signature presente:', !!signature)
  console.log('📝 Webhook body size:', body?.length || 0)

  if (!signature || !body) {
    console.error('❌ Webhook inválido - faltando signature ou body')
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

    console.log('✅ Evento Stripe validado:', stripeEvent.type, 'ID:', stripeEvent.id)

    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        console.log('💰 Processando pagamento bem-sucedido')
        await handlePaymentSuccess(stripeEvent.data.object as Stripe.PaymentIntent)
        break
      
      case 'payment_intent.payment_failed':
        console.log('❌ Processando pagamento falhado')
        await handlePaymentFailure(stripeEvent.data.object as Stripe.PaymentIntent)
        break
      
      default:
        console.log('ℹ️ Evento não processado:', stripeEvent.type)
    }

    console.log('✅ Webhook processado com sucesso')
    return { received: true }
  } catch (error: any) {
    console.error('❌ Erro no webhook:', error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook inválido'
    })
  }
})

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('🔍 Payment Intent ID:', paymentIntent.id)
    console.log('🔍 Metadata disponível:', paymentIntent.metadata)
    
    const orderId = paymentIntent.metadata.orderId
    
    if (!orderId) {
      console.error('❌ Order ID não encontrado no metadata:', paymentIntent.metadata)
      return
    }

    console.log('📋 Atualizando pedido:', orderId)

    // Atualizar status do pedido para pago
    const { createClient } = await import('@supabase/supabase-js')
    const config = useRuntimeConfig()
    
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    )

    // Primeiro, verificar se o pedido existe
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id, status, payment_status')
      .eq('id', orderId)
      .single()

    if (fetchError) {
      console.error('❌ Erro ao buscar pedido:', fetchError)
      return
    }

    if (!existingOrder) {
      console.error('❌ Pedido não encontrado:', orderId)
      return
    }

    console.log('📋 Pedido encontrado:', existingOrder)

    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        payment_intent_id: paymentIntent.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      console.error('❌ Erro ao atualizar pedido:', error)
    } else {
      console.log('✅ Pedido atualizado com sucesso:', orderId)
    }
  } catch (error) {
    console.error('❌ Erro ao processar pagamento bem-sucedido:', error)
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('🔍 Payment Intent Failed ID:', paymentIntent.id)
    console.log('🔍 Metadata disponível:', paymentIntent.metadata)
    
    const orderId = paymentIntent.metadata.orderId
    
    if (!orderId) {
      console.error('❌ Order ID não encontrado no metadata para falha:', paymentIntent.metadata)
      return
    }

    console.log('📋 Marcando pedido como falhado:', orderId)

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
        payment_intent_id: paymentIntent.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      console.error('❌ Erro ao atualizar pedido falhado:', error)
    } else {
      console.log('✅ Pedido marcado como falhado:', orderId)
    }
  } catch (error) {
    console.error('❌ Erro ao processar falha de pagamento:', error)
  }
}