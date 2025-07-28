<!-- components/ProductModal.vue -->
<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 p-4"
    style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(2px)"
  >
    <div
      class="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 rounded-t-2xl flex-shrink-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">
              {{ isEditing ? "Editar Produto" : "Adicionar Produto" }}
            </h2>
            <p class="text-red-100 mt-1">
              {{
                isEditing
                  ? "Atualize as informações do produto"
                  : "Preencha os dados para criar um novo produto"
              }}
            </p>
          </div>
          <button
            @click="$emit('close')"
            class="p-3 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Form -->
      <form
        @submit.prevent="handleSubmit"
        class="flex-1 overflow-y-auto flex flex-col"
      >
        <div class="p-8 space-y-8 flex-1">
          <!-- SEÇÃO DE IMAGENS -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">
              Imagens do Produto
            </h3>

            <!-- Upload de Imagens -->
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 transition-colors"
            >
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div class="mt-4">
                  <label for="file-upload" class="cursor-pointer">
                    <span class="mt-2 block text-sm font-medium text-gray-900">
                      Clique para selecionar imagens ou arraste aqui
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      class="sr-only"
                      @change="handleFileSelect"
                      :disabled="uploadingImages"
                    />
                  </label>
                  <p class="mt-1 text-xs text-gray-500">
                    PNG, JPG, WebP até 10MB cada
                  </p>
                </div>
              </div>
            </div>

            <!-- Preview das Imagens Selecionadas -->
            <div v-if="selectedFiles.length > 0" class="space-y-3">
              <h4 class="text-sm font-medium text-gray-700">
                Imagens Selecionadas:
              </h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="(file, index) in selectedFiles"
                  :key="index"
                  class="relative group"
                >
                  <img
                    :src="getFilePreview(file)"
                    :alt="`Preview ${index + 1}`"
                    class="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                  <div
                    class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg"
                  >
                    {{ file.name }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Imagens Existentes (para edição) -->
            <div v-if="form.images && form.images.length > 0" class="space-y-3">
              <h4 class="text-sm font-medium text-gray-700">Imagens Atuais:</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="(imagePublicId, index) in form.images"
                  :key="index"
                  class="relative group"
                >
                  <img
                    :src="getProductImage(imagePublicId, 'small')"
                    :alt="`Imagem ${index + 1}`"
                    class="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    @click="removeExistingImage(index)"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Status do Upload -->
            <div
              v-if="uploadingImages"
              class="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="animate-spin h-5 w-5 text-blue-600"
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
                <span class="text-blue-800">Fazendo upload das imagens...</span>
              </div>
            </div>
          </div>

          <!-- Informações Básicas -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Nome -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: Pistola Glock G17 Gen5"
                @input="generateSlug"
              />
            </div>

            <!-- Slug -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                URL (Slug) *
              </label>
              <input
                v-model="form.slug"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="pistola-glock-g17-gen5"
              />
            </div>

            <!-- Marca -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <input
                v-model="form.brand"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: Glock"
              />
            </div>

            <!-- Modelo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Modelo
              </label>
              <input
                v-model="form.model"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: G17 Gen5"
              />
            </div>

            <!-- Categoria -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                v-model="form.category_id"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                <option
                  v-for="category in availableCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Subcategoria -->
            <div v-if="availableSubcategories.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Subcategoria
              </label>
              <select
                v-model="form.subcategory"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Selecione uma subcategoria</option>
                <option
                  v-for="subcategory in availableSubcategories"
                  :key="subcategory.value"
                  :value="subcategory.value"
                >
                  {{ subcategory.label }}
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                A subcategoria ajuda os clientes a encontrar o produto mais
                facilmente
              </p>
            </div>

            <!-- Calibre (se aplicável) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Calibre
              </label>
              <input
                v-model="form.caliber"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: 9mm, .40, .45"
              />
            </div>
          </div>

          <!-- Descrições -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descrição Curta
              </label>
              <textarea
                v-model="form.short_description"
                rows="2"
                maxlength="500"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Descrição breve do produto (até 500 caracteres)"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                {{ form.short_description?.length || 0 }}/500 caracteres
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descrição Completa
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Descrição detalhada do produto"
              ></textarea>
            </div>
          </div>

          <!-- Preços e Estoque -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-800">
              Configuração de Preços
            </h3>

            <!-- Preços Base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Preço Base *
                  <span class="text-xs text-gray-500"
                    >(usado quando não há preços específicos)</span
                  >
                </label>
                <div class="relative">
                  <span
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >R$</span
                  >
                  <input
                    v-model="form.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Preço Promocional
                  <span class="text-xs text-gray-500">(opcional)</span>
                </label>
                <div class="relative">
                  <span
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >R$</span
                  >
                  <input
                    v-model="form.sale_price"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            <!-- Preços Específicos -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="text-sm font-semibold text-blue-900 mb-3">
                Preços Específicos (Opcional)
              </h4>
              <div class="text-xs text-blue-700 mb-4 space-y-1">
                <p>Se preenchidos, estes preços serão usados em vez do cálculo automático:</p>
                <ul class="list-disc list-inside pl-2 space-y-1">
                  <li>Se apenas o <strong>preço parcelado</strong> for definido, o preço base será usado como preço à vista</li>
                  <li>Se apenas o <strong>preço à vista</strong> for definido, o parcelado será calculado automaticamente</li>
                  <li>Se ambos forem definidos, serão usados exatamente como informado</li>
                </ul>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-blue-900 mb-2">
                    Preço à Vista
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >R$</span
                    >
                    <input
                      v-model="form.avista_price"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-blue-900 mb-2">
                    Preço Parcelado (até 12x)
                  </label>
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >R$</span
                    >
                    <input
                      v-model="form.parcelado_price"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estoque -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Estoque
              </label>
              <input
                v-model="form.stock"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0"
              />
              <p class="text-xs text-gray-500 mt-1">
                Opcional - Usado apenas para controle interno
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Estoque Mínimo
              </label>
              <input
                v-model="form.min_stock"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="5"
              />
            </div>
          </div>

          <!-- Dimensões e Peso -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                v-model="form.weight"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Comprimento (cm)
              </label>
              <input
                v-model="dimensions.length"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.0"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Largura (cm)
              </label>
              <input
                v-model="dimensions.width"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.0"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Altura (cm)
              </label>
              <input
                v-model="dimensions.height"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.0"
              />
            </div>
          </div>

          <!-- Configurações -->
          <div class="space-y-4">
            <div class="flex items-center gap-6">
              <label class="flex items-center gap-2">
                <input
                  v-model="form.is_active"
                  type="checkbox"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span class="text-sm font-medium text-gray-700"
                  >Produto Ativo</span
                >
              </label>

              <label class="flex items-center gap-2">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span class="text-sm font-medium text-gray-700"
                  >Produto Destaque</span
                >
              </label>

              <label class="flex items-center gap-2">
                <input
                  v-model="form.requires_license"
                  type="checkbox"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span class="text-sm font-medium text-gray-700"
                  >Requer Licença</span
                >
              </label>
            </div>

            <!-- Tipo de Licença (se aplicável) -->
            <div v-if="form.requires_license">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Licença
              </label>
              <select
                v-model="form.license_type"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Selecione o tipo</option>
                <option value="cr">Certificado de Registro (CR)</option>
                <option value="craf">
                  Certificado de Registro de Arma de Fogo (CRAF)
                </option>
                <option value="cac">Certificado de Atirador Civil (CAC)</option>
              </select>
            </div>
          </div>

          <!-- SEO -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">SEO</h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Título
              </label>
              <input
                v-model="form.meta_title"
                type="text"
                maxlength="255"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Título para SEO (até 255 caracteres)"
              />
              <p class="text-xs text-gray-500 mt-1">
                {{ form.meta_title?.length || 0 }}/255 caracteres
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Descrição
              </label>
              <textarea
                v-model="form.meta_description"
                rows="3"
                maxlength="500"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Descrição para SEO (até 500 caracteres)"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                {{ form.meta_description?.length || 0 }}/500 caracteres
              </p>
            </div>
          </div>

          <!-- SKU - Movido para o final -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">
              Informações Técnicas
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                SKU (Código do Produto) *
              </label>
              <div class="flex gap-2">
                <input
                  v-model="form.sku"
                  type="text"
                  required
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="GLK-G17-001"
                />
                <button
                  type="button"
                  @click="generateSKU"
                  class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  title="Gerar SKU automaticamente"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Gerar
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Clique em "Gerar" para criar um SKU automaticamente baseado nas
                informações do produto
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="flex-shrink-0 border-t border-gray-200 p-6">
          <div class="flex items-center justify-end gap-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              @click="handleSubmit"
              :disabled="loading || uploadingImages"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <svg
                v-if="loading"
                class="animate-spin w-5 h-5"
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
              {{ loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar" }}
              Produto
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryConfig } from "~/config/categories";

const supabase = useSupabase();
const { uploadImages, getProductImage } = useCloudinary();

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();

interface Product {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  avista_price?: number;
  parcelado_price?: number;
  category_id: string;
  subcategory?: string;
  brand?: string;
  model?: string;
  sku: string;
  stock: number | null;
  min_stock: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  images?: string[];
  requires_license: boolean;
  license_type?: string;
  caliber?: string;
  is_active: boolean;
  is_featured: boolean;
  meta_title?: string;
  meta_description?: string;
}

const props = defineProps<{
  product?: Product | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [product: Product];
}>();

const loading = ref(false);
const uploadingImages = ref(false);
const selectedFiles = ref<File[]>([]);
const isEditing = computed(() => !!props.product);

// Categorias disponíveis
const availableCategories = computed(() => {
  return categoriesStore.activeCategories || [];
});

// Mapeamento dinâmico de IDs de categoria para slugs
const categoryIdToSlug = computed(() => {
  const mapping = {};
  availableCategories.value.forEach((category) => {
    mapping[category.id] = category.slug;
  });
  return mapping;
});

// Subcategorias disponíveis baseadas na categoria selecionada
const availableSubcategories = computed(() => {
  if (!form.category_id) return [];

  const categorySlug = categoryIdToSlug.value[form.category_id];
  if (!categorySlug) return [];

  const categoryConfig = getCategoryConfig(categorySlug);
  if (!categoryConfig) return [];

  const subcategoryFilter = categoryConfig.filters.find(
    (filter) => filter.key === "subcategory"
  );
  return subcategoryFilter?.options || [];
});

// Dimensões separadas para facilitar o binding
const dimensions = reactive({
  length: 0,
  width: 0,
  height: 0,
});

// Formulário
const form = reactive<Product>({
  name: "",
  slug: "",
  description: "",
  short_description: "",
  price: 0,
  sale_price: 0,
  avista_price: 0,
  parcelado_price: 0,
  category_id: "",
  subcategory: "",
  brand: "",
  model: "",
  sku: "",
  stock: null,
  min_stock: 5,
  weight: 0,
  images: [],
  requires_license: false,
  license_type: "",
  caliber: "",
  is_active: true,
  is_featured: false,
  meta_title: "",
  meta_description: "",
});

// Inicializar formulário se estiver editando
if (props.product) {
  Object.assign(form, props.product);
  if (props.product.dimensions) {
    Object.assign(dimensions, props.product.dimensions);
  }
}

// Limpar subcategoria quando categoria mudar
watch(
  () => form.category_id,
  () => {
    form.subcategory = "";
  }
);

// Carregar categorias ao montar o componente
onMounted(async () => {
  await categoriesStore.fetchCategories();
});

// Funções para manipulação de arquivos
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);

    // Validar arquivos
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isImage) {
        alert(`${file.name} não é uma imagem válida`);
        return false;
      }

      if (!isValidSize) {
        alert(`${file.name} é muito grande. Máximo 10MB`);
        return false;
      }

      return true;
    });

    selectedFiles.value = [...selectedFiles.value, ...validFiles];
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const removeExistingImage = (index: number) => {
  if (form.images) {
    form.images.splice(index, 1);
  }
};

