// plugins/supabase.client.ts
export default defineNuxtPlugin(() => {
  // Reutiliza a instância única do composable (evita múltiplos GoTrueClient)
  const supabase = useSupabase();

  return {
    provide: {
      supabase,
    },
  };
});
