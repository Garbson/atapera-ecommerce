<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Minha Conta</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Sidebar -->
      <div class="md:col-span-1">
        <nav class="space-y-2">
          <NuxtLink
            to="/minha-conta"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Dados Pessoais
          </NuxtLink>
          <NuxtLink
            to="/minha-conta/pedidos"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Meus Pedidos
          </NuxtLink>
          <NuxtLink
            to="/minha-conta/enderecos"
            class="block px-4 py-2 rounded-lg hover:bg-gray-100"
            active-class="bg-red-100 text-red-700"
          >
            Endereços
          </NuxtLink>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-red-600"
          >
            Sair
          </button>
        </nav>
      </div>

      <!-- Conteúdo -->
      <div class="md:col-span-2">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { signOut } = useAuth();

const handleLogout = async () => {
  await signOut();
};
</script>
