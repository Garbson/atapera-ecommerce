<template>
  <div class="border rounded-lg p-3 bg-gray-50">
    <h4 class="text-sm font-medium text-gray-900 mb-3">Escolha a forma de pagamento:</h4>
    
    <div class="space-y-2">
      <!-- Opção À Vista -->
      <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors"
             :class="{ 'border-green-500 bg-green-50': selectedType === 'avista', 'border-gray-200': selectedType !== 'avista' }">
        <input
          type="radio"
          value="avista"
          v-model="selectedType"
          class="sr-only"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-green-600">
                {{ formatCurrency(pricing.avistaPrice) }}
              </div>
              <div class="text-sm text-gray-600">
                Pagamento à vista
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                {{ formatDiscount(pricing.discountPercentage) }} OFF
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3">
          <div v-if="selectedType === 'avista'" class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div v-else class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </label>

      <!-- Opção Parcelado -->
      <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors"
             :class="{ 'border-blue-500 bg-blue-50': selectedType === 'parcelado', 'border-gray-200': selectedType !== 'parcelado' }">
        <input
          type="radio"
          value="parcelado"
          v-model="selectedType"
          class="sr-only"
        />
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-gray-900">
                {{ formatCurrency(pricing.parceladoPrice) }}
              </div>
              <div class="text-sm text-gray-600">
                {{ formatInstallment(pricing.installmentValue, pricing.maxInstallments) }}
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3">
          <div v-if="selectedType === 'parcelado'" class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div v-else class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatDiscount, formatInstallment, type PricingInfo } from '~/utils/pricing'

interface Props {
  pricing: PricingInfo
  modelValue: 'avista' | 'parcelado'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: 'avista' | 'parcelado']
}>()

const selectedType = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>