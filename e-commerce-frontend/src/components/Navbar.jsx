import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import Logo from "../assets/Logo.png";
import CartIcon from "../assets/cart.png";
import ProfileIcon from "../assets/profile.png";
import CloseIcon from "../assets/close.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, isRegistered, fetchUserStatus, logout } =
    useUserStore();
  const { cart, fetchCart } = useCartStore();

  const [showProfilePopup, setShowProfilePopup] = React.useState(false);

  useEffect(() => {
    fetchUserStatus();
    fetchCart();
  }, [fetchUserStatus, fetchCart]);

  const handleCartClick = () => {
    if (!isLoggedIn) return; // only logged in users can try to see cart
    if (!isRegistered) return navigate("/register"); // redirect to register
    navigate("/cart");
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) return;
    if (!isRegistered) return navigate("/register");
    setShowProfilePopup(true);
  };

  const handleOrdersClick = () => {
    if (!isLoggedIn) return;
    if (!isRegistered) return navigate("/register");
    navigate("/orders");
  };

  const handleLogin = () => {
    window.location.href = "https://localhost:8443/oauth2/authorization/auth0";
  };

  const handleRegister = () => navigate("/register");

  return (
    <>
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <img
          src={Logo}
          alt="Logo"
          className="h-20 cursor-pointer transition-transform duration-300 hover:scale-110 hover:opacity-90"
          onClick={() => navigate("/")}
        />

        <div className="flex items-center gap-3">
          {!isLoggedIn && (
            <button onClick={handleLogin} className="btn btn-success">
              Login
            </button>
          )}

          {isLoggedIn && !isRegistered && (
            <button onClick={handleRegister} className="btn btn-warning">
              Complete Registration
            </button>
          )}

          {isLoggedIn && isRegistered && (
            <>
              <div
                className="relative cursor-pointer
                transition-transform duration-300 hover:scale-110 hover:animate-bounce
                "
                onClick={handleCartClick}
              >
                <img
                  src={CartIcon}
                  alt="Cart"
                  className="h-8 w-8 "
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>

              <button
                onClick={handleOrdersClick}
                className="btn btn-outline-light d-flex align-items-center gap-2"
              >
                <i className="bi bi-box-seam"></i>
                Orders
              </button>

              <div className="relative">
                <img
                  src={ProfileIcon}
                  alt="Profile"
                  className="h-8 w-8 cursor-pointer transition-transform duration-300 hover:scale-110 hover:opacity-90"
                  onClick={handleProfileClick}
                />
              </div>
            </>
          )}

          {isLoggedIn && (
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Profile Popup */}
      {showProfilePopup && user && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowProfilePopup(false)}
          />
          <div className="bg-white p-6 rounded-xl shadow-2xl relative z-10 w-80">
            <h3 className="text-2xl font-bold text-center mb-4">
              Profile Info
            </h3>
            <div className="text-gray-700 space-y-2 mb-6">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Contact No:</strong> {user.contactNumber}
              </p>
              <p>
                <strong>Country:</strong> {user.country}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="absolute mt-4 bottom-[-60px] flex items-center justify-center hover:scale-110"
                onClick={() => setShowProfilePopup(false)}
              >
                <img src={CloseIcon} alt="Close" className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
