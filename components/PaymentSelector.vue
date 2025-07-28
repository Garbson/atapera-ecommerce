<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Forma de Pagamento</h3>
    
    <div class="space-y-3">
      <!-- PIX (À vista) -->
      <label 
        class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        :class="{ 'border-green-500 bg-green-50': selectedMethod === 'pix', 'border-gray-200': selectedMethod !== 'pix' }"
      >
        <input
          type="radio"
          value="pix"
          v-model="selectedMethod"
          class="sr-only"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">PIX</div>
                <div class="text-sm text-gray-600">Aprovação imediata</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-green-600 text-lg">
                {{ formatCurrency(avistaPrice) }}
              </div>
              <div v-if="discount > 0" class="text-xs text-green-600">
                Economia de {{ formatCurrency(discount) }}
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3">
          <div v-if="selectedMethod === 'pix'" class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div v-else class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </label>

      <!-- Cartão de Débito (À vista) -->
      <label 
        class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        :class="{ 'border-blue-500 bg-blue-50': selectedMethod === 'debit', 'border-gray-200': selectedMethod !== 'debit' }"
      >
        <input
          type="radio"
          value="debit"
          v-model="selectedMethod"
          class="sr-only"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Cartão de Débito</div>
                <div class="text-sm text-gray-600">Débito na conta</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-blue-600 text-lg">
                {{ formatCurrency(avistaPrice) }}
              </div>
              <div v-if="discount > 0" class="text-xs text-blue-600">
                Economia de {{ formatCurrency(discount) }}
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3">
          <div v-if="selectedMethod === 'debit'" class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div v-else class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </label>

      <!-- Cartão de Crédito -->
      <label 
        class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        :class="{ 'border-purple-500 bg-purple-50': selectedMethod === 'credit', 'border-gray-200': selectedMethod !== 'credit' }"
      >
        <input
          type="radio"
          value="credit"
          v-model="selectedMethod"
          class="sr-only"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Cartão de Crédito</div>
                <div class="text-sm text-gray-600">Parcelamento disponível</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-gray-900 text-lg">
                {{ formatCurrency(parceladoPrice) }}
              </div>
              <div class="text-xs text-gray-600">
                em até {{ maxInstallments }}x sem juros
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3">
          <div v-if="selectedMethod === 'credit'" class="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div v-else class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </label>
    </div>

    <!-- Seletor de Parcelas (para cartão de crédito) -->
    <div v-if="selectedMethod === 'credit'" class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-900 mb-3">Escolha o número de parcelas</h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label 
          v-for="installment in installmentOptions" 
          :key="installment.number"
          class="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors"
          :class="{ 'border-purple-500 bg-white': selectedInstallments === installment.number, 'border-purple-200': selectedInstallments !== installment.number }"
        >
          <input
            type="radio"
            :value="installment.number"
            v-model="selectedInstallments"
            class="sr-only"
          />
          <div class="flex items-center gap-2">
            <div v-if="selectedInstallments === installment.number" class="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
              <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div v-else class="w-3 h-3 border-2 border-purple-300 rounded-full"></div>
            <span class="text-sm font-medium text-gray-900">
              {{ installment.number }}x
            </span>
          </div>
          <div class="text-right">
            <div class="text-sm font-semibold text-gray-900">
              {{ formatCurrency(installment.value) }}
            </div>
            <div class="text-xs text-gray-600">
              {{ installment.label }}
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/pricing'

interface Props {
  avistaPrice: number
  parceladoPrice: number
  maxInstallments?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxInstallments: 12
})

const emit = defineEmits<{
  'update:method': [method: 'pix' | 'debit' | 'credit']
  'update:installments': [installments: number]
  'update:finalPrice': [price: number]
}>()

// Estados
const selectedMethod = ref<'pix' | 'debit' | 'credit'>('pix')
const selectedInstallments = ref(1)

// Computed
const discount = computed(() => props.parceladoPrice - props.avistaPrice)

const installmentOptions = computed(() => {
  const options = []
  for (let i = 1; i <= props.maxInstallments; i++) {
    const value = props.parceladoPrice / i
    options.push({
      number: i,
      value,
      label: i === 1 ? 'à vista' : 'sem juros'
    })
  }
  return options
})

const finalPrice = computed(() => {
  if (selectedMethod.value === 'credit') {
    return props.parceladoPrice
  }
  return props.avistaPrice
})

// Watchers
watch(selectedMethod, (method) => {
  emit('update:method', method)
  emit('update:finalPrice', finalPrice.value)
  
  // Reset installments when changing method
  if (method !== 'credit') {
    selectedInstallments.value = 1
  }
})

watch(selectedInstallments, (installments) => {
  emit('update:installments', installments)
})

watch(finalPrice, (price) => {
  emit('update:finalPrice', price)
})

// Initialize
onMounted(() => {
  emit('update:method', selectedMethod.value)
  emit('update:installments', selectedInstallments.value)
  emit('update:finalPrice', finalPrice.value)
})
</script>