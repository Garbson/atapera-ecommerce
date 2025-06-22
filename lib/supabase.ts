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
          // ... outros campos
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
          // ... outros campos
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
    // Acessar variáveis de ambiente diretamente
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    // Verificação mais detalhada das variáveis
    if (!supabaseUrl || supabaseUrl === "undefined" || supabaseUrl === "") {
      console.error("❌ SUPABASE_URL não está configurada no arquivo .env");
      console.error("📝 Crie um arquivo .env na raiz do projeto com:");
      console.error("   SUPABASE_URL=https://seu-projeto.supabase.co");
      throw new Error(
        "SUPABASE_URL não está configurada. Verifique o arquivo .env"
      );
    }

    if (
      !supabaseAnonKey ||
      supabaseAnonKey === "undefined" ||
      supabaseAnonKey === ""
    ) {
      console.error(
        "❌ SUPABASE_ANON_KEY não está configurada no arquivo .env"
      );
      console.error("📝 Crie um arquivo .env na raiz do projeto com:");
      console.error("   SUPABASE_ANON_KEY=sua-chave-anonima");
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
