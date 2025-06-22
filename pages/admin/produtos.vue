<!-- pages/admin/produtos/index.vue -->
<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gerenciar Produtos</h1>
          <p class="text-gray-600">
            Adicione, edite e gerencie produtos da loja
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="exportProducts"
            class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar
          </button>
          <button
            @click="showAddModal = true"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Adicionar Produto
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Buscar</label
            >
            <input
              v-model="filters.search"
              type="text"
              placeholder="Nome, SKU ou descrição..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Categoria</label
            >
            <select
              v-model="filters.category"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              <option value="armas-fogo">Armas de Fogo</option>
              <option value="armas-pressao">Armas de Pressão</option>
              <option value="pesca">Pesca</option>
              <option value="airsoft">Airsoft</option>
              <option value="caca">Caça</option>
              <option value="vestuario">Vestuário</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="out-of-stock">Sem estoque</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Ações</label
            >
            <button
              @click="clearFilters"
              class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="rounded"
                  />
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Produto
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  SKU
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Categoria
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Preço
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Estoque
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Status
                </th>
                <th class="text-left py-4 px-6 font-medium text-gray-600">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-4 px-6">
                  <input
                    type="checkbox"
                    v-model="selectedProducts"
                    :value="product.id"
                    class="rounded"
                  />
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-4">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p class="font-medium text-gray-800">
                        {{ product.name }}
                      </p>
                      <p class="text-sm text-gray-600 line-clamp-1">
                        {{ product.description }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 font-mono text-sm text-gray-600">
                  {{ product.sku }}
                </td>
                <td class="py-4 px-6">
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ getCategoryName(product.category) }}
                  </span>
                </td>
                <td class="py-4 px-6 font-semibold text-gray-800">
                  {{ formatCurrency(product.price) }}
                </td>
                <td class="py-4 px-6">
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-full"
                    :class="getStockClass(product.stock)"
                  >
                    {{ product.stock }} un.
                  </span>
                </td>
                <td class="py-4 px-6">
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(product.status)"
                  >
                    {{ getStatusLabel(product.status) }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2">
                    <button
                      @click="editProduct(product)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Editar"
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
                      class="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                      :title="
                        product.status === 'active' ? 'Desativar' : 'Ativar'
                      "
                    >
                      <svg
                        v-if="product.status === 'active'"
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
                        class="w-4 h-4"
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
            @click="bulkUpdateStatus('active')"
            class="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Ativar
          </button>
          <button
            @click="bulkUpdateStatus('inactive')"
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
  </AdminLayout>
</template>

<script setup lang="ts">
// Middleware
definePageMeta({
  middleware: "admin-auth",
});

// Estados
const products = ref([
  {
    id: 1,
    name: "Pistola Glock G17 Gen5",
    description:
      "Pistola semi-automática calibre 9mm com sistema de segurança avançado",
    sku: "GLK-G17-001",
    category: "armas-fogo",
    price: 1500.0,
    stock: 8,
    status: "active",
    image: "https://via.placeholder.com/60x60/374151/ffffff?text=G17",
  },
  {
    id: 2,
    name: "Vara Telescópica Shimano 3.6m",
    description: "Vara de pescar telescópica ideal para pesca em rios e lagos",
    sku: "SHI-VAR-360",
    category: "pesca",
    price: 189.9,
    stock: 23,
    status: "active",
    image: "https://via.placeholder.com/60x60/059669/ffffff?text=VAR",
  },
  {
    id: 3,
    name: "Carabina de Pressão CBC B12-6",
    description: "Carabina de pressão calibre 4.5mm com mira telescópica",
    sku: "CBC-B12-001",
    category: "armas-pressao",
    price: 750.0,
    stock: 0,
    status: "out-of-stock",
    image: "https://via.placeholder.com/60x60/2563eb/ffffff?text=CBC",
  },
]);

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

// Computed
const filteredProducts = computed(() => {
  let filtered = products.value;

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (filters.value.category) {
    filtered = filtered.filter((p) => p.category === filters.value.category);
  }

  if (filters.value.status) {
    filtered = filtered.filter((p) => p.status === filters.value.status);
  }

  return filtered;
});

const totalProducts = computed(() => filteredProducts.value.length);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / itemsPerPage.value)
);

// Métodos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getCategoryName = (category: string) => {
  const categories = {
    "armas-fogo": "Armas de Fogo",
    "armas-pressao": "Armas de Pressão",
    pesca: "Pesca",
    airsoft: "Airsoft",
    caca: "Caça",
    vestuario: "Vestuário",
  };
  return categories[category] || category;
};

const getStockClass = (stock: number) => {
  if (stock === 0) return "bg-red-100 text-red-800";
  if (stock <= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const getStatusClass = (status: string) => {
  const classes = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    "out-of-stock": "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status: string) => {
  const labels = {
    active: "Ativo",
    inactive: "Inativo",
    "out-of-stock": "Sem Estoque",
  };
  return labels[status] || status;
};

const clearFilters = () => {
  filters.value = {
    search: "",
    category: "",
    status: "",
  };
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedProducts.value = filteredProducts.value.map((p) => p.id);
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

const saveProduct = (productData: any) => {
  if (editingProduct.value) {
    // Atualizar produto existente
    const index = products.value.findIndex(
      (p) => p.id === editingProduct.value.id
    );
    if (index !== -1) {
      products.value[index] = { ...productData, id: editingProduct.value.id };
    }
  } else {
    // Adicionar novo produto
    const newProduct = {
      ...productData,
      id: Date.now(), // ID temporário
    };
    products.value.push(newProduct);
  }

  closeModal();
};

const toggleProductStatus = (product: any) => {
  const newStatus = product.status === "active" ? "inactive" : "active";
  product.status = newStatus;
};

const deleteProduct = (product: any) => {
  if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
    const index = products.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }
};

const bulkUpdateStatus = (status: string) => {
  selectedProducts.value = [];
};

const bulkDelete = () => {
  if (
    confirm(
      `Tem certeza que deseja excluir ${selectedProducts.value.length} produto(s)?`
    )
  ) {
    products.value = products.value.filter(
      (p) => !selectedProducts.value.includes(p.id)
    );
    selectedProducts.value = [];
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

// Watch para atualizar selectAll
watch(
  selectedProducts,
  (newVal) => {
    selectAll.value =
      newVal.length === filteredProducts.value.length && newVal.length > 0;
  },
  { deep: true }
);
</script>