const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Gerar slug automaticamente
const generateSlug = () => {
  if (form.name && !isEditing.value) {
    form.slug = form.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-"); // Remove hífens duplicados
  }
};

// Gerar SKU automaticamente
const generateSKU = () => {
  // Mapeamento de slugs para prefixos
  const slugToPrefixes = {
    "armas-fogo": "AF",
    "armas-pressao": "AP",
    pesca: "PSC",
    airsoft: "AIR",
    caca: "CAC",
    vestuario: "VEST",
    camping: "CAMP",
  };

  let skuParts = [];

  // 1. Prefixo da categoria
  const categorySlug = categoryIdToSlug.value[form.category_id];
  const categoryPrefix = categorySlug
    ? slugToPrefixes[categorySlug] || "PROD"
    : "PROD";
  skuParts.push(categoryPrefix);

  // 2. Prefixo da marca (se informada)
  if (form.brand) {
    const brandPrefix = form.brand
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 3);
    skuParts.push(brandPrefix);
  }

  // 3. Prefixo do modelo (se informado)
  if (form.model) {
    const modelPrefix = form.model
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 3);
    skuParts.push(modelPrefix);
  }

  // 4. Número sequencial único baseado em timestamp
  const timestamp = Date.now().toString().slice(-6);
  skuParts.push(timestamp);

  // Montar SKU final
  form.sku = skuParts.join("-");
};

