<template>
  <div>
    <AdminLayout>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Produtos de Exemplo</h1>
          <button
            @click="createExampleProducts"
            :disabled="loading"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {{ loading ? 'Criando...' : 'Criar Produtos de Exemplo' }}
          </button>
        </div>

        <!-- Mensagens -->
        <div v-if="message" class="mb-4 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ message }}
        </div>

        <!-- Lista de Produtos -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Produtos Existentes: {{ products.length }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="product in products.slice(0, 6)" :key="product.id" class="border rounded-lg p-4">
                <h3 class="font-medium">{{ product.name }}</h3>
                <p class="text-sm text-gray-600">{{ product.category_id }}</p>
                <p class="text-sm text-green-600">R$ {{ product.price.toFixed(2) }}</p>
                <p class="text-xs text-gray-500">{{ product.sku }}</p>
              </div>
            </div>
          </div>
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

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const { products, loading } = storeToRefs(productsStore);
const { categories } = storeToRefs(categoriesStore);

const message = ref('');
const messageType = ref('success');

const createExampleProducts = async () => {
  try {
    const supabase = useSupabase();
    
    // Primeiro buscar as categorias
    await categoriesStore.fetchCategories();
    
    if (categories.value.length === 0) {
      message.value = 'Você precisa criar as categorias primeiro!';
      messageType.value = 'error';
      return;
    }

    // Encontrar IDs das categorias
    const getCategoryId = (slug) => {
      const category = categories.value.find(c => c.slug === slug);
      return category?.id;
    };

    const exampleProducts = [
      // Airsoft
      {
        name: 'Rifle Airsoft AK47 CYMA',
        slug: 'rifle-airsoft-ak47-cyma',
        description: 'Rifle Airsoft elétrico AK47 da marca CYMA, ideal para jogos táticos.',
        short_description: 'Rifle Airsoft elétrico AK47 CYMA',
        sku: 'AIR-AK47-001',
        price: 899.90,
        category_id: getCategoryId('airsoft'),
        brand: 'CYMA',
        stock: 15,
        min_stock: 5,
        manage_stock: true,
        is_active: true,
        is_featured: true,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=500', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500']
      },
      {
        name: 'Pistola Airsoft 1911 WE',
        slug: 'pistola-airsoft-1911-we',
        description: 'Pistola Airsoft a gás 1911 da marca WE, réplica fiel ao original.',
        short_description: 'Pistola Airsoft a gás 1911 WE',
        sku: 'AIR-1911-001',
        price: 459.90,
        category_id: getCategoryId('airsoft'),
        brand: 'WE',
        stock: 8,
        min_stock: 3,
        manage_stock: true,
        is_active: true,
        is_featured: false,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=500']
      },
      // Pesca
      {
        name: 'Vara de Pesca Shimano FX 2.10m',
        slug: 'vara-pesca-shimano-fx-210m',
        description: 'Vara de pesca Shimano FX de 2.10m, ideal para pesca de água doce.',
        short_description: 'Vara de pesca Shimano FX 2.10m',
        sku: 'PES-VAR-001',
        price: 189.90,
        category_id: getCategoryId('pesca'),
        brand: 'Shimano',
        stock: 25,
        min_stock: 10,
        manage_stock: true,
        is_active: true,
        is_featured: true,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500']
      },
      {
        name: 'Molinete Daiwa Crossfire 2500',
        slug: 'molinete-daiwa-crossfire-2500',
        description: 'Molinete Daiwa Crossfire 2500, perfeito para pescarias leves.',
        short_description: 'Molinete Daiwa Crossfire 2500',
        sku: 'PES-MOL-001',
        price: 299.90,
        category_id: getCategoryId('pesca'),
        brand: 'Daiwa',
        stock: 12,
        min_stock: 5,
        manage_stock: true,
        is_active: true,
        is_featured: false,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500']
      },
      // Armas de Pressão
      {
        name: 'Carabina de Pressão CBC Nitro X 5.5mm',
        slug: 'carabina-pressao-cbc-nitro-x-55mm',
        description: 'Carabina de pressão CBC Nitro X calibre 5.5mm, alta precisão.',
        short_description: 'Carabina CBC Nitro X 5.5mm',
        sku: 'ARM-CAR-001',
        price: 1299.90,
        category_id: getCategoryId('armas-pressao'),
        brand: 'CBC',
        stock: 6,
        min_stock: 2,
        manage_stock: true,
        is_active: true,
        is_featured: true,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500']
      },
      // Vestuário
      {
        name: 'Camiseta Tática Invictus',
        slug: 'camiseta-tatica-invictus',
        description: 'Camiseta tática Invictus, tecido dry-fit, ideal para atividades outdoor.',
        short_description: 'Camiseta tática Invictus dry-fit',
        sku: 'VES-CAM-001',
        price: 89.90,
        category_id: getCategoryId('vestuario'),
        brand: 'Invictus',
        stock: 30,
        min_stock: 15,
        manage_stock: true,
        is_active: true,
        is_featured: false,
        stock_status: 'in_stock',
        status: 'active',
        requires_license: false,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500']
      }
    ];

    // Filtrar produtos que têm categoria válida
    const validProducts = exampleProducts.filter(p => p.category_id);

    if (validProducts.length === 0) {
      message.value = 'Nenhum produto pode ser criado sem categorias válidas!';
      messageType.value = 'error';
      return;
    }

    // Verificar produtos existentes
    const { data: existingProducts } = await supabase
      .from('products')
      .select('sku');
    
    const existingSkus = existingProducts?.map(p => p.sku) || [];
    const productsToCreate = validProducts.filter(p => !existingSkus.includes(p.sku));

    if (productsToCreate.length === 0) {
      message.value = 'Todos os produtos de exemplo já existem!';
      messageType.value = 'success';
      return;
    }

    // Criar produtos
    const { error } = await supabase
      .from('products')
      .insert(productsToCreate);

    if (error) throw error;

    message.value = `${productsToCreate.length} produtos criados com sucesso!`;
    messageType.value = 'success';
    
    // Recarregar produtos
    await productsStore.fetchProducts();
    
  } catch (err) {
    console.error('Erro ao criar produtos:', err);
    message.value = `Erro ao criar produtos: ${err.message}`;
    messageType.value = 'error';
  }
};

// Carregar produtos ao montar
onMounted(async () => {
  await productsStore.fetchProducts();
});

// SEO
useHead({
  title: 'Produtos de Exemplo - Admin | Atapera'
});
</script>