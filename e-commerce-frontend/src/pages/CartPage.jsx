import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (cart.length === 0) {
    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5 text-center">
          <h4>Your cart is empty 🛒</h4>
        </div>
      </section>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row justify-content-center my-4">
          {/* Left side - Cart items */}
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cart.length} items</h5>
              </div>
              <div className="card-body">
                {cart.map((item, idx) => (
                  <div key={item.id || idx}>
                    <div className="row align-items-center mb-3">
                      {/* Product image */}
                      <div className="col-lg-3 col-md-12 mb-3 mb-lg-0">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.productName}
                          className="img-fluid rounded"
                        />
                      </div>

                      {/* Product details */}
                      <div className="col-lg-5 col-md-6 mb-3 mb-lg-0">
                        <p className="mb-1"><strong>{item.productName}</strong></p>
                        {item.description && <p className="mb-2">{item.description}</p>}

                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-2"
                          title="Remove item"
                          onClick={() => removeFromCart(item.productName)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          title="Move to wishlist"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                        <div className="d-flex align-items-center mb-2">
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() => updateQuantity(item.productName, -1)}
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="form-control text-center"
                            style={{ maxWidth: "70px" }}
                          />

                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() => updateQuantity(item.productName, 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>

                        <p className="text-md-center mb-0">
                          <strong>LKR {item.price * item.quantity}.00</strong>
                        </p>
                      </div>
                    </div>

                    {idx < cart.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Summary */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between px-0">
                    Products
                    <span>LKR {totalPrice}.00</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between px-0 mt-3">
                    <strong>Total</strong>
                    <span><strong>LKR {totalPrice}.00</strong></span>
                  </li>
                </ul>

                <button className="btn btn-primary btn-lg w-100 mt-3">
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
