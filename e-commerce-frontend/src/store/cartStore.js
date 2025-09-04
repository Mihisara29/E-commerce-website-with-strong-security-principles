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
  addToCart: async(product) => {
    try{
      const cartItem = { productName:product.name, quantity:1};
      const res = await api.post("/api/cart",cartItem);
      set({ cart: [...get().cart, res.data]}); 
    }catch(err){
      console.error("Error adding to cart:",err);
    }
  },

    // Update quantity
  updateQuantity: async (productName, change) => {
    try {
      const res = await api.patch(`/api/cart/update-quantity/${productName}?change=${change}`);
      // Replace the updated item in the cart
      set({
        cart: get().cart.map(item =>
          item.productName === productName ? res.data : item
        )
      });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  },

  //Remove from cart
  removeFromCart: async(productName) => {
     try{
      await api.delete(`api/cart/remove/${productName}`);
      set({cart: get().cart.filter(item => item.productName !== productName)});
     }catch{
       console.log("Error removing from cart:",err); 
     }
  },

  //Check if in cart
  isInCart: (productName) => {
    return get().cart.some(item => item.productName === productName);
  },

}))