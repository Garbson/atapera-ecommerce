// stores/useProductsStore.ts
export const useProductsStore = defineStore("products", () => {
  // Função para obter cliente Supabase
  const getSupabaseClient = () => {
    return useSupabase();
  };

  // Estado
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentProduct = ref<Product | null>(null);

  // Types
  interface ProductVariant {
    size: string;
    price: number;
    stock?: number;
    sku?: string;
    forOrder?: boolean;
  }

  interface Product {
    id?: string;
    name: string;
    slug: string;
    description?: string;
    short_description?: string;
    price: number;
    sale_price?: number;
    category_id: string;
    brand?: string;
    model?: string;
    color?: string[];
    variants?: ProductVariant[];
    sku: string;
    stock: number;
    min_stock: number;
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    images?: string[];
    requires_license: boolean;
    license_type?: string;
    caliber?: string;
    is_active: boolean;
    is_featured: boolean;
    forOrder: boolean;
    meta_title?: string;
    meta_description?: string;
    created_at?: string;
    updated_at?: string;
  }

  interface ProductFilters {
    search?: string;
    category?: string;
    status?: string | boolean;
    featured?: boolean;
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    minPrice?: number | string;
    maxPrice?: number | string;
    subcategory?: string;
    brand?: string;
    caliber?: string;
    model?: string;
    requires_license?: boolean;
    has_sale?: boolean; // Para produtos em promoção
    [key: string]: any; // Para filtros dinâmicos
  }

  // Getters
  const activeProducts = computed(() =>
    products.value.filter((p: Product) => p.is_active)
  );

  const featuredProducts = computed(() =>
    products.value.filter((p: Product) => p.is_featured && p.is_active)
  );

  const lowStockProducts = computed(() =>
    products.value.filter((p: Product) => p.stock <= (p.min_stock || 5))
  );

  const outOfStockProducts = computed(() =>
    products.value.filter((p: Product) => p.stock === 0)
  );

  const productsByCategory = computed(() => {
    const grouped: Record<string, Product[]> = {};
    products.value.forEach((product: Product) => {
      const key = product.category_id || "unknown";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(product);
    });
    return grouped;
  });

  // Actions
  const fetchProducts = async (filters: ProductFilters = {}) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const config = useRuntimeConfig();
      // ✅ FORÇAR CHAMADA SEMPRE - SEM CACHE + TIMESTAMP ÚNICO
      const timestamp = Date.now();
      // ✅ QUERY SEGURA - Fallback se JOIN falhar
      let query: any;
      try {
        // Tentar com JOIN primeiro
        query = supabase
          .from("products")
          .select("*, categories(name)", { count: "exact", head: false })
          .limit(1000)
          .order("updated_at", { ascending: false });
      } catch (joinError) {
        console.warn(
          "❌ JOIN com categories falhou, usando query simples:",
          joinError
        );
        // Fallback para query simples
        query = supabase
          .from("products")
          .select("*", { count: "exact", head: false })
          .limit(1000)
          .order("updated_at", { ascending: false });
      }

      // Aplicar filtros
      if (filters.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,sku.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }

      if (filters.category) {
        query = query.eq("category_id", filters.category);
      }

      if (typeof filters.status === "boolean") {
        query = query.eq("is_active", filters.status);
      }

      if (filters.featured) {
        query = query.eq("is_featured", true);
      }

      // Filtro para produtos em promoção (com sale_price)
      if (filters.has_sale) {
        query = query.not("sale_price", "is", null);
      }

      // Filtros de preço
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice.toString());
        if (!isNaN(minPrice)) {
          query = query.gte("price", minPrice);
        }
      }

      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice.toString());
        if (!isNaN(maxPrice)) {
          query = query.lte("price", maxPrice);
        }
      }

      // Filtros dinâmicos de categoria
      if (filters.subcategory) {
        query = query.eq("subcategory", filters.subcategory);
      }

      if (filters.brand) {
        query = query.ilike("brand", filters.brand);
      }

      if (filters.caliber) {
        query = query.ilike("caliber", filters.caliber);
      }

      if (filters.model) {
        query = query.eq("model", filters.model);
      }

      if (typeof filters.requires_license === "boolean") {
        query = query.eq("requires_license", filters.requires_license);
      }

      // Filtros dinâmicos gerais (para filtros customizados de categoria)
      Object.keys(filters).forEach((key) => {
        if (
          ![
            "search",
            "category",
            "status",
            "featured",
            "has_sale",
            "page",
            "limit",
            "sort",
            "order",
            "minPrice",
            "maxPrice",
            "subcategory",
            "brand",
            "caliber",
            "model",
            "requires_license",
            "_timestamp",
          ].includes(key)
        ) {
          const value = filters[key];
          if (value !== null && value !== undefined && value !== "") {
            query = query.eq(key, value);
          }
        }
      });

      // Paginação
      if (filters.page && filters.limit) {
        const from = (filters.page - 1) * filters.limit;
        const to = from + filters.limit - 1;
        query = query.range(from, to);
      }

      // Apenas produtos ativos por padrão (a menos que status seja especificamente definido)
      if (filters.status === undefined) {
        query = query.eq("is_active", true);
      }

      // Ordenação
      if (filters.sort && filters.order) {
        query = query.order(filters.sort, {
          ascending: filters.order === "asc",
        });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error: fetchError, count } = await query;

      if (fetchError) {
        console.error(
          "❌ [ProductsStore] ERRO na query do Supabase:",
          fetchError
        );
        throw fetchError;
      }

      products.value = data || [];

      return {
        data: {
          data: data || [],
          total: count || 0,
          totalPages: Math.ceil((count || 0) / (filters.limit || 20)),
          page: filters.page || 1,
          limit: filters.limit || 20,
        },
        error: null,
      };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar produtos:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      currentProduct.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar produto:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const fetchProductBySlug = async (slug: string) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (fetchError) throw fetchError;

      currentProduct.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao buscar produto por slug:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (
    productData: Omit<Product, "id" | "created_at" | "updated_at">
  ) => {
    console.log("🔄 [Store] Iniciando createProduct com dados:", productData);

    // Gera ID local para tornar a operação idempotente em caso de timeout
    const generateId = () =>
      typeof crypto !== "undefined" && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    const newProductId = generateId();

    // Limpar e formatar dados com validação segura
    const cleanData = {
      id: (productData as any).id || newProductId,
      ...productData,
      sale_price: productData.sale_price || null,
      weight: productData.weight || null,
      brand: productData.brand || null,
      model: productData.model || null,
      caliber: productData.caliber || null,
      license_type: productData.license_type || null,
      meta_title: productData.meta_title || null,
      meta_description: productData.meta_description || null,
      dimensions: productData.dimensions || null,
      // ✅ CONVERSÃO SEGURA COM VALIDAÇÃO
      price: productData.price ? parseFloat(productData.price.toString()) : 0,
      stock:
        productData.stock !== null && productData.stock !== undefined
          ? parseInt(productData.stock.toString())
          : 0,
      min_stock: productData.min_stock
        ? parseInt(productData.min_stock.toString())
        : 5,
    };

    console.log("🧹 [Store] Dados limpos:", cleanData);

    // Inserir todos os campos (incluindo imagens e descrições)

    // ✅ VERIFICAR CAMPOS ESPECÍFICOS QUE PODEM CAUSAR PROBLEMA
    if (cleanData.color && Array.isArray(cleanData.color)) {
      console.log("🎨 Campo color detectado:", cleanData.color);
    }
    if (cleanData.images && Array.isArray(cleanData.images)) {
      console.log("🖼️ Campo images detectado:", cleanData.images);
    }
    if (cleanData.variants && Array.isArray(cleanData.variants)) {
      console.log("📏 Campo variants detectado:", cleanData.variants);
    }

    // Dados prontos para inserção (com imagens quando presentes)

    try {
      loading.value = true;
      error.value = null;

      console.log("💾 [Store] Enviando para Supabase...");
      const supabase = getSupabaseClient();

      // ✅ Inserir sem .select() para reduzir latência; buscar depois
      const insertPromise = supabase.from("products").insert([cleanData]);

      console.log("⏰ [Store] Executando query com timeout de 10s...");

      try {
        const insertResult: any = await insertPromise;

        if (insertResult?.error) {
          console.error(
            "❌ [Store] Erro específico do Supabase:",
            insertResult.error
          );
          const msg =
            insertResult.error?.message ||
            insertResult.error?.hint ||
            "Erro ao inserir";
          throw new Error(msg);
        }

        // Buscar o registro recém-criado para retornar dados completos
        const { data, error: fetchAfterInsertError } = await supabase
          .from("products")
          .select("*")
          .eq("id", cleanData.id)
          .single();

        if (fetchAfterInsertError) {
          console.warn(
            "⚠️ [Store] Insert ok, mas falhou ao buscar produto recém-criado:",
            fetchAfterInsertError
          );
        }

        console.log(
          "📡 [Store] Sucesso! Produto criado (fetch pós-insert):",
          data
        );
        return { data, error: null };
      } catch (e: any) {
        throw e;
      }
    } catch (err: any) {
      error.value = err.message;
      console.error("❌ [Store] Erro ao criar produto:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
      console.log("🏁 [Store] createProduct finalizado");
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    // Limpar e formatar dados
    const cleanData = { ...productData };

    // Converter números se necessário
    if (cleanData.price) {
      cleanData.price = parseFloat(cleanData.price.toString());
    }
    if (cleanData.stock !== undefined) {
      cleanData.stock = parseInt(cleanData.stock.toString());
    }
    if (cleanData.min_stock !== undefined) {
      cleanData.min_stock = parseInt(cleanData.min_stock.toString());
    }

    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();

      // Implementar timeout e retry para resolver problemas de concorrência
      let attempt = 0;
      const maxAttempts = 3;

      while (attempt < maxAttempts) {
        try {
          const { data, error: updateError } = await Promise.race([
            supabase
              .from("products")
              .update(cleanData)
              .eq("id", id)
              .select()
              .single(),
            new Promise((_, reject) =>
              setTimeout(
                () =>
                  reject(
                    new Error("Timeout: A operação demorou mais que 8 segundos")
                  ),
                8000
              )
            ),
          ]);

          if (updateError) throw updateError;

          // Atualizar no estado local
          const index = products.value.findIndex((p: Product) => p.id === id);
          if (index !== -1) {
            products.value[index] = data;
          }

          if (currentProduct.value?.id === id) {
            currentProduct.value = data;
          }

          return { data, error: null };
        } catch (attemptError: any) {
          attempt++;

          if (attempt >= maxAttempts) {
            throw attemptError;
          }

          // Aguardar antes de tentar novamente
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar produto:", err);
      return { data: null, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Remover do estado local
      const index = products.value.findIndex((p: Product) => p.id === id);
      if (index !== -1) {
        products.value.splice(index, 1);
      }

      if (currentProduct.value?.id === id) {
        currentProduct.value = null;
      }

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao excluir produto:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const toggleProductStatus = async (id: string) => {
    try {
      const product = products.value.find((p: Product) => p.id === id);
      if (!product) throw new Error("Produto não encontrado");

      return await updateProduct(id, { is_active: !product.is_active });
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao alterar status do produto:", err);
      return { error: err.message };
    }
  };

  const bulkUpdateStatus = async (ids: string[], isActive: boolean) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const { error: updateError } = await supabase
        .from("products")
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .in("id", ids);

      if (updateError) throw updateError;

      // Atualizar estado local
      products.value.forEach((product: Product) => {
        if (ids.includes(product.id!)) {
          product.is_active = isActive;
        }
      });

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar produtos em lote:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const bulkDeleteProducts = async (ids: string[]) => {
    try {
      loading.value = true;
      error.value = null;

      const supabase = getSupabaseClient();
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .in("id", ids);

      if (deleteError) throw deleteError;

      // Remover do estado local
      products.value = products.value.filter(
        (product: Product) => !ids.includes(product.id!)
      );

      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao excluir produtos em lote:", err);
      return { error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updateStock = async (
    id: string,
    quantity: number,
    operation: "add" | "subtract" | "set" = "set"
  ) => {
    try {
      const product = products.value.find((p: Product) => p.id === id);
      if (!product) throw new Error("Produto não encontrado");

      let newStock = quantity;
      if (operation === "add") {
        newStock = product.stock + quantity;
      } else if (operation === "subtract") {
        newStock = Math.max(0, product.stock - quantity);
      }

      return await updateProduct(id, { stock: newStock });
    } catch (err: any) {
      error.value = err.message;
      console.error("Erro ao atualizar estoque:", err);
      return { error: err.message };
    }
  };

  const getProductStats = () => {
    const total = products.value.length;
    const active = activeProducts.value.length;
    const featured = featuredProducts.value.length;
    const lowStock = lowStockProducts.value.length;
    const outOfStock = outOfStockProducts.value.length;

    return {
      total,
      active,
      inactive: total - active,
      featured,
      lowStock,
      outOfStock,
      categories: Object.keys(productsByCategory.value).length,
    };
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

  const validateSKU = async (
    sku: string,
    excludeId?: string
  ): Promise<boolean> => {
    try {
      const supabase = getSupabaseClient();
      let query = supabase.from("products").select("id").eq("sku", sku);

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data } = await query;

      return !data || data.length === 0;
    } catch (err) {
      console.error("Erro ao validar SKU:", err);
      return false;
    }
  };

  const validateSlug = async (
    slug: string,
    excludeId?: string
  ): Promise<boolean> => {
    try {
      const supabase = getSupabaseClient();
      let query = supabase.from("products").select("id").eq("slug", slug);

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

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentProduct = () => {
    currentProduct.value = null;
  };

  // ✅ FUNÇÃO PARA LIMPAR CACHE DE PRODUTOS
  const clearProductsCache = () => {
    products.value = [];
  };

  // ✅ FUNÇÕES PARA FILTROS DINÂMICOS
  const getUniqueFilterValues = async (field: string, categoryId?: string) => {
    try {
      const supabase = getSupabaseClient();
      let query = supabase
        .from("products")
        .select(field)
        .eq("is_active", true)
        .not(field, "is", null)
        .not(field, "eq", "");

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      const { data, error: fetchError } = (await query) as {
        data: Array<Record<string, any>> | null;
        error: any;
      };

      if (fetchError) throw fetchError;

      // Extrair valores únicos e filtrar nulos/vazios, ignorando case
      const uniqueValues = [
        ...new Set(
          (data || [])
            .map(
              (item: Record<string, any>) =>
                item[field] as string | null | undefined
            )
            .filter(
              (value: string | null | undefined) =>
                typeof value === "string" && value.trim() !== ""
            )
            .map((value: string | null | undefined) =>
              (value as string).toLowerCase()
            )
        ),
      ];

      // Retornar com case original preservado
      return uniqueValues
        .map((lowerValue: string) => {
          const originalValue = (data || []).find(
            (item: Record<string, any>) =>
              typeof item[field] === "string" &&
              (item[field] as string).toLowerCase() === lowerValue
          )?.[field] as string | undefined;
          return {
            value: lowerValue,
            label: originalValue,
            count: (data || []).filter(
              (item: Record<string, any>) =>
                typeof item[field] === "string" &&
                (item[field] as string).toLowerCase() === lowerValue
            ).length,
          };
        })
        .sort((a, b) => (a.label || "").localeCompare(b.label || ""));
    } catch (err: any) {
      console.error(`Erro ao buscar valores únicos para ${field}:`, err);
      return [];
    }
  };

  const getUniqueBrands = async (categoryId?: string) => {
    return await getUniqueFilterValues("brand", categoryId);
  };

  const getUniqueCalibers = async (categoryId?: string) => {
    return await getUniqueFilterValues("caliber", categoryId);
  };

  // Funções utilitárias para variações
  const getProductPrice = (product: Product, variant?: ProductVariant) => {
    if (variant) {
      return variant.price;
    }
    return product.sale_price || product.price;
  };

  const getProductMinPrice = (product: Product) => {
    if (!product.variants || product.variants.length === 0) {
      return product.sale_price || product.price;
    }

    const minVariantPrice = Math.min(...product.variants.map((v) => v.price));
    const basePrice = product.sale_price || product.price;

    return Math.min(minVariantPrice, basePrice);
  };

  const getProductMaxPrice = (product: Product) => {
    if (!product.variants || product.variants.length === 0) {
      return product.sale_price || product.price;
    }

    const maxVariantPrice = Math.max(...product.variants.map((v) => v.price));
    const basePrice = product.sale_price || product.price;

    return Math.max(maxVariantPrice, basePrice);
  };

  const hasVariants = (product: Product) => {
    return product.variants && product.variants.length > 0;
  };

  const getVariantBySize = (product: Product, size: string) => {
    return product.variants?.find((v) => v.size === size);
  };

  return {
    // Estado
    products: readonly(products),
    loading: readonly(loading),
    error: readonly(error),
    currentProduct: readonly(currentProduct),

    // Getters
    activeProducts,
    featuredProducts,
    lowStockProducts,
    outOfStockProducts,
    productsByCategory,

    // Actions
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    bulkUpdateStatus,
    bulkDeleteProducts,
    updateStock,
    getProductStats,

    // Utilitários
    generateSlug,
    validateSKU,
    validateSlug,
    clearError,
    clearCurrentProduct,
    clearProductsCache,

    // Filtros dinâmicos
    getUniqueFilterValues,
    getUniqueBrands,
    getUniqueCalibers,

    // Utilitários para variações
    getProductPrice,
    getProductMinPrice,
    getProductMaxPrice,
    hasVariants,
    getVariantBySize,
  };
});
