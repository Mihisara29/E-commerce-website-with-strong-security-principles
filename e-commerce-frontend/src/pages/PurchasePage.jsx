import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/authStore";
import api from "../api/axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PurchasePage = () => {
  const navigate = useNavigate();
  const { cart, fetchCart, clearCart } = useCartStore();
  const { isLoggedIn, isRegistered } = useUserStore();

  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in or not registered
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
    if (isLoggedIn && !isRegistered) navigate("/register");
    fetchCart();
  }, [isLoggedIn, isRegistered, navigate, fetchCart]);

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">
        <h4>Your cart is empty 🛒</h4>
      </section>
    );
  }

  // Auto-filled values
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const description = cart
    .map((item) => `${item.quantity}x ${item.productName}`)
    .join(", ");

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliveryTime || !deliveryLocation) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/checkout", {
        description,
        purchaseDate: today,
        deliveryTime,
        deliveryLocation,
        totalPrice,
      });

      console.log("Checkout response:", res.data);

      clearCart(); // clear local cart

      await Swal.fire({
        icon: "success",
        title: "Purchase Confirmed!",
        text: res.data.message,
        confirmButtonColor: "#28a745",
        confirmButtonText: "OK",
      });

      navigate("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);

      let message = "Server error";
      if (err.response) message = err.response.data.message || message;
      else if (err.request) message = "No response from server.";
      else message = err.message;

      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: message,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="mb-4 text-center">Checkout</h3>

            <form onSubmit={handleSubmit}>
              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  readOnly
                />
              </div>

              {/* Purchase Date */}
              <div className="mb-3">
                <label className="form-label">Purchase Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={today}
                  readOnly
                />
              </div>

              {/* Total Price */}
              <div className="mb-3">
                <label className="form-label">Total Price (LKR)</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalPrice}
                  readOnly
                />
              </div>

              {/* Delivery Time */}
              <div className="mb-3">
                <label className="form-label">Delivery Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)} // restrict past times
                  required
                />
              </div>

              {/* Delivery Location */}
              <div className="mb-3">
                <label className="form-label">Delivery Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your delivery address"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchasePage;
