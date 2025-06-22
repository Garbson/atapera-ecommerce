<!-- pages/index.vue - Versão simplificada -->
<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Categorias em Destaque -->
    <CategoriesSection />

    <!-- Produtos em Destaque -->
    <FeaturedProducts />

    <!-- Sobre a Atapera -->
    <AboutSection />

    <!-- Newsletter -->
    <NewsletterSection />
  </div>
</template>

<script setup lang="ts">
// SEO usando apenas APIs nativas do Nuxt
useHead({
  title: "Atapera - Armas, Pesca e Aventura",
  meta: [
    {
      name: "description",
      content:
        "Armas registradas, equipamentos de pesca e acessórios para caça esportiva. Qualidade e segurança garantidas.",
    },
    {
      property: "og:title",
      content: "Atapera - Equipamentos para Caça e Pesca",
    },
    {
      property: "og:description",
      content:
        "Especialistas em armamento e equipamentos outdoor. Armas de fogo, pressão, airsoft, pesca e caça.",
    },
    {
      property: "og:image",
      content: "/images/og-atapera.jpg",
    },
    {
      property: "og:url",
      content: "https://atapera.shop",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Atapera - Armas, Pesca e Aventura",
    },
    {
      name: "twitter:description",
      content: "Especialistas em armamento e equipamentos outdoor",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Atapera",
        url: "https://atapera.shop",
        logo: "https://atapera.shop/logo.png",
        description:
          "Loja especializada em armas, equipamentos de pesca e caça",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          addressRegion: "SP",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-11-99999-9999",
          contactType: "customer service",
        },
      }),
    },
  ],
});
</script>
