// stores/cart.ts
import { defineStore } from "pinia";
import { useAuth } from "~/composables/useAuth";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  maxStock?: number;
  product_id?: string; // ID do produto na tabela products
  slug?: string;
  sale_price?: number;
  priceType?: 'avista' | 'parcelado'; // Tipo de preço escolhido
  avistaPrice?: number;
  parceladoPrice?: number;
  selectedPaymentMethod?: 'pix' | 'debit' | 'credit';
  selectedInstallments?: number;
  products?: {
    categories?: {
      slug: string;
    };
    requires_license?: boolean;
  };
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  sessionId: string;
  paymentMethod: 'pix' | 'debit' | 'credit';
  installments: number;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    loading: false,
    sessionId: "",
    paymentMethod: "pix",
    installments: 1,
  }),

  getters: {
    // Total de itens no carrinho
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Valor total do carrinho (baseado na forma de pagamento)
    totalValue: (state) => {
      return state.items.reduce((total, item) => {
        const itemPrice = state.paymentMethod === 'credit' 
          ? (item.parceladoPrice || item.price)
          : (item.avistaPrice || item.price);
        return total + itemPrice * item.quantity;
      }, 0);
    },

    // Valor total original (sem desconto de forma de pagamento)
    originalTotalValue: (state) => {
      return state.items.reduce(
        (total, item) => total + (item.parceladoPrice || item.price) * item.quantity,
        0
      );
    },

    // Desconto total da forma de pagamento
    paymentDiscount: (state) => {
      if (state.paymentMethod === 'credit') return 0;
      
      return state.items.reduce((discount, item) => {
        const originalPrice = item.parceladoPrice || item.price;
        const discountedPrice = item.avistaPrice || item.price;
        return discount + (originalPrice - discountedPrice) * item.quantity;
      }, 0);
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
      await this.loadFromSupabase();
    },

    // ✅ ADICIONAR ITEM AO CARRINHO
    async addItem(product: Omit<CartItem, "quantity">, quantity = 1) {
      const { success, error } = useNotifications();
      const existingItem = this.items.find((item) => item.id === product.id);

      // Verificar estoque
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (product.maxStock && newQuantity > product.maxStock) {
          error(
            "Limite de estoque atingido",
            `Máximo de ${product.maxStock} unidades disponíveis`
          );
          throw new Error(`Estoque máximo de ${product.maxStock} unidades`);
        }
      }

      try {
        this.loading = true;
        await this.addItemToSupabase(product, quantity);
        
        // Mostrar notificação de sucesso
        success(
          "Produto adicionado!",
          `${product.name} foi adicionado ao seu carrinho`
        );
        
        // Abrir carrinho por 3 segundos para mostrar o item
        this.openCart();
        setTimeout(() => {
          this.closeCart();
        }, 3000);
        
      } catch (error: any) {
        error(
          "Erro ao adicionar produto",
          error.message || "Não foi possível adicionar o produto ao carrinho"
        );
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addItemToSupabase(product: Omit<CartItem, "quantity">, quantity = 1) {
      const supabase = useSupabase();
      const auth = useAuth();

      // Usar diretamente o ID do usuário do perfil
      const userId = auth.user.value?.id;


      // Verificar se item já existe no carrinho
      let query = supabase
        .from("cart_items")
        .select("*")
        .eq("product_id", product.id);
      query = query.eq("user_id", auth.user.value?.id);

      const { data: existingItems, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (existingItems && existingItems.length > 0) {
        const existingItem = existingItems[0];
        const newQuantity = existingItem.quantity + quantity;

        const { error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: newQuantity,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", auth.user.value?.id);

        if (updateError) throw updateError;

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
        const insertData = {
          user_id: userId,
          product_id: product.id,
          quantity,
        };

        const { error: insertError } = await supabase
          .from("cart_items")
          .insert(insertData);

        if (insertError) {
          throw insertError;
        }
        this.items.push({
          ...product,
          quantity,
          product_id: product.id,
        });
      }
    },

    // ✅ REMOVER ITEM DO CARRINHO
    async removeItem(productId: string) {
      const { success, error } = useNotifications();
      const auth = useAuth();

      // Pegar nome do produto antes de remover
      const item = this.items.find((item) => item.id === productId);
      const productName = item?.name || "Produto";

      try {
        this.loading = true;

        // ✅ REMOVER DO SUPABASE
        const supabase = useSupabase();
        let query = supabase
          .from("cart_items")
          .delete()
          .eq("product_id", productId);
        query = query.eq("user_id", auth.user.value?.id);
        const { error: deleteError } = await query;
        if (deleteError) throw deleteError;

        // ✅ REMOVER DO ESTADO LOCAL
        const index = this.items.findIndex((item) => item.id === productId);
        if (index > -1) {
          this.items.splice(index, 1);
        }

        // Mostrar notificação de sucesso
        success(
          "Produto removido",
          `${productName} foi removido do seu carrinho`
        );

      } catch (error: any) {
        console.error("❌ [Cart] Erro ao remover item:", error);
        error(
          "Erro ao remover produto",
          "Não foi possível remover o produto do carrinho"
        );
        throw error;
      } finally {
        this.loading = false;
      }
    },

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
        query = query.eq("user_id", auth.user.value?.id);

        const { error } = await query;
        if (error) throw error;

        // ✅ ATUALIZAR NO ESTADO LOCAL
        item.quantity = quantity;

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
      const auth = useAuth();
      try {
        this.loading = true;
        const supabase = useSupabase();
        let query = supabase.from("cart_items").delete();
        query = query.eq("user_id", auth.user.value?.id);
        const { error } = await query;
        if (error) throw error;
        this.items = [];
      } catch (error) {
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
        const userId = auth.user.value?.id;
        let query = supabase
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
         slug,
         category_id,
         requires_license,
         categories!inner(slug, name)
       )
     `
          )
          .eq("user_id", userId);

        const { data: cartItems, error } = await query;

        if (error) {
          console.error("❌ [loadFromSupabase] Erro na query:", error);
          throw error;
        }

        const { getProductImage } = useCloudinary();

        if (!cartItems || cartItems.length === 0) {
          this.items = [];
          return;
        }

        this.items = cartItems
          .map((item: any) => {
            if (!item.products) {
              return null;
            }

            const cartItem = {
              id: item.products.id,
              name: item.products.name,
              price: item.products.sale_price || item.products.price,
              quantity: item.quantity,
              image: item.products.images?.[0]
                ? getProductImage(item.products.images[0], "small")
                : "/placeholder-product.jpg",
              maxStock: item.products.stock,
              product_id: item.products.id,
              slug: item.products.slug,
              sale_price: item.products.sale_price,
              category: item.products.categories?.slug,
              products: {
                categories: {
                  slug: item.products.categories?.slug
                },
                requires_license: item.products.requires_license
              }
            };

            return cartItem;
          })
          .filter((item) => item !== null);
      } catch (error) {
        console.error("❌ [Cart] Erro ao carregar do Supabase:", error);
        this.items = [];
      }
    },

    async syncCartOnLogin() {
      const supabase = useSupabase();
      const auth = useAuth();

      if (!auth.user.value) return;

      try {
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
          .eq("user_id", auth.user.value?.id);

        if (sessionError) throw sessionError;

        await this.loadFromSupabase();
        if (sessionItems && sessionItems.length > 0) {
          for (const sessionItem of sessionItems) {
            const existsInUserCart = this.items.find(
              (item) => item.id === sessionItem.products.id
            );

            if (!existsInUserCart) {
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
            .eq("session_id", auth.user.value?.id);
        }
      } catch (error) {
        console.error("❌ [Cart] Erro ao sincronizar carrinho:", error);
      }
    },

    async migrateToSession() {
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
            .eq("user_id", auth.user.value?.id);
        }

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

    resetCart() {
      this.items = [];
      this.isOpen = false;
      this.loading = false;
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
        paymentMethod: this.paymentMethod,
        installments: this.installments,
        originalTotal: this.originalTotalValue,
        paymentDiscount: this.paymentDiscount,
      };
    },

    // ✅ ATUALIZAR FORMA DE PAGAMENTO
    updatePaymentMethod(method: 'pix' | 'debit' | 'credit') {
      this.paymentMethod = method;
      if (method !== 'credit') {
        this.installments = 1;
      }
    },

    // ✅ ATUALIZAR NÚMERO DE PARCELAS
    updateInstallments(installments: number) {
      this.installments = installments;
    },
  },
});
