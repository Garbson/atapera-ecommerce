<template>
  <CategoryPageTemplate 
    :key="route.params.slug"
    :category-data="categoryConfig" 
    :quick-categories="categoryConfig?.quickCategories || []"
  />
</template>

<script setup lang="ts">
import { getCategoryConfig } from '~/config/categories.ts';

const route = useRoute();

// Configuração da categoria reativa baseada na rota
const categoryConfig = computed(() => {
  const slug = route.params.slug as string;
  return getCategoryConfig(slug);
});

// Verificar se a categoria existe
if (!categoryConfig.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Categoria não encontrada'
  });
}

// SEO reativo
watchEffect(() => {
  if (categoryConfig.value) {
    useSeoMeta({
      title: `${categoryConfig.value.title} | Atapera`,
      description: categoryConfig.value.description,
      keywords: categoryConfig.value.slug
    });
  }
});
</script>