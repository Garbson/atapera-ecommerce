<!-- pages/admin/produtos/index.vue -->
<template>
  <AdminLayout>
    <div class="space-y-4 sm:space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Gerenciar Produtos</h1>
          <p class="text-sm sm:text-base text-gray-600">
            Adicione, edite e gerencie produtos da loja
          </p>
        </div>
        <div class="flex items-center gap-2 sm:gap-4">
          <button
            @click="exportProducts"
            class="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <button
            @click="showAddModal = true"
            class="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="hidden sm:inline">Adicionar Produto</span>
            <span class="sm:hidden">Adicionar</span>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >Buscar</label
            >
            <input
              v-model="filters.search"
              type="text"
              placeholder="Nome, SKU..."
              class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >Categoria</label
            >
            <select
              v-model="filters.category"
              class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="">Todas</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="filters.status"
              class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            >
              <option value="">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="out-of-stock">Sem estoque</option>
            </select>
          </div>
          <div class="sm:col-span-2 lg:col-span-1">
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
              >Ações</label
            >
            <button
              @click="clearFilters"
              class="w-full bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th class="w-12 px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Produto
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider hidden sm:table-cell">
                  SKU
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider hidden md:table-cell">
                  Categoria
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Preço
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Estoque
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading" class="bg-gray-50">
                <td colspan="8" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center justify-center gap-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <span class="text-sm font-medium text-gray-600">Carregando produtos...</span>
                  </div>
                </td>
              </tr>
              <tr
                v-for="product in products"
                :key="product.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    v-model="selectedProducts"
                    :value="product.id"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 h-16 w-16">
                      <img
                        :src="product.images?.[0] ? getProductImage(product.images[0], 'small') : '/placeholder-product.jpg'"
                        :alt="product.name"
                        class="h-16 w-16 rounded-lg object-cover shadow-sm border border-gray-200"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-semibold text-gray-900 truncate max-w-xs">
                        {{ product.name }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1 sm:hidden">
                        SKU: {{ product.sku }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1 md:hidden">
                        {{ getCategoryName(product) }}
                      </p>
                      <div class="flex items-center gap-2 mt-2 hidden sm:flex">
                        <button
                          @click="showDescriptionDialog(product)"
                          class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                          title="Ver descrição"
                        >
                          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Descrição
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 hidden sm:table-cell">
                  {{ product.sku }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                  >
                    {{ getCategoryName(product) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {{ formatCurrency(product.price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    :class="getStockClass(product.stock || 0)"
                  >
                    <span class="w-2 h-2 rounded-full mr-2" :class="getStockDotClass(product.stock || 0)"></span>
                    {{ product.stock || 0 }} un.
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    :class="getStatusClass(product)"
                  >
                    <span class="w-2 h-2 rounded-full mr-2" :class="getStatusDotClass(product)"></span>
                    {{ getStatusLabel(product) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button
                      @click="editProduct(product)"
                      class="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                      title="Editar produto"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="toggleProductStatus(product)"
                      class="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150"
                      :class="product.is_active ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' : 'text-green-600 bg-green-50 hover:bg-green-100'"
                      :title="product.is_active ? 'Desativar produto' : 'Ativar produto'"
                    >
                      <svg
                        v-if="product.is_active"
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteProduct(product)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Excluir"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
        >
          <div class="text-sm text-gray-600">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a
            {{ Math.min(currentPage * itemsPerPage, totalProducts) }} de
            {{ totalProducts }} produtos
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span class="px-3 py-2 text-sm bg-red-600 text-white rounded-lg">{{
              currentPage
            }}</span>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div
        v-if="selectedProducts.length > 0"
        class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center gap-4"
      >
        <span class="text-sm text-gray-600"
          >{{ selectedProducts.length }} produto(s) selecionado(s)</span
        >
        <div class="flex items-center gap-2">
          <button
            @click="bulkUpdateStatus(true)"
            class="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Ativar
          </button>
          <button
            @click="bulkUpdateStatus(false)"
            class="px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            Desativar
          </button>
          <button
            @click="bulkDelete"
            class="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Excluir
          </button>
          <button
            @click="selectedProducts = []"
            class="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Add/Edit Product -->
    <ProductModal
      v-if="showAddModal || editingProduct"
      :product="editingProduct"
      @close="closeModal"
      @save="saveProduct"
    />

    <!-- Description Dialog -->
    <div
      v-if="showDescriptionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeDescriptionDialog"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Descrição do Produto</h3>
          <button
            @click="closeDescriptionDialog"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto max-h-96">
          <h4 class="font-semibold text-gray-900 mb-2">{{ selectedProductForDescription?.name }}</h4>
          <div class="space-y-3 text-sm text-gray-700">
            <div v-if="selectedProductForDescription?.short_description">
              <h5 class="font-medium text-gray-900">Descrição Curta:</h5>
              <p>{{ selectedProductForDescription.short_description }}</p>
            </div>
            <div v-if="selectedProductForDescription?.description">
              <h5 class="font-medium text-gray-900">Descrição Completa:</h5>
              <div v-html="selectedProductForDescription.description" class="prose prose-sm max-w-none"></div>
            </div>
            <div v-if="!selectedProductForDescription?.short_description && !selectedProductForDescription?.description">
              <p class="text-gray-500 italic">Nenhuma descrição disponível para este produto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
// Middleware
definePageMeta({
  middleware: "admin-auth",
});

// Composables
const supabase = useSupabase();
const { getProductImage } = useCloudinary();

// Estados
const products = ref([]);
const categories = ref([]);
const loading = ref(false);

const filters = ref({
  search: "",
  category: "",
  status: "",
});

const selectedProducts = ref([]);
const selectAll = ref(false);
const showAddModal = ref(false);
const editingProduct = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showDescriptionModal = ref(false);
const selectedProductForDescription = ref(null);

// Computed
const totalProducts = computed(() => products.value.length);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / itemsPerPage.value)
);

// Funções do Supabase
const fetchProducts = async () => {
  loading.value = true;
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters.value.search) {
      query = query.or(`name.ilike.%${filters.value.search}%,sku.ilike.%${filters.value.search}%,description.ilike.%${filters.value.search}%`);
    }

    if (filters.value.category) {
      query = query.eq('category_id', filters.value.category);
    }

    if (filters.value.status) {
      if (filters.value.status === 'out-of-stock') {
        query = query.eq('stock', 0);
      } else {
        query = query.eq('is_active', filters.value.status === 'active');
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    products.value = data || [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    alert('Erro ao carregar produtos');
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (error) throw error;

    categories.value = data || [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getCategoryName = (product: any) => {
  return product.categories?.name || 'Sem categoria';
};

const getStockClass = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-800";
  if (stock <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const getStockDotClass = (stock: number) => {
  if (stock === 0) return "bg-red-500";
  if (stock <= 5) return "bg-yellow-500";
  return "bg-green-500";
};

const getStatusClass = (product: any) => {
  if (product.stock === 0) return "bg-red-100 text-red-800";
  if (!product.is_active) return "bg-gray-100 text-gray-800";
  return "bg-green-100 text-green-800";
};

const getStatusDotClass = (product: any) => {
  if (product.stock === 0) return "bg-red-500";
  if (!product.is_active) return "bg-gray-500";
  return "bg-green-500";
};

const getStatusLabel = (product: any) => {
  if (product.stock === 0) return "Sem Estoque";
  if (!product.is_active) return "Inativo";
  return "Ativo";
};

const clearFilters = () => {
  filters.value = {
    search: "",
    category: "",
    status: "",
  };
  fetchProducts();
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedProducts.value = products.value.map((p) => p.id);
  } else {
    selectedProducts.value = [];
  }
};

const editProduct = (product: any) => {
  editingProduct.value = { ...product };
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingProduct.value = null;
};

const showDescriptionDialog = (product: any) => {
  selectedProductForDescription.value = product;
  showDescriptionModal.value = true;
};

const closeDescriptionDialog = () => {
  showDescriptionModal.value = false;
  selectedProductForDescription.value = null;
};

const saveProduct = async (productData: any) => {
  await fetchProducts(); // Recarregar lista após salvar
  closeModal();
};

const toggleProductStatus = async (product: any) => {
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id);

    if (error) throw error;

    await fetchProducts(); // Recarregar lista
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    alert('Erro ao alterar status do produto');
  }
};

const deleteProduct = async (product: any) => {
  if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      await fetchProducts(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto');
    }
  }
};

const bulkUpdateStatus = async (isActive: boolean) => {
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: isActive })
      .in('id', selectedProducts.value);

    if (error) throw error;

    await fetchProducts();
    selectedProducts.value = [];
  } catch (error) {
    console.error('Erro ao atualizar produtos:', error);
    alert('Erro ao atualizar produtos');
  }
};

const bulkDelete = async () => {
  if (
    confirm(
      `Tem certeza que deseja excluir ${selectedProducts.value.length} produto(s)?`
    )
  ) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .in('id', selectedProducts.value);

      if (error) throw error;

      await fetchProducts();
      selectedProducts.value = [];
    } catch (error) {
      console.error('Erro ao excluir produtos:', error);
      alert('Erro ao excluir produtos');
    }
  }
};

const exportProducts = () => {
  // Implementar exportação CSV/Excel
  const csv = products.value
    .map(
      (p) =>
        `${p.name},${p.sku},${p.category},${p.price},${p.stock},${p.status}`
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "produtos.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

// Watchers
watch(
  selectedProducts,
  (newVal) => {
    selectAll.value =
      newVal.length === products.value.length && newVal.length > 0;
  },
  { deep: true }
);

// Watch filtros para recarregar produtos automaticamente
watch(
  () => filters.value,
  () => {
    currentPage.value = 1; // Reset página ao filtrar
    fetchProducts();
  },
  { deep: true }
);

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchProducts(),
    fetchCategories()
  ]);
});
</script>
