<template>
  <div v-if="product" class="bg-white">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-gray-50">
      <div class="container mx-auto px-4 py-3">
        <nav class="text-sm">
          <ol class="flex items-center space-x-2">
            <li>
              <NuxtLink
                to="/"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Início
              </NuxtLink>
            </li>
            <li class="text-gray-400">›</li>
            <li>
              <NuxtLink
                to="/produtos"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Produtos
              </NuxtLink>
            </li>
            <li class="text-gray-400">›</li>
            <li class="text-gray-900">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Galeria de Imagens - Amazon Style -->
        <div class="lg:col-span-5">
          <div class="sticky top-4">
            <!-- Imagem Principal -->
            <div class="mb-4">
              <div
                class="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  :src="selectedImage"
                  :alt="product.name"
                  class="w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  @click="openImageModal"
                />
              </div>
            </div>

            <!-- Thumbnails -->
            <div
              v-if="product.images && product.images.length > 1"
              class="grid grid-cols-6 gap-2"
            >
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectImage(image)"
                @dblclick="openImageFromThumbnail(index)"
                class="aspect-square border-2 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
                :class="
                  selectedImage === getProductImage(image)
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-gray-300'
                "
                :title="`Clique duplo para dar zoom na imagem ${index + 1}`"
              >
                <img
                  :src="getProductImage(image, 'small')"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="lg:col-span-4">
          <div class="space-y-4">
            <!-- Título e Marca -->
            <div>
              <div
                v-if="product.brand"
                class="text-sm text-blue-600 font-medium mb-1"
              >
                {{ product.brand }}
              </div>
              <h1 class="text-2xl font-normal text-gray-900 leading-tight">
                {{ product.name }}
              </h1>
            </div>

            <!-- Avaliações (placeholder) -->
            <div class="flex items-center gap-2 text-sm">
              <div class="flex text-orange-400">
                <span class="text-lg">★★★★☆</span>
              </div>
              <span class="text-blue-600 hover:underline cursor-pointer"
                >4.2 de 5 estrelas</span
              >
              <span class="text-gray-500">(127 avaliações)</span>
            </div>

            <!-- Preços - Amazon Style -->
            <div class="space-y-3 py-2">
              <!-- Preço Principal -->
              <div class="flex items-baseline gap-2">
                <span class="text-sm text-gray-600">Preço:</span>
                <div class="flex items-baseline gap-2">
                  <span
                    v-if="hasDiscount"
                    class="text-sm text-gray-500 line-through"
                  >
                    {{ formatCurrency(product.price) }}
                  </span>
                  <span class="text-2xl text-red-700 font-normal">
                    {{ formatCurrency(displayPrice) }}
                  </span>
                </div>
              </div>

              <!-- Economia -->
              <div v-if="pricing.discountPercentage > 0" class="text-sm">
                <span class="text-red-700">
                  Economize {{ formatCurrency(pricing.discount) }} ({{
                    formatDiscount(pricing.discountPercentage)
                  }})
                </span>
                <span class="text-gray-600 ml-1">com PIX ou Débito</span>
              </div>

              <!-- Parcelamento -->
              <div class="text-sm text-gray-700">
                ou
                <span class="font-medium">{{
                  formatInstallment(
                    pricing.installmentValue,
                    pricing.maxInstallments
                  )
                }}</span>
                no cartão
              </div>
            </div>

            <!-- Disponibilidade -->
            <div class="py-2">
              <div class="flex items-center gap-2 text-sm">
                <span class="w-3 h-3 bg-green-500 rounded-full"></span>
                <span class="text-green-700 font-medium">Em estoque</span>
              </div>
            </div>

            <!-- Destaques do Produto -->
            <div class="border-t border-gray-200 pt-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">
                Destaques do produto
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="highlight in productHighlights"
                  :key="highlight"
                  class="flex items-start gap-3 text-sm"
                >
                  <svg class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Requisitos de Licença -->
            <div
              v-if="product.requires_license"
              class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <h4 class="font-medium text-yellow-800">
                    Requer Documentação
                  </h4>
                  <p class="text-sm text-yellow-700 mt-1">
                    Este produto requer Autorização emitida pelo Orgão competente Sinarm/Sigma para
                    compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar de Compra - Amazon Style -->
        <div class="lg:col-span-3">
          <div
            class="border border-gray-300 rounded-lg p-4 bg-white sticky top-4"
          >
            <!-- Preços na Sidebar -->
            <div class="space-y-2 mb-4">
              <div class="text-xl text-red-700 font-normal">
                {{ formatCurrency(displayPrice) }}
              </div>
              <div class="text-sm text-gray-600">
                {{
                  formatInstallment(
                    pricing.installmentValue,
                    pricing.maxInstallments
                  )
                }}
              </div>
              <div
                v-if="pricing.discountPercentage > 0"
                class="text-sm text-green-700"
              >
                {{ formatDiscount(pricing.discountPercentage) }} com PIX/Débito
              </div>
            </div>

            <!-- Seletor de Tamanho -->
            <div v-if="hasVariants" class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Tamanho:
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.size"
                  @click="selectedSize = variant.size"
                  class="px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  :class="
                    selectedSize === variant.size
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  "
                >
                  <div class="text-center">
                    <div class="font-semibold">{{ variant.size }}</div>
                    <div class="text-xs text-gray-600">{{ formatCurrency(variant.price) }}</div>
                  </div>
                </button>
              </div>
              <p v-if="!selectedSize && hasVariants" class="text-sm text-red-600 mt-2">
                Por favor, selecione um tamanho
              </p>
            </div>

            <!-- Seletor de Cor -->
            <div v-if="product.color && product.color.length > 0" class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Cor disponível:
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.color"
                  :key="color"
                  @click="selectedColor = color"
                  class="px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  :class="
                    selectedColor === color
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  "
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Seletor de Quantidade -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-900 mb-2"
                >Quantidade:</label
              >
              <div
                class="flex items-center border border-gray-300 rounded w-fit"
              >
                <button
                  @click="decreaseQuantity"
                  class="px-3 py-2 hover:bg-gray-100 text-gray-600"
                  :disabled="quantity <= 1"
                >
                  −
                </button>
                <input
                  v-model="quantity"
                  type="number"
                  min="1"
                  max="10"
                  class="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                />
                <button
                  @click="increaseQuantity"
                  class="px-3 py-2 hover:bg-gray-100 text-gray-600"
                  :disabled="quantity >= 10"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="space-y-2">
              <button
                @click="addToCart"
                :disabled="loading || (hasVariants && !selectedSize)"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-50"
              >
                {{ loading ? "Adicionando..." : "Adicionar ao carrinho" }}
              </button>

              <button
                @click="buyNow"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
              >
                Comprar agora
              </button>
            </div>

            <!-- Vendido por -->
            <div
              class="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600"
            >
              <div>
                Vendido por
                <span class="text-blue-600 font-medium">Atapera Oficial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informações Detalhadas -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Descrição Principal -->
        <div class="lg:col-span-3">
          <!-- Tabs de Informações -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
                :class="
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <div class="mt-6">
            <!-- Descrição Completa -->
            <div v-if="activeTab === 'description'" class="space-y-6">
              <!-- Descrição formatada com tópicos -->
              <div v-if="product.description" class="space-y-6">
                <div class="formatted-description" v-html="formatDescription(product.description)"></div>
              </div>
              <div v-else-if="product.short_description" class="space-y-4">
                <div class="text-gray-700 leading-relaxed text-lg">
                  {{ product.short_description }}
                </div>
              </div>
              <div v-else class="text-center py-12">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-500 italic text-lg">Descrição detalhada será adicionada em breve.</p>
              </div>

              <!-- Informações importantes -->
              <div v-if="product.requires_license" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-yellow-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <h4 class="text-lg font-semibold text-yellow-800 mb-2">Documentação Necessária</h4>
                    <p class="text-yellow-700">
                      Este produto requer Autorização emitida pelo Orgão competente Sinarm/Sigma para compra.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Especificações Técnicas -->
            <div v-else-if="activeTab === 'specs'" class="space-y-6">
              <!-- Informações Básicas -->
              <div v-if="basicSpecs.length > 0">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                  Informações do Produto
                </h3>
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <dl class="divide-y divide-gray-200">
                    <div
                      v-for="(spec, index) in basicSpecs"
                      :key="spec.label"
                      class="px-6 py-4 flex justify-between items-center"
                      :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                      <dt class="text-sm font-medium text-gray-600">{{ spec.label }}</dt>
                      <dd class="text-sm text-gray-900 font-semibold">{{ spec.value }}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Especificações Técnicas Avançadas -->
              <div
                v-if="
                  product.specifications &&
                  Object.keys(product.specifications).length > 0
                "
              >
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  Especificações Técnicas
                </h3>
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <dl class="divide-y divide-gray-200">
                    <div
                      v-for="(value, key, index) in product.specifications"
                      :key="key"
                      class="px-6 py-4 flex justify-between items-center"
                      :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                      <dt class="text-sm font-medium text-gray-600">
                        {{ formatSpecKey(key) }}
                      </dt>
                      <dd class="text-sm text-gray-900 font-semibold">{{ value }}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Dimensões e Peso -->
              <div v-if="dimensionsSpecs.length > 0">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Dimensões e Peso
                </h3>
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <dl class="divide-y divide-gray-200">
                    <div
                      v-for="(spec, index) in dimensionsSpecs"
                      :key="spec.label"
                      class="px-6 py-4 flex justify-between items-center"
                      :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                      <dt class="text-sm font-medium text-gray-600">{{ spec.label }}</dt>
                      <dd class="text-sm text-gray-900 font-semibold">{{ spec.value }}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Aviso de especificações vazias -->
              <div v-if="basicSpecs.length === 0 && dimensionsSpecs.length === 0 && (!product.specifications || Object.keys(product.specifications).length === 0)" class="text-center py-8">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-gray-500 italic">Especificações técnicas serão adicionadas em breve.</p>
              </div>
            </div>

            <!-- Avaliações -->
            <div v-else-if="activeTab === 'reviews'" class="space-y-6">
              <div class="text-center py-8 text-gray-500">
                <svg
                  class="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <p>Seja o primeiro a avaliar este produto</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar com Mais Informações -->
        <div class="lg:col-span-1">
          <div class="space-y-4">
            <!-- Informações de Segurança -->
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-medium text-gray-900 mb-3">Compra Segura</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Pagamento 100% seguro</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Produtos de qualidade</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Garantia de qualidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos Relacionados -->
      <div
        v-if="relatedProducts.length > 0"
        class="mt-12 border-t border-gray-200 pt-8"
      >
        <h2 class="text-xl font-medium text-gray-900 mb-6">
          Produtos relacionados
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <NuxtLink :to="`/produtos/${relatedProduct.slug}`" class="block">
              <div
                class="aspect-square bg-gray-50 rounded mb-2 overflow-hidden"
              >
                <img
                  :src="getFirstProductImage(relatedProduct.images)"
                  :alt="relatedProduct.name"
                  class="w-full h-full object-contain hover:scale-105 transition-transform"
                />
              </div>
              <h3 class="text-sm text-gray-900 line-clamp-2 mb-1">
                {{ relatedProduct.name }}
              </h3>
              <div class="text-sm">
                <div class="text-red-700 font-medium">
                  {{
                    formatCurrency(calculatePricing(relatedProduct).avistaPrice)
                  }}
                </div>
                <div class="text-gray-500 text-xs">
                  {{
                    formatInstallment(
                      calculatePricing(relatedProduct).installmentValue,
                      12
                    )
                  }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Modal -->
    <ImageZoomModal
      :is-open="showImageZoom"
      :images="product?.images || []"
      :current-image-index="currentImageIndex"
      :alt-text="product?.name"
      @close="closeImageZoom"
    />
  </div>

  <!-- Loading State -->
  <div v-else class="container mx-auto px-4 py-8">
    <div class="animate-pulse space-y-6">
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="aspect-square bg-gray-200 rounded-lg"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  calculatePricing,
  formatCurrency,
  formatDiscount,
  formatInstallment,
} from "~/utils/pricing";

