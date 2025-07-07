// stores/cart.ts
import { defineStore } from "pinia";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  maxStock?: number;
  product_id?: string; // ID do produto na tabela products
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  sessionId: string;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    loading: false,
    sessionId: "",
  }),

  getters: {
    // Total de itens no carrinho
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Valor total do carrinho
    totalValue: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Valor total formatado
    totalValueFormatted(): string {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(this.totalValue);
    },

    // Verificar se carrinho está vazio
    isEmpty: (state) => state.items.length === 0,

    // Obter item por ID
    getItemById: (state) => {
      return (id: string) => state.items.find((item) => item.id === id);
    },
  },

  actions: {
    // ✅ INICIALIZAR CARRINHO
    async initCart() {
      console.log("🛒 [Cart] Inicializando carrinho...");

      // Gerar session ID se não existir
      if (!this.sessionId) {
        this.sessionId = this.generateSessionId();
      }

      // ✅ SEMPRE CARREGAR DO SUPABASE (independente de estar logado)
      await this.loadFromSupabase();

      console.log(
        "✅ [Cart] Carrinho inicializado com",
        this.totalItems,
        "itens"
      );
    },

    // ✅ GERAR SESSION ID ÚNICO
    generateSessionId(): string {
      return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    },

    // ✅ ADICIONAR ITEM AO CARRINHO
    async addItem(product: Omit<CartItem, "quantity">, quantity = 1) {
      console.log(
        "🛒 [Cart] Adicionando item:",
        product.name,
        "qty:",
        quantity
      );

      const existingItem = this.items.find((item) => item.id === product.id);

      // Verificar estoque
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (product.maxStock && newQuantity > product.maxStock) {
          throw new Error(`Estoque máximo de ${product.maxStock} unidades`);
        }
      }

      try {
        this.loading = true;

        // ✅ SEMPRE USAR SUPABASE (logado ou sessão anônima)
        await this.addItemToSupabase(product, quantity);

        console.log("✅ [Cart] Item adicionado com sucesso");
      } catch (error) {
        console.error("❌ [Cart] Erro ao adicionar item:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ✅ ADICIONAR ITEM NO SUPABASE (logado ou sessão anônima)
    async addItemToSupabase(product: Omit<CartItem, "quantity">, quantity = 1) {
      const supabase = useSupabase();
      const auth = useAuth();

      // Definir identificadores (user_id para logados, session_id para anônimos)
      const userId = auth.isLoggedIn.value ? auth.user.value?.id : null;
      const sessionId = !auth.isLoggedIn.value ? this.sessionId : null;

      // Verificar se item já existe no carrinho
      let query = supabase
        .from("cart_items")
        .select("*")
        .eq("product_id", product.id);

      if (userId) {
        query = query.eq("user_id", userId);
      } else {
        query = query.eq("session_id", sessionId);
      }

      const { data: existingItems, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (existingItems && existingItems.length > 0) {
        // ✅ ITEM JÁ EXISTE: Atualizar quantidade
        const existingItem = existingItems[0];
        const newQuantity = existingItem.quantity + quantity;

        const { error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: newQuantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id);

        if (updateError) throw updateError;

        // Atualizar no estado local
        const localItem = this.items.find((item) => item.id === product.id);
        if (localItem) {
          localItem.quantity = newQuantity;
        } else {
          this.items.push({
            ...product,
            quantity: newQuantity,
            product_id: product.id,
          });
        }
      } else {
        // ✅ ITEM NOVO: Inserir no Supabase
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert({
            user_id: userId,
            session_id: sessionId,
            product_id: product.id,
            quantity,
          });

        if (insertError) throw insertError;

        // Adicionar ao estado local
        this.items.push({
          ...product,
          quantity,
          product_id: product.id,
        });
      }
    },

    // ✅ REMOVER ITEM DO CARRINHO
    async removeItem(productId: string) {
      console.log("🛒 [Cart] Removendo item:", productId);

      const auth = useAuth();

      try {
        this.loading = true;

        // ✅ REMOVER DO SUPABASE
        const supabase = useSupabase();
        let query = supabase
          .from("cart_items")
          .delete()
          .eq("product_id", productId);

        if (auth.isLoggedIn.value && auth.user.value) {
          query = query.eq("user_id", auth.user.value.id);
        } else {
          query = query.eq("session_id", this.sessionId);
        }

        const { error } = await query;
        if (error) throw error;

        // ✅ REMOVER DO ESTADO LOCAL
        const index = this.items.findIndex((item) => item.id === productId);
        if (index > -1) {
          this.items.splice(index, 1);
        }

        console.log("✅ [Cart] Item removido com sucesso");
      } catch (error) {
        console.error("❌ [Cart] Erro ao remover item:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ✅ ATUALIZAR QUANTIDADE
    async updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        await this.removeItem(productId);
        return;
      }

      const item = this.items.find((item) => item.id === productId);
      if (!item) return;

      // Verificar estoque máximo
      if (item.maxStock && quantity > item.maxStock) {
        throw new Error(`Estoque máximo de ${item.maxStock} unidades`);
      }

      const auth = useAuth();

      try {
        this.loading = true;

        // ✅ ATUALIZAR NO SUPABASE
        const supabase = useSupabase();
        let query = supabase
          .from("cart_items")
          .update({
            quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("product_id", productId);

        if (auth.isLoggedIn.value && auth.user.value) {
          query = query.eq("user_id", auth.user.value.id);
        } else {
          query = query.eq("session_id", this.sessionId);
        }

        const { error } = await query;
        if (error) throw error;

        // ✅ ATUALIZAR NO ESTADO LOCAL
        item.quantity = quantity;

        console.log("✅ [Cart] Quantidade atualizada:", productId, quantity);
      } catch (error) {
        console.error("❌ [Cart] Erro ao atualizar quantidade:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ✅ AUMENTAR QUANTIDADE
    async increaseQuantity(productId: string) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        await this.updateQuantity(productId, item.quantity + 1);
      }
    },

    // ✅ DIMINUIR QUANTIDADE
    async decreaseQuantity(productId: string) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        await this.updateQuantity(productId, item.quantity - 1);
      }
    },

    // ✅ LIMPAR CARRINHO
    async clearCart() {
      console.log("🛒 [Cart] Limpando carrinho...");

      const auth = useAuth();

      try {
        this.loading = true;

        // ✅ LIMPAR NO SUPABASE
        const supabase = useSupabase();
        let query = supabase.from("cart_items").delete();

        if (auth.isLoggedIn.value && auth.user.value) {
          query = query.eq("user_id", auth.user.value.id);
        } else {
          query = query.eq("session_id", this.sessionId);
        }

        const { error } = await query;
        if (error) throw error;

        // ✅ LIMPAR ESTADO LOCAL
        this.items = [];

        console.log("✅ [Cart] Carrinho limpo");
      } catch (error) {
        console.error("❌ [Cart] Erro ao limpar carrinho:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ✅ CARREGAR DO SUPABASE (logado ou sessão)
    async loadFromSupabase() {
      const supabase = useSupabase();
      const auth = useAuth();

      try {
        console.log("🛒 [Cart] Carregando do Supabase...");

        let query = supabase.from("cart_items").select(`
            *,
            products (
              id,
              name,
              price,
              sale_price,
              images,
              stock,
              slug
            )
          `);

        if (auth.isLoggedIn.value && auth.user.value) {
          query = query.eq("user_id", auth.user.value.id);
        } else {
          query = query.eq("session_id", this.sessionId);
        }

        const { data: cartItems, error } = await query;

        if (error) throw error;

        // ✅ CONVERTER PARA FORMATO DA STORE
        this.items = (cartItems || []).map((item: any) => ({
          id: item.products.id,
          name: item.products.name,
          price: item.products.sale_price || item.products.price,
          quantity: item.quantity,
          image: item.products.images?.[0] || "/placeholder-product.jpg",
          maxStock: item.products.stock,
          product_id: item.products.id,
        }));

        console.log(
          "✅ [Cart] Carregado do Supabase:",
          this.items.length,
          "itens"
        );
      } catch (error) {
        console.error("❌ [Cart] Erro ao carregar do Supabase:", error);
        // Fallback para localStorage em caso de erro
        this.loadFromLocalStorage();
      }
    },

    // ✅ SINCRONIZAR CARRINHO NO LOGIN
    async syncCartOnLogin() {
      console.log("🛒 [Cart] Sincronizando carrinho no login...");

      const supabase = useSupabase();
      const auth = useAuth();

      if (!auth.user.value) return;

      try {
        // 1. Buscar itens da sessão anônima atual
        const { data: sessionItems, error: sessionError } = await supabase
          .from("cart_items")
          .select(
            `
            *,
            products (
              id,
              name,
              price,
              sale_price,
              images,
              stock,
              slug
            )
          `
          )
          .eq("session_id", this.sessionId);

        if (sessionError) throw sessionError;

        // 2. Carregar carrinho do usuário logado
        await this.loadFromSupabase();

        // 3. Migrar itens da sessão para o usuário logado
        if (sessionItems && sessionItems.length > 0) {
          for (const sessionItem of sessionItems) {
            const existsInUserCart = this.items.find(
              (item) => item.id === sessionItem.products.id
            );

            if (!existsInUserCart) {
              // Adicionar item da sessão ao carrinho do usuário
              const product = {
                id: sessionItem.products.id,
                name: sessionItem.products.name,
                price:
                  sessionItem.products.sale_price || sessionItem.products.price,
                image:
                  sessionItem.products.images?.[0] ||
                  "/placeholder-product.jpg",
                maxStock: sessionItem.products.stock,
                product_id: sessionItem.products.id,
              };

              await this.addItemToSupabase(product, sessionItem.quantity);
            }
          }

          // 4. Limpar itens da sessão anônima
          await supabase
            .from("cart_items")
            .delete()
            .eq("session_id", this.sessionId);
        }

        // 5. Gerar nova sessão
        this.sessionId = this.generateSessionId();

        console.log("✅ [Cart] Carrinho sincronizado no login");
      } catch (error) {
        console.error("❌ [Cart] Erro ao sincronizar carrinho:", error);
      }
    },

    // ✅ MIGRAR PARA SESSION NO LOGOUT
    async migrateToSession() {
      console.log("🛒 [Cart] Migrando carrinho para sessão...");

      const supabase = useSupabase();
      const auth = useAuth();

      try {
        // 1. Se há itens no carrinho do usuário logado, migrar para sessão
        if (this.items.length > 0 && auth.user.value) {
          for (const item of this.items) {
            await supabase.from("cart_items").insert({
              user_id: null,
              session_id: this.sessionId,
              product_id: item.product_id || item.id,
              quantity: item.quantity,
            });
          }

          // 2. Limpar itens do usuário
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", auth.user.value.id);
        }

        console.log("✅ [Cart] Carrinho migrado para sessão");
      } catch (error) {
        console.error("❌ [Cart] Erro ao migrar carrinho:", error);
      }
    },

    // Abrir/fechar sidebar do carrinho
    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    // ✅ SALVAR NO LOCALSTORAGE (apenas backup)
    saveToLocalStorage() {
      if (process.client) {
        try {
          localStorage.setItem(
            "atapera_cart",
            JSON.stringify({
              items: this.items,
              sessionId: this.sessionId,
            })
          );
        } catch (error) {
          console.error("❌ [Cart] Erro ao salvar no localStorage:", error);
        }
      }
    },

    // ✅ CARREGAR DO LOCALSTORAGE (apenas fallback)
    loadFromLocalStorage() {
      if (process.client) {
        try {
          const saved = localStorage.getItem("atapera_cart");
          if (saved) {
            const data = JSON.parse(saved);
            this.items = data.items || [];
            this.sessionId = data.sessionId || this.generateSessionId();
          }
          console.log(
            "✅ [Cart] Carregado do localStorage:",
            this.items.length,
            "itens"
          );
        } catch (error) {
          console.error("❌ [Cart] Erro ao carregar do localStorage:", error);
          this.items = [];
          this.sessionId = this.generateSessionId();
        }
      }
    },

    // ✅ LIMPAR LOCALSTORAGE
    clearLocalStorage() {
      if (process.client) {
        localStorage.removeItem("atapera_cart");
      }
    },

    // ✅ FINALIZAR COMPRA
    prepareCheckout() {
      if (this.isEmpty) {
        throw new Error("Carrinho está vazio");
      }

      return {
        items: this.items,
        total: this.totalValue,
        totalFormatted: this.totalValueFormatted,
        itemCount: this.totalItems,
      };
    },
  },
});
