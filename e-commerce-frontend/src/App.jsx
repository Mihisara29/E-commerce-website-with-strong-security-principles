import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PurchasePage from "./pages/PurchasePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import { useUserStore } from "./store/authStore.js";

function App() {

   const { isRegistered, fetchUserStatus,} = useUserStore();

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Routes>

          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/register" element={!isRegistered?<RegisterPage />:<ProductPage />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
