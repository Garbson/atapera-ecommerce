export default defineNuxtPlugin(async () => {
  // Só executa no client-side
  if (process.server) return;

  try {
    const { initAuth } = useAuth();

    // Inicializar a autenticação automaticamente
    await initAuth();
  } catch (error) {
    console.error("❌ Erro ao inicializar autenticação:", error);

    // Se for erro de configuração, mostra instruções
    if (
      error.message?.includes("SUPABASE_URL") ||
      error.message?.includes("SUPABASE_ANON_KEY")
    ) {
      console.log("\n🔧 Para corrigir este erro:");
      console.log("1. Crie um arquivo .env na raiz do projeto");
      console.log("2. Adicione suas credenciais do Supabase:");
      console.log("   SUPABASE_URL=https://seu-projeto.supabase.co");
      console.log("   SUPABASE_ANON_KEY=sua-chave-anonima");
      console.log("3. Reinicie o servidor de desenvolvimento");
      console.log(
        "\n📚 Encontre suas credenciais em: https://app.supabase.com → Seu Projeto → Settings → API"
      );
    }
  }
});
