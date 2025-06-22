<!-- components/MobileNavigation.vue -->
<template>
  <div class="lg:hidden">
    <!-- Botão menu mobile -->
    <button @click="toggleMenu" class="p-2">
      <Bars3Icon class="h-6 w-6" />
    </button>

    <!-- Menu mobile overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-50">
      <div class="bg-black bg-opacity-50" @click="closeMenu"></div>

      <div class="fixed left-0 top-0 h-full w-80 bg-white">
        <div class="p-4">
          <button @click="closeMenu" class="float-right">
            <XMarkIcon class="h-6 w-6" />
          </button>

          <nav class="mt-8 space-y-4">
            <NuxtLink to="/" @click="closeMenu">Início</NuxtLink>
            <NuxtLink to="/produtos" @click="closeMenu">Produtos</NuxtLink>
            <NuxtLink to="/categoria/armas-fogo" @click="closeMenu"
              >Armas de Fogo</NuxtLink
            >
            <NuxtLink to="/categoria/pesca" @click="closeMenu">Pesca</NuxtLink>
            <!-- mais links -->
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
