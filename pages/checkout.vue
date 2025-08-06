<!-- pages/checkout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700"
              >Início</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <NuxtLink to="/carrinho" class="text-gray-500 hover:text-gray-700"
              >Carrinho</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">Checkout</li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p class="text-gray-600">
          Complete suas informações para finalizar o pedido
        </p>
      </div>

      <div v-if="cartStore.isEmpty" class="text-center py-16">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Carrinho vazio
        </h2>
        <p class="text-gray-600 mb-6">
          Adicione alguns produtos antes de finalizar a compra
        </p>
        <NuxtLink
          to="/produtos"
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
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
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Nome Completo</label
                >
                <input
                  v-model="customerInfo.name"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="customerInfo.email"
                  type="email"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Telefone</label
                >
                <input
                  v-model="customerInfo.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="(68) 9282-7730"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >CPF</label
                >
                <input
                  v-model="customerInfo.document"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>

          <!-- Modalidade de Entrega (apenas se NÃO há armas de fogo) -->
          <div
            v-if="!hasFirearms"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 class="text-lg font-semibold mb-4">Modalidade de Entrega</h2>

            <div class="space-y-3">
              <label
                class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                :class="{
                  'border-red-500 bg-red-50': deliveryMethod === 'delivery',
                }"
              >
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="delivery"
                  class="text-red-600 focus:ring-red-500"
                />
                <div class="ml-3 flex-1">
                  <h3 class="text-sm font-medium">Entrega a Domicílio</h3>
                  <p class="text-sm text-gray-500">
                    Receba em casa com frete calculado
                  </p>
                  <p class="text-sm font-medium text-blue-600">
                    Frete calculado por CEP
                  </p>
                </div>
              </label>

              <label
                class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                :class="{
                  'border-red-500 bg-red-50': deliveryMethod === 'pickup',
                }"
              >
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  value="pickup"
                  class="text-red-600 focus:ring-red-500"
                />
                <div class="ml-3 flex-1">
                  <h3 class="text-sm font-medium">Retirada na Loja</h3>
                  <p class="text-sm text-gray-500">
                    Retire pessoalmente em nossa loja
                  </p>
                  <p class="text-sm font-medium text-green-600">Grátis</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Endereço de Entrega -->
          <div
            v-if="deliveryMethod === 'delivery'"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold">Endereço de Entrega</h2>
              <button
                v-if="savedAddresses.length > 0"
                @click="showSavedAddresses = !showSavedAddresses"
                class="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Usar endereço salvo
              </button>
            </div>

            <!-- Lista de endereços salvos -->
            <div
              v-if="showSavedAddresses && savedAddresses.length > 0"
              class="mb-6"
            >
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                Escolher endereço salvo:
              </h3>
              <div class="space-y-2">
                <div
                  v-for="address in savedAddresses"
                  :key="address.id"
                  @click="selectSavedAddress(address)"
                  class="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{
                    'border-red-500 bg-red-50':
                      selectedAddressId === address.id,
                  }"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <p class="font-medium text-sm">
                        {{ address.label || "Endereço" }}
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ address.street }}, {{ address.number }}
                        <span v-if="address.complement"
                          >, {{ address.complement }}</span
                        >
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ address.neighborhood }}, {{ address.city }} -
                        {{ address.state }}
                      </p>
                      <p class="text-sm text-gray-600">
                        CEP: {{ address.zip_code }}
                      </p>
                    </div>
                    <span
                      v-if="address.is_default"
                      class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                    >
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

            <div
              v-show="!selectedAddressId"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >CEP</label
                >
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
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Rua</label
                >
                <input
                  v-model="shippingAddress.street"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome da rua"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Número</label
                >
                <input
                  v-model="shippingAddress.number"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="123"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Complemento</label
                >
                <input
                  v-model="shippingAddress.complement"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Apto, casa, etc"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Bairro</label
                >
                <input
                  v-model="shippingAddress.neighborhood"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome do bairro"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Cidade</label
                >
                <input
                  v-model="shippingAddress.city"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome da cidade"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Estado</label
                >
                <select
                  v-model="shippingAddress.state"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Explicação sobre Finalização via WhatsApp para Armas -->
          <div
            v-if="hasFirearms"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Finalização via WhatsApp
            </h2>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-green-800 mb-2">
                    Atendimento Especializado para Armas de Fogo
                  </h3>
                  <p class="text-sm text-green-700 mb-3">
                    Em casos de compra de armas de fogo, a finalização da compra será realizada 
                    com nossa atendente da loja pelo WhatsApp. Isso nos permite:
                  </p>
                  <ul class="text-sm text-green-700 space-y-1 mb-3">
                    <li>• ✅ Validar seus documentos de forma segura</li>
                    <li>• ✅ Oferecer atendimento mais rápido e personalizado</li>
                    <li>• ✅ Esclarecer dúvidas sobre documentação e retirada</li>
                    <li>• ✅ Agendar horário conveniente para retirada</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h3 class="text-sm font-medium text-orange-800 mb-2">
                📍 Retirada Obrigatória na Loja
              </h3>
              <p class="text-sm text-orange-700 mb-2">
                Conforme a legislação brasileira, armas de fogo devem ser retiradas pessoalmente:
              </p>
              <div class="text-sm text-orange-700">
                <p>📍 Av. Epaminondas Jácome Centro, 2199</p>
                <p>Cadeia Velha, Rio Branco - AC, 69905-074</p>
                <p class="mt-2 font-medium">
                  📞 WhatsApp: +55 68 9282-7730
                </p>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="text-sm font-medium text-blue-800 mb-2">
                📋 Documentos Necessários (levar na retirada)
              </h3>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• Certificado de Registro (CR) ou CRAF válido</li>
                <li>• Documento de identidade com foto</li>
                <li>• CPF</li>
              </ul>
              <p class="text-xs text-blue-600 mt-2 italic">
                * A validação dos documentos será feita via WhatsApp pela nossa atendente
              </p>
            </div>
          </div>

          <!-- Método de Pagamento -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <PaymentSelector
              :avista-price="cartTotal.avistaPrice"
              :parcelado-price="cartTotal.parceladoPrice"
              @update:method="updatePaymentMethod"
              @update:installments="updateInstallments"
              @update:final-price="updateFinalPrice"
            />
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h3 class="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <!-- Lista de produtos -->
            <div class="space-y-3 mb-6 max-h-60 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center gap-3"
              >
                <img
                  :src="item.image || '/placeholder-product.jpg'"
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded border"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium truncate">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">
                    {{ item.quantity }}x {{ formatPrice(item.price) }}
                  </p>
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
                <span
                  :class="
                    shippingCost === 0 ? 'text-green-600' : 'text-gray-900'
                  "
                >
                  {{
                    shippingCost === 0
                      ? hasFirearms
                        ? "Retirada na Loja"
                        : "Grátis"
                      : formatPrice(shippingCost)
                  }}
                </span>
              </div>
              <div v-if="selectedShippingMethod" class="text-xs text-gray-500">
                {{ selectedShippingMethod }}
              </div>
              <div
                v-if="hasFirearms"
                class="text-xs text-orange-600 font-medium"
              >
                ⚠️ Retirada obrigatória para armas de fogo
              </div>
              <hr />
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-red-600">{{ formatPrice(finalTotal) }}</span>
              </div>
            </div>

            <!-- Botão para Armas de Fogo - WhatsApp -->
            <button
              v-if="hasFirearms"
              @click="processFirearmOrder"
              :disabled="!canProceedToPayment || loading"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processando...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Finalizar pelo WhatsApp
              </span>
            </button>
            
            <!-- Botão normal para produtos sem armas -->
            <button
              v-else
              @click="processPayment"
              :disabled="!canProceedToPayment || loading"
              class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processando...
              </span>
              <span v-else>Finalizar Compra</span>
            </button>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div v-if="hasFirearms" class="flex items-center gap-2 text-sm text-orange-600 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Finalização via WhatsApp para verificação de documentos
              </div>
              <div v-else class="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  class="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1L3 6v11a1 1 0 001 1h12a1 1 0 001-1V6l-7-5zM9 9a1 1 0 112 0 1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
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
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const addressStore = useAddressStore();
const { getStripe, createPaymentIntent, createPixPayment } = useStripe();
const { isLoggedIn } = useAuth();
const { calculateShipping } = useShipping();
const { createFirearmOrder } = useWhatsApp();

