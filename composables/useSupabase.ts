// composables/useSupabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase";

// ✅ Cache da instância
const supabaseInstances = new Map<
  string,
  ReturnType<typeof createClient<Database>>
>();

export const useSupabase = () => {
  const config = useRuntimeConfig();

  // Chave única baseada na URL (útil para multi-tenant)
  const instanceKey = `${config.public.supabaseUrl}-${config.public.supabaseAnonKey}`;

  // Verifica se já existe uma instância para essa configuração
  if (supabaseInstances.has(instanceKey)) {
    return supabaseInstances.get(instanceKey)!;
  }

  // Cria nova instância apenas se necessário
  const supabase = createClient<Database>(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    }
  );

  // Armazena no cache
  supabaseInstances.set(instanceKey, supabase);

  return supabase;
};
