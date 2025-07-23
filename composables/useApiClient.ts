// composables/useApiClient.ts
export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  loading?: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiFilters {
  search?: string;
  category?: string;
  status?: string | boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const useApiClient = () => {
  // Função para obter o cliente Supabase de forma segura
  const getSupabaseClient = () => {
    try {
      return useSupabaseClient();
    } catch (error) {
      console.error('Erro ao obter cliente Supabase:', error);
      return null;
    }
  };

  // Método centralizado para execução de queries com error handling
  const executeQuery = async <T>(
    queryFn: () => Promise<any>,
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<T>> => {
    try {
      if (loadingRef) loadingRef.value = true;
      if (errorRef) errorRef.value = null;

      const result = await queryFn();
      
      if (result.error) {
        throw result.error;
      }

      return {
        data: result.data,
        error: null,
      };
    } catch (err: any) {
      const errorMessage = err.message || 'Erro desconhecido';
      if (errorRef) errorRef.value = errorMessage;
      console.error('API Error:', err);
      
      return {
        data: null,
        error: errorMessage,
      };
    } finally {
      if (loadingRef) loadingRef.value = false;
    }
  };

  // Método para queries com paginação
  const executePaginatedQuery = async <T>(
    tableName: string,
    filters: ApiFilters = {},
    select: string = '*',
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<PaginatedResponse<T>>> => {
    try {
      if (loadingRef) loadingRef.value = true;
      if (errorRef) errorRef.value = null;

      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Cliente Supabase não disponível');
      }

      let query = supabase.from(tableName).select(select, { count: 'exact' });

      // Aplicar filtros de busca
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Aplicar filtros específicos
      Object.entries(filters).forEach(([key, value]) => {
        if (key !== 'search' && key !== 'page' && key !== 'limit' && value !== undefined) {
          if (typeof value === 'boolean') {
            query = query.eq(key, value);
          } else if (key.endsWith('_id') || key === 'category') {
            query = query.eq(key.replace('category', 'category_id'), value);
          } else {
            query = query.eq(key, value);
          }
        }
      });

      // Aplicar paginação
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      query = query.range(from, to);
      
      // Ordenação padrão
      query = query.order('created_at', { ascending: false });

      const result = await query;
      
      if (result.error) {
        throw result.error;
      }

      const total = result.count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        data: {
          data: result.data || [],
          total,
          page,
          limit,
          totalPages,
        },
        error: null,
      };
    } catch (err: any) {
      const errorMessage = err.message || 'Erro desconhecido';
      if (errorRef) errorRef.value = errorMessage;
      console.error('Paginated API Error:', err);
      
      return {
        data: null,
        error: errorMessage,
      };
    } finally {
      if (loadingRef) loadingRef.value = false;
    }
  };

  // CRUD genérico
  const createRecord = async <T>(
    tableName: string,
    data: Partial<T>,
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<T>> => {
    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).insert([data]).select().single();
      },
      loadingRef,
      errorRef
    );
  };

  const updateRecord = async <T>(
    tableName: string,
    id: string,
    data: Partial<T>,
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<T>> => {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).update(updateData).eq('id', id).select().single();
      },
      loadingRef,
      errorRef
    );
  };

  const deleteRecord = async (
    tableName: string,
    id: string,
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<void>> => {
    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).delete().eq('id', id);
      },
      loadingRef,
      errorRef
    );
  };

  const fetchById = async <T>(
    tableName: string,
    id: string,
    select: string = '*',
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<T>> => {
    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).select(select).eq('id', id).single();
      },
      loadingRef,
      errorRef
    );
  };

  const fetchByField = async <T>(
    tableName: string,
    field: string,
    value: any,
    select: string = '*',
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<T>> => {
    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).select(select).eq(field, value).single();
      },
      loadingRef,
      errorRef
    );
  };

  // Bulk operations
  const bulkUpdate = async <T>(
    tableName: string,
    ids: string[],
    data: Partial<T>,
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<void>> => {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).update(updateData).in('id', ids);
      },
      loadingRef,
      errorRef
    );
  };

  const bulkDelete = async (
    tableName: string,
    ids: string[],
    loadingRef?: Ref<boolean>,
    errorRef?: Ref<string | null>
  ): Promise<ApiResponse<void>> => {
    return executeQuery(
      () => {
        const supabase = getSupabaseClient();
        if (!supabase) throw new Error('Cliente Supabase não disponível');
        return supabase.from(tableName).delete().in('id', ids);
      },
      loadingRef,
      errorRef
    );
  };

  // Validações
  const validateUnique = async (
    tableName: string,
    field: string,
    value: string,
    excludeId?: string
  ): Promise<boolean> => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error('Cliente Supabase não disponível para validação');
        return false;
      }

      let query = supabase.from(tableName).select('id').eq(field, value);
      
      if (excludeId) {
        query = query.neq('id', excludeId);
      }
      
      const { data } = await query;
      return !data || data.length === 0;
    } catch (err) {
      console.error(`Erro ao validar ${field}:`, err);
      return false;
    }
  };

  // Utilitários
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens duplicados
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return {
    // Core methods
    executeQuery,
    executePaginatedQuery,
    
    // CRUD
    createRecord,
    updateRecord,
    deleteRecord,
    fetchById,
    fetchByField,
    
    // Bulk
    bulkUpdate,
    bulkDelete,
    
    // Validações
    validateUnique,
    
    // Utilitários
    generateSlug,
    formatCurrency,
    formatDate,
  };
};