// Composables
const supabase = useSupabase();
const { getProductImage } = useCloudinary();
const route = useRoute();
const cartStore = useCartStore();

// Estados
const product = ref(null);
const relatedProducts = ref([]);
const selectedImage = ref("");
const quantity = ref(1);
const loading = ref(false);
const activeTab = ref("description");
const selectedColor = ref("");
const selectedSize = ref("");

// Computed
const pricing = computed(() =>
  product.value
    ? calculatePricing(product.value)
    : {
        avistaPrice: 0,
        parceladoPrice: 0,
        discount: 0,
        discountPercentage: 0,
        installmentValue: 0,
        maxInstallments: 12,
      }
);

const hasDiscount = computed(() => {
  return (
    product.value?.sale_price && product.value.sale_price < product.value.price
  );
});

const hasVariants = computed(() => {
  return product.value?.variants && product.value.variants.length > 0;
});

const selectedVariant = computed(() => {
  if (!selectedSize.value || !product.value?.variants) return null;
  return product.value.variants.find(v => v.size === selectedSize.value);
});

const displayPrice = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.price;
  }
  return pricing.value.avistaPrice;
});

const tabs = computed(() => [
  { id: "description", name: "Descrição Completa" },
  { id: "specs", name: "Especificações Técnicas" },
  { id: "reviews", name: "Avaliações (0)" },
]);

