import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import api from "../api/axios";
import { useUserStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { fetchCart, addToCart, removeFromCart, isInCart } = useCartStore();
  const { isLoggedIn, isRegistered } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/public/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });

    fetchCart();
  }, [fetchCart]);

  const handleButtonClick = (product) => {
    if (!isLoggedIn) return;

    if (isLoggedIn && !isRegistered) {
      navigate("/register");
      return;
    }

    isInCart(product.name) ? removeFromCart(product.name) : addToCart(product);
  };

  //  pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <div>Loading products...</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <>
      {/*  Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          background:
            "url('https://storage.cloud.google.com/my-ecommerce-images-123/Hero_Background_image.jpg') center/cover no-repeat",
          height: "60vh",
        }}
      >
        <div className="container text-center flex flex-col justify-center items-center min-h-[60vh]">
          <h1 className="display-4 fw-bold text-black font-bold mb-3">
            Welcome to SportZone
          </h1>
          <p className="inline-block bg-black text-white font-bold py-2 px-4 rounded mb-3">
            Your one-stop shop for premium sports items
          </p>

          <button
            className="btn btn-warning btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#aboutModal"
          >
            About Us
          </button>
        </div>
      </section>
      {/* About Us Modal */}
      <div
        className="modal fade"
        id="aboutModal"
        tabIndex="-1"
        aria-labelledby="aboutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title fw-bold" id="aboutModalLabel">
                About IM-SPORTS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Welcome to <strong>IM-SPORTS</strong>, your ultimate destination
                for premium sports equipment. We provide high-quality gear for
                athletes of all levels to help you perform your best and enjoy
                every game.
              </p>
              <p className="mt-3">
                <strong>Address:</strong> 45, Dalugama, Kelaniya <br />
                <strong>Email:</strong> imsports@gmail.com <br />
                <strong>Contact:</strong> +94 123456789
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  Product Grid */}
      <div className="container py-5">
        <div className="row g-4">
          {currentProducts.map((p) => (
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
                    onClick={() => handleButtonClick(p)}
                    disabled={!isLoggedIn}
                  >
                    {isInCart(p.name) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*  Pagination Controls */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-outline-primary me-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary ms-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
