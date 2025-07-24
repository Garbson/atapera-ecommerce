<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Política de Cookies</h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            Entenda como utilizamos cookies e outras tecnologias para melhorar sua experiência 
            em nosso site e personalizar nossos serviços.
          </p>
          <div class="mt-6 text-sm text-gray-400">
            <p>Última atualização: Janeiro de 2024</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gerenciador de Cookies -->
    <section class="py-12 bg-blue-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg p-8 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              🍪 Gerenciar Preferências de Cookies
            </h2>
            <p class="text-gray-600 text-center mb-6">
              Você tem controle total sobre os cookies. Configure suas preferências abaixo:
            </p>
            
            <div class="space-y-4">
              <!-- Cookies Essenciais -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-semibold text-gray-800">🔒 Cookies Essenciais</h3>
                  <p class="text-sm text-gray-600">Necessários para o funcionamento básico do site</p>
                </div>
                <div class="flex items-center">
                  <span class="text-sm text-gray-500 mr-3">Sempre ativo</span>
                  <div class="w-12 h-6 bg-green-500 rounded-full relative">
                    <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>

              <!-- Cookies de Performance -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-semibold text-gray-800">📊 Cookies de Performance</h3>
                  <p class="text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
                </div>
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="cookiePreferences.performance" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <!-- Cookies de Marketing -->
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-semibold text-gray-800">🎯 Cookies de Marketing</h3>
                  <p class="text-sm text-gray-600">Para personalizar anúncios e conteúdo</p>
                </div>
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="cookiePreferences.marketing" 
                      type="checkbox" 
                      class="sr-only peer"
                    >
                    <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div class="flex gap-4 justify-center mt-8">
              <button
                @click="savePreferences"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Salvar Preferências
              </button>
              <button
                @click="acceptAll"
                class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Aceitar Todos
              </button>
              <button
                @click="rejectAll"
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Rejeitar Opcionais
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto prose prose-lg max-w-none">
          
          <!-- 1. O que são Cookies -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">1. O que são Cookies?</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo 
                (computador, tablet ou celular) quando você visita um site. Eles são amplamente 
                utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer 
                informações aos proprietários do site.
              </p>
              <p>
                Os cookies contêm informações sobre sua navegação e preferências, permitindo que 
                o site "lembre" de você quando você retornar, tornando sua experiência mais 
                personalizada e conveniente.
              </p>
              
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-3">🔍 Como Funcionam os Cookies</h3>
                <ol class="list-decimal list-inside space-y-2 text-blue-700">
                  <li>Você visita nosso site</li>
                  <li>O site solicita permissão para armazenar cookies</li>
                  <li>Com sua autorização, os cookies são salvos no seu dispositivo</li>
                  <li>Nas próximas visitas, o site lê esses cookies para personalizar sua experiência</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- 2. Tipos de Cookies -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">2. Tipos de Cookies que Utilizamos</h2>
            <div class="text-gray-600 leading-relaxed space-y-6">
              
              <!-- Cookies Essenciais -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🔒 Cookies Estritamente Necessários
                </h3>
                <p class="mb-4">
                  Esses cookies são essenciais para que você possa navegar pelo site e usar seus recursos. 
                  Sem estes cookies, serviços que você solicitou não podem ser fornecidos.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">🛒 Carrinho de Compras</h4>
                    <p class="text-sm">Lembra dos produtos que você adicionou ao carrinho</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">🔐 Sessão de Login</h4>
                    <p class="text-sm">Mantém você logado durante a navegação</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">🛡️ Segurança</h4>
                    <p class="text-sm">Protege contra ataques e fraudes</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">⚙️ Preferências do Site</h4>
                    <p class="text-sm">Lembra suas configurações e idioma</p>
                  </div>
                </div>
                
                <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p class="text-yellow-800 text-sm">
                    <strong>⚠️ Importante:</strong> Estes cookies não podem ser desabilitados, 
                    pois são necessários para o funcionamento básico do site.
                  </p>
                </div>
              </div>

              <!-- Cookies de Performance -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  📊 Cookies de Performance
                </h3>
                <p class="mb-4">
                  Estes cookies coletam informações sobre como você usa nosso site, como páginas 
                  visitadas e tempo de permanência. Essas informações são usadas para melhorar 
                  o funcionamento do site.
                </p>
                
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      📈
                    </div>
                    <div>
                      <h4 class="font-semibold">Google Analytics</h4>
                      <p class="text-sm text-gray-600">Análise de tráfego e comportamento dos usuários</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      🚀
                    </div>
                    <div>
                      <h4 class="font-semibold">Hotjar</h4>
                      <p class="text-sm text-gray-600">Mapas de calor e gravações de sessão</p>
                    </div>
                  </div>
                </div>
                
                <p class="text-sm text-gray-600 mt-4">
                  <strong>Dados coletados:</strong> Páginas visitadas, tempo de permanência, 
                  origem do tráfego, dispositivo utilizado (informações anônimas).
                </p>
              </div>

              <!-- Cookies de Funcionalidade -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  ⚙️ Cookies de Funcionalidade
                </h3>
                <p class="mb-4">
                  Estes cookies permitem que o site lembre das escolhas que você faz e fornecem 
                  recursos aprimorados e mais personalizados.
                </p>
                
                <ul class="list-disc list-inside space-y-2 text-sm">
                  <li>Lembrar suas preferências de filtros de produtos</li>
                  <li>Salvar produtos em sua lista de desejos</li>
                  <li>Personalizar recomendações de produtos</li>
                  <li>Manter configurações de exibição</li>
                </ul>
              </div>

              <!-- Cookies de Marketing -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  🎯 Cookies de Marketing/Publicidade
                </h3>
                <p class="mb-4">
                  Estes cookies são usados para entregar anúncios mais relevantes para você e 
                  seus interesses. Eles também são usados para limitar o número de vezes que 
                  você vê um anúncio.
                </p>
                
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      📘
                    </div>
                    <div>
                      <h4 class="font-semibold">Facebook Pixel</h4>
                      <p class="text-sm text-gray-600">Rastreamento para anúncios no Facebook e Instagram</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      🎯
                    </div>
                    <div>
                      <h4 class="font-semibold">Google Ads</h4>
                      <p class="text-sm text-gray-600">Remarketing e anúncios personalizados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Cookies de Terceiros -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">3. Cookies de Terceiros</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <p>
                Alguns cookies em nosso site são definidos por serviços de terceiros confiáveis. 
                Não temos controle sobre esses cookies, mas eles são essenciais para o funcionamento 
                de recursos específicos.
              </p>
              
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr class="bg-gray-50">
                      <th class="border border-gray-300 px-4 py-2 text-left">Serviço</th>
                      <th class="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th class="border border-gray-300 px-4 py-2 text-left">Duração</th>
                      <th class="border border-gray-300 px-4 py-2 text-left">Política</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td class="border border-gray-300 px-4 py-2">Análise de tráfego</td>
                      <td class="border border-gray-300 px-4 py-2">2 anos</td>
                      <td class="border border-gray-300 px-4 py-2">
                        <a href="https://policies.google.com/privacy" class="text-blue-600 hover:underline" target="_blank">
                          Ver Política
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Stripe</td>
                      <td class="border border-gray-300 px-4 py-2">Processamento de pagamentos</td>
                      <td class="border border-gray-300 px-4 py-2">Sessão</td>
                      <td class="border border-gray-300 px-4 py-2">
                        <a href="https://stripe.com/privacy" class="text-blue-600 hover:underline" target="_blank">
                          Ver Política
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Facebook</td>
                      <td class="border border-gray-300 px-4 py-2">Publicidade direcionada</td>
                      <td class="border border-gray-300 px-4 py-2">90 dias</td>
                      <td class="border border-gray-300 px-4 py-2">
                        <a href="https://www.facebook.com/privacy/policy/" class="text-blue-600 hover:underline" target="_blank">
                          Ver Política
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 4. Como Gerenciar Cookies -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">4. Como Gerenciar seus Cookies</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-4">4.1 Configurações do Site</h3>
              <p>
                Você pode gerenciar suas preferências de cookies usando o painel na parte superior desta página. 
                Suas escolhas serão lembradas para futuras visitas.
              </p>

              <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-4">4.2 Configurações do Navegador</h3>
              <p>
                A maioria dos navegadores permite que você gerencie cookies através das configurações:
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">🌐 Chrome</h4>
                  <p class="text-sm">Configurações → Privacidade e segurança → Cookies</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">🦊 Firefox</h4>
                  <p class="text-sm">Preferências → Privacidade e Segurança</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">🧭 Safari</h4>
                  <p class="text-sm">Preferências → Privacidade</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">🔵 Edge</h4>
                  <p class="text-sm">Configurações → Privacidade</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">📱 Celular</h4>
                  <p class="text-sm">Configurações do app do navegador</p>
                </div>
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="font-semibold mb-2">🖥️ Desktop</h4>
                  <p class="text-sm">Menu → Configurações → Privacidade</p>
                </div>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Importante Saber</h4>
                <p class="text-yellow-700 text-sm">
                  Desabilitar cookies pode afetar a funcionalidade do site. Alguns recursos podem não 
                  funcionar corretamente, como o carrinho de compras, login automático e personalização.
                </p>
              </div>
            </div>
          </div>

          <!-- 5. Seus Direitos -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">5. Seus Direitos</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <p>Em relação aos cookies, você tem os seguintes direitos:</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-800 mb-2">✅ Consentimento</h4>
                  <p class="text-sm text-blue-700">Dar ou retirar consentimento a qualquer momento</p>
                </div>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 class="font-semibold text-green-800 mb-2">🔍 Informação</h4>
                  <p class="text-sm text-green-700">Saber quais cookies estão sendo utilizados</p>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 class="font-semibold text-yellow-800 mb-2">⚙️ Controle</h4>
                  <p class="text-sm text-yellow-700">Configurar preferências individuais</p>
                </div>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 class="font-semibold text-red-800 mb-2">🗑️ Exclusão</h4>
                  <p class="text-sm text-red-700">Excluir cookies existentes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. Atualizações -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">6. Atualizações desta Política</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <p>
                Esta política de cookies pode ser atualizada periodicamente para refletir mudanças 
                em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
              </p>
              <p>
                Recomendamos que você revise esta página regularmente para se manter informado 
                sobre nosso uso de cookies.
              </p>
            </div>
          </div>

          <!-- 7. Contato -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">7. Contato</h2>
            <div class="text-gray-600 leading-relaxed space-y-4">
              <p>
                Se você tiver dúvidas sobre nossa política de cookies, entre em contato conosco:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>WhatsApp:</strong> +55 (68) 9282-7730</li>
                <li><strong>Instagram:</strong> @atapera.oficial</li>
                <li><strong>Formulário:</strong> <NuxtLink to="/contato" class="text-blue-600 hover:underline">Página de Contato</NuxtLink></li>
              </ul>
            </div>
          </div>

          <!-- Data de Atualização -->
          <div class="border-t border-gray-200 pt-8 mt-12">
            <p class="text-sm text-gray-500 text-center">
              <strong>Última atualização:</strong> Janeiro de 2024<br>
              <strong>Versão:</strong> 1.0
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Estados
const cookiePreferences = reactive({
  performance: false,
  marketing: false
})

// Métodos
const savePreferences = () => {
  // Aqui você salvaria as preferências (localStorage, cookie, API, etc.)
  localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences))
  alert('Preferências salvas com sucesso!')
}

const acceptAll = () => {
  cookiePreferences.performance = true
  cookiePreferences.marketing = true
  savePreferences()
}

const rejectAll = () => {
  cookiePreferences.performance = false
  cookiePreferences.marketing = false
  savePreferences()
}

// Carregar preferências salvas
onMounted(() => {
  const saved = localStorage.getItem('cookiePreferences')
  if (saved) {
    const preferences = JSON.parse(saved)
    Object.assign(cookiePreferences, preferences)
  }
})

// SEO
useHead({
  title: 'Política de Cookies - Atapera',
  meta: [
    {
      name: 'description',
      content: 'Política de Cookies da Atapera. Entenda como utilizamos cookies para melhorar sua experiência e como gerenciar suas preferências.'
    },
    {
      property: 'og:title',
      content: 'Política de Cookies - Atapera'
    },
    {
      property: 'og:description',
      content: 'Transparência total sobre como utilizamos cookies. Gerencie suas preferências e entenda seus direitos.'
    }
  ]
})
</script>