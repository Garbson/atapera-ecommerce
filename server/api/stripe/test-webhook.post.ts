// server/api/stripe/test-webhook.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { orderId, paymentIntentId } = body

  if (!orderId || !paymentIntentId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'orderId e paymentIntentId são obrigatórios'
    })
  }

  console.log('🧪 Teste manual do webhook:', { orderId, paymentIntentId })

  // Simular um Payment Intent bem-sucedido
  const mockPaymentIntent = {
    id: paymentIntentId,
    metadata: {
      orderId: orderId
    }
  }

  try {
    // Importar a função do webhook
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
      throw createError({
        statusCode: 404,
        statusMessage: 'Pedido não encontrado'
      })
    }

    console.log('📋 Pedido encontrado:', existingOrder)

    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        payment_intent_id: paymentIntentId,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (error) {
      console.error('❌ Erro ao atualizar pedido:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao atualizar pedido'
      })
    }

    console.log('✅ Pedido atualizado com sucesso via teste:', orderId)

    return {
      success: true,
      message: 'Pedido atualizado com sucesso',
      orderId,
      paymentIntentId
    }
  } catch (error: any) {
    console.error('❌ Erro no teste do webhook:', error)
    throw error
  }
})