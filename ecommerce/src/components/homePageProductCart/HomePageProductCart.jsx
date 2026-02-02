
/**
 * HomePageProductCart Component
 * -----------------------------
 * Displays bestselling products on the homepage.
 * Features:
 * - Fetches products from global context
 * - Integrates Redux cart (add/remove items)
 * - Shows loader while data is loading
 * - Syncs cart data with localStorage
 */

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const HomePageProductCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access global context (products + loading state)
  const { loading, getAllProduct } = useContext(myContext);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart);

  // ================= ADD TO CART =================
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // ================= REMOVE FROM CART =================
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item.id)); // pass only product ID
    toast.success("Removed from cart");
  };

  // ================= SAVE CART TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* ================= HEADING ================= */}
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Bestselling Products
      </h1>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">

          {/* ================= LOADER ================= */}
          {loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          {/* ================= PRODUCT LIST ================= */}
          <div className="flex flex-wrap -m-4">
            {getAllProduct?.slice(0, 8).map((item) => {
              const { id, title, price, productImageUrl } = item;

              // Check if product already exists in cart
              const isInCart = cartItems.some((p) => p.id === id);

              return (
                <div key={id} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">

                    {/* Product Image */}
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="lg:h-80 h-96 w-full object-cover"
                      src={productImageUrl}
                      alt={title}
                    />

                    {/* Product Details */}
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                        E-bharat
                      </h2>

                      <h1 className="text-lg font-medium text-gray-900 mb-2">
                        {title.substring(0, 25)}
                      </h1>

                      <p className="text-lg font-semibold text-gray-900 mb-3">
                        ₹{price}
                      </p>

                      {/* ================= ACTION BUTTON ================= */}
                      <div className="flex justify-center">
                        {isInCart ? (
                          <button
                            onClick={() => handleDeleteFromCart(item)}
                            className="bg-red-600 hover:bg-red-700 w-full text-white py-1 rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-1 rounded-lg font-bold"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCart;





