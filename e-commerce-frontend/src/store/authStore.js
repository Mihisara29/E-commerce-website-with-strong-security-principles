import { create } from "zustand";
import api from "../api/axios";

export const useUserStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isRegistered: false,
  loading: true, // optional for spinner

  // Fetch login and registration status
  fetchUserStatus: async () => {
    try {
      set({ loading: true });

      // Check if logged in
      const loginRes = await api.get("/api/users/is-logged-in");
      const loggedIn = loginRes.data;

      let registered = false;
      let userData = null;

      if (loggedIn) {
        // Check if user is registered
        const regRes = await api.get("/api/users/is-registered");
        registered = regRes.data;

        // Fetch user data only if registered
        if (registered) {
          const userRes = await api.get("/api/users/me");
          userData = userRes.data;
        }
      }

      set({
        isLoggedIn: loggedIn,
        isRegistered: registered,
        user: userData,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching user status:", err);
      set({
        isLoggedIn: false,
        isRegistered: false,
        user: null,
        loading: false,
      });
    }
  },

  logout: () => {
    window.location.href = "http://localhost:8080/logout";
  },
}));
