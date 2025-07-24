<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Perguntas Frequentes</h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos, 
            entregas, pagamentos e políticas da loja.
          </p>
        </div>
      </div>
    </section>

    <!-- Busca -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Busque por uma pergunta ou palavra-chave..."
              class="w-full px-6 py-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorias -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Filtros de Categoria -->
          <div class="flex flex-wrap justify-center gap-3 mb-12">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-6 py-3 rounded-full font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-red-300 hover:text-red-600'
              ]"
            >
              {{ category.icon }} {{ category.name }}
            </button>
          </div>

          <!-- FAQ Items -->
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in filteredFaqs" 
              :key="index"
              class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start gap-4">
                  <div class="text-2xl">{{ faq.icon }}</div>
                  <div>
                    <h3 class="font-semibold text-gray-800 text-lg mb-1">
                      {{ faq.question }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ faq.category }}</p>
                  </div>
                </div>
                <svg 
                  class="w-5 h-5 text-gray-400 transform transition-transform"
                  :class="{ 'rotate-180': openFaq === index }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                v-show="openFaq === index" 
                class="px-6 pb-6 border-t border-gray-100"
              >
                <div class="pt-4 prose max-w-none" v-html="faq.answer"></div>
              </div>
            </div>
          </div>

          <!-- Não encontrou -->
          <div v-if="filteredFaqs.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p class="text-gray-600 mb-6">
              Não encontramos perguntas que correspondam à sua busca.
            </p>
            <button
              @click="clearSearch"
              class="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Limpar Busca
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contato -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">
            Não encontrou sua resposta?
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Nossa equipe especializada está pronta para ajudar você com qualquer dúvida.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <!-- WhatsApp -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-800 mb-2">WhatsApp</h3>
              <p class="text-gray-600 text-sm mb-4">Resposta rápida e direta</p>
              <a 
                href="https://wa.me/5568928277300" 
                class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Conversar
              </a>
            </div>

            <!-- Instagram -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-800 mb-2">Instagram</h3>
              <p class="text-gray-600 text-sm mb-4">Siga-nos para novidades</p>
              <a 
                href="https://instagram.com/atapera.oficial" 
                target="_blank"
                class="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                Seguir
              </a>
            </div>
          </div>

          <div class="mt-8">
            <p class="text-gray-600 text-sm">
              <strong>Horário de Atendimento:</strong> Segunda a Sexta das 8h às 18h, Sábado das 8h às 12h
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Estados
const searchQuery = ref('')
const activeCategory = ref('all')
const openFaq = ref(null)

// Categorias
const categories = [
  { id: 'all', name: 'Todas', icon: '📋' },
  { id: 'produtos', name: 'Produtos', icon: '🎯' },
  { id: 'pedidos', name: 'Pedidos', icon: '📦' },
  { id: 'pagamento', name: 'Pagamento', icon: '💳' },
  { id: 'entrega', name: 'Entrega', icon: '🚚' },
  { id: 'juridico', name: 'Jurídico', icon: '⚖️' },
  { id: 'conta', name: 'Conta', icon: '👤' }
]