// Destaques principais para a seção superior
const productHighlights = computed(() => {
  const highlights = [];

  // Adicionar destaques baseados na categoria e especificações
  if (product.value?.brand && product.value?.model) {
    highlights.push(`${product.value.brand} ${product.value.model} original`);
  } else if (product.value?.brand) {
    highlights.push(`Produto da marca ${product.value.brand}`);
  }

  if (product.value?.caliber) {
    highlights.push(`Calibre ${product.value.caliber}`);
  }

  if (product.value?.color && product.value.color.length > 1) {
    highlights.push(`Disponível em ${product.value.color.length} cores`);
  }

  if (product.value?.variants && product.value.variants.length > 0) {
    highlights.push(`${product.value.variants.length} opções de tamanho`);
  }

  if (product.value?.weight) {
    highlights.push(`Peso: ${product.value.weight}kg`);
  }

  // Adicionar destaque de garantia/qualidade baseado na categoria
  highlights.push("Produto com garantia de qualidade");
  highlights.push("Entrega rápida e segura");

  return highlights.slice(0, 6); // Máximo 6 destaques
});

// Características detalhadas para a aba
const detailedFeatures = computed(() => {
  const features = [];

  if (product.value?.short_description) {
    // Dividir a descrição curta em pontos se contiver quebras de linha ou pontos
    const description = product.value.short_description;
    if (description.includes('\n')) {
      features.push(...description.split('\n').filter(line => line.trim()));
    } else if (description.includes('.') && description.length > 100) {
      features.push(...description.split('.').filter(sentence => sentence.trim()).map(s => s.trim() + '.'));
    } else {
      features.push(description);
    }
  }

  // Adicionar características baseadas nos dados do produto
  if (product.value?.brand) {
    features.push(`Fabricado pela ${product.value.brand}`);
  }

  if (product.value?.caliber) {
    features.push(`Disponível no calibre ${product.value.caliber}`);
  }

  if (product.value?.requires_license) {
    features.push("Requer autorização emitida pelo orgão competente Sinarm/Sigma");
  }

  return features;
});

