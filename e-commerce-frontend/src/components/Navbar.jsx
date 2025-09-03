import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);  // store user info
  const navigate = useNavigate();

  useEffect(() => {
    // Try fetching logged-in user
    api.get("/api/users/me")
      .then(res => {
        console.log("User Info:", res.data);   // 👀 should appear now
        setUser(res.data);
        setIsAuthenticated(true);

        // Check registration
        return api.get("/api/users/is-registered");
      })
      .then(res => setIsRegistered(res.data))
      .catch(err => {
        console.error("Not logged in:", err);
        setIsAuthenticated(false);
        setIsRegistered(false);
        setUser(null);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/auth0";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        E-Commerce
      </h1>

      <div className="space-x-3">
        {isAuthenticated && isRegistered && (
          <>
            <span className="mr-3">👋 {user?.name}</span> {/* show user name */}
            <button onClick={() => navigate("/cart")} className="btn btn-primary">
              Cart
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </>
        )}

        {isAuthenticated && !isRegistered && (
          <button onClick={handleRegister} className="btn btn-warning">
            Complete Registration
          </button>
        )}

        {!isAuthenticated && (
          <button onClick={handleLogin} className="btn btn-success">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