// FAQs
const faqs = [
  // Produtos
  {
    category: 'Produtos',
    categoryId: 'produtos',
    icon: '🎯',
    question: 'Vocês vendem armas de fogo reais?',
    answer: `
      <p>Sim, somos uma loja devidamente registrada e autorizada pelo Exército Brasileiro para comercialização de armas de fogo.</p>
      <p><strong>Requisitos para compra:</strong></p>
      <ul>
        <li>Certificado de Registro (CR) ou CRAF válido</li>
        <li>Documento de identidade</li>
        <li>Comprovante de residência</li>
        <li>Atestado de capacidade técnica quando exigido</li>
      </ul>
      <p>Todos os produtos seguem rigorosamente a legislação brasileira.</p>
    `
  },
  {
    category: 'Produtos',
    categoryId: 'produtos',
    icon: '🔍',
    question: 'Como sei se um produto é adequado para minha modalidade?',
    answer: `
      <p>Nossa equipe é composta por praticantes das modalidades que comercializamos. Entre em contato conosco para consultoria técnica gratuita.</p>
      <p><strong>Informações que ajudam:</strong></p>
      <ul>
        <li>Modalidade praticada (tiro, caça, pesca)</li>
        <li>Nível de experiência</li>
        <li>Orçamento disponível</li>
        <li>Preferências pessoais</li>
      </ul>
      <p>WhatsApp: +55 (68) 9282-7730</p>
    `
  },
  {
    category: 'Produtos',
    categoryId: 'produtos',
    icon: '🔧',
    question: 'Os produtos têm garantia?',
    answer: `
      <p>Sim! Todos os produtos têm garantia do fabricante:</p>
      <ul>
        <li><strong>Armas:</strong> 1 ano contra defeitos de fabricação</li>
        <li><strong>Óticas:</strong> Varia por marca (1-5 anos)</li>
        <li><strong>Acessórios:</strong> 90 dias a 1 ano</li>
        <li><strong>Eletrônicos:</strong> 1 ano</li>
      </ul>
      <p>Além da garantia legal de 90 dias para produtos duráveis.</p>
    `
  },

  // Pedidos
  {
    category: 'Pedidos',
    categoryId: 'pedidos',
    icon: '📦',
    question: 'Como faço um pedido?',
    answer: `
      <p>É simples fazer seu pedido:</p>
      <ol>
        <li>Navegue pelos produtos em nosso site</li>
        <li>Adicione os itens desejados ao carrinho</li>
        <li>Faça seu cadastro ou login</li>
        <li>Escolha a forma de pagamento</li>
        <li>Confirme o pedido</li>
      </ol>
      <p>Você receberá confirmação pelo WhatsApp com todos os detalhes.</p>
    `
  },
  {
    category: 'Pedidos',
    categoryId: 'pedidos',
    icon: '⏰',
    question: 'Qual o prazo de entrega?',
    answer: `
      <p><strong>Prazos por região (após confirmação do pagamento):</strong></p>
      <ul>
        <li><strong>Sudeste:</strong> 2-5 dias úteis</li>
        <li><strong>Sul:</strong> 3-6 dias úteis</li>
        <li><strong>Centro-Oeste:</strong> 4-8 dias úteis</li>
        <li><strong>Nordeste:</strong> 5-10 dias úteis</li>
        <li><strong>Norte:</strong> 7-12 dias úteis</li>
      </ul>
      <p>Produtos especiais ou sob encomenda podem ter prazo estendido.</p>
    `
  },
  {
    category: 'Pedidos',
    categoryId: 'pedidos',
    icon: '📋',
    question: 'Posso cancelar meu pedido?',
    answer: `
      <p>Sim, é possível cancelar seu pedido:</p>
      <ul>
        <li><strong>Antes do envio:</strong> Cancelamento gratuito</li>
        <li><strong>Após o envio:</strong> Sujeito às regras de devolução</li>
      </ul>
      <p>Entre em contato imediatamente pelo WhatsApp +55 (68) 9282-7730</p>
    `
  },

  // Pagamento
  {
    category: 'Pagamento',
    categoryId: 'pagamento',
    icon: '💳',
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: `
      <p><strong>Formas de pagamento disponíveis:</strong></p>
      <ul>
        <li><strong>PIX:</strong> Aprovação instantânea</li>
        <li><strong>Cartão de Crédito:</strong> Parcelamento em até 12x</li>
        <li><strong>Cartão de Débito:</strong> À vista</li>
      </ul>
      <p>Ambiente 100% seguro com certificado SSL.</p>
    `
  },
  {
    category: 'Pagamento',
    categoryId: 'pagamento',
    icon: '🔒',
    question: 'O pagamento é seguro?',
    answer: `
      <p>Sim! Utilizamos as melhores tecnologias de segurança:</p>
      <ul>
        <li><strong>SSL:</strong> Criptografia de dados</li>
        <li><strong>Stripe:</strong> Gateway de pagamento confiável</li>
        <li><strong>PCI DSS:</strong> Padrão de segurança</li>
        <li><strong>Antifraude:</strong> Verificação automática</li>
      </ul>
      <p>Seus dados nunca são armazenados em nossos servidores.</p>
    `
  },
  {
    category: 'Pagamento',
    categoryId: 'pagamento',
    icon: '⏳',
    question: 'Quando meu pagamento será processado?',
    answer: `
      <p><strong>Tempos de processamento:</strong></p>
      <ul>
        <li><strong>PIX:</strong> Instantâneo</li>
        <li><strong>Cartão:</strong> 1-2 dias úteis</li>
        <li><strong>Boleto:</strong> 2-3 dias úteis</li>
      </ul>
      <p>Você receberá confirmação pelo WhatsApp quando o pagamento for aprovado.</p>
    `
  },

  // Entrega
  {
    category: 'Entrega',
    categoryId: 'entrega',
    icon: '🚚',
    question: 'Como funciona a entrega de produtos controlados?',
    answer: `
      <p>Produtos controlados (armas, munições) seguem protocolo especial:</p>
      <ul>
        <li><strong>Identificação:</strong> Necessário documento com foto</li>
        <li><strong>Documento válido:</strong> CR, CRAF ou similar</li>
        <li><strong>Assinatura:</strong> Obrigatória do titular</li>
        <li><strong>Embalagem:</strong> Discreta e segura</li>
      </ul>
      <p>Utilizamos transportadoras especializadas e seguros.</p>
    `
  },
  {
    category: 'Entrega',
    categoryId: 'entrega',
    icon: '📍',
    question: 'Posso alterar o endereço de entrega?',
    answer: `
      <p>Alteração do endereço:</p>
      <ul>
        <li><strong>Antes do envio:</strong> Gratuito, entre em contato</li>
        <li><strong>Após o envio:</strong> Depende da transportadora</li>
        <li><strong>Produtos controlados:</strong> Não é possível alterar</li>
      </ul>
      <p>WhatsApp: +55 (68) 9282-7730</p>
    `
  },

  // Jurídico
  {
    category: 'Jurídico',
    categoryId: 'juridico',
    icon: '⚖️',
    question: 'Preciso de licença para comprar?',
    answer: `
      <p><strong>Documentos necessários por categoria:</strong></p>
      <ul>
        <li><strong>Armas de fogo:</strong> CR, CRAF ou CAC</li>
        <li><strong>Armas de pressão (>6mm):</strong> CR</li>
        <li><strong>Armas de pressão (<6mm):</strong> Não precisa</li>
        <li><strong>Airsoft:</strong> Não precisa (réplicas)</li>
        <li><strong>Acessórios:</strong> Não precisa</li>
      </ul>
      <p>Em caso de dúvida, consulte nossos especialistas.</p>
    `
  },
  {
    category: 'Jurídico',
    categoryId: 'juridico',
    icon: '📄',
    question: 'Vocês ajudam com a documentação?',
    answer: `
      <p>Oferecemos suporte para:</p>
      <ul>
        <li><strong>Orientação:</strong> Sobre documentos necessários</li>
        <li><strong>Contatos:</strong> Despachantes confiáveis</li>
        <li><strong>Verificação:</strong> Documentos antes da compra</li>
        <li><strong>Atualização:</strong> Sobre mudanças na legislação</li>
      </ul>
      <p>Não fazemos o processo, mas orientamos todo o caminho.</p>
    `
  },

  // Conta
  {
    category: 'Conta',
    categoryId: 'conta',
    icon: '👤',
    question: 'Como criar minha conta?',
    answer: `
      <p>Para criar sua conta:</p>
      <ol>
        <li>Clique em "Cadastre-se" no site</li>
        <li>Preencha seus dados pessoais</li>
        <li>Confirme seu email</li>
        <li>Faça login e complete seu perfil</li>
      </ol>
      <p>Com sua conta você pode acompanhar pedidos, salvar produtos favoritos e ter um atendimento mais rápido.</p>
    `
  },
  {
    category: 'Conta',
    categoryId: 'conta',
    icon: '🔑',
    question: 'Esqueci minha senha, como recuperar?',
    answer: `
      <p>Para recuperar sua senha:</p>
      <ol>
        <li>Clique em "Esqueci minha senha" na tela de login</li>
        <li>Digite seu email cadastrado</li>
        <li>Verifique seu email (e pasta de spam)</li>
        <li>Clique no link recebido</li>
        <li>Crie uma nova senha</li>
      </ol>
      <p>Se tiver problemas, entre em contato conosco.</p>
    `
  }
]

// Computed
const filteredFaqs = computed(() => {
  let filtered = faqs

  // Filtrar por categoria
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.categoryId === activeCategory.value)
  }

  // Filtrar por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Métodos
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const clearSearch = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
}

// SEO
useHead({
  title: 'FAQ - Perguntas Frequentes - Atapera',
  meta: [
    {
      name: 'description',
      content: 'Perguntas frequentes sobre produtos, entregas, pagamentos e políticas da Atapera. Tire suas dúvidas sobre armas, equipamentos de caça e pesca.'
    },
    {
      property: 'og:title',
      content: 'FAQ - Perguntas Frequentes - Atapera'
    },
    {
      property: 'og:description',
      content: 'Encontre respostas para as principais dúvidas sobre produtos, entregas, documentação e muito mais.'
    }
  ]
})
</script>