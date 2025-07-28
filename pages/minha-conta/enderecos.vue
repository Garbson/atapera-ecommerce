<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Meus Endereços</h2>
      <button
        @click="openAddressModal()"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Adicionar Endereço
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 2" :key="i" class="border rounded-lg p-4 animate-pulse">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Lista de Endereços -->
    <div
      v-else-if="addresses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div
        v-for="address in addresses"
        :key="address.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
      >
        <!-- Badge de Endereço Principal -->
        <div
          v-if="address.is_default"
          class="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
        >
          Principal
        </div>

        <div class="pr-8">
          <h3 class="font-medium text-gray-900 mb-2">
            {{ address.label || "Endereço" }}
          </h3>

          <div class="text-sm text-gray-600 space-y-1">
            <p>{{ address.street }}, {{ address.number }}</p>
            <p v-if="address.complement">{{ address.complement }}</p>
            <p>{{ address.neighborhood }}</p>
            <p>{{ address.city }} - {{ address.state }}</p>
            <p>CEP: {{ formatCEP(address.zip_code) }}</p>
          </div>
        </div>

        <!-- Ações do Endereço -->
        <div
          class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200"
        >
          <div class="flex gap-2">
            <button
              @click="openAddressModal(address)"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Editar
            </button>

            <button
              v-if="!address.is_default"
              @click="setAsDefault(address.id)"
              class="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Tornar Principal
            </button>
          </div>

          <button
            v-if="!address.is_default"
            @click="deleteAddress(address.id)"
            class="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Estado Vazio -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg
          class="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Nenhum endereço cadastrado
      </h3>
      <p class="text-gray-600 mb-6">
        Adicione um endereço para facilitar suas compras futuras.
      </p>
      <button
        @click="openAddressModal()"
        class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
      >
        Adicionar Primeiro Endereço
      </button>
    </div>

    <!-- Modal de Endereço -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transition-all duration-300 transform scale-100"
      >
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">
                {{ editingAddress ? "Editar Endereço" : "Novo Endereço" }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ editingAddress ? "Modifique as informações do endereço" : "Adicione um novo endereço de entrega" }}
              </p>
            </div>
          </div>
          <button 
            @click="closeModal" 
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveAddress" class="space-y-5">
          <!-- Label do Endereço -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Nome do Endereço
            </label>
            <input
              v-model="addressForm.label"
              type="text"
              placeholder="Ex: Casa, Trabalho, etc."
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>

          <!-- CEP -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              CEP *
            </label>
            <input
              v-model="addressForm.zip_code"
              type="text"
              placeholder="00000-000"
              @blur="fetchAddressByCEP"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <!-- Rua -->
          <div>
            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Endereço *
            </label>
            <input
              v-model="addressForm.street"
              type="text"
              placeholder="Nome da rua"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <!-- Número e Complemento -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Número *
              </label>
              <input
                v-model="addressForm.number"
                type="text"
                placeholder="123"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Complemento
              </label>
              <input
                v-model="addressForm.complement"
                type="text"
                placeholder="Apto, Bloco, etc."
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <!-- Bairro -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Bairro *
            </label>
            <input
              v-model="addressForm.neighborhood"
              type="text"
              placeholder="Nome do bairro"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <!-- Cidade e Estado -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Cidade *
              </label>
              <input
                v-model="addressForm.city"
                type="text"
                placeholder="Nome da cidade"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                v-model="addressForm.state"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                required
              >
                <option value="">Selecione</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>
          </div>

          <!-- Checkbox Endereço Principal -->
          <div class="bg-gray-50 rounded-lg p-4">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="addressForm.is_default"
                type="checkbox"
                class="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500 focus:ring-2"
              />
              <div>
                <span class="text-sm font-medium text-gray-900">
                  Definir como endereço principal
                </span>
                <p class="text-xs text-gray-500 mt-1">
                  Este endereço será usado como padrão em suas compras futuras
                </p>
              </div>
            </label>
          </div>

          <!-- Botões -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ saving ? "Salvando..." : editingAddress ? "Atualizar Endereço" : "Salvar Endereço" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Estados
const loading = ref(true);
const saving = ref(false);
const showModal = ref(false);
const editingAddress = ref(null);
const addresses = ref([]);

const addressForm = reactive({
  label: "",
  zip_code: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  is_default: false,
});

// Métodos
const formatCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

const fetchAddressByCEP = async () => {
  const cep = addressForm.zip_code.replace(/\D/g, "");

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        addressForm.street = data.logradouro;
        addressForm.neighborhood = data.bairro;
        addressForm.city = data.localidade;
        addressForm.state = data.uf;
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }
};

const openAddressModal = (address = null) => {
  editingAddress.value = address;

  if (address) {
    Object.assign(addressForm, { ...address });
  } else {
    Object.assign(addressForm, {
      label: "",
      zip_code: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      is_default: addresses.value.length === 0, // Primeiro endereço é sempre principal
    });
  }

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingAddress.value = null;
};

const saveAddress = async () => {
  saving.value = true;

  try {
    const addressStore = useAddressStore();
    
    if (editingAddress.value) {
      // Atualizar endereço existente
      await addressStore.updateAddress(editingAddress.value.id, addressForm);
    } else {
      // Criar novo endereço
      await addressStore.createAddress(addressForm);
    }

    await fetchAddresses();
    closeModal();

    alert(
      editingAddress.value ? "Endereço atualizado!" : "Endereço adicionado!"
    );
  } catch (error) {
    alert("Erro ao salvar endereço");
  } finally {
    saving.value = false;
  }
};

const setAsDefault = async (addressId: string) => {
  try {
    const addressStore = useAddressStore();
    await addressStore.setAsDefault(addressId);

    await fetchAddresses();
    alert("Endereço principal atualizado!");
  } catch (error) {
    alert("Erro ao definir endereço principal");
  }
};

const deleteAddress = async (addressId: string) => {
  if (!confirm("Tem certeza que deseja excluir este endereço?")) return;

  try {
    const addressStore = useAddressStore();
    await addressStore.deleteAddress(addressId);

    await fetchAddresses();
    alert("Endereço excluído!");
  } catch (error) {
    alert("Erro ao excluir endereço");
  }
};

const fetchAddresses = async () => {
  loading.value = true;

  try {
    // Usar o store de endereços em vez de API direta
    const addressStore = useAddressStore();
    const { data, error } = await addressStore.fetchAddresses();
    
    if (error) {
      console.error("Erro ao buscar endereços:", error);
    } else {
      addresses.value = data || [];
    }
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  // Aguardar autenticação estar pronta antes de buscar endereços
  const { isLoggedIn } = useAuth()
  
  let attempts = 0
  while (!isLoggedIn.value && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 100))
    attempts++
  }
  
  if (isLoggedIn.value) {
    fetchAddresses()
  }
});

// Máscara para CEP
watch(
  () => addressForm.zip_code,
  (newValue) => {
    if (newValue) {
      addressForm.zip_code = newValue
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{3})/, "$1-$2")
        .substr(0, 9);
    }
  }
);
</script>
