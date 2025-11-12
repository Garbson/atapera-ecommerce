<template>
  <CategoryPageTemplate
    :key="route.params.slug"
    :category-data="categoryConfig"
    :quick-categories="categoryConfig?.quickCategories || []"
  />
</template>

<script setup lang="ts">
import { getCategoryConfig } from '~/config/categories';

const route = useRoute();

// Obter configuração da categoria
const categoryConfig = getCategoryConfig(route.params.slug as string);

// Verificar se a categoria existe
if (!categoryConfig) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Categoria não encontrada'
  });
}

// SEO
useSeoMeta({
  title: `${categoryConfig.title} | Atapera`,
  description: categoryConfig.description,
  keywords: categoryConfig.slug
});
</script>