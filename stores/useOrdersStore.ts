// stores/useOrdersStore.ts
export const useOrdersStore = defineStore('orders', () => {
  const supabase = useSupabaseClient()

  // Estado
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentOrder = ref(null)

  // Types
  interface OrderItem {
    id?: string
    order_id: string
    product_id: string
    product_name: string
    product_sku: string
    quantity: number
    unit_price: number
    total_price: number
  }

  interface Order {
    id?: string
    number: string
    customer_id?: string
    customer_name: string
    customer_email: string
    customer_phone?: string
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    subtotal: number
    tax_amount: number
    shipping_amount: number
    discount_amount: number
    total_amount: number
    payment_method?: string
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    shipping_address: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      postal_code: string
    }
    billing_address?: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      postal_code: string
    }
    notes?: string
    tracking_code?: string
    shipped_at?: string
    delivered_at?: string
    cancelled_at?: string
    created_at?: string
    updated_at?: string
    items?: OrderItem[]
  }

  interface OrderFilters {
    search?: string
    status?: string
    payment_status?: string
    date_from?: string
    date_to?: string
    customer?: string
    page?: number
    limit?: number
  }

  // Getters
  const pendingOrders = computed(() =>
    orders.value.filter((order: Order) => order.status === 'pending')
  )

  const processingOrders = computed(() =>
    orders.value.filter((order: Order) => order.status === 'processing')
  )

  const shippedOrders = computed(() =>
    orders.value.filter((order: Order) => order.status === 'shipped')
  )

  const deliveredOrders = computed(() =>
    orders.value.filter((order: Order) => order.status === 'delivered')
  )

  const cancelledOrders = computed(() =>
    orders.value.filter((order: Order) => order.status === 'cancelled')
  )

  const getOrdersByStatus = (status: string) => {
    return orders.value.filter((order: Order) => order.status === status)
  }

  const getTotalRevenue = computed(() => {
    return orders.value
      .filter((order: Order) => order.status !== 'cancelled')
      .reduce((sum, order: Order) => sum + order.total_amount, 0)
  })

  // Actions
  const fetchOrders = async (filters: OrderFilters = {}) => {
    try {
      loading.value = true
      error.value = null

      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_sku,
            quantity,
            unit_price,
            total_price
          )
        `)

      // Aplicar filtros
      if (filters.search) {
        query = query.or(`number.ilike.%${filters.search}%,customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%`)
      }

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      if (filters.payment_status) {
        query = query.eq('payment_status', filters.payment_status)
      }

      if (filters.date_from) {
        query = query.gte('created_at', filters.date_from)
      }

      if (filters.date_to) {
        query = query.lte('created_at', filters.date_to)
      }

      if (filters.customer) {
        query = query.or(`customer_name.ilike.%${filters.customer}%,customer_email.ilike.%${filters.customer}%`)
      }

      // Paginação
      if (filters.page && filters.limit) {
        const from = (filters.page - 1) * filters.limit
        const to = from + filters.limit - 1
        query = query.range(from, to)
      }

      // Ordenação
      query = query.order('created_at', { ascending: false })

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      // Processar dados dos pedidos
      orders.value = (data || []).map((order: any) => ({
        ...order,
        items: order.order_items || []
      }))

      return { data: orders.value, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao buscar pedidos:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchOrderById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_sku,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      currentOrder.value = {
        ...data,
        items: data.order_items || []
      }

      return { data: currentOrder.value, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao buscar pedido por ID:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchOrderByNumber = async (number: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_sku,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('number', number)
        .single()

      if (fetchError) throw fetchError

      currentOrder.value = {
        ...data,
        items: data.order_items || []
      }

      return { data: currentOrder.value, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao buscar pedido por número:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (orderData: Omit<Order, 'id' | 'number' | 'created_at' | 'updated_at'>) => {
    try {
      loading.value = true
      error.value = null

      // Gerar número do pedido
      const orderNumber = await generateOrderNumber()

      const newOrder = {
        ...orderData,
        number: orderNumber,
      }

      const { data, error: createError } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single()

      if (createError) throw createError

      // Criar itens do pedido se fornecidos
      if (orderData.items && orderData.items.length > 0) {
        const orderItems = orderData.items.map(item => ({
          ...item,
          order_id: data.id
        }))

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems)

        if (itemsError) throw itemsError

        // Atualizar estoque dos produtos
        for (const item of orderData.items) {
          await updateProductStock(item.product_id, item.quantity, 'subtract')
        }
      }

      // Adicionar ao estado local
      const completeOrder = { ...data, items: orderData.items || [] }
      orders.value.unshift(completeOrder)

      return { data: completeOrder, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao criar pedido:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      loading.value = true
      error.value = null

      const updateData: any = {
        status,
        updated_at: new Date().toISOString(),
      }

      // Adicionar timestamps específicos
      if (status === 'shipped') {
        updateData.shipped_at = new Date().toISOString()
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString()
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString()
      }

      const { data, error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Atualizar no estado local
      const index = orders.value.findIndex((order: Order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...data }
      }

      if (currentOrder.value?.id === id) {
        currentOrder.value = { ...currentOrder.value, ...data }
      }

      return { data, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao atualizar status do pedido:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updatePaymentStatus = async (id: string, paymentStatus: Order['payment_status']) => {
    try {
      loading.value = true
      error.value = null

      const updateData = {
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Atualizar no estado local
      const index = orders.value.findIndex((order: Order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...data }
      }

      if (currentOrder.value?.id === id) {
        currentOrder.value = { ...currentOrder.value, ...data }
      }

      return { data, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao atualizar status de pagamento:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const addTrackingCode = async (id: string, trackingCode: string) => {
    try {
      loading.value = true
      error.value = null

      const updateData = {
        tracking_code: trackingCode,
        status: 'shipped' as const,
        shipped_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Atualizar no estado local
      const index = orders.value.findIndex((order: Order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...data }
      }

      if (currentOrder.value?.id === id) {
        currentOrder.value = { ...currentOrder.value, ...data }
      }

      return { data, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao adicionar código de rastreamento:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const cancelOrder = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      // Buscar o pedido para restaurar o estoque
      const order = orders.value.find((o: Order) => o.id === id)
      if (!order) throw new Error('Pedido não encontrado')

      // Restaurar estoque dos produtos
      if (order.items) {
        for (const item of order.items) {
          await updateProductStock(item.product_id, item.quantity, 'add')
        }
      }

      const updateData = {
        status: 'cancelled' as const,
        cancelled_at: new Date().toISOString(),
        notes: reason ? `${order.notes || ''}\nCancelado: ${reason}`.trim() : order.notes,
        updated_at: new Date().toISOString(),
      }

      const { data, error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Atualizar no estado local
      const index = orders.value.findIndex((order: Order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...data }
      }

      return { data, error: null }

    } catch (err: any) {
      error.value = err.message
      console.error('Erro ao cancelar pedido:', err)
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const getOrderStats = () => {
    const total = orders.value.length
    const pending = pendingOrders.value.length
    const processing = processingOrders.value.length
    const shipped = shippedOrders.value.length
    const delivered = deliveredOrders.value.length
    const cancelled = cancelledOrders.value.length

    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      revenue: getTotalRevenue.value
    }
  }

  const getRevenueByPeriod = (period: 'today' | 'week' | 'month' | 'year') => {
    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
    }

    return orders.value
      .filter((order: Order) => {
        if (order.status === 'cancelled') return false
        return new Date(order.created_at!) >= startDate
      })
      .reduce((sum, order: Order) => sum + order.total_amount, 0)
  }

  // Utilitários
  const generateOrderNumber = async (): Promise<string> => {
    const year = new Date().getFullYear()
    const { count } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', `${year}-01-01`)
      .lt('created_at', `${year + 1}-01-01`)

    const orderCount = (count || 0) + 1
    return `${year}-${orderCount.toString().padStart(6, '0')}`
  }

  const updateProductStock = async (productId: string, quantity: number, operation: 'add' | 'subtract') => {
    try {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', productId)
        .single()

      if (product) {
        const newStock = operation === 'add' 
          ? product.stock + quantity 
          : Math.max(0, product.stock - quantity)

        await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', productId)
      }
    } catch (err) {
      console.error('Erro ao atualizar estoque:', err)
    }
  }

  const formatOrderStatus = (status: string) => {
    const statusMap = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    }
    return statusMap[status] || status
  }

  const formatPaymentStatus = (status: string) => {
    const statusMap = {
      pending: 'Pendente',
      paid: 'Pago',
      failed: 'Falhou',
      refunded: 'Estornado'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      pending: 'yellow',
      confirmed: 'blue',
      processing: 'purple',
      shipped: 'indigo',
      delivered: 'green',
      cancelled: 'red'
    }
    return colorMap[status] || 'gray'
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentOrder = () => {
    currentOrder.value = null
  }

  return {
    // Estado
    orders: readonly(orders),
    loading: readonly(loading),
    error: readonly(error),
    currentOrder: readonly(currentOrder),

    // Getters
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    getTotalRevenue,
    getOrdersByStatus,

    // Actions
    fetchOrders,
    fetchOrderById,
    fetchOrderByNumber,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    addTrackingCode,
    cancelOrder,
    getOrderStats,
    getRevenueByPeriod,

    // Utilitários
    generateOrderNumber,
    formatOrderStatus,
    formatPaymentStatus,
    getStatusColor,
    clearError,
    clearCurrentOrder,
  }
})