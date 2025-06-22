<!-- components/ProductModal.vue -->
<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto" @click="$emit('close')">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Background overlay -->
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        ></div>

        <!-- Modal panel -->
        <div
          class="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ isEditing ? "Editar Produto" : "Adicionar Novo Produto" }}
            </h2>
            <button
              @click="$emit('close')"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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

          <!-- Form -->
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Basic Info -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Informações Básicas
                  </h3>

                  <div class="space-y-4">
                    <!-- Product Name -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nome do Produto *
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ex: Pistola Glock G17 Gen5"
                      />
                    </div>

                    <!-- SKU -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        SKU *
                      </label>
                      <input
                        v-model="form.sku"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                        placeholder="Ex: GLK-G17-001"
                        @input="form.sku = form.sku.toUpperCase()"
                      />
                    </div>

                    <!-- Category -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Categoria *
                      </label>
                      <select
                        v-model="form.category"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="armas-fogo">Armas de Fogo</option>
                        <option value="armas-pressao">Armas de Pressão</option>
                        <option value="pesca">Equipamentos de Pesca</option>
                        <option value="airsoft">Airsoft</option>
                        <option value="caca">Caça</option>
                        <option value="vestuario">Vestuário Outdoor</option>
                      </select>
                    </div>

                    <!-- Description -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Descrição *
                      </label>
                      <textarea
                        v-model="form.description"
                        required
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Descreva o produto detalhadamente..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Pricing -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Preços e Estoque
                  </h3>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Price -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preço (R$) *
                      </label>
                      <input
                        v-model.number="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0,00"
                      />
                    </div>

                    <!-- Compare Price -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preço Anterior (R$)
                      </label>
                      <input
                        v-model.number="form.comparePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0,00"
                      />
                    </div>

                    <!-- Stock -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Estoque *
                      </label>
                      <input
                        v-model.number="form.stock"
                        type="number"
                        min="0"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <!-- Weight -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Peso (kg)
                      </label>
                      <input
                        v-model.number="form.weight"
                        type="number"
                        step="0.01"
                        min="0"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- Images -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Imagens do Produto
                  </h3>

                  <!-- Image Upload -->
                  <div class="space-y-4">
                    <div
                      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors"
                    >
                      <input
                        ref="imageInput"
                        type="file"
                        multiple
                        accept="image/*"
                        class="hidden"
                        @change="handleImageUpload"
                      />
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <button
                        type="button"
                        @click="$refs.imageInput.click()"
                        class="text-red-600 hover:text-red-700 font-medium"
                      >
                        Clique para fazer upload
                      </button>
                      <p class="text-sm text-gray-500 mt-2">
                        PNG, JPG, GIF até 10MB
                      </p>
                    </div>

                    <!-- Image Preview -->
                    <div v-if="imagePreview" class="grid grid-cols-2 gap-4">
                      <div class="relative">
                        <img
                          :src="imagePreview"
                          alt="Preview"
                          class="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          @click="removeImage"
                          class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Product Settings -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    Configurações
                  </h3>

                  <div class="space-y-4">
                    <!-- Status -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Status</label
                      >
                      <select
                        v-model="form.status"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                        <option value="draft">Rascunho</option>
                      </select>
                    </div>

                    <!-- Featured -->
                    <div class="flex items-center">
                      <input
                        v-model="form.featured"
                        type="checkbox"
                        class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label class="ml-3 text-sm font-medium text-gray-700">
                        Produto em destaque
                      </label>
                    </div>

                    <!-- Requires License -->
                    <div class="flex items-center">
                      <input
                        v-model="form.requiresLicense"
                        type="checkbox"
                        class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label class="ml-3 text-sm font-medium text-gray-700">
                        Requer licença/autorização
                      </label>
                    </div>

                    <!-- Track Stock -->
                    <div class="flex items-center">
                      <input
                        v-model="form.trackStock"
                        type="checkbox"
                        class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label class="ml-3 text-sm font-medium text-gray-700">
                        Controlar estoque
                      </label>
                    </div>
                  </div>
                </div>

                <!-- SEO -->
                <div class="bg-gray-50 rounded-lg p-6">
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">SEO</h3>

                  <div class="space-y-4">
                    <!-- Meta Title -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Título SEO
                      </label>
                      <input
                        v-model="form.metaTitle"
                        type="text"
                        maxlength="60"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Título para mecanismos de busca"
                      />
                      <p class="text-xs text-gray-500 mt-1">
                        {{ (form.metaTitle || "").length }}/60 caracteres
                      </p>
                    </div>

                    <!-- Meta Description -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Descrição SEO
                      </label>
                      <textarea
                        v-model="form.metaDescription"
                        maxlength="160"
                        rows="3"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Descrição para mecanismos de busca"
                      ></textarea>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ (form.metaDescription || "").length }}/160 caracteres
                      </p>
                    </div>

                    <!-- Tags -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tags (separadas por vírgula)
                      </label>
                      <input
                        v-model="form.tags"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Ex: glock, pistola, arma, fogo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div
              class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200"
            >
              <div class="flex items-center gap-4">
                <button
                  type="button"
                  @click="saveDraft"
                  class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Salvar como Rascunho
                </button>
              </div>

              <div class="flex items-center gap-4">
                <button
                  type="button"
                  @click="$emit('close')"
                  class="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <svg
                    v-if="loading"
                    class="w-5 h-5 animate-spin"
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
                  {{
                    loading
                      ? "Salvando..."
                      : isEditing
                      ? "Atualizar Produto"
                      : "Criar Produto"
                  }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  product?: any;
}

