export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  // ✅ ADICIONAR: Configuração do Vite para hot reload
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
      hmr: {
        port: 24678,
        overlay: true,
      },
    },
  },

  // ✅ ADICIONAR: Configuração experimental para watcher
  experimental: {
    watcher: "chokidar",
  },

  // Configuração das variáveis de runtime (necessário para client-side)
  runtimeConfig: {
    // ... suas configurações existentes ...
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  },

  // ... resto das suas configurações permanecem iguais ...
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  site: {
    url: "https://atapera.shop",
    name: "Atapera",
    description: "Especialistas em armas, equipamentos de pesca e caça",
    defaultLocale: "pt-BR",
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Atapera - Armas, Pesca e Aventura",
      meta: [
        {
          name: "description",
          content:
            "Armas registradas, equipamentos de pesca e equipamentos para caça esportiva",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },

  css: [],

  devtools: { enabled: true },

  ssr: true,

  pinia: {
    storesDirs: ["./stores/**"],
  },
});
