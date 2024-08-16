import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  cartItems: CartItem[];
  cartCount: number;
  cartVisible: boolean; // Add this to manage cart visibility
  toggleCart: () => void; // Add this to toggle cart visibility
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const useStore = create<AppState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  cartItems: [],
  cartCount: 0,
  cartVisible: false, // Default to cart not being visible
  toggleCart: () => set((state) => ({ cartVisible: !state.cartVisible })), // Toggle visibility
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartCount: state.cartCount + 1,
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          cartCount: state.cartCount + 1,
        };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          return {
            cartItems: state.cartItems.filter((item) => item.id !== productId),
            cartCount: state.cartCount - 1,
          };
        } else {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            cartCount: state.cartCount - 1,
          };
        }
      }
      return state;
    }),
  clearCart: () =>
    set({
      cartItems: [],
      cartCount: 0,
    }),
}));

export default useStore;