const props = defineProps<Props>();
const emit = defineEmits(["close", "save"]);

// Estados
const loading = ref(false);
const imagePreview = ref("");

const form = ref({
  name: "",
  sku: "",
  category: "",
  description: "",
  price: 0,
  comparePrice: 0,
  stock: 0,
  weight: 0,
  status: "active",
  featured: false,
  requiresLicense: false,
  trackStock: true,
  metaTitle: "",
  metaDescription: "",
  tags: "",
  image: "",
});

// Computed
const isEditing = computed(() => !!props.product);

// Carregar dados do produto se estiver editando
watch(
  () => props.product,
  (product) => {
    if (product) {
      form.value = { ...product };
      if (product.image) {
        imagePreview.value = product.image;
      }
    }
  },
  { immediate: true }
);

// Métodos
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      alert("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
      form.value.image = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = "";
  form.value.image = "";
};

const generateSKU = () => {
  if (!form.value.name || !form.value.category) return;

  const categoryPrefix = {
    "armas-fogo": "AF",
    "armas-pressao": "AP",
    pesca: "PES",
    airsoft: "AIR",
    caca: "CAC",
    vestuario: "VES",
  };

  const prefix = categoryPrefix[form.value.category] || "PROD";
  const nameShort = form.value.name.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-3);

  form.value.sku = `${prefix}-${nameShort}-${timestamp}`;
};

// Auto-gerar SKU quando nome e categoria mudam
watch([() => form.value.name, () => form.value.category], () => {
  if (
    !isEditing.value &&
    form.value.name &&
    form.value.category &&
    !form.value.sku
  ) {
    generateSKU();
  }
});

// Auto-preencher meta title
watch(
  () => form.value.name,
  (newName) => {
    if (!form.value.metaTitle && newName) {
      form.value.metaTitle = newName;
    }
  }
);

// Auto-preencher meta description
watch(
  () => form.value.description,
  (newDesc) => {
    if (!form.value.metaDescription && newDesc) {
      form.value.metaDescription = newDesc.substring(0, 160);
    }
  }
);

const validateForm = () => {
  const required = ["name", "sku", "category", "description"];
  const missing = required.filter((field) => !form.value[field]);

  if (missing.length > 0) {
    alert(`Campos obrigatórios: ${missing.join(", ")}`);
    return false;
  }

  if (form.value.price <= 0) {
    alert("Preço deve ser maior que zero");
    return false;
  }

  if (form.value.stock < 0) {
    alert("Estoque não pode ser negativo");
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Em produção, aqui faria a chamada para o Supabase
    // const { data, error } = await supabase.from('products').insert(form.value);

    emit("save", form.value);
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    alert("Erro ao salvar produto. Tente novamente.");
  } finally {
    loading.value = false;
  }
};

const saveDraft = async () => {
  form.value.status = "draft";
  await handleSubmit();
};

// Fechar modal com ESC
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      emit("close");
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
