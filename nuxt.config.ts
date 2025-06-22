export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/seo"],

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
});