const basicSpecs = computed(() => {
  const specs = [];
  if (product.value?.brand)
    specs.push({ label: "Marca", value: product.value.brand });
  if (product.value?.model)
    specs.push({ label: "Modelo", value: product.value.model });
  if (selectedColor.value)
    specs.push({ label: "Cor", value: selectedColor.value });

  // SKU sempre presente - todos os produtos têm
  specs.push({ label: "SKU", value: product.value?.sku });

  if (product.value?.caliber)
    specs.push({ label: "Calibre", value: product.value.caliber });
  if (product.value?.weight)
    specs.push({ label: "Peso", value: `${product.value.weight}kg` });


  return specs;
});

// Especificações de dimensões e peso
const dimensionsSpecs = computed(() => {
  const specs = [];

  if (product.value?.weight) {
    specs.push({ label: "Peso", value: `${product.value.weight}kg` });
  }

  if (product.value?.dimensions?.length) {
    specs.push({ label: "Comprimento", value: `${product.value.dimensions.length}cm` });
  }

  if (product.value?.dimensions?.width) {
    specs.push({ label: "Largura", value: `${product.value.dimensions.width}cm` });
  }

  if (product.value?.dimensions?.height) {
    specs.push({ label: "Altura", value: `${product.value.dimensions.height}cm` });
  }

  return specs;
});

