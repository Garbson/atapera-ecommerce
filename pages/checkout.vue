<!-- pages/checkout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Início</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <NuxtLink to="/carrinho" class="text-gray-500 hover:text-gray-700">Carrinho</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">Checkout</li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p class="text-gray-600">Complete suas informações para finalizar o pedido</p>
      </div>

      <div v-if="cartStore.isEmpty" class="text-center py-16">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Carrinho vazio</h2>
        <p class="text-gray-600 mb-6">Adicione alguns produtos antes de finalizar a compra</p>
        <NuxtLink to="/produtos" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
          Continuar Comprando
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário de Checkout -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informações do Cliente -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold mb-4">Informações do Cliente</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input
                  v-model="customerInfo.name"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  v-model="customerInfo.email"
                  type="email"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  v-model="customerInfo.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                <input
                  v-model="customerInfo.document"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>

          <!-- Modalidade de Entrega -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold mb-4">Modalidade de Entrega</h2>
            
            <!-- Verificar se há armas de fogo no carrinho -->
            <div v-if="hasFirearms" class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div class="flex items-start">
                <svg class="w-6 h-6 text-orange-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-orange-800">Atenção - Armas de Fogo</h3>
                  <p class="mt-1 text-sm text-orange-700">
                    Seu carrinho contém armas de fogo. A retirada na loja é obrigatória com apresentação de documentos válidos (CR/CRAF).
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-red-500 bg-red-50': deliveryMethod === 'delivery' }">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="delivery"
                  class="text-red-600 focus:ring-red-500"
                  :disabled="hasFirearms"
                />
                <div class="ml-3 flex-1">
                  <h3 class="text-sm font-medium" :class="{ 'text-gray-400': hasFirearms }">Entrega a Domicílio</h3>
                  <p class="text-sm text-gray-500">Receba em casa em até 7 dias úteis</p>
                  <p class="text-sm font-medium text-green-600">Grátis</p>
                </div>
              </label>

              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-red-500 bg-red-50': deliveryMethod === 'pickup' }">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="pickup"
                  class="text-red-600 focus:ring-red-500"
                />
                <div class="ml-3 flex-1">
                  <h3 class="text-sm font-medium">Retirada na Loja</h3>
                  <p class="text-sm text-gray-500">Retire pessoalmente em nossa loja</p>
                  <p class="text-sm font-medium text-green-600">Grátis</p>
                  <p v-if="hasFirearms" class="text-sm font-medium text-orange-600 mt-1">
                    ⚠️ Obrigatório para armas de fogo
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Endereço de Entrega -->
          <div v-if="deliveryMethod === 'delivery'" class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold">Endereço de Entrega</h2>
              <button
                v-if="savedAddresses.length > 0"
                @click="showSavedAddresses = !showSavedAddresses"
                class="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Usar endereço salvo
              </button>
            </div>

            <!-- Lista de endereços salvos -->
            <div v-if="showSavedAddresses && savedAddresses.length > 0" class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Escolher endereço salvo:</h3>
              <div class="space-y-2">
                <div
                  v-for="address in savedAddresses"
                  :key="address.id"
                  @click="selectSavedAddress(address)"
                  class="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{ 'border-red-500 bg-red-50': selectedAddressId === address.id }"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <p class="font-medium text-sm">{{ address.label || 'Endereço' }}</p>
                      <p class="text-sm text-gray-600">
                        {{ address.street }}, {{ address.number }}
                        <span v-if="address.complement">, {{ address.complement }}</span>
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ address.neighborhood }}, {{ address.city }} - {{ address.state }}
                      </p>
                      <p class="text-sm text-gray-600">CEP: {{ address.zip_code }}</p>
                    </div>
                    <span v-if="address.is_default" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Padrão
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t">
                <button
                  @click="useNewAddress"
                  class="text-sm text-gray-600 hover:text-gray-800"
                >
                  + Usar novo endereço
                </button>
              </div>
            </div>

            <div v-show="!selectedAddressId" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                <input
                  v-model="shippingAddress.postalCode"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="00000-000"
                  @blur="fetchAddressFromCEP"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                <input
                  v-model="shippingAddress.street"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome da rua"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Número</label>
                <input
                  v-model="shippingAddress.number"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="123"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                <input
                  v-model="shippingAddress.complement"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Apto, casa, etc"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                <input
                  v-model="shippingAddress.neighborhood"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome do bairro"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                <input
                  v-model="shippingAddress.city"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome da cidade"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  v-model="shippingAddress.state"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Selecione o estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <!-- Adicionar mais estados conforme necessário -->
                </select>
              </div>
            </div>
          </div>

          <!-- Validação de Documentos para Armas -->
          <div v-if="hasFirearms" class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold mb-4">Documentação para Armas de Fogo</h2>
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 class="text-sm font-medium text-red-800 mb-2">Documentos Obrigatórios:</h3>
              <ul class="text-sm text-red-700 space-y-1">
                <li>• Certificado de Registro (CR) ou Certificado de Registro de Arma de Fogo (CRAF)</li>
                <li>• Documento de identidade com foto</li>
                <li>• CPF</li>
              </ul>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Número do CR/CRAF</label>
                <input
                  v-model="firearmDocuments.crNumber"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite o número do seu CR/CRAF"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Data de Validade</label>
                <input
                  v-model="firearmDocuments.expiryDate"
                  type="date"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="firearmDocuments.confirmed"
                  type="checkbox"
                  required
                  class="text-red-600 focus:ring-red-500 rounded"
                />
                <label class="ml-2 text-sm text-gray-700">
                  Confirmo que possuo todos os documentos válidos e estou ciente da obrigatoriedade de apresentá-los na retirada
                </label>
              </div>
            </div>
          </div>

          <!-- Método de Pagamento -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold mb-4">Método de Pagamento</h2>
            <div class="space-y-3">
              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-red-500 bg-red-50': paymentMethod === 'card' }">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="card"
                  class="text-red-600 focus:ring-red-500"
                />
                <div class="ml-3">
                  <h3 class="text-sm font-medium">Cartão de Crédito/Débito</h3>
                  <p class="text-sm text-gray-500">Visa, Mastercard, Elo</p>
                </div>
              </label>

              <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-red-500 bg-red-50': paymentMethod === 'pix' }">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="pix"
                  class="text-red-600 focus:ring-red-500"
                />
                <div class="ml-3">
                  <h3 class="text-sm font-medium">PIX</h3>
                  <p class="text-sm text-gray-500">Pagamento instantâneo</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h3 class="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <!-- Lista de produtos -->
            <div class="space-y-3 mb-6 max-h-60 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3">
                <img
                  :src="item.image || '/placeholder-product.jpg'"
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded border"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium truncate">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">{{ item.quantity }}x {{ formatPrice(item.price) }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span>Subtotal ({{ cartStore.totalItems }} itens)</span>
                <span>{{ formatPrice(cartStore.totalValue) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Frete</span>
                <span class="text-green-600">Grátis</span>
              </div>
              <hr />
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-red-600">{{ formatPrice(cartStore.totalValue) }}</span>
              </div>
            </div>

            <button
              @click="processPayment"
              :disabled="!canProceedToPayment || loading"
              class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
              <span v-else>Finalizar Compra</span>
            </button>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 1L3 6v11a1 1 0 001 1h12a1 1 0 001-1V6l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                </svg>
                Compra 100% segura com Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const addressStore = useAddressStore()
const { getStripe, createPaymentIntent, createPixPayment } = useStripe()
const { isLoggedIn } = useAuth()

// Estado reativo
const loading = ref(false)
const deliveryMethod = ref<'delivery' | 'pickup'>('delivery')
const paymentMethod = ref<'card' | 'pix'>('card')

// Endereços salvos
const showSavedAddresses = ref(false)
const selectedAddressId = ref<string | null>(null)
const savedAddresses = computed(() => addressStore.sortedAddresses)

// Informações do cliente
const customerInfo = ref({
  name: '',
  email: '',
  phone: '',
  document: ''
})

// Endereço de entrega
const shippingAddress = ref({
  postalCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
})

// Documentos para armas de fogo
const firearmDocuments = ref({
  crNumber: '',
  expiryDate: '',
  confirmed: false
})

// Verificar se há armas de fogo no carrinho
const hasFirearms = computed(() => {
  return cartStore.items.some(item => 
    item.category?.toLowerCase().includes('armas-fogo') || 
    item.category?.toLowerCase().includes('fogo')
  )
})

// Definir método de entrega como pickup se houver armas de fogo
watch(hasFirearms, (newValue) => {
  if (newValue) {
    deliveryMethod.value = 'pickup'
  }
}, { immediate: true })

// Validar se pode prosseguir com o pagamento
const canProceedToPayment = computed(() => {
  const hasCustomerInfo = customerInfo.value.name && customerInfo.value.email
  const hasDeliveryMethod = deliveryMethod.value
  const hasShippingInfo = deliveryMethod.value === 'pickup' || 
    (shippingAddress.value.street && shippingAddress.value.number && 
     shippingAddress.value.neighborhood && shippingAddress.value.city && shippingAddress.value.state)
  const hasPaymentMethod = paymentMethod.value
  const hasFirearmDocs = !hasFirearms.value || 
    (firearmDocuments.value.crNumber && firearmDocuments.value.expiryDate && firearmDocuments.value.confirmed)

  return hasCustomerInfo && hasDeliveryMethod && hasShippingInfo && hasPaymentMethod && hasFirearmDocs
})

// Métodos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const fetchAddressFromCEP = async () => {
  const cep = shippingAddress.value.postalCode.replace(/\D/g, '')
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (!data.erro) {
        shippingAddress.value.street = data.logradouro
        shippingAddress.value.neighborhood = data.bairro
        shippingAddress.value.city = data.localidade
        shippingAddress.value.state = data.uf
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }
}

// Funções para endereços salvos
const selectSavedAddress = (address: any) => {
  selectedAddressId.value = address.id
  
  // Preencher os campos do shippingAddress com o endereço selecionado
  shippingAddress.value = {
    postalCode: address.zip_code,
    street: address.street,
    number: address.number,
    complement: address.complement || '',
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state
  }
  
  showSavedAddresses.value = false
}

const useNewAddress = () => {
  selectedAddressId.value = null
  
  // Limpar campos do endereço
  shippingAddress.value = {
    postalCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  }
}

const processPayment = async () => {
  console.log('Iniciando processPayment')
  console.log('canProceedToPayment:', canProceedToPayment.value)
  
  if (!canProceedToPayment.value) {
    console.log('Não pode prosseguir para pagamento')
    return
  }

  loading.value = true
  console.log('Loading ativado')

  try {
    // 1. Criar o pedido
    const orderData = {
      customer_name: customerInfo.value.name,
      customer_email: customerInfo.value.email,
      customer_phone: customerInfo.value.phone,
      customer_cpf: customerInfo.value.document,
      status: 'pending' as const,
      payment_status: 'pending' as const,
      payment_method: paymentMethod.value,
      subtotal: cartStore.totalValue,
      tax_amount: 0,
      shipping_cost: 0,
      discount_amount: 0,
      total: cartStore.totalValue,
      shipping_address: deliveryMethod.value === 'delivery' ? {
        street: shippingAddress.value.street,
        number: shippingAddress.value.number,
        complement: shippingAddress.value.complement || '',
        neighborhood: shippingAddress.value.neighborhood,
        city: shippingAddress.value.city,
        state: shippingAddress.value.state,
        postal_code: shippingAddress.value.postalCode
      } : {
        street: 'Retirada na loja',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        postal_code: ''
      },
      notes: hasFirearms.value ? `CR/CRAF: ${firearmDocuments.value.crNumber}` : undefined,
      items: cartStore.items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_sku: item.sku || '',
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }))
    }

    console.log('Chamando ordersStore.createOrder...')
    const { data: order, error: orderError } = await ordersStore.createOrder(orderData)
    
    console.log('Resultado createOrder:', { order, orderError })
    
    if (orderError || !order) {
      throw new Error(orderError || 'Erro ao criar pedido')
    }

    console.log('Pedido criado com sucesso, processando pagamento:', paymentMethod.value)

    // 2. Processar pagamento
    console.log('Método de pagamento selecionado:', paymentMethod.value)
    console.log('Tipo do método:', typeof paymentMethod.value)
    
    if (paymentMethod.value === 'card') {
      console.log('✅ Entrando no fluxo de cartão')
      await processCardPayment(order.id!)
    } else if (paymentMethod.value === 'pix') {
      console.log('✅ Entrando no fluxo de PIX')
      await processPixPayment(order.id!)
    } else {
      console.error('❌ Método de pagamento não reconhecido:', paymentMethod.value)
      throw new Error(`Método de pagamento inválido: ${paymentMethod.value}`)
    }

  } catch (error: any) {
    console.error('Erro no checkout:', error)
    alert(error.message || 'Erro ao processar pagamento')
  } finally {
    loading.value = false
  }
}

