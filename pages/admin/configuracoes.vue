<!-- pages/admin/configuracoes.vue -->
<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Configurações</h1>
          <p class="text-gray-600">
            Gerencie as configurações gerais da sua loja
          </p>
        </div>
        <button
          @click="saveAllSettings"
          :disabled="saving"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <svg
            v-if="saving"
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          {{ saving ? "Salvando..." : "Salvar Configurações" }}
        </button>
      </div>

      <!-- Settings Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Settings Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Seções</h3>
            <nav class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition-colors',
                  activeSection === section.id
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
              >
                <div class="flex items-center gap-3">
                  <component :is="section.icon" class="w-5 h-5" />
                  {{ section.name }}
                </div>
              </button>
            </nav>
          </div>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-2">
          <!-- Informações da Loja -->
          <div
            v-if="activeSection === 'store'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6">
              Informações da Loja
            </h3>
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Nome da Loja</label
                  >
                  <input
                    v-model="settings.store.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Atapera"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >CNPJ</label
                  >
                  <input
                    v-model="settings.store.cnpj"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Descrição</label
                >
                <textarea
                  v-model="settings.store.description"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Descrição da sua loja..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Email de Contato</label
                  >
                  <input
                    v-model="settings.store.contact_email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="WhatsApp: +55 (68) 9282-7730"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Telefone</label
                  >
                  <input
                    v-model="settings.store.phone"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+55 (68) 9282-7730"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Endereço Completo</label
                >
                <input
                  v-model="settings.store.address"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Rua, número, bairro, cidade - CEP"
                />
              </div>
            </div>
          </div>

          <!-- Configurações de Pagamento -->
          <div
            v-if="activeSection === 'payment'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Pagamentos</h3>
            <div class="space-y-6">
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="font-medium text-gray-800">PIX</h4>
                    <p class="text-sm text-gray-600">
                      Pagamento instantâneo via PIX
                    </p>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.pix_enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
                    ></div>
                  </label>
                </div>
                <div v-if="settings.payment.pix_enabled">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Chave PIX</label
                  >
                  <input
                    v-model="settings.payment.pix_key"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Sua chave PIX"
                  />
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="font-medium text-gray-800">Cartão de Crédito</h4>
                    <p class="text-sm text-gray-600">
                      Pagamento via cartão de crédito
                    </p>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.credit_card_enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
                    ></div>
                  </label>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.boleto_enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Configurações de Entrega -->
          <div
            v-if="activeSection === 'shipping'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6">
              Entrega e Frete
            </h3>
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Frete Grátis a partir de</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >R$</span
                    >
                    <input
                      v-model="settings.shipping.free_shipping_min"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Taxa de Entrega Local</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >R$</span
                    >
                    <input
                      v-model="settings.shipping.local_delivery_fee"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >CEP de Origem</label
                >
                <input
                  v-model="settings.shipping.origin_zipcode"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="00000-000"
                />
              </div>

              <div class="flex items-center gap-3">
                <input
                  v-model="settings.shipping.calculate_shipping"
                  type="checkbox"
                  id="calculate_shipping"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="calculate_shipping"
                  class="text-sm font-medium text-gray-700"
                >
                  Calcular frete automaticamente via Correios
                </label>
              </div>
            </div>
          </div>

          <!-- Configurações de Email -->
          <div
            v-if="activeSection === 'email'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6">
              Configurações de Email
            </h3>
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Servidor SMTP</label
                  >
                  <input
                    v-model="settings.email.smtp_host"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Porta</label
                  >
                  <input
                    v-model="settings.email.smtp_port"
                    type="number"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="587"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Email de Envio</label
                  >
                  <input
                    v-model="settings.email.from_email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="noreply@atapera.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Nome do Remetente</label
                  >
                  <input
                    v-model="settings.email.from_name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Atapera"
                  />
                </div>
              </div>

              <div class="flex items-center gap-3">
                <input
                  v-model="settings.email.send_order_confirmation"
                  type="checkbox"
                  id="send_order_confirmation"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="send_order_confirmation"
                  class="text-sm font-medium text-gray-700"
                >
                  Enviar email de confirmação de pedido
                </label>
              </div>

              <div class="flex items-center gap-3">
                <input
                  v-model="settings.email.send_shipping_notification"
                  type="checkbox"
                  id="send_shipping_notification"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="send_shipping_notification"
                  class="text-sm font-medium text-gray-700"
                >
                  Enviar notificação de envio
                </label>
              </div>
            </div>
          </div>

          <!-- Configurações Gerais -->
          <div
            v-if="activeSection === 'general'"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6">
              Configurações Gerais
            </h3>
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <input
                  v-model="settings.general.maintenance_mode"
                  type="checkbox"
                  id="maintenance_mode"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="maintenance_mode"
                  class="text-sm font-medium text-gray-700"
                >
                  Modo de Manutenção
                </label>
              </div>

              <div class="flex items-center gap-3">
                <input
                  v-model="settings.general.allow_guest_checkout"
                  type="checkbox"
                  id="allow_guest_checkout"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="allow_guest_checkout"
                  class="text-sm font-medium text-gray-700"
                >
                  Permitir compra sem cadastro
                </label>
              </div>

              <div class="flex items-center gap-3">
                <input
                  v-model="settings.general.auto_approve_reviews"
                  type="checkbox"
                  id="auto_approve_reviews"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  for="auto_approve_reviews"
                  class="text-sm font-medium text-gray-700"
                >
                  Aprovar avaliações automaticamente
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Moeda</label
                >
                <select
                  v-model="settings.general.currency"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="BRL">Real Brasileiro (R$)</option>
                  <option value="USD">Dólar Americano ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Fuso Horário</label
                >
                <select
                  v-model="settings.general.timezone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/New_York">Nova York (GMT-5)</option>
                  <option value="Europe/London">Londres (GMT+0)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
        class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg"
      >
        <div class="flex items-center gap-2">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Configurações salvas com sucesso!
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

