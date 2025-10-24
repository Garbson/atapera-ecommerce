// composables/useSupabaseWithRetry.ts
export const useSupabaseWithRetry = () => {
  const supabase = useSupabase();
  const { withTokenRefresh } = useTokenRefresh();

  // Wrapper para operações do Supabase com retry automático
  const executeWithRetry = async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    return await withTokenRefresh(operation);
  };

  // Métodos específicos para operações comuns
  const select = <T>(table: string) => {
    return {
      ...supabase.from(table),
      execute: async () => executeWithRetry(() => supabase.from(table).select())
    };
  };

  const insert = async <T>(table: string, data: any) => {
    return await executeWithRetry(() => supabase.from(table).insert(data));
  };

  const update = async <T>(table: string, data: any) => {
    return await executeWithRetry(() => supabase.from(table).update(data));
  };

  const deleteFrom = async <T>(table: string) => {
    return await executeWithRetry(() => supabase.from(table).delete());
  };

  // Wrapper para storage operations
  const storage = {
    upload: async (bucket: string, path: string, file: File, options?: any) => {
      return await executeWithRetry(() =>
        supabase.storage.from(bucket).upload(path, file, options)
      );
    },

    remove: async (bucket: string, paths: string[]) => {
      return await executeWithRetry(() =>
        supabase.storage.from(bucket).remove(paths)
      );
    },

    getPublicUrl: (bucket: string, path: string) => {
      return supabase.storage.from(bucket).getPublicUrl(path);
    }
  };

  return {
    executeWithRetry,
    select,
    insert,
    update,
    delete: deleteFrom,
    storage,
    // Expor supabase original caso necessário
    supabase
  };
};