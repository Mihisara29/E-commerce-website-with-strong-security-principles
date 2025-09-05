import { create } from "zustand";
import api from "../api/axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  // Fetch all orders for the logged-in user
  fetchOrders: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/api/checkout");
      set({ orders: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching orders:", err);
      set({ loading: false });
    }
  },

  // Delete an order
  deleteOrder: async (orderId) => {
    try {
      await api.delete(`/api/checkout/${orderId}`);
      set({
        orders: get().orders.filter((o) => o.id !== orderId),
      });
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  },

  // Compute order status based on deliveryTime
  getOrderStatus: (deliveryTime) => {
    const now = new Date();
    const delivery = new Date(deliveryTime); // deliveryTime comes from backend as string
    return delivery <= now ? "Delivered" : "Pending";
  },

  // Optionally, separate delivered and pending orders
  getDeliveredOrders: () =>
    get().orders.filter((o) => get().getOrderStatus(o.deliveryTime) === "Delivered"),

  getPendingOrders: () =>
    get().orders.filter((o) => get().getOrderStatus(o.deliveryTime) === "Pending"),
}));
