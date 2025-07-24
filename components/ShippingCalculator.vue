<!-- components/ShippingCalculator.vue -->
<template>
  <div class="bg-gray-50 rounded-lg p-4 space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Calcular Frete</h3>
    
    <!-- Input CEP -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1">
        <label for="cep-input" class="block text-sm font-medium text-gray-700 mb-1">
          CEP de Entrega
        </label>
        <input
          id="cep-input"
          v-model="zipCode"
          type="text"
          placeholder="00000-000"
          maxlength="9"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          @input="formatZipInput"
          @blur="calculateShippingOptions"
        />
      </div>
      <button
        @click="calculateShippingOptions"
        :disabled="loading || !isValidZip"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Calculando...
        </span>
        <span v-else>Calcular</span>
      </button>
    </div>

    <!-- Informações do CEP -->
    <div v-if="locationInfo" class="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
      <p>📍 {{ locationInfo.localidade }} - {{ locationInfo.uf }}</p>
      <p v-if="locationInfo.bairro">{{ locationInfo.bairro }}</p>
    </div>

    <!-- Resultados do Frete -->
    <div v-if="shippingOptions.length > 0" class="space-y-3">
      <h4 class="font-medium text-gray-900">Opções de Entrega:</h4>
      <div class="space-y-2">
        <div
          v-for="option in shippingOptions"
          :key="option.method"
          class="flex items-center justify-between p-3 border border-gray-200 rounded-md"
          :class="{
            'border-green-300 bg-green-50': option.price === 0,
            'border-gray-200 bg-white': option.price > 0
          }"
        >
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ option.name }}</p>
            <p class="text-sm text-gray-600">{{ option.deliveryTime }}</p>
          </div>
          <div class="text-right">
            <p class="font-bold text-lg" :class="{
              'text-green-600': option.price === 0,
              'text-gray-900': option.price > 0
            }">
              {{ option.price === 0 ? 'Grátis' : formatCurrency(option.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Aviso para armas de fogo -->
    <div v-if="hasFirearms" class="bg-orange-50 border border-orange-200 rounded-md p-3">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <div>
          <p class="text-sm font-medium text-orange-800">Atenção - Arma de Fogo</p>
          <p class="text-sm text-orange-700">
            Retirada obrigatória na loja com apresentação de documentos válidos (CR/CRAF). Despacho realizado conforme legislação.
          </p>
        </div>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShippingCalculation, CepInfo } from '~/composables/useShipping'

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  weight: {
    type: Number,
    default: 1
  }
})

// Composables
const { calculateShipping, fetchCepInfo, validateZipCode, formatZipCode } = useShipping()

// Estado reativo
const zipCode = ref('')
const loading = ref(false)
const error = ref('')
const shippingOptions = ref<ShippingCalculation[]>([])
const locationInfo = ref<CepInfo | null>(null)

// Computed
const isValidZip = computed(() => {
  return validateZipCode(zipCode.value)
})

const hasFirearms = computed(() => {
  if (!props.product) return false
  
  // Verificar campo requires_license primeiro
  if (props.product.requires_license === true) return true
  
  // Verificar categoria específica
  const categorySlug = props.product.categories?.slug || props.product.category
  if (!categorySlug) return false
  
  const category = categorySlug.toLowerCase()
  return category === 'armas-fogo' || (category.includes('armas-fogo') && !category.includes('pressao'))
})

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatZipInput = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 5) {
    value = value.substring(0, 5) + '-' + value.substring(5, 8)
  }
  zipCode.value = value
}

const calculateShippingOptions = async () => {
  if (!isValidZip.value) {
    error.value = 'CEP inválido. Digite um CEP válido (ex: 12345-678)'
    return
  }

  loading.value = true
  error.value = ''
  shippingOptions.value = []
  locationInfo.value = null

  try {
    // Buscar informações do CEP
    const cepInfo = await fetchCepInfo(zipCode.value)
    if (!cepInfo) {
      error.value = 'CEP não encontrado. Verifique o CEP informado.'
      return
    }

    locationInfo.value = cepInfo

    // Calcular frete
    const options = await calculateShipping(
      zipCode.value,
      props.weight,
      hasFirearms.value
    )

    if (options.length === 0) {
      error.value = 'Não foi possível calcular o frete para este CEP.'
      return
    }

    shippingOptions.value = options

  } catch (err) {
    console.error('Erro ao calcular frete:', err)
    error.value = 'Erro ao calcular frete. Tente novamente.'
  } finally {
    loading.value = false
  }
}

// Limpar resultados quando o CEP muda
watch(zipCode, () => {
  if (shippingOptions.value.length > 0) {
    shippingOptions.value = []
    locationInfo.value = null
    error.value = ''
  }
})
</script>