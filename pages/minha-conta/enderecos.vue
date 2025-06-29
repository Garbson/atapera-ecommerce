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
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">
            {{ editingAddress ? "Editar Endereço" : "Adicionar Endereço" }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <!-- Label do Endereço -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nome do Endereço
            </label>
            <input
              v-model="addressForm.label"
              type="text"
              placeholder="Ex: Casa, Trabalho, etc."
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <!-- CEP -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              CEP *
            </label>
            <input
              v-model="addressForm.zip_code"
              type="text"
              placeholder="00000-000"
              @blur="fetchAddressByCEP"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <!-- Rua -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Rua *
            </label>
            <input
              v-model="addressForm.street"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <!-- Número e Complemento -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Número *
              </label>
              <input
                v-model="addressForm.number"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Complemento
              </label>
              <input
                v-model="addressForm.complement"
                type="text"
                placeholder="Apto, Bloco, etc."
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <!-- Bairro -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Bairro *
            </label>
            <input
              v-model="addressForm.neighborhood"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <!-- Cidade e Estado -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Cidade *
              </label>
              <input
                v-model="addressForm.city"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                v-model="addressForm.state"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
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
          <div>
            <label class="flex items-center">
              <input
                v-model="addressForm.is_default"
                type="checkbox"
                class="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span class="ml-2 text-sm text-gray-700">
                Tornar este endereço como principal
              </span>
            </label>
          </div>

          <!-- Botões -->
          <div class="flex justify-end gap-4 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
            >
              {{
                saving ? "Salvando..." : editingAddress ? "Atualizar" : "Salvar"
              }}
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
    const endpoint = editingAddress.value
      ? `/api/addresses/${editingAddress.value.id}`
      : "/api/addresses";

    const method = editingAddress.value ? "PUT" : "POST";

    await $fetch(endpoint, {
      method,
      body: addressForm,
    });

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
    await $fetch(`/api/addresses/${addressId}/set-default`, {
      method: "POST",
    });

    await fetchAddresses();
    alert("Endereço principal atualizado!");
  } catch (error) {
    alert("Erro ao definir endereço principal");
  }
};

const deleteAddress = async (addressId: string) => {
  if (!confirm("Tem certeza que deseja excluir este endereço?")) return;

  try {
    await $fetch(`/api/addresses/${addressId}`, {
      method: "DELETE",
    });

    await fetchAddresses();
    alert("Endereço excluído!");
  } catch (error) {
    alert("Erro ao excluir endereço");
  }
};

const fetchAddresses = async () => {
  loading.value = true;

  try {
    const { data } = await $fetch("/api/addresses");
    addresses.value = data || [];
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchAddresses();
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