// Estados
const activeSection = ref("store");
const saving = ref(false);
const showSuccessMessage = ref(false);

// Sections for navigation
const sections = [
  {
    id: "store",
    name: "Informações da Loja",
    icon: "svg",
  },
  {
    id: "payment",
    name: "Pagamentos",
    icon: "svg",
  },
  {
    id: "shipping",
    name: "Entrega e Frete",
    icon: "svg",
  },
  {
    id: "email",
    name: "Configurações de Email",
    icon: "svg",
  },
  {
    id: "general",
    name: "Configurações Gerais",
    icon: "svg",
  },
];

// Settings object
const settings = ref({
  store: {
    name: "Atapera",
    cnpj: "",
    description:
      "Loja especializada em equipamentos para caça, pesca, airsoft e armas registradas.",
    contact_email: "WhatsApp: +55 (68) 9282-7730",
    phone: "",
    address: "",
  },
  payment: {
    pix_enabled: true,
    pix_key: "",
    credit_card_enabled: true,
    boleto_enabled: true,
  },
  shipping: {
    free_shipping_min: 300,
    local_delivery_fee: 15,
    origin_zipcode: "",
    calculate_shipping: true,
  },
  email: {
    smtp_host: "",
    smtp_port: 587,
    from_email: "",
    from_name: "Atapera",
    send_order_confirmation: true,
    send_shipping_notification: true,
  },
  general: {
    maintenance_mode: false,
    allow_guest_checkout: true,
    auto_approve_reviews: false,
    currency: "BRL",
    timezone: "America/Sao_Paulo",
  },
});

// Funções
const saveAllSettings = async () => {
  saving.value = true;
  try {
    // Aqui você salvaria as configurações no Supabase
    // Por exemplo, em uma tabela 'settings'

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular salvamento

    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);
    alert("Erro ao salvar configurações");
  } finally {
    saving.value = false;
  }
};
</script>
