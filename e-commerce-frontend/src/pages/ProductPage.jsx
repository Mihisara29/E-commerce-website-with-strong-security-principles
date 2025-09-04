import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import api from "../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, fetchCart, addToCart, removeFromCart, isInCart } = useCartStore();

  useEffect(() => {
    // fetch products
    api.get("/api/public/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });

    // fetch cart 
    fetchCart();
  }, [fetchCart]);

  console.log(cart);

  if (loading) return <div>Loading products...</div>;

  if (products.length === 0) return <div>No products available</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 text-center shadow-sm">
              <img
                src={p.imageUrl}
                className="card-img-top"
                alt={p.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text fw-bold">LKR.{p.price}.00</p>
                <button
                  className={`btn mt-auto ${
                    isInCart(p.name) ? "btn-success" : "btn-primary"
                  }`}
                  onClick={() =>
                    isInCart(p.name) ? removeFromCart(p.name) : addToCart(p)
                  }
                >
                  {isInCart(p.name) ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
