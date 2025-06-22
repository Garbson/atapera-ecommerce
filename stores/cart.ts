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
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    isOpen: false,
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
    // Adicionar item ao carrinho
    addItem(product: Omit<CartItem, "quantity">, quantity = 1) {
      const existingItem = this.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Se item já existe, aumenta a quantidade
        const newQuantity = existingItem.quantity + quantity;

        // Verifica se não excede o estoque
        if (product.maxStock && newQuantity > product.maxStock) {
          throw new Error(`Estoque máximo de ${product.maxStock} unidades`);
        }

        existingItem.quantity = newQuantity;
      } else {
        // Adiciona novo item
        this.items.push({
          ...product,
          quantity,
        });
      }

      this.saveToLocalStorage();
    },

    // Remover item do carrinho
    removeItem(productId: string) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // Atualizar quantidade de um item
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((item) => item.id === productId);

      if (!item) return;

      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }

      // Verifica estoque máximo
      if (item.maxStock && quantity > item.maxStock) {
        throw new Error(`Estoque máximo de ${item.maxStock} unidades`);
      }

      item.quantity = quantity;
      this.saveToLocalStorage();
    },

    // Aumentar quantidade de um item
    increaseQuantity(productId: string) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        this.updateQuantity(productId, item.quantity + 1);
      }
    },

    // Diminuir quantidade de um item
    decreaseQuantity(productId: string) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        this.updateQuantity(productId, item.quantity - 1);
      }
    },

    // Limpar carrinho
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
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

    // Salvar no localStorage
    saveToLocalStorage() {
      if (process.client) {
        try {
          localStorage.setItem("atapera_cart", JSON.stringify(this.items));
        } catch (error) {
          console.error("Erro ao salvar carrinho:", error);
        }
      }
    },

    // Carregar do localStorage
    loadFromLocalStorage() {
      if (process.client) {
        try {
          const saved = localStorage.getItem("atapera_cart");
          if (saved) {
            this.items = JSON.parse(saved);
          }
        } catch (error) {
          console.error("Erro ao carregar carrinho:", error);
          this.items = [];
        }
      }
    },

    // Finalizar compra (preparar dados)
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
