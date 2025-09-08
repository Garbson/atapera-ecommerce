<!-- pages/checkout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700"
              >Início</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <NuxtLink to="/carrinho" class="text-gray-500 hover:text-gray-700"
              >Carrinho</NuxtLink
            >
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">Checkout</li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p class="text-gray-600">
          Complete suas informações para finalizar o pedido
        </p>
      </div>

      <div v-if="cartStore.isEmpty" class="text-center py-16">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Carrinho vazio
        </h2>
        <p class="text-gray-600 mb-6">
          Adicione alguns produtos antes de finalizar a compra
        </p>
        <NuxtLink
          to="/produtos"
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Continuar Comprando
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário de Checkout -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informações do Cliente -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold mb-4">Informações do Cliente</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Nome Completo</label
                >
                <input
                  v-model="customerInfo.name"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="customerInfo.email"
                  type="email"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Telefone</label
                >
                <input
                  v-model="customerInfo.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="(68) 9282-7730"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >CPF</label
                >
                <input
                  v-model="customerInfo.document"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>

          <!-- Explicação sobre Finalização via WhatsApp para Armas -->
          <div
            v-if="hasFirearms"
            class="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg
                class="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                />
              </svg>
              Finalização via WhatsApp
            </h2>

            <div
              class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
            >
              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-green-800 mb-2">
                    Atendimento Especializado para Armas de Fogo
                  </h3>
                  <p class="text-sm text-green-700 mb-3">
                    Em casos de compra de armas de fogo, a finalização da compra
                    será realizada com nossa atendente da loja pelo WhatsApp.
                    Isso nos permite:
                  </p>
                  <ul class="text-sm text-green-700 space-y-1 mb-3">
                    <li>• ✅ Validar seus documentos de forma segura</li>
                    <li>
                      • ✅ Oferecer atendimento mais rápido e personalizado
                    </li>
                    <li>
                      • ✅ Esclarecer dúvidas sobre documentação e retirada
                    </li>
                    <li>• ✅ Agendar horário conveniente para retirada</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4"
            >
              <h3 class="text-sm font-medium text-orange-800 mb-2">
                📍 Retirada Obrigatória na Loja
              </h3>
              <p class="text-sm text-orange-700 mb-2">
                Conforme a legislação brasileira, armas de fogo devem ser
                retiradas pessoalmente:
              </p>
              <div class="text-sm text-orange-700">
                <p>📍 Av. Epaminondas Jácome Centro, 2199</p>
                <p>Cadeia Velha, Rio Branco - AC, 69905-074</p>
                <p class="mt-2 font-medium">📞 WhatsApp: +55 68 9282-7730</p>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="text-sm font-medium text-blue-800 mb-2">
                📋 Documentos Necessários (levar na retirada)
              </h3>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• Certificado de Registro (CR) ou CRAF válido</li>
                <li>• Documento de identidade com foto</li>
                <li>• CPF</li>
              </ul>
              <p class="text-xs text-blue-600 mt-2 italic">
                * A validação dos documentos será feita via WhatsApp pela nossa
                atendente
              </p>
            </div>
          </div>

          <!-- Método de Pagamento -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <PaymentSelector
              :avista-price="cartTotal.avistaPrice"
              :parcelado-price="cartTotal.parceladoPrice"
              @update:method="updatePaymentMethod"
              @update:installments="updateInstallments"
              @update:final-price="updateFinalPrice"
            />
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h3 class="text-lg font-semibold mb-4">Resumo do Pedido</h3>

            <!-- Lista de produtos -->
            <div class="space-y-3 mb-6 max-h-60 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center gap-3"
              >
                <img
                  :src="item.image || '/placeholder-product.jpg'"
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded border"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium truncate">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">
                    {{ item.quantity }}x {{ formatPrice(item.price) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span>Subtotal ({{ cartStore.totalItems }} itens)</span>
                <span>{{ formatPrice(cartStore.totalValue) }}</span>
              </div>
              <div
                v-if="hasFirearms"
                class="text-xs text-orange-600 font-medium"
              >
                ⚠️ Retirada obrigatória para armas de fogo
              </div>
              <hr />
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-red-600">{{ formatPrice(finalTotal) }}</span>
              </div>
            </div>

            <!-- Botão para Armas de Fogo - WhatsApp -->
            <button
              v-if="hasFirearms"
              @click="processFirearmOrder"
              :disabled="!canProceedToPayment || loading"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processando...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                Finalizar pelo WhatsApp
              </span>
            </button>

            <!-- Botão para produtos normais - também WhatsApp temporariamente -->
            <button
              v-else
              @click="processFirearmOrder"
              :disabled="!canProceedToPayment || loading"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processando...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                Finalizar pelo WhatsApp
              </span>
            </button>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex items-center gap-2 text-sm text-green-600 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                Finalização via WhatsApp
              </div>
              <p class="text-xs text-gray-500">
                Você será direcionado para o WhatsApp para finalizar seu pedido
                de forma rápida e segura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const { sendWhatsAppOrder } = useWhatsApp();
const { user } = useAuth();
const userProfileStore = useUserProfileStore();

// Estados reativo
const loading = ref(false);
const paymentMethod = ref("avista");
const installments = ref(1);
const finalPrice = ref(0);

// Informações do cliente
const customerInfo = ref({
  name: "",
  email: "",
  phone: "",
  document: ""
});

// Preencher dados do usuário logado
onMounted(async () => {
  if (user.value) {
    // Tentar carregar o perfil do usuário se ainda não foi carregado
    if (!userProfileStore.profile) {
      try {
        await userProfileStore.fetchProfile();
      } catch (error) {
        console.log('Perfil não encontrado, usando dados básicos do usuário');
      }
    }

    const profile = userProfileStore.profile as any;
    const userMeta = user.value.user_metadata || {};

    customerInfo.value = {
      name: userProfileStore.fullName || userMeta.name || userMeta.full_name || "",
      email: user.value.email || "",
      phone: profile?.phone || userMeta.phone || "",
      document: profile?.cpf || userMeta.document || userMeta.cpf || ""
    };
  }
});

// Watcher para atualizar dados quando o perfil for carregado
watch(() => userProfileStore.profile, (newProfile) => {
  if (newProfile && user.value) {
    const profile = newProfile as any;
    const userMeta = user.value.user_metadata || {};

    customerInfo.value = {
      name: userProfileStore.fullName || userMeta.name || userMeta.full_name || "",
      email: user.value.email || "",
      phone: profile?.phone || userMeta.phone || "",
      document: profile?.cpf || userMeta.document || userMeta.cpf || ""
    };
  }
});

// Computed
const hasFirearms = computed(() => {
  return cartStore.items.some((item: any) => item.requires_license || item.product?.requires_license);
});

const cartTotal = computed(() => {
  const total = cartStore.totalValue;
  return {
    avistaPrice: total,
    parceladoPrice: total
  };
});

const finalTotal = computed(() => {
  return finalPrice.value || cartStore.totalValue;
});

const canProceedToPayment = computed(() => {
  const hasCustomerInfo = customerInfo.value.name && customerInfo.value.email;
  const hasPaymentMethod = paymentMethod.value;
  return hasCustomerInfo && hasPaymentMethod;
});

// Métodos
const formatPrice = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const updatePaymentMethod = (method: string) => {
  paymentMethod.value = method;
};

const updateInstallments = (value: number) => {
  installments.value = value;
};

const updateFinalPrice = (price: number) => {
  finalPrice.value = price;
};

const processFirearmOrder = async () => {
  if (!canProceedToPayment.value) return;

  try {
    loading.value = true;

    // Enviar pedido via WhatsApp
    const orderData = {
      customer: customerInfo.value,
      items: cartStore.items,
      total: finalTotal.value,
      paymentMethod: paymentMethod.value,
      installments: installments.value,
      hasFirearms: hasFirearms.value
    };

    await sendWhatsAppOrder(orderData);

  } catch (error) {
    console.error("Erro ao processar pedido:", error);
    alert("Erro ao processar pedido. Tente novamente.");
  } finally {
    loading.value = false;
  }
};

// SEO
useHead({
  title: "Checkout - Finalizar Compra | Atapera",
  meta: [
    {
      name: "description",
      content: "Finalize sua compra na Atapera com segurança e praticidade."
    }
  ]
});
</script>