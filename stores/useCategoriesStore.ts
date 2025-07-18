// stores/useCategoriesStore.ts
export const useCategoriesStore = defineStore("categories", () => {
  const getSupabaseClient = () => { return useSupabase(); };

  // Estado
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentCategory = ref(null);

  // Types
  interface Category {
    id?: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
    icon?: string;
    is_active: boolean;
    sort_order?: number;
    parent_id?: string;
    meta_title?: string;
    meta_description?: string;
    created_at?: string;
    updated_at?: string;
  }

  interface CategoryWithProducts extends Category {
    products_count?: number;
    children?: Category[];
  }

  // Getters
  const activeCategories = computed(() =>
    categories.value.filter((c: Category) => c.is_active)
  );

  const parentCategories = computed(() =>
    categories.value.filter((c: Category) => !c.parent_id)
  );

  const getCategoriesTree = computed(() => {
    const parents = parentCategories.value;
    return parents.map((parent: Category) => ({
      ...parent,
      children: categories.value.filter(
        (c: Category) => c.parent_id === parent.id
      ),
    }));
  });

  const getCategoryById = (id: string) => {
    return categories.value.find((c: Category) => c.id === id);
  };

  const getCategoryBySlug = (slug: string) => {
    return categories.value.find((c: Category) => c.slug === slug);
  };

  // Actions
  const fetchCategories = async (includeProductCount = false) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      let query = supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (includeProductCount && data) {
        // Buscar contagem de produtos para cada categoria
        const categoriesWithCount = await Promise.all(
          data.map(async (category) => {
            const { count } = await supabase
              .from("products")
              .select("id", { count: "exact", head: true })
              .eq("category_id", category.id)
              .eq("is_active", true);

            return {
              ...category,
              products_count: count || 0,
            };
          })
        );
        categories.value = categoriesWithCount;
      } else {
        categories.value = data || [];
      }

      return { data: categories.value, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar categorias:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoryById = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      currentCategory.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar categoria:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoryBySlug = async (slug: string) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (fetchError) throw fetchError;

      currentCategory.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar categoria por slug:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const createCategory = async (
    categoryData: Omit<Category, "id" | "created_at" | "updated_at">
  ) => {
    try {
      loading.value = true;
      error.value = null;

      // Gerar slug se não fornecido
      if (!categoryData.slug) {
        categoryData.slug = generateSlug(categoryData.name);
      }

      // Verificar se o slug já existe
      const slugExists = await validateSlug(categoryData.slug);
      if (!slugExists) {
        throw new Error("Este slug já está em uso");
      }

      const { data, error: createError } = await supabase
        .from("categories")
        .insert([categoryData])
        .select()
        .single();

      if (createError) throw createError;

      // Adicionar ao estado local
      categories.value.push(data);

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao criar categoria:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updateCategory = async (
    id: string,
    categoryData: Partial<Category>
  ) => {
    try {
      loading.value = true;
      error.value = null;

      const updateData = {
        ...categoryData,
        updated_at: new Date().toISOString(),
      };

      // Verificar slug se foi alterado
      if (categoryData.slug) {
        const slugExists = await validateSlug(categoryData.slug, id);
        if (!slugExists) {
          throw new Error("Este slug já está em uso");
        }
      }

      const { data, error: updateError } = await supabase
        .from("categories")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Atualizar no estado local
      const index = categories.value.findIndex((c: Category) => c.id === id);
      if (index !== -1) {
        categories.value[index] = data;
      }

      if (currentCategory.value?.id === id) {
        currentCategory.value = data;
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar categoria:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      // Verificar se a categoria tem produtos
      const { count } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("category_id", id);

      if (count && count > 0) {
        throw new Error(
          "Não é possível excluir uma categoria que possui produtos"
        );
      }

      // Verificar se a categoria tem subcategorias
      const { count: childrenCount } = await supabase
        .from("categories")
        .select("id", { count: "exact", head: true })
        .eq("parent_id", id);

      if (childrenCount && childrenCount > 0) {
        throw new Error(
          "Não é possível excluir uma categoria que possui subcategorias"
        );
      }

      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Remover do estado local
      const index = categories.value.findIndex((c: Category) => c.id === id);
      if (index !== -1) {
        categories.value.splice(index, 1);
      }

      if (currentCategory.value?.id === id) {
        currentCategory.value = null;
      }

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao excluir categoria:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const toggleCategoryStatus = async (id: string) => {
    try {
      const category = categories.value.find((c: Category) => c.id === id);
      if (!category) throw new Error("Categoria não encontrada");

      return await updateCategory(id, { is_active: !category.is_active });
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao alterar status da categoria:", err);
      return { error: err.message };
    }
  };

  const updateCategoriesOrder = async (
    categoriesOrder: { id: string; sort_order: number }[]
  ) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const updates = categoriesOrder.map(({ id, sort_order }) =>
        supabase
          .from("categories")
          .update({ sort_order, updated_at: new Date().toISOString() })
          .eq("id", id)
      );

      await Promise.all(updates);

      // Reordenar no estado local
      categories.value.sort((a: Category, b: Category) => {
        const orderA =
          categoriesOrder.find((o) => o.id === a.id)?.sort_order || 0;
        const orderB =
          categoriesOrder.find((o) => o.id === b.id)?.sort_order || 0;
        return orderA - orderB;
      });

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar ordem das categorias:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const getCategoryProducts = async (categoryId: string, filters: any = {}) => {
    try {
      let query = supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId);

      // Aplicar filtros
      if (filters.active !== undefined) {
        query = query.eq("is_active", filters.active);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      return { data, error: null };
    } catch (err: any) {
      console.error("Erro ao buscar produtos da categoria:", err);
      return { data: null, error: err.message };
    }
  };

  // Utilitários
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-"); // Remove hífens duplicados
  };

  const validateSlug = async (
    slug: string,
    excludeId?: string
  ): Promise<boolean> => {
    try {
      let query = supabase.from("categories").select("id").eq("slug", slug);

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data } = await query;

      return !data || data.length === 0;
    } catch (err) {
      console.error("Erro ao validar slug:", err);
      return false;
    }
  };

  const getCategoriesOptions = () => {
    return categories.value.map((category: Category) => ({
      value: category.id,
      label: category.name,
      disabled: !category.is_active,
    }));
  };

  const getCategoryName = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.name || categoryId;
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentCategory = () => {
    currentCategory.value = null;
  };

  return {
    // Estado
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    currentCategory: readonly(currentCategory),

    // Getters
    activeCategories,
    parentCategories,
    getCategoriesTree,
    getCategoryById,
    getCategoryBySlug,

    // Actions
    fetchCategories,
    fetchCategoryById,
    fetchCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    updateCategoriesOrder,
    getCategoryProducts,

    // Utilitários
    generateSlug,
    validateSlug,
    getCategoriesOptions,
    getCategoryName,
    clearError,
    clearCurrentCategory,

  };
});
