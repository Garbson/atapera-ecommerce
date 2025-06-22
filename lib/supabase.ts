import { createClient } from "@supabase/supabase-js";

// Tipos TypeScript
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          cpf: string | null;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          cpf?: string | null;
          phone?: string | null;
        };
        Update: {
          name?: string | null;
          cpf?: string | null;
          phone?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          category_id: string;
          stock: number;
          is_active: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          status: string;
          total: number;
          created_at: string;
        };
      };
    };
  };
}

// Variável para armazenar a instância do cliente
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

// Função para criar/obter o cliente Supabase
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    let supabaseUrl: string;
    let supabaseAnonKey: string;

    // Verificar se estamos no server ou client
    if (process.server) {
      // No server-side, usar process.env diretamente
      supabaseUrl = process.env.SUPABASE_URL!;
      supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
    } else {
      // No client-side, usar runtimeConfig
      const config = useRuntimeConfig();
      supabaseUrl = config.public.supabaseUrl as string;
      supabaseAnonKey = config.public.supabaseAnonKey as string;
    }

    // Verificação mais detalhada das variáveis
    if (!supabaseUrl || supabaseUrl === "undefined" || supabaseUrl === "") {
      console.error("❌ SUPABASE_URL não está configurada");
      throw new Error(
        "SUPABASE_URL não está configurada. Verifique o arquivo .env"
      );
    }

    if (
      !supabaseAnonKey ||
      supabaseAnonKey === "undefined" ||
      supabaseAnonKey === ""
    ) {
      console.error("❌ SUPABASE_ANON_KEY não está configurada");
      throw new Error(
        "SUPABASE_ANON_KEY não está configurada. Verifique o arquivo .env"
      );
    }

    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }

  return supabaseClient;
};

// Export compatível com o código existente
export const supabase = {
  get auth() {
    return getSupabaseClient().auth;
  },
  get from() {
    return getSupabaseClient().from.bind(getSupabaseClient());
  },
  get storage() {
    return getSupabaseClient().storage;
  },
  get functions() {
    return getSupabaseClient().functions;
  },
  get realtime() {
    return getSupabaseClient().realtime;
  },
};