// Estado reativo
const loading = ref(false);
const deliveryMethod = ref<"delivery" | "pickup">("delivery");
const paymentMethod = ref<'pix' | 'debit' | 'credit'>(cartStore.paymentMethod);
const installments = ref(cartStore.installments);
const finalPrice = ref(0);
const shippingCost = ref(0);
const selectedShippingMethod = ref("");

// Endereços salvos
const showSavedAddresses = ref(false);
const selectedAddressId = ref<string | null>(null);
const savedAddresses = computed(() => addressStore.sortedAddresses);

// Informações do cliente
const customerInfo = ref({
  name: "",
  email: "",
  phone: "",
  document: "",
});

// Endereço de entrega
const shippingAddress = ref({
  postalCode: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
});

// Documentos para armas de fogo - removido pois será validado no WhatsApp

// Verificar se há armas de fogo no carrinho
const hasFirearms = computed(() => {

  
  const hasFirearmsResult = cartStore.items.some((item) => {
    const category = item.category?.toLowerCase() || "";
    const name = item.name?.toLowerCase() || "";

    // Verificar prioritariamente pela categoria e campo requires_license
    const productCategory = item.products?.categories?.slug || item.category;
    const requiresLicense = item.products?.requires_license;

    
    const isFirearm =
      productCategory === "armas-fogo" ||
      requiresLicense === true ||
      (productCategory?.includes("armas-fogo") && !productCategory?.includes("pressao")) ||
      (category.includes("armas-fogo") && !category.includes("pressao"));

    return isFirearm;
  });

  return hasFirearmsResult;
});

