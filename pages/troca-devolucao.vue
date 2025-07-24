<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">Trocas e Devoluções</h1>
          <p class="text-xl text-gray-300 leading-relaxed">
            Sua satisfação é nossa prioridade. Conheça nossa política de trocas e devoluções 
            e saiba como proceder caso precise trocar ou devolver um produto.
          </p>
        </div>
      </div>
    </section>

    <!-- Política Geral -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 class="text-2xl font-bold text-green-800">Garantia de Satisfação</h2>
            </div>
            <p class="text-green-700 leading-relaxed">
              Oferecemos <strong>7 dias</strong> para trocas e devoluções de produtos sem uso, 
              em perfeitas condições e com embalagem original. Para produtos com defeito, 
              a garantia segue o Código de Defesa do Consumidor.
            </p>
          </div>

          <!-- Quando é possível trocar/devolver -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Quando é Possível Trocar ou Devolver</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Aceitas -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Situações Aceitas
                </h3>
                <ul class="space-y-2 text-green-700">
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    Produto sem uso e com embalagem original
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    Defeito de fabricação
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    Produto diferente do pedido
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    Arrependimento da compra (7 dias)
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    Avaria no transporte
                  </li>
                </ul>
              </div>

              <!-- Não Aceitas -->
              <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Situações Não Aceitas
                </h3>
                <ul class="space-y-2 text-red-700">
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Produtos com sinais de uso
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Embalagem violada ou danificada
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Produtos personalizados
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Prazo de 7 dias expirado
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Munições e pólvoras (por segurança)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Passo a Passo -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Como Solicitar Troca ou Devolução</h2>
            
            <div class="space-y-6">
              <!-- Passo 1 -->
              <div class="flex gap-6">
                <div class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Solicite o Atendimento</h3>
                  <p class="text-gray-600 leading-relaxed mb-3">
                    Entre em contato conosco através do WhatsApp +55 (68) 9282-7730. 
                    Tenha em mãos o número do pedido e descreva o motivo da solicitação.
                  </p>
                  <div class="flex gap-3">
                    <a href="https://wa.me/5568928277300" class="text-green-600 hover:text-green-800 font-medium">
                      WhatsApp
                    </a>
                    <span class="text-gray-300">•</span>
                    <a href="https://instagram.com/atapera.oficial" target="_blank" class="text-pink-600 hover:text-pink-800 font-medium">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              <!-- Passo 2 -->
              <div class="flex gap-6">
                <div class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Análise da Solicitação</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Nossa equipe analisará sua solicitação e, se aprovada, fornecerá instruções específicas 
                    para devolução do produto. Você receberá um código de autorização que deve acompanhar o produto.
                  </p>
                </div>
              </div>

              <!-- Passo 3 -->
              <div class="flex gap-6">
                <div class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Envio do Produto</h3>
                  <p class="text-gray-600 leading-relaxed mb-3">
                    Embale o produto com cuidado, incluindo todos os acessórios, manuais e embalagem original. 
                    Envie pelos Correios ou transportadora indicada com o código de autorização.
                  </p>
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p class="text-yellow-800 text-sm">
                      <strong>Importante:</strong> O frete de devolução fica por conta do cliente, 
                      exceto em casos de defeito comprovado ou erro da nossa parte.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Passo 4 -->
              <div class="flex gap-6">
                <div class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Processamento</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Após recebermos o produto, nossa equipe fará a análise técnica. Se aprovada, 
                    o reembolso será processado em até 5 dias úteis na mesma forma de pagamento utilizada na compra.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações Importantes -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Informações Importantes</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Prazos -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-blue-800 mb-4">Prazos</h3>
                <ul class="space-y-2 text-blue-700">
                  <li><strong>Arrependimento:</strong> 7 dias corridos</li>
                  <li><strong>Defeito:</strong> 30 dias (produtos duráveis)</li>
                  <li><strong>Reembolso:</strong> Até 5 dias úteis</li>
                  <li><strong>Análise:</strong> Até 3 dias úteis</li>
                </ul>
              </div>

              <!-- Custos -->
              <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-purple-800 mb-4">Custos</h3>
                <ul class="space-y-2 text-purple-700">
                  <li><strong>Frete de devolução:</strong> Por conta do cliente*</li>
                  <li><strong>Frete de reenvio:</strong> Por nossa conta</li>
                  <li><strong>Taxa de restituição:</strong> Não cobramos</li>
                  <li class="text-sm">*Exceto defeitos ou erros nossos</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Produtos Especiais -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Produtos com Regras Especiais</h2>
            
            <div class="space-y-6">
              <!-- Armas de Fogo -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  🔫 Armas de Fogo
                </h3>
                <p class="text-gray-600 mb-3">
                  Devido à legislação específica, armas de fogo têm processo diferenciado:
                </p>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• Apenas por defeito comprovado</li>
                  <li>• Necessário laudo técnico</li>
                  <li>• Processo via fabricante</li>
                  <li>• Prazo estendido para análise</li>
                </ul>
              </div>

              <!-- Munições -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  🎯 Munições e Pólvoras
                </h3>
                <p class="text-gray-600 mb-3">
                  Por questões de segurança e legislação:
                </p>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• Não aceitas para devolução</li>
                  <li>• Apenas troca por defeito</li>
                  <li>• Análise técnica obrigatória</li>
                  <li>• Procedimentos especiais</li>
                </ul>
              </div>

              <!-- Equipamentos Eletrônicos -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  📱 Equipamentos Eletrônicos
                </h3>
                <p class="text-gray-600 mb-3">
                  Para lunetas, cronógrafos, rádios e similares:
                </p>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• Garantia estendida disponível</li>
                  <li>• Suporte técnico especializado</li>
                  <li>• Testes antes da devolução</li>
                  <li>• Atualização de firmware quando aplicável</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contato Especializado -->
          <div class="bg-gray-50 rounded-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              Precisa de Ajuda com Trocas e Devoluções?
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div class="text-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">WhatsApp</h3>
                <p class="text-gray-600 text-sm mb-2">+55 (68) 9282-7730</p>
                <a href="https://wa.me/5568928277300" class="text-green-600 hover:text-green-800 text-sm font-medium">
                  Iniciar Conversa
                </a>
              </div>

              <div class="text-center">
                <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">Instagram</h3>
                <p class="text-gray-600 text-sm mb-2">@atapera.oficial</p>
                <a href="https://instagram.com/atapera.oficial" target="_blank" class="text-pink-600 hover:text-pink-800 text-sm font-medium">
                  Seguir
                </a>
              </div>
            </div>

            <div class="text-center mt-6">
              <p class="text-gray-600 text-sm">
                <strong>Horário de Atendimento:</strong> Segunda a Sexta das 8h às 18h, Sábado das 8h às 12h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Trocas e Devoluções - Atapera',
  meta: [
    {
      name: 'description',
      content: 'Política de trocas e devoluções da Atapera. Saiba como trocar ou devolver produtos, prazos, condições e procedimentos para garantir sua satisfação.'
    },
    {
      property: 'og:title',
      content: 'Trocas e Devoluções - Atapera'
    },
    {
      property: 'og:description',
      content: '7 dias para trocas e devoluções. Conheça nossa política, procedimentos e garanta sua satisfação total na compra.'
    }
  ]
})
</script>