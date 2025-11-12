<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto m-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEditing ? 'Editar Categoria' : 'Nova Categoria' }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Nome da Categoria -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nome da Categoria *
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ex: Eletrônicos, Acessórios..."
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL)
          </label>
          <input
            v-model="form.slug"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="slug-da-categoria"
          />
          <p class="text-xs text-gray-500 mt-1">
            Deixe em branco para gerar automaticamente
          </p>
        </div>

        <!-- Categoria Pai (para subcategorias) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Categoria Pai
          </label>
          <select
            v-model="form.parent_id"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Categoria Principal (sem pai)</option>
            <option
              v-for="category in parentCategories"
              :key="category.id"
              :value="category.id"
              :disabled="category.id === form.id"
            >
              {{ category.name }}
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-1">
            Selecione uma categoria pai para criar uma subcategoria
          </p>
        </div>

        <!-- Descrição -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Descrição da categoria..."
          ></textarea>
        </div>

        <!-- URL da Imagem -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem
          </label>
          <input
            v-model="form.image_url"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <!-- Ícone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ícone (Emoji ou classe CSS)
          </label>
          <input
            v-model="form.icon"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="🛍️ ou fa-shopping"
          />
        </div>

        <!-- Meta Tags -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Título SEO
            </label>
            <input
              v-model="form.meta_title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Título para SEO"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ordem de Exibição
            </label>
            <input
              v-model.number="form.sort_order"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <!-- Meta Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descrição SEO
          </label>
          <textarea
            v-model="form.meta_description"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Descrição para motores de busca..."
          ></textarea>
        </div>

        <!-- Status Ativo -->
        <div class="flex items-center">
          <input
            v-model="form.is_active"
            type="checkbox"
            id="is_active"
            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label for="is_active" class="ml-2 block text-sm text-gray-900">
            Categoria ativa (visível no site)
          </label>
        </div>

        <!-- Erros -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Botões -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Salvando...
            </span>
            <span v-else>
              {{ isEditing ? 'Salvar Alterações' : 'Criar Categoria' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon?: string;
  is_active: boolean;
  sort_order?: number;
  parent_id?: string;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

// Props
interface Props {
  category?: Category | null;
}

const props = withDefaults(defineProps<Props>(), {
  category: null
});

// Emits
const emit = defineEmits<{
  close: []
  save: [category: Category]
}>();

// Store
const categoriesStore = useCategoriesStore();

// Estados
const loading = ref(false);
const error = ref('');

// Computed
const isEditing = computed(() => !!props.category?.id);
const parentCategories = computed(() => categoriesStore.parentCategories);

// Form
const form = reactive<Category>({
  name: '',
  slug: '',
  description: '',
  image_url: '',
  icon: '',
  is_active: true,
  sort_order: 0,
  parent_id: '',
  meta_title: '',
  meta_description: ''
});

// Watchers
watch(() => props.category, (category) => {
  if (category) {
    Object.assign(form, {
      ...category,
      parent_id: category.parent_id || ''
    });
  }
}, { immediate: true });

// Gerar slug automaticamente
watch(() => form.name, (newName) => {
  if (!isEditing.value && newName && !form.slug) {
    form.slug = generateSlug(newName);
  }
});

// Métodos
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-"); // Remove hífens duplicados
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = '';

    // Validações
    if (!form.name.trim()) {
      throw new Error('Nome da categoria é obrigatório');
    }

    // Gerar slug se não fornecido
    if (!form.slug) {
      form.slug = generateSlug(form.name);
    }

    // Preparar dados
    const categoryData = {
      ...form,
      parent_id: form.parent_id || null,
      sort_order: form.sort_order || 0
    };

    let result;

    if (isEditing.value) {
      // Editar categoria existente
      result = await categoriesStore.updateCategory(form.id!, categoryData);
    } else {
      // Criar nova categoria
      result = await categoriesStore.createCategory(categoryData);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    emit('save', result.data);
    emit('close');
  } catch (err: any) {
    error.value = err.message || 'Erro ao salvar categoria';
  } finally {
    loading.value = false;
  }
};

// Carregar categorias pai ao montar
onMounted(() => {
  if (parentCategories.value.length === 0) {
    categoriesStore.fetchCategories();
  }
});
</script>