// Totais do carrinho com preços específicos
const cartTotal = computed(() => {
  const items = cartStore.items;
  
  const avistaPrice = items.reduce((total, item) => {
    return total + (item.avistaPrice || item.price) * item.quantity;
  }, 0);
  
  const parceladoPrice = items.reduce((total, item) => {
    return total + (item.parceladoPrice || item.price) * item.quantity;
  }, 0);
  
  return {
    avistaPrice,
    parceladoPrice,
    discount: parceladoPrice - avistaPrice
  };
});

// Total final incluindo frete
const finalTotal = computed(() => {
  const total = finalPrice.value + shippingCost.value;
  return total;
});

// Validar se pode prosseguir com o pagamento
const canProceedToPayment = computed(() => {
  const hasCustomerInfo = customerInfo.value.name && customerInfo.value.email;
  const hasDeliveryMethod = deliveryMethod.value;
  const hasShippingInfo =
    deliveryMethod.value === "pickup" ||
    (shippingAddress.value.street &&
      shippingAddress.value.number &&
      shippingAddress.value.neighborhood &&
      shippingAddress.value.city &&
      shippingAddress.value.state);
  const hasPaymentMethod = paymentMethod.value;

  // Para armas de fogo, não precisamos validar documentos aqui pois será feito no WhatsApp
  return (
    hasCustomerInfo &&
    hasDeliveryMethod &&
    hasShippingInfo &&
    hasPaymentMethod
  );
});

// Métodos
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

// Métodos para PaymentSelector
const updatePaymentMethod = (method: 'pix' | 'debit' | 'credit') => {
  paymentMethod.value = method;
  cartStore.updatePaymentMethod(method);
};

const updateInstallments = (installmentCount: number) => {
  installments.value = installmentCount;
  cartStore.updateInstallments(installmentCount);
};

const updateFinalPrice = (price: number) => {
  finalPrice.value = price;
};

const fetchAddressFromCEP = async () => {
  const cep = shippingAddress.value.postalCode.replace(/\D/g, "");
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        shippingAddress.value.street = data.logradouro;
        shippingAddress.value.neighborhood = data.bairro;
        shippingAddress.value.city = data.localidade;
        shippingAddress.value.state = data.uf;

        // Calcular frete automaticamente
        await calculateShippingCost();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }
};

