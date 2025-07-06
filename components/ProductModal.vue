<!-- components/ProductModal.vue -->
<template>
  <div
    class="fixed inset-0 backdrop-blur-md bg-amber-100 bg-opacity-10 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-800">
            {{ isEditing ? "Editar Produto" : "Adicionar Produto" }}
          </h2>
          <button
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5"
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
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        
        <!-- SEÇÃO DE IMAGENS -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Imagens do Produto</h3>
          
          <!-- Upload de Imagens -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 transition-colors">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                <p class="mt-1 text-xs text-gray-500">PNG, JPG, WebP até 10MB cada</p>
              </div>
            </div>
          </div>

          <!-- Preview das Imagens Selecionadas -->
          <div v-if="selectedFiles.length > 0" class="space-y-3">
            <h4 class="text-sm font-medium text-gray-700">Imagens Selecionadas:</h4>
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
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
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
          <div v-if="uploadingImages" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          <div>
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

          <!-- SKU -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              SKU *
            </label>
            <input
              v-model="form.sku"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="GLK-G17-001"
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
              <option value="3eebaee1-c85d-4b67-9af1-5619764b7307">
                Armas de Fogo
              </option>
              <option value="d3f1376d-92ea-4a9b-a367-80456b9f0063">
                Armas de Pressão
              </option>
              <option value="3b6c5fb9-e0f3-474b-8cc2-e36dd327d2aa">
                Pesca
              </option>
              <option value="b8ce0b20-63ad-44a2-b0a0-f383d5f8ec32">
                Airsoft
              </option>
              <option value="e3afc893-b4c0-43a6-9900-c1208b1372ed">Caça</option>
              <option value="2a6c0a33-0025-4cce-a306-db578a19a4f2">
                Vestuário
              </option>
            </select>
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Preço *
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

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Estoque *
            </label>
            <input
              v-model="form.stock"
              type="number"
              min="0"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="0"
            />
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

        <!-- Buttons -->
        <div
          class="flex items-center justify-end gap-4 pt-6 border-t border-gray-200"
        >
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
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
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabase();
const { uploadImages, getProductImage } = useCloudinary();

interface Product {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  category_id: string;
  brand?: string;
  model?: string;
  sku: string;
  stock: number;
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
  category_id: "",
  brand: "",
  model: "",
  sku: "",
  stock: 0,
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

// Funções para manipulação de arquivos
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    
    // Validar arquivos
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
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

// Submit do formulário
const handleSubmit = async () => {
  loading.value = true;

  try {
    // Gerar ID temporário para produto novo (usado na pasta do Cloudinary)
    const productId = props.product?.id || crypto.randomUUID();
    
    // 1. Fazer upload das novas imagens se houver
    let newImageUrls: string[] = [];
    if (selectedFiles.value.length > 0) {
      uploadingImages.value = true;
      
      try {
        newImageUrls = await uploadImages(selectedFiles.value, productId);
      } catch (error) {
        console.error('Erro no upload:', error);
        alert('Erro no upload das imagens. Tente novamente.');
        return;
      } finally {
        uploadingImages.value = false;
      }
    }
    
    // 2. Combinar imagens existentes com as novas
    const allImages = [...(form.images || []), ...newImageUrls];

    // 3. Preparar dados para o Supabase
    const productData = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      short_description: form.short_description,
      price: parseFloat(form.price.toString()),
      sale_price: form.sale_price
        ? parseFloat(form.sale_price.toString())
        : null,
      category_id: form.category_id,
      brand: form.brand || null,
      model: form.model || null,
      sku: form.sku,
      stock: parseInt(form.stock.toString()),
      min_stock: parseInt(form.min_stock.toString()),
      weight: form.weight ? parseFloat(form.weight.toString()) : null,
      dimensions: {
        length: dimensions.length || null,
        width: dimensions.width || null,
        height: dimensions.height || null,
      },
      images: allImages, // Array com URLs do Cloudinary
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
      // Atualizar produto existente
      result = await supabase
        .from("products")
        .update(productData)
        .eq("id", props.product!.id)
        .select();
    } else {
      // Criar novo produto com o ID gerado
      result = await supabase
        .from("products")
        .insert([{ ...productData, id: productId }])
        .select();
    }

    if (result.error) {
      throw result.error;
    }

    // Limpar arquivos selecionados
    selectedFiles.value = [];
    
    emit("save", result.data[0]);
    emit("close");
    
  } catch (error: any) {
    console.error("Erro ao salvar produto:", error);
    alert(`Erro ao salvar produto: ${error.message}`);
  } finally {
    loading.value = false;
    uploadingImages.value = false;
  }
};
</script>