// lib/supabase.ts
// Mantém apenas os tipos Database para tipagem compartilhada

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
          avista_price: number | null;
          parcelado_price: number | null;
          category_id: string | null;
          brand: string | null;
          model: string | null;
          subcategory: string | null;

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
          avista_price?: number | null;
          parcelado_price?: number | null;
          category_id?: string | null;
          brand?: string | null;
          model?: string | null;
          subcategory?: string | null;
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
          avista_price?: number | null;
          parcelado_price?: number | null;
          category_id?: string | null;
          brand?: string | null;
          model?: string | null;
          subcategory?: string | null;
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
// Observação: a instância do Supabase é criada apenas via composable useSupabase