const processCardPayment = async (orderId: string) => {
  console.log('processCardPayment iniciado para ordem:', orderId)
  
  console.log('Obtendo Stripe...')
  const stripe = await getStripe()
  
  console.log('Criando Payment Intent...')
  const { data, error } = await createPaymentIntent(
    cartStore.totalValue,
    'brl',
    { orderId }
  )

  console.log('Resultado Payment Intent:', { data, error })

  if (error || !data) {
    console.error('Erro no Payment Intent:', error)
    throw new Error(error || 'Erro ao criar payment intent')
  }

  console.log('Redirecionando para pagamento...')
  // Redirecionar para página de pagamento com Stripe Elements
  await navigateTo(`/pagamento?intent=${data.clientSecret}&order=${orderId}`)
}

const processPixPayment = async (orderId: string) => {
  console.log('processPixPayment iniciado para ordem:', orderId)
  
  console.log('Criando pagamento PIX...')
  const { data, error } = await createPixPayment(
    cartStore.totalValue,
    { orderId }
  )

  console.log('Resultado PIX:', { data, error })

  if (error || !data) {
    console.error('Erro no PIX:', error)
    throw new Error(error || 'Erro ao criar pagamento PIX')
  }

  console.log('Redirecionando para PIX...')
  // Redirecionar para página de PIX
  await navigateTo(`/pagamento-pix?intent=${data.clientSecret}&order=${orderId}`)
}

