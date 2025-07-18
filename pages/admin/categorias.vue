<template>
  <div>
    <AdminLayout>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Categorias</h1>
          <button
            @click="initializeCategories"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading ? 'Inicializando...' : 'Criar Categorias Base' }}
          </button>
        </div>

        <!-- Lista de Categorias -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="category in categories" :key="category.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                  <div class="text-sm text-gray-500">{{ category.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  /categoria/{{ category.slug }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="category.is_active 
                      ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                      : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'"
                  >
                    {{ category.is_active ? 'Ativa' : 'Inativa' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(category.created_at).toLocaleDateString('pt-BR') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensagens -->
        <div v-if="message" class="mt-4 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ message }}
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: ['admin-auth']
});

const categoriesStore = useCategoriesStore();
const { categories, loading } = storeToRefs(categoriesStore);

const message = ref('');
const messageType = ref('success');

const initializeCategories = async () => {
  try {
    const supabase = useSupabase();
    
    // Categorias base para criar
    const baseCategories = [
      {
        name: 'Airsoft',
        slug: 'airsoft',
        description: 'Equipamentos e acessórios para Airsoft',
        is_active: true
      },
      {
        name: 'Armas de Fogo',
        slug: 'armas-fogo',
        description: 'Armas de fogo registradas',
        is_active: true
      },
      {
        name: 'Armas de Pressão',
        slug: 'armas-pressao',
        description: 'Carabinas e pistolas de pressão',
        is_active: true
      },
      {
        name: 'Pesca',
        slug: 'pesca',
        description: 'Equipamentos para pesca esportiva',
        is_active: true
      },
      {
        name: 'Caça',
        slug: 'caca',
        description: 'Equipamentos para caça esportiva',
        is_active: true
      },
      {
        name: 'Vestuário',
        slug: 'vestuario',
        description: 'Roupas e acessórios outdoor',
        is_active: true
      }
    ];

    // Verificar se categorias já existem
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('slug');
    
    const existingSlugs = existingCategories?.map(c => c.slug) || [];
    const categoriesToCreate = baseCategories.filter(c => !existingSlugs.includes(c.slug));

    if (categoriesToCreate.length === 0) {
      message.value = 'Todas as categorias base já existem!';
      messageType.value = 'success';
      return;
    }

    // Criar categorias
    const { error } = await supabase
      .from('categories')
      .insert(categoriesToCreate);

    if (error) throw error;

    message.value = `${categoriesToCreate.length} categorias criadas com sucesso!`;
    messageType.value = 'success';
    
    // Recarregar categorias
    await categoriesStore.fetchCategories();
    
  } catch (err) {
    console.error('Erro ao criar categorias:', err);
    message.value = `Erro ao criar categorias: ${err.message}`;
    messageType.value = 'error';
  }
};

// Carregar categorias ao montar
onMounted(async () => {
  await categoriesStore.fetchCategories();
});

// SEO
useHead({
  title: 'Categorias - Admin | Atapera'
});
</script>