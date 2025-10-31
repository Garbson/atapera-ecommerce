<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Gerenciar Categorias</h1>
          <p class="text-gray-600">
            Organize e gerencie as categorias de produtos da loja
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="initializeCategories"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <svg
              v-if="loading"
              class="animate-spin w-4 h-4"
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
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
              />
            </svg>
            {{ loading ? "Inicializando..." : "Criar Categorias Base" }}
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
            Nova Categoria
          </button>
        </div>
      </div>

      <!-- Categories Grid -->
      <div
        v-if="loading && categories.length === 0"
        class="flex justify-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"
        ></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Category Header -->
          <div class="p-6 pb-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-1">
                  {{ category.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-2">
                  {{ category.description || "Sem descrição" }}
                </p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded"
                    >/categoria/{{ category.slug }}</span
                  >
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-1 ml-4">
                <button
                  @click="editCategory(category)"
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
                  @click="toggleCategoryStatus(category)"
                  class="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                  :title="category.is_active ? 'Desativar' : 'Ativar'"
                >
                  <svg
                    v-if="category.is_active"
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
                  @click="deleteCategory(category)"
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
            </div>
          </div>

          <!-- Category Footer -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm">
                <span
                  :class="
                    category.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="inline-block px-2 py-1 text-xs rounded-full"
                >
                  {{ category.is_active ? "Ativa" : "Inativa" }}
                </span>
                <span class="text-gray-500">
                  <span class="font-medium text-gray-700">{{
                    category.product_count || 0
                  }}</span>
                  produtos
                </span>
              </div>
              <span class="text-xs text-gray-500">
                {{ new Date(category.created_at).toLocaleDateString("pt-BR") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="categories.length === 0"
          class="col-span-full text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300"
        >
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Nenhuma categoria encontrada
          </h3>
          <p class="text-gray-600 mb-4">
            Comece criando sua primeira categoria de produtos
          </p>
          <button
            @click="showAddModal = true"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Criar Categoria
          </button>
        </div>
      </div>

      <!-- Mensagens -->
      <div
        v-if="message"
        class="mt-4 p-4 rounded-lg"
        :class="
          messageType === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        "
      >
        {{ message }}
      </div>
    </div>

    <!-- Modal Add/Edit Category -->
    <CategoryModal
      v-if="showAddModal || editingCategory"
      :category="editingCategory"
      @close="closeModal"
      @save="saveCategory"
    />
  </AdminLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["admin-auth"],
});

// Composables
const supabase = useSupabase();
const categoriesStore = useCategoriesStore();
const { categories, loading } = storeToRefs(categoriesStore);

// Estados locais
const message = ref("");
const messageType = ref("success");
const showAddModal = ref(false);
const editingCategory = ref(null);

// Métodos CRUD
const editCategory = (category) => {
  editingCategory.value = { ...category };
  showAddModal.value = false;
};

const closeModal = () => {
  showAddModal.value = false;
  editingCategory.value = null;
};

const saveCategory = async (categoryData) => {
  await categoriesStore.fetchCategories(true); // Recarregar lista após salvar com contagem
  closeModal();
};

const toggleCategoryStatus = async (category) => {
  try {
    const { error } = await supabase
      .from("categories")
      .update({ is_active: !category.is_active })
      .eq("id", category.id);

    if (error) throw error;

    await categoriesStore.fetchCategories(true); // Recarregar lista com contagem
    message.value = `Categoria ${
      category.is_active ? "desativada" : "ativada"
    } com sucesso!`;
    messageType.value = "success";
  } catch (error) {
    console.error("Erro ao alterar status:", error);
    message.value = "Erro ao alterar status da categoria";
    messageType.value = "error";
  }
};

const deleteCategory = async (category) => {
  if (
    confirm(
      `Tem certeza que deseja excluir a categoria "${category.name}"? Esta ação não pode ser desfeita.`
    )
  ) {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", category.id);

      if (error) throw error;

      await categoriesStore.fetchCategories(true); // Recarregar lista com contagem
      message.value = "Categoria excluída com sucesso!";
      messageType.value = "success";
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      message.value =
        "Erro ao excluir categoria. Verifique se não há produtos vinculados.";
      messageType.value = "error";
    }
  }
};

const initializeCategories = async () => {
  try {
    // Categorias base para criar
    const baseCategories = [
      {
        name: "Airsoft",
        slug: "airsoft",
        description: "Equipamentos e acessórios para Airsoft",
        is_active: true,
      },
      {
        name: "Armas de Fogo",
        slug: "armas-fogo",
        description: "Armas de fogo registradas",
        is_active: true,
      },
      {
        name: "Armas de Pressão",
        slug: "armas-pressao",
        description: "Carabinas e pistolas de pressão",
        is_active: true,
      },
      {
        name: "Pesca",
        slug: "pesca",
        description: "Equipamentos para pesca esportiva",
        is_active: true,
      },
      {
        name: "Caça",
        slug: "caca",
        description: "Equipamentos para caça esportiva",
        is_active: true,
      },
      {
        name: "Vestuário",
        slug: "vestuario",
        description: "Roupas e acessórios outdoor",
        is_active: true,
      },
      {
        name: "Camping",
        slug: "camping",
        description: "Equipamentos para camping e aventuras outdoor",
        is_active: true,
      },
      {
        name: "Motores",
        slug: "motores",
        description: "Equipamentos para motores e acessórios automotivos",
        is_active: true,
      },
    ];

    // Verificar se categorias já existem
    const { data: existingCategories } = await supabase
      .from("categories")
      .select("slug");

    const existingSlugs = existingCategories?.map((c) => c.slug) || [];
    const categoriesToCreate = baseCategories.filter(
      (c) => !existingSlugs.includes(c.slug)
    );

    if (categoriesToCreate.length === 0) {
      message.value = "Todas as categorias base já existem!";
      messageType.value = "success";
      return;
    }

    // Criar categorias
    const { error } = await supabase
      .from("categories")
      .insert(categoriesToCreate);

    if (error) throw error;

    message.value = `${categoriesToCreate.length} categorias criadas com sucesso!`;
    messageType.value = "success";

    // Recarregar categorias
    await categoriesStore.fetchCategories(true);
  } catch (err) {
    console.error("Erro ao criar categorias:", err);
    message.value = `Erro ao criar categorias: ${err.message}`;
    messageType.value = "error";
  }
};

// Carregar categorias ao montar
onMounted(async () => {
  await categoriesStore.fetchCategories(true);
});

// SEO
useHead({
  title: "Categorias - Admin | Atapera",
});
</script>