// Verificar autenticação e carregar dados
onMounted(async () => {
  if (!isLoggedIn.value) {
    navigateTo('/login?redirect=/checkout')
  } else {
    const { user, profile, getUserProfile } = useAuth()
    
    // Carregar perfil do usuário se não estiver carregado
    if (user.value && !profile.value) {
      await getUserProfile()
    }
    
    // Preencher dados do cliente com as informações do perfil
    if (profile.value) {
      customerInfo.value = {
        name: profile.value.name || user.value?.user_metadata?.name || '',
        email: profile.value.email || user.value?.email || '',
        phone: profile.value.phone || '',
        document: profile.value.cpf || ''
      }
    } else if (user.value) {
      // Fallback para dados básicos do usuário
      customerInfo.value = {
        name: user.value.user_metadata?.name || '',
        email: user.value.email || '',
        phone: '',
        document: ''
      }
    }
    
    // Carregar endereços salvos do usuário logado
    try {
      await addressStore.fetchAddresses()
      
      // Se há um endereço padrão e não há endereço selecionado, usar o padrão
      if (addressStore.defaultAddress && !selectedAddressId.value) {
        showSavedAddresses.value = true
      }
    } catch (error) {
      console.error('Erro ao carregar endereços salvos:', error)
    }
  }
})

// SEO
useSeoMeta({
  title: 'Checkout - Atapera',
  description: 'Finalize sua compra de forma segura'
})
</script>