const calculateShippingCost = async () => {
  // Se tem armas de fogo, SEMPRE retirada na loja (frete = 0)
  if (hasFirearms.value) {
    shippingCost.value = 0;
    selectedShippingMethod.value = "Retirada Obrigatória na Loja";
    deliveryMethod.value = "pickup";
    return;
  }

  // Se for retirada na loja (sem armas de fogo)
  if (deliveryMethod.value === "pickup") {
    shippingCost.value = 0;
    selectedShippingMethod.value = "Retirada na Loja";
    return;
  }

  // Verificar se tem CEP válido para entrega
  const cep = shippingAddress.value.postalCode.replace(/\D/g, "");
  if (cep.length !== 8) {
    shippingCost.value = 0;
    selectedShippingMethod.value = "CEP não informado";
    return;
  }

  try {
    const shippingOptions = await calculateShipping(cep, 1, false); // Nunca tem armas de fogo aqui

    if (shippingOptions.length > 0) {
      // Pegar a opção de entrega (não retirada na loja)
      const deliveryOptions = shippingOptions.filter(
        (opt) => opt.method !== "pickup"
      );
      if (deliveryOptions.length > 0) {
        const cheapestOption = deliveryOptions.reduce((prev, current) =>
          prev.price < current.price ? prev : current
        );
        shippingCost.value = cheapestOption.price;
        selectedShippingMethod.value = cheapestOption.name;
      } else {
        // Se não tem opções de entrega, usar retirada na loja
        const pickupOption = shippingOptions.find(
          (opt) => opt.method === "pickup"
        );
        if (pickupOption) {
          shippingCost.value = pickupOption.price;
          selectedShippingMethod.value = pickupOption.name;
          deliveryMethod.value = "pickup";
        }
      }
    } else {
      shippingCost.value = 0;
      selectedShippingMethod.value = "Frete não disponível";
    }
  } catch (error) {
    console.error("❌ Erro ao calcular frete:", error);
    shippingCost.value = 0;
    selectedShippingMethod.value = "Erro no cálculo";
  }
};

// Definir método de entrega como pickup se houver armas de fogo
watch(
  hasFirearms,
  (newValue) => {
    if (newValue) {
      deliveryMethod.value = "pickup";
      calculateShippingCost();
    }
  },
  { immediate: true }
);

// Recalcular frete quando método de entrega mudar
watch(deliveryMethod, () => {
  calculateShippingCost();
});

// Recalcular frete quando CEP ou estado mudar
watch(
  () => shippingAddress.value.postalCode,
  (newCep) => {
    if (newCep && newCep.replace(/\D/g, "").length === 8) {
      calculateShippingCost();
    }
  }
);

watch(
  () => shippingAddress.value.state,
  () => {
    calculateShippingCost();
  }
);

// Funções para endereços salvos
const selectSavedAddress = (address: any) => {
  selectedAddressId.value = address.id;

  // Preencher os campos do shippingAddress com o endereço selecionado
  shippingAddress.value = {
    postalCode: address.zip_code,
    street: address.street,
    number: address.number,
    complement: address.complement || "",
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
  };

  showSavedAddresses.value = false;
};

const useNewAddress = () => {
  selectedAddressId.value = null;

  // Limpar campos do endereço
  shippingAddress.value = {
    postalCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  };
};

const processFirearmOrder = async () => {
  if (!canProceedToPayment.value) {
    console.warn('⚠️ Não pode prosseguir com o pagamento');
    return;
  }


  loading.value = true;

  try {
    const { success } = useNotifications();
    
    // Preparar dados dos itens do carrinho
    const orderItems = cartStore.items.map(item => {
      const itemPrice = paymentMethod.value === 'credit' 
        ? (item.parceladoPrice || item.price)
        : (item.avistaPrice || item.price);
      return {
        name: item.name,
        quantity: item.quantity,
        price: itemPrice
      };
    });



    // Enviar para WhatsApp
    createFirearmOrder(
      customerInfo.value,
      orderItems,
      finalTotal.value,
      undefined, // Documentos serão validados no WhatsApp
      paymentMethod.value,
      installments.value > 1 ? installments.value : undefined
    );

    success(
      "Pedido enviado!",
      "Seu pedido foi enviado para o WhatsApp. Aguarde o contato da loja para confirmar os documentos e finalizar a compra."
    );

    // Opcional: Limpar carrinho após envio
    // await cartStore.clearCart();
    
    // Redirecionar para página de confirmação ou manter na mesma página
    // await navigateTo('/pedido-confirmado');
    
  } catch (error: any) {
    console.error("Erro ao enviar pedido para WhatsApp:", error);
    const { error: showError } = useNotifications();
    showError(
      "Erro ao enviar pedido",
      "Não foi possível enviar o pedido para o WhatsApp. Tente novamente."
    );
  } finally {
    loading.value = false;
  }
};

