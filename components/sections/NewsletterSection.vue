<!-- components/sections/NewsletterSection.vue -->
<template>
  <section class="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold mb-4">
          Fique por dentro das novidades!
        </h2>
        <p class="text-xl mb-8 text-red-100">
          Receba ofertas exclusivas, novos produtos e dicas sobre equipamentos outdoor diretamente no seu e-mail
        </p>
        
        <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
          <div class="flex gap-2 mb-4">
            <input
              v-model="email"
              type="email"
              placeholder="Seu melhor e-mail"
              required
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Enviando...' : 'Inscrever' }}
            </button>
          </div>
          
          <p class="text-sm text-red-100">
            Ao se inscrever, você concorda com nossa 
            <NuxtLink to="/privacidade" class="underline hover:text-white">
              Política de Privacidade
            </NuxtLink>
          </p>
        </form>
        
        <!-- Success Message -->
        <div v-if="success" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p class="font-semibold">✓ Inscrição realizada com sucesso!</p>
          <p class="text-sm">Você receberá nossas novidades em breve.</p>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p class="font-semibold">✗ Erro ao realizar inscrição</p>
          <p class="text-sm">{{ error }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const email = ref('');
const loading = ref(false);
const success = ref(false);
const error = ref('');

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;
  
  try {
    // Simular envio da newsletter
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success.value = true;
    email.value = '';
    
    // Limpar mensagem de sucesso após 5 segundos
    setTimeout(() => {
      success.value = false;
    }, 5000);
    
  } catch (err) {
    error.value = 'Erro ao processar inscrição. Tente novamente.';
    console.error('Newsletter error:', err);
  } finally {
    loading.value = false;
  }
};
</script>