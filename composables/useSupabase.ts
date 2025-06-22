// composables/useSupabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase";

export const useSupabase = () => {
  // ✅ CORRETO: useRuntimeConfig dentro de um composable
  const config = useRuntimeConfig();

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

  return supabase;
};