// Métodos
const selectImage = (image: string) => {
  selectedImage.value = getProductImage(image);
};

const showImageZoom = ref(false);
const currentImageIndex = ref(0);

const openImageModal = () => {
  // Find the current image index
  if (product.value?.images?.length) {
    const currentImg = selectedImage.value;
    const foundIndex = product.value.images.findIndex(
      (img) =>
        getProductImage(img) === currentImg ||
        getProductImage(img, "large") === currentImg
    );
    currentImageIndex.value = foundIndex >= 0 ? foundIndex : 0;
  }
  showImageZoom.value = true;
};

const closeImageZoom = () => {
  showImageZoom.value = false;
};

const openImageFromThumbnail = (index: number) => {
  currentImageIndex.value = index;
  showImageZoom.value = true;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  if (quantity.value < 10) quantity.value++;
};

const addToCart = async () => {
  // Validar se cor foi selecionada quando há cores disponíveis
  if (product.value.color && product.value.color.length > 0 && !selectedColor.value) {
    const { error } = useNotifications();
    error("Selecione uma cor", "Por favor, escolha uma cor antes de adicionar ao carrinho");
    return;
  }

  // Validar se tamanho foi selecionado quando há variações disponíveis
  if (hasVariants.value && !selectedSize.value) {
    const { error } = useNotifications();
    error("Selecione um tamanho", "Por favor, escolha um tamanho antes de adicionar ao carrinho");
    return;
  }

  loading.value = true;
  try {
    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      price: selectedVariant.value ? selectedVariant.value.price : pricing.value.parceladoPrice,
      avistaPrice: selectedVariant.value ? selectedVariant.value.price : pricing.value.avistaPrice,
      parceladoPrice: selectedVariant.value ? selectedVariant.value.price : pricing.value.parceladoPrice,
      image: product.value.images?.[0] || "/placeholder-product.jpg",
      category: product.value.categories?.slug || "produto",
      product_id: product.value.id,
      slug: product.value.slug,
      selectedColor: selectedColor.value, // Incluir cor selecionada
      availableColors: product.value.color || [], // Incluir cores disponíveis
      selectedSize: selectedSize.value, // Incluir tamanho selecionado
      availableSizes: product.value.variants || [], // Incluir variações disponíveis
      variantPrice: selectedVariant.value?.price, // Preço da variação
      products: {
        categories: {
          slug: product.value.categories?.slug,
        },
        requires_license: product.value.requires_license,
      },
    };

    await cartStore.addItem(cartItem, quantity.value);

    // Feedback
    const { success } = useNotifications();
    const sizeText = selectedSize.value ? ` (${selectedSize.value})` : '';
    const colorText = selectedColor.value ? ` - ${selectedColor.value}` : '';
    success(
      "Produto adicionado!",
      `${product.value.name}${sizeText}${colorText} foi adicionado ao carrinho`
    );
  } catch (error: any) {
    console.error("Erro ao adicionar ao carrinho:", error);
    const { error: showError } = useNotifications();
    showError("Erro", error.message || "Erro ao adicionar produto ao carrinho");
  } finally {
    loading.value = false;
  }
};

