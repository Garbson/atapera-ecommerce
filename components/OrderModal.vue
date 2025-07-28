<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Pedido #{{ order.order_number }}</h2>
        <div class="flex items-center gap-4 mt-1">
          <p class="text-gray-600">Criado em {{ formatDate(order.created_at) }}</p>
          <span class="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ order.items?.length || 0 }} {{ order.items?.length === 1 ? 'item' : 'itens' }}
          </span>
          <span
            class="text-sm px-2 py-1 rounded"
            :class="getStatusClass(order.status)"
          >
            {{ getStatusLabel(order.status) }}
          </span>
        </div>
      </div>
      <button
        @click="$emit('close')"
        class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Informações do Cliente -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Informações do Cliente</h3>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-600">Nome</label>
            <p class="text-gray-800">{{ order.customer_name || order.user?.name || 'N/A' }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <p class="text-gray-800">{{ order.customer_email || order.user?.email || 'N/A' }}</p>
          </div>
          
          <div v-if="order.customer_phone">
            <label class="block text-sm font-medium text-gray-600">Telefone</label>
            <p class="text-gray-800">{{ order.customer_phone }}</p>
          </div>
          
          <div v-if="order.customer_cpf">
            <label class="block text-sm font-medium text-gray-600">CPF</label>
            <p class="text-gray-800">{{ formatCPF(order.customer_cpf) }}</p>
          </div>
        </div>
      </div>

      <!-- Status e Pagamento -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Status do Pedido</h3>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Status do Pedido</label>
            <select
              v-model="localStatus"
              @change="updateStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-600">Status do Pagamento</label>
            <span
              class="inline-block px-2 py-1 text-xs rounded-full"
              :class="getPaymentStatusClass(order.payment_status)"
            >
              {{ getPaymentStatusLabel(order.payment_status) }}
            </span>
          </div>
          
          <div v-if="order.payment_method">
            <label class="block text-sm font-medium text-gray-600">Método de Pagamento</label>
            <p class="text-gray-800">{{ order.payment_method }}</p>
          </div>
          
          <div v-if="order.tracking_code">
            <label class="block text-sm font-medium text-gray-600 mb-2">Código de Rastreamento</label>
            <div class="flex gap-2">
              <input
                v-model="trackingCode"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                :placeholder="order.tracking_code || 'Adicionar código de rastreamento'"
              />
              <button
                @click="updateTrackingCode"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
          <div v-else>
            <label class="block text-sm font-medium text-gray-600 mb-2">Código de Rastreamento</label>
            <div class="flex gap-2">
              <input
                v-model="trackingCode"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Adicionar código de rastreamento"
              />
              <button
                @click="updateTrackingCode"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Endereços -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Endereço de Entrega -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Endereço de Entrega</h3>
        <div v-if="order.shipping_address" class="space-y-2 text-sm">
          <p class="text-gray-800">
            {{ order.shipping_address.street }}, {{ order.shipping_address.number }}
          </p>
          <p v-if="order.shipping_address.complement" class="text-gray-600">
            {{ order.shipping_address.complement }}
          </p>
          <p class="text-gray-800">
            {{ order.shipping_address.neighborhood }}
          </p>
          <p class="text-gray-800">
            {{ order.shipping_address.city }} - {{ order.shipping_address.state }}
          </p>
          <p class="text-gray-800">
            CEP: {{ formatCEP(order.shipping_address.postal_code) }}
          </p>
        </div>
        <p v-else class="text-gray-500">Endereço não informado</p>
      </div>

      <!-- Endereço de Cobrança -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Endereço de Cobrança</h3>
        <div v-if="order.billing_address" class="space-y-2 text-sm">
          <p class="text-gray-800">
            {{ order.billing_address.street }}, {{ order.billing_address.number }}
          </p>
          <p v-if="order.billing_address.complement" class="text-gray-600">
            {{ order.billing_address.complement }}
          </p>
          <p class="text-gray-800">
            {{ order.billing_address.neighborhood }}
          </p>
          <p class="text-gray-800">
            {{ order.billing_address.city }} - {{ order.billing_address.state }}
          </p>
          <p class="text-gray-800">
            CEP: {{ formatCEP(order.billing_address.postal_code) }}
          </p>
        </div>
        <p v-else class="text-gray-500">Mesmo endereço de entrega</p>
      </div>
    </div>

    <!-- Itens do Pedido -->
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Itens do Pedido</h3>
      
      <div class="space-y-3">
        <div
          v-for="item in order.items || []"
          :key="item.id"
          class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div v-if="item.product_image" class="flex-shrink-0">
            <img
              :src="item.product_image"
              :alt="item.product_name"
              class="w-16 h-16 object-cover rounded-lg"
            />
          </div>
          <div v-else class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div class="flex-1">
            <h4 class="font-medium text-gray-800">{{ item.product_name }}</h4>
            <p v-if="item.product_sku" class="text-sm text-gray-600">SKU: {{ item.product_sku }}</p>
            <div class="flex items-center gap-4 mt-2">
              <span class="text-sm text-gray-600">Qtd: {{ item.quantity }}</span>
              <span class="text-sm text-gray-600">Preço unitário: {{ formatCurrency(item.unit_price) }}</span>
            </div>
          </div>
          
          <div class="text-right">
            <p class="font-semibold text-gray-800">{{ formatCurrency(item.total_price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumo do Pedido -->
    <div class="mt-6 border-t pt-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
      
      <div class="space-y-2 max-w-md ml-auto">
        <div class="flex justify-between">
          <span class="text-gray-600">Subtotal:</span>
          <span class="text-gray-800">{{ formatCurrency(order.subtotal) }}</span>
        </div>
        
        <div v-if="order.shipping_cost > 0" class="flex justify-between">
          <span class="text-gray-600">Frete:</span>
          <span class="text-gray-800">{{ formatCurrency(order.shipping_cost) }}</span>
        </div>
        
        <div v-if="order.tax_amount > 0" class="flex justify-between">
          <span class="text-gray-600">Impostos:</span>
          <span class="text-gray-800">{{ formatCurrency(order.tax_amount) }}</span>
        </div>
        
        <div v-if="order.discount_amount > 0" class="flex justify-between text-green-600">
          <span>Desconto:</span>
          <span>-{{ formatCurrency(order.discount_amount) }}</span>
        </div>
        
        <div class="flex justify-between text-lg font-semibold border-t pt-2">
          <span class="text-gray-800">Total:</span>
          <span class="text-gray-800">{{ formatCurrency(order.total) }}</span>
        </div>
      </div>
    </div>

    <!-- Notas -->
    <div v-if="order.notes || order.admin_notes" class="mt-6 space-y-4">
      <div v-if="order.notes">
        <h4 class="font-medium text-gray-800 mb-2">Observações do Cliente:</h4>
        <p class="text-gray-600 bg-gray-50 p-3 rounded-lg">{{ order.notes }}</p>
      </div>
      
      <div>
        <h4 class="font-medium text-gray-800 mb-2">Notas Administrativas:</h4>
        <textarea
          v-model="adminNotes"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Adicionar notas administrativas..."
        ></textarea>
        <button
          @click="updateAdminNotes"
          class="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Salvar Notas
        </button>
      </div>
    </div>

    <!-- Ações -->
    <div class="mt-6 pt-6 border-t flex justify-end gap-3">
      <button
        @click="$emit('close')"
        class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Fechar
      </button>
      
      <button
        v-if="order.status === 'pending'"
        @click="cancelOrder"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Cancelar Pedido
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  order: any
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'update'])

// Composables
const supabase = useSupabase()

// Estados locais
const localStatus = ref(props.order.status)
const trackingCode = ref(props.order.tracking_code || '')
const adminNotes = ref(props.order.admin_notes || '')

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

const getPaymentStatusClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  }
  return classes[status] || "bg-gray-100 text-gray-800"
}

