export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],

  // Configuração das variáveis de runtime (necessário para client-side)
  runtimeConfig: {
    // Variáveis privadas (apenas server-side)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    // Variáveis públicas (acessíveis no client-side)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },

  // Configuração de componentes
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // Configurações SEO globais
  site: {
    url: "https://atapera.shop",
    name: "Atapera",
    description: "Especialistas em armas, equipamentos de pesca e caça",
    defaultLocale: "pt-BR",
  },

  // Meta tags padrão
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Atapera - Armas, Pesca e Aventura",
      meta: [
        {
          name: "description",
          content:
            "Armas registradas, equipamentos de pesca e acessórios para caça esportiva",
        },
      ],
    },
  },

  // CSS global
  css: [],

  // Configurações de desenvolvimento
  devtools: { enabled: true },

  // SSR
  ssr: true,

  // Configuração do Pinia
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
