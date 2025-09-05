import { create } from "zustand";
import api from "../api/axios";

export const useCartStore = create((set,get) => ({

  cart:[],
  loading:false,

  //Fetch cart from backend
  fetchCart: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/api/cart");
      set({ cart: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching cart:", err);
      set({ loading: false });
    }
  },

  //Add to cart
addToCart: async (product) => {
  try {
    const cartItem = { productName: product.name, quantity: 1 };
    await api.post("/api/cart", cartItem);
    get().fetchCart(); // refresh cart from backend
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
},

    // Update quantity
updateQuantity: async (productName, change) => {
  try {
    await api.patch(`/api/cart/update-quantity/${productName}?change=${change}`);
    get().fetchCart(); // refresh cart from backend
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
},

  //Remove from cart
  removeFromCart: async(productName) => {
     try{
      await api.delete(`/api/cart/remove/${productName}`);
      set({cart: get().cart.filter(item => item.productName !== productName)});
     }catch{
       console.log("Error removing from cart:",err); 
     }
  },

  //Check if in cart
  isInCart: (productName) => {
    return get().cart.some(item => item.productName === productName);
  },

  clearCart: async () => {
  try {
    await api.delete("/api/cart/clear");
    set({ cart: [] }); // empty the cart in state
  } catch (err) {
    console.error("Error clearing cart:", err);
  }
},

}))