
/**
 * Navbar Component
 * ----------------
 * Displays the top navigation bar of the application.
 * Features:
 * - Role-based navigation (Admin / User)
 * - Authentication-based menu (Login / Signup / Logout)
 * - Cart item count from Redux store
 * - Integrated search bar
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  // Get logged-in user data from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();

  // ================= LOGOUT FUNCTION =================
  const logout = () => {
    localStorage.clear(); // clear user session
    navigate("/login");   // redirect to login page
  };

  // ================= CART ITEMS =================
  // Fetch cart items from Redux store
  const cartItems = useSelector((state) => state.cart);

  // ================= NAVIGATION LIST =================
  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      {/* Home */}
      <li>
        <Link to="/">Home</Link>
      </li>

      {/* All Products */}
      <li>
        <Link to="/allproducts">All Product</Link>
      </li>

      {/* Signup (visible only if user is not logged in) */}
      {!user && (
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      )}

      {/* Login (visible only if user is not logged in) */}
      {!user && (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}

      {/* User Dashboard */}
      {user?.role === "user" && (
        <li>
          <Link to="/user-dashboard">{user?.name}</Link>
        </li>
      )}

      {/* Admin Dashboard */}
      {user?.role === "admin" && (
        <li>
          <Link to="/admin-dashboard">{user?.name}</Link>
        </li>
      )}

      {/* Logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          <Link to="/">Logout</Link>
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      {/* ================= MAIN NAVBAR ================= */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        
        {/* ================= LOGO ================= */}
        <div className="left py-3 lg:py-0">
          <Link to="/">
            <h2 className="font-bold text-white text-2xl text-center">
              E-Bharat
            </h2>
          </Link>
        </div>

        {/* ================= NAV LINKS ================= */}
        <div className="right flex justify-center mb-4 lg:mb-0">
          {navList}
        </div>

        {/* ================= SEARCH BAR ================= */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
