const processPayment = async () => {
  if (!canProceedToPayment.value) {
    return;
  }

  loading.value = true;

  try {
    // 1. Criar o pedido
    const orderData = {
      customer_name: customerInfo.value.name,
      customer_email: customerInfo.value.email,
      customer_phone: customerInfo.value.phone,
      customer_cpf: customerInfo.value.document,
      status: "pending" as const,
      payment_status: "pending" as const,
      payment_method: paymentMethod.value,
      subtotal: cartStore.totalValue,
      tax_amount: 0,
      shipping_cost: shippingCost.value,
      discount_amount: 0,
      total: finalTotal.value,
      shipping_address:
        deliveryMethod.value === "delivery"
          ? {
              street: shippingAddress.value.street,
              number: shippingAddress.value.number,
              complement: shippingAddress.value.complement || "",
              neighborhood: shippingAddress.value.neighborhood,
              city: shippingAddress.value.city,
              state: shippingAddress.value.state,
              postal_code: shippingAddress.value.postalCode,
            }
          : {
              street: "Retirada na loja",
              number: "",
              complement: "",
              neighborhood: "",
              city: "",
              state: "",
              postal_code: "",
            },
      notes: hasFirearms.value
        ? `CR/CRAF: ${firearmDocuments.value.crNumber}`
        : undefined,
      items: cartStore.items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        product_sku: item.sku || "",
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      })),
    };

    const { data: order, error: orderError } = await ordersStore.createOrder(
      orderData
    );

    if (orderError || !order) {
      throw new Error(orderError || "Erro ao criar pedido");
    }

    if (paymentMethod.value === "credit") {
      await processCardPayment(order.id!);
    } else if (paymentMethod.value === "pix" || paymentMethod.value === "debit") {
      await processPixPayment(order.id!);
    } else {
      console.error(
        "❌ Método de pagamento não reconhecido:",
        paymentMethod.value
      );
      throw new Error(`Método de pagamento inválido: ${paymentMethod.value}`);
    }
  } catch (error: any) {
    console.error("Erro no checkout:", error);
    alert(error.message || "Erro ao processar pagamento");
  } finally {
    loading.value = false;
  }
};

const processCardPayment = async (orderId: string) => {
  const stripe = await getStripe();

  const { data, error } = await createPaymentIntent(finalTotal.value, "brl", {
    orderId,
    paymentMethod: paymentMethod.value,
    installments: installments.value.toString(),
    customerName: customerInfo.value.name,
    customerEmail: customerInfo.value.email,
  });

  if (error || !data) {
    console.error("Erro no Payment Intent:", error);
    throw new Error(error || "Erro ao criar payment intent");
  }

  // Redirecionar para página de pagamento com Stripe Elements
  await navigateTo(`/pagamento?intent=${data.clientSecret}&order=${orderId}&total=${finalTotal.value}`);
};

const processPixPayment = async (orderId: string) => {
  const { data, error } = await createPixPayment(finalTotal.value, { 
    orderId,
    paymentMethod: paymentMethod.value,
    installments: installments.value.toString(),
    customerName: customerInfo.value.name,
    customerEmail: customerInfo.value.email,
  });

  if (error || !data) {
    console.error("Erro no PIX:", error);
    throw new Error(error || "Erro ao criar pagamento PIX");
  }

  await navigateTo(
    `/pagamento-pix?intent=${data.clientSecret}&order=${orderId}&total=${finalTotal.value}`
  );
};

// Verificar autenticação e carregar dados
onMounted(async () => {
  // Inicializar preço final
  finalPrice.value = cartTotal.value.avistaPrice;
  
  if (!isLoggedIn.value) {
    navigateTo("/login?redirect=/checkout");
  } else {
    const { user, profile, getUserProfile } = useAuth();

    // Carregar perfil do usuário se não estiver carregado
    if (user.value && !profile.value) {
      await getUserProfile();
    }

    // Preencher dados do cliente com as informações do perfil
    if (profile.value) {
      customerInfo.value = {
        name: profile.value.name || user.value?.user_metadata?.name || "",
        email: profile.value.email || user.value?.email || "",
        phone: profile.value.phone || "",
        document: profile.value.cpf || "",
      };
    } else if (user.value) {
      // Fallback para dados básicos do usuário
      customerInfo.value = {
        name: user.value.user_metadata?.name || "",
        email: user.value.email || "",
        phone: "",
        document: "",
      };
    }

    // Carregar endereços salvos do usuário logado
    try {
      await addressStore.fetchAddresses();

      // Se há um endereço padrão e não há endereço selecionado, usar o padrão
      if (addressStore.defaultAddress && !selectedAddressId.value) {
        showSavedAddresses.value = true;
      }
    } catch (error) {
      console.error("Erro ao carregar endereços salvos:", error);
    }

    // Inicializar cálculo de frete
    await calculateShippingCost();
  }
});

// SEO
useSeoMeta({
  title: "Checkout - Atapera",
  description: "Finalize sua compra de forma segura",
});
</script>
