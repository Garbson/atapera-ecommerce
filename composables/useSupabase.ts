// composables/useSupabase.ts
import { createClient } from "@supabase/supabase-js";

// ✅ Cache da instância - temporariamente sem tipagem para evitar conflitos
const supabaseInstances = new Map<string, any>();

// Chave do Remember Me
const REMEMBER_KEY = "APP_REMEMBER_ME";

// Le a preferência atual de persistência (default: lembrar)
export const getRememberPreference = (): boolean => {
  if (typeof localStorage === "undefined") return true;
  const v = localStorage.getItem(REMEMBER_KEY);
  return v === null ? true : v === "1";
};

// Define a preferência de persistência
export const setRememberPreference = (remember: boolean) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
};

// ✅ FUNÇÃO PARA LIMPAR CACHE QUANDO NECESSÁRIO
export const clearSupabaseCache = () => {
  console.log("🧹 Limpando cache do Supabase...");
  supabaseInstances.clear();
};

// ✅ FUNÇÃO PARA FORÇAR NOVA INSTÂNCIA (útil para problemas de sessão)
export const refreshSupabaseInstance = () => {
  console.log("🔄 Forçando nova instância do Supabase...");
  clearSupabaseCache();
  return useSupabase();
};

export const useSupabase = () => {
  const config = useRuntimeConfig();
  const isClient = typeof window !== "undefined";

  // Chave única baseada em URL + ambiente (independente da preferência)
  const instanceKey = `${config.public.supabaseUrl}-${
    config.public.supabaseAnonKey
  }-${isClient ? "client" : "ssr"}`;

  // Verifica se já existe uma instância para essa configuração
  if (supabaseInstances.has(instanceKey)) {
    return supabaseInstances.get(instanceKey)!;
  }

  // Adapter dinâmico de storage (migra sessão automaticamente ao trocar preferência)
  const storage = isClient
    ? {
        getItem(key: string) {
          try {
            const preferLocal = getRememberPreference();
            const primary = preferLocal ? localStorage : sessionStorage;
            const secondary = preferLocal ? sessionStorage : localStorage;
            let val = primary.getItem(key);
            if (val == null) {
              val = secondary.getItem(key);
              if (val != null) {
                // migrar para o storage preferido
                primary.setItem(key, val);
                try {
                  secondary.removeItem(key);
                } catch {}
              }
            }
            return val;
          } catch {
            return null as any;
          }
        },
        setItem(key: string, value: string) {
          try {
            const preferLocal = getRememberPreference();
            const primary = preferLocal ? localStorage : sessionStorage;
            primary.setItem(key, value);
          } catch {}
        },
        removeItem(key: string) {
          try {
            localStorage.removeItem(key);
          } catch {}
          try {
            sessionStorage.removeItem(key);
          } catch {}
        },
      }
    : undefined;

  // Cria nova instância apenas se necessário - sem tipagem temporariamente
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    isClient
      ? {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            storage,
          },
        }
      : {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
          },
        }
  );

  // Armazena no cache
  supabaseInstances.set(instanceKey, supabase);

  return supabase;
};
