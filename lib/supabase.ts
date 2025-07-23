// lib/supabase.ts - VERSÃO CORRIGIDA
import { createClient } from "@supabase/supabase-js";

// Tipos TypeScript para o banco de dados
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
          slug: string;
          description: string | null;
          short_description: string | null;
          sku: string | null;
          price: number;
          sale_price: number | null;
          category_id: string | null;
          brand: string | null;
          model: string | null;

          // ESTOQUE
          stock: number;
          min_stock: number;

          // DADOS FÍSICOS
          weight: number | null;
          dimensions: any | null;

          // ARRAYS E JSON
          images: string[];
          specifications: any | null;
          target_species: string[] | null;

          // CAMPOS ESPECÍFICOS
          requires_license: boolean;
          license_type: string | null;
          caliber: string | null;
          fishing_type: string | null;

          // STATUS E MÉTRICAS
          is_active: boolean;
          is_featured: boolean;
          views_count: number;
          sales_count: number;

          // SEO
          meta_title: string | null;
          meta_description: string | null;

          // BUSCA
          search_vector: any | null;

          // TIMESTAMPS
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          sku?: string | null;
          price: number;
          sale_price?: number | null;
          category_id?: string | null;
          brand?: string | null;
          model?: string | null;
          stock?: number;
          min_stock?: number;
          weight?: number | null;
          dimensions?: any | null;
          images?: string[];
          specifications?: any | null;
          target_species?: string[] | null;
          requires_license?: boolean;
          license_type?: string | null;
          caliber?: string | null;
          fishing_type?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          views_count?: number;
          sales_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          sku?: string | null;
          price?: number;
          sale_price?: number | null;
          category_id?: string | null;
          brand?: string | null;
          model?: string | null;
          stock?: number;
          min_stock?: number;
          weight?: number | null;
          dimensions?: any | null;
          images?: string[];
          specifications?: any | null;
          target_species?: string[] | null;
          requires_license?: boolean;
          license_type?: string | null;
          caliber?: string | null;
          fishing_type?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          views_count?: number;
          sales_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          parent_id: string | null;
          is_active: boolean;
          created_at: string;
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

// ✅ CORREÇÃO: Criar função para inicializar o cliente
export function createSupabaseClient() {
  // Buscar variáveis de ambiente
  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL e Anon Key são obrigatórios");
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

// ✅ Cliente padrão (pode ser usado fora de contextos Nuxt)
export const supabase = createSupabaseClient();

// ✅ HELPER FUNCTIONS para substituir track_stock logic
export const productHelpers = {
  // Verifica se produto está disponível (substitui track_stock = true)
  isAvailable: (product: Database["public"]["Tables"]["products"]["Row"]) => {
    return product.manage_stock && product.is_active && product.stock > 0;
  },

  // Verifica se produto está em estoque
  inStock: (product: Database["public"]["Tables"]["products"]["Row"]) => {
    return product.stock > 0;
  },

  // Status do estoque
  getStockStatus: (
    product: Database["public"]["Tables"]["products"]["Row"]
  ) => {
    if (!product.is_active) return "inactive";
    if (product.stock === 0) return "out_of_stock";
    if (product.stock <= product.min_stock) return "low_stock";
    return "in_stock";
  },
};

// ✅ QUERY BUILDERS corretos
export const productQueries = {
  // Em vez de WHERE track_stock = true
  getAvailableProducts: () =>
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("manage_stock", true)
      .gt("stock", 0),

  // Produtos em estoque
  getInStockProducts: () =>
    supabase.from("products").select("*").eq("is_active", true).gt("stock", 0),
};

export default supabase;
