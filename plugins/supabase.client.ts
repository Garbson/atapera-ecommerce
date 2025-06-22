// plugins/supabase.client.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Criar cliente Supabase
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

  // Disponibilizar globalmente
  return {
    provide: {
      supabase,
    },
  };
});