// Submit do formulário
const handleSubmit = async (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  loading.value = true;

  try {
    // Validações básicas
    if (
      !form.name ||
      !form.slug ||
      !form.sku ||
      !form.category_id ||
      !form.price
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Gerar ID temporário para produto novo (usado na pasta do Cloudinary)
    const productId = props.product?.id || crypto.randomUUID();

    // 1. Fazer upload das novas imagens se houver
    let newImageUrls: string[] = [];
    if (selectedFiles.value.length > 0) {
      uploadingImages.value = true;

      try {
        newImageUrls = await uploadImages(selectedFiles.value, productId);
      } catch (error) {
        console.error("❌ Erro no upload:", error);
        alert("Erro no upload das imagens. Tente novamente.");
        return;
      } finally {
        uploadingImages.value = false;
      }
    }

    // 2. Combinar imagens existentes com as novas
    const allImages = [...(form.images || []), ...newImageUrls];

    // 3. Preparar dados para a store
    const productData = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      short_description: form.short_description,
      price: form.price,
      sale_price: form.sale_price || null,
      avista_price: form.avista_price || null,
      parcelado_price: form.parcelado_price || null,
      category_id: form.category_id,
      subcategory: form.subcategory || null,
      brand: form.brand || null,
      model: form.model || null,
      sku: form.sku,
      stock: form.stock || 0,
      min_stock: form.min_stock || 5,
      weight: form.weight || null,
      dimensions: {
        length: dimensions.length || null,
        width: dimensions.width || null,
        height: dimensions.height || null,
      },
      images: allImages,
      requires_license: form.requires_license,
      license_type: form.license_type || null,
      caliber: form.caliber || null,
      is_active: form.is_active,
      is_featured: form.is_featured,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
    };

    let result;

    if (isEditing.value) {
      try {
        const updateFunction = productsStore.updateProduct;

        result = await updateFunction(props.product!.id!, productData);
      } catch (updateError) {
        console.error("❌ Erro na chamada updateProduct:", updateError);
        throw updateError;
      }
    } else {
      result = await productsStore.createProduct(productData);
    }

    if (result.error) {
      console.error("❌ Erro da store:", result.error);
      throw new Error(result.error);
    }

    // Limpar arquivos selecionados
    selectedFiles.value = [];

    emit("save", result.data);
    emit("close");
  } catch (error: any) {
    console.error("❌ Erro ao salvar produto:", error);
    alert(`Erro ao salvar produto: ${error.message || "Erro desconhecido"}`);
  } finally {
    loading.value = false;
    uploadingImages.value = false;
  }
};
</script>
