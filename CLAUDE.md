# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desenvolvimento

### Execução e Build
- `npm run dev` - Inicia o servidor de desenvolvimento na porta 3000
- `npm run build` - Faz build da aplicação para produção
- `npm run preview` - Preview local do build de produção
- `npm run generate` - Gera versão estática da aplicação

### Instalação
- `npm install` - Instala todas as dependências do projeto

## Arquitetura do Projeto

### Stack Tecnológica
- **Framework**: Nuxt 3 com Vue 3 e TypeScript
- **UI**: Tailwind CSS + Headless UI + Heroicons
- **Estado**: Pinia stores para gerenciamento de estado
- **Backend**: Supabase (autenticação, banco de dados)
- **Pagamentos**: Stripe com suporte a PIX, cartão de débito/crédito
- **Upload de Imagens**: Cloudinary
- **SEO**: Módulo @nuxtjs/seo

### Estrutura de Pastas

#### /stores
Gerenciamento de estado com Pinia:
- `cart.ts` - Carrinho de compras com suporte a cores e métodos de pagamento
- `useAuthStore.ts` - Autenticação e perfil do usuário
- `useProductsStore.ts` - Produtos e categorias
- `useOrdersStore.ts` - Pedidos e histórico
- `useCategoriesStore.ts` - Categorias de produtos
- `useAddressStore.ts` - Endereços de entrega
- `useDashboardStore.ts` - Dashboard administrativo
- `useUserProfileStore.ts` - Perfil do usuário

#### /composables
Funções reutilizáveis:
- `useAuth.ts` - Sistema de autenticação com Supabase (singleton global)
- `useSupabase.ts` - Cliente Supabase configurado
- `useStripe.ts` - Integração com Stripe
- `useCloudinary.ts` - Upload e gerenciamento de imagens
- `useApiClient.ts` - Cliente HTTP personalizado
- `useNotifications.ts` - Sistema de notificações toast
- `useWhatsApp.ts` - Integração com WhatsApp

#### /pages
Páginas da aplicação seguindo roteamento automático do Nuxt:
- `/admin/*` - Páginas administrativas
- `/auth/*` - Páginas de autenticação
- `/categoria/*` - Páginas de categorias
- `/produtos/*` - Páginas de produtos
- `/minha-conta/*` - Área do usuário

#### /middleware
- `auth.ts` - Proteção de rotas autenticadas
- `admin.ts` - Proteção de rotas administrativas
- `guest.ts` - Rotas apenas para usuários não autenticados
- `admin-auth.ts` - Autenticação específica para admin

#### /server/api
APIs Nuxt server:
- `/stripe/*` - Endpoints para pagamentos Stripe
- Webhooks e processamento de pagamentos

### Padrões Arquiteturais

#### Sistema de Autenticação
- Utiliza composable `useAuth()` com estado global singleton
- Supabase para autenticação e gerenciamento de usuários
- Sistema de roles com verificação de emails administrativos
- Perfis de usuário com endereços e preferências

#### Carrinho de Compras
- Store Pinia (`cart.ts`) com persistência
- Suporte a seleção de cores de produtos
- Múltiplos métodos de pagamento (PIX, débito, crédito)
- Cálculo de parcelamento e preços à vista

#### Sistema de Produtos
- Estrutura com categorias hierárquicas
- Suporte a produtos que requerem licença
- Múltiplas imagens e variações de cor
- Preços diferenciados (à vista vs parcelado)

#### Integração com Stripe
- Suporte completo a PIX brasileiro
- Processamento de cartões de crédito/débito
- Sistema de webhooks para confirmação de pagamentos
- Intent de pagamento para segurança

### Configurações Importantes

#### Variáveis de Ambiente (.env)
- `SUPABASE_URL` e `SUPABASE_ANON_KEY` - Configuração Supabase
- `STRIPE_PUBLISHABLE_KEY` e `STRIPE_SECRET_KEY` - Stripe
- `CLOUDINARY_*` - Configurações Cloudinary
- Configuradas no `nuxt.config.ts` em `runtimeConfig`

#### SEO e Meta
- Site configurado para "Atapera" (e-commerce de armas e equipamentos)
- URL: https://atapera.shop
- Meta tags otimizadas para produtos de pesca, caça e armas

### Considerações Específicas

#### Hot Reload
- Configurado polling para ambientes de desenvolvimento
- HMR na porta 24678 para evitar conflitos

#### Componentes
- Auto-import configurado para pasta `/components`
- Uso de Headless UI para componentes acessíveis
- Tailwind CSS para estilização

#### Estado Global
- Pinia configurado com auto-import de stores
- Estados persistentes para carrinho e autenticação
- Stores organizados por domínio (produtos, auth, cart, etc.)