<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Processando login...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { initAuth } = useAuth();

onMounted(async () => {
  await initAuth();
  await navigateTo("/");
});
</script>
