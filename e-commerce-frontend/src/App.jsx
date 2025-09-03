import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
