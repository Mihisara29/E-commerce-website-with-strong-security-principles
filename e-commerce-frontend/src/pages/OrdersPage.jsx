import { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";
import { useUserStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();

  const {
    orders,
    fetchOrders,
    deleteOrder,
    getOrderStatus,
    loading: ordersLoading,
  } = useOrderStore();

  const {
    isLoggedIn,
    isRegistered,
    fetchUserStatus,
    loading: userLoading,
  } = useUserStore();

  // Fetch user status on mount
  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  // Redirect to home if not logged in or registered
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn || !isRegistered) {
        navigate("/");
      }
    }
  }, [isLoggedIn, isRegistered, userLoading, navigate]);

  // Fetch orders only if user is valid
  useEffect(() => {
    if (isLoggedIn && isRegistered) {
      fetchOrders();
    }
  }, [isLoggedIn, isRegistered, fetchOrders]);

  if (userLoading || ordersLoading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.map((order) => {
        const status = getOrderStatus(order.deliveryTime); // ✅ Correct field
        const canDelete = status === "Delivered"; // ✅ Only allow delete if delivered

        return (
          <div key={order.id} className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p>
                  <strong>Description:</strong> {order.description}
                </p>
                <p>
                  <strong>Delivery:</strong> {order.deliveryTime},{" "}
                  {order.deliveryLocation}
                </p>
                <p>
                  <strong>Purchase Date:</strong> {order.purchaseDate}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      status === "Delivered" ? "text-success" : "text-warning"
                    }
                  >
                    {status}
                  </span>
                </p>
              </div>

              {/* Show delete button only if order is delivered */}
              <button
                className="btn btn-danger"
                onClick={() => deleteOrder(order.id)}
                disabled={!canDelete} // ✅ Disable if pending
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