const buyNow = async () => {
  await addToCart();
  if (!loading.value) {
    navigateTo("/checkout");
  }
};

const toggleWishlist = () => {
  // TODO: Implementar lista de desejos
  const { success } = useNotifications();
  success("Lista de desejos", "Produto adicionado à lista de desejos");
};

const formatSpecKey = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Formatador de descrição com tópicos
const formatDescription = (description: string) => {
  if (!description) return '';

  let result = description
    // Remover emojis dos tópicos primeiro
    .replace(/([\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*/gu, '')
    // Converter **texto** para títulos e preparar conteúdo
    .replace(/\*\*(.*?)\*\*/g, '|||TITLE|||$1|||/TITLE|||')
    // Processar cada linha separadamente
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';

      if (trimmed.includes('|||TITLE|||')) {
        const title = trimmed.replace(/\|\|\|TITLE\|\|\|(.*?)\|\|\|\/TITLE\|\|\|/, '$1');
        return `<h3 class="topic-title">${title}</h3>`;
      } else if (trimmed.startsWith('•')) {
        const content = trimmed.replace(/^•\s*/, '');
        return `<div class="topic-item">• ${content}</div>`;
      } else {
        return `<div class="topic-text">${trimmed}</div>`;
      }
    })
    .filter(line => line)
    .join('');

  return `<div class="formatted-description">${result}</div>`;
};

const getFirstProductImage = (images: string[]) => {
  if (!images || images.length === 0) {
    return "/placeholder-product.jpg";
  }
  return getProductImage(images[0], "medium");
};

// Buscar produto
const fetchProduct = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", route.params.slug)
      .eq("is_active", true)
      .single();

    if (error) throw error;
    if (!data)
      throw createError({
        statusCode: 404,
        statusMessage: "Produto não encontrado",
      });

    product.value = data;


    // Definir imagem selecionada
    if (data.images && data.images.length > 0) {
      selectedImage.value = getProductImage(data.images[0], "large");
    } else {
      selectedImage.value = "/placeholder-product.jpg";
    }

    // Definir primeira cor como selecionada
    if (data.color && data.color.length > 0) {
      selectedColor.value = data.color[0];
    }

    // Buscar produtos relacionados
    await fetchRelatedProducts(data.category_id, data.id);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw createError({
      statusCode: 404,
      statusMessage: "Produto não encontrado",
    });
  }
};

const fetchRelatedProducts = async (
  categoryId: string,
  currentProductId: string
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, sale_price, avista_price, parcelado_price, images"
      )
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .neq("id", currentProductId)
      .limit(5);

    if (error) {
      console.error("Erro ao buscar produtos relacionados:", error);
      return;
    }

    relatedProducts.value = data || [];
  } catch (error) {
    console.error("Erro ao buscar produtos relacionados:", error);
  }
};

// Lifecycle
await fetchProduct();

// SEO
if (product.value) {
  useSeoMeta({
    title: `${product.value.name} - Atapera`,
    description: product.value.short_description || product.value.description,
    ogTitle: product.value.name,
    ogDescription: product.value.short_description,
    ogImage: selectedImage.value,
    ogType: "product",
  });
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* Estilos para descrição formatada */
:deep(.formatted-description) {
  line-height: 1.4;
}

:deep(.topic-title) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 1rem 0 0.25rem 0;
  line-height: 1.2;
}

:deep(.topic-title:first-child) {
  margin-top: 0;
}

:deep(.topic-item) {
  margin: 0.125rem 0 0.125rem 1rem;
  line-height: 1.4;
}

:deep(.topic-text) {
  margin: 0.125rem 0 0.125rem 1rem;
  line-height: 1.4;
}

:deep(.topic-text:empty) {
  display: none;
}
</style>