const getPaymentStatusLabel = (status: string) => {
  const labels = {
    pending: "Pendente",
    paid: "Pago",
    failed: "Falhou",
    refunded: "Estornado",
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return classes[status] || "bg-gray-100 text-gray-800"
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending: "Pendente",
    confirmed: "Confirmado",
    processing: "Processando",
    shipped: "Enviado",
    delivered: "Entregue",
    cancelled: "Cancelado",
  }
  return labels[status] || status
}

const updateStatus = async () => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status: localStatus.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', props.order.id)

    if (error) throw error

    emit('update')
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    alert('Erro ao atualizar status do pedido')
    localStatus.value = props.order.status // Reverter
  }
}

const updateTrackingCode = async () => {
  if (!trackingCode.value.trim()) {
    alert('Por favor, insira um código de rastreamento válido')
    return
  }

  try {
    const updateData: any = {
      tracking_code: trackingCode.value.trim(),
      updated_at: new Date().toISOString()
    }

    // Se estava pendente e adicionamos rastreamento, muda status para enviado
    if (props.order.status === 'confirmed' || props.order.status === 'processing') {
      updateData.status = 'shipped'
      updateData.shipped_at = new Date().toISOString()
      localStatus.value = 'shipped'
    }

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', props.order.id)

    if (error) throw error

    emit('update')
  } catch (error) {
    console.error('Erro ao atualizar código de rastreamento:', error)
    alert('Erro ao atualizar código de rastreamento')
  }
}

const updateAdminNotes = async () => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        admin_notes: adminNotes.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', props.order.id)

    if (error) throw error

    emit('update')
  } catch (error) {
    console.error('Erro ao atualizar notas:', error)
    alert('Erro ao atualizar notas administrativas')
  }
}

const cancelOrder = async () => {
  if (!confirm(`Tem certeza que deseja cancelar o pedido #${props.order.order_number}?`)) {
    return
  }

  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', props.order.id)

    if (error) throw error

    localStatus.value = 'cancelled'
    emit('update')
  } catch (error) {
    console.error('Erro ao cancelar pedido:', error)
    alert('Erro ao cancelar pedido')
  }
}
</script>