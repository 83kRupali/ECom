
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const AllProduct = () => {
  // ================= HOOKS =================
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global context (products + loader)
  const { loading, getAllProduct } = useContext(myContext);

  // Redux cart state
  const cartItems = useSelector((state) => state.cart);

  // ================= CART HANDLERS =================

  // Add product to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // Remove product from cart (by id)
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item.id));
    toast.success("Removed from cart");
  };

  // ================= PERSIST CART =================
  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* ================= HEADING ================= */}
        <h1 className="text-2xl font-semibold text-center mb-10">
          All Products
        </h1>

        {/* ================= LOADER ================= */}
        {loading && (
          <div className="flex justify-center mb-6">
            <Loader />
          </div>
        )}

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getAllProduct?.map((item) => {
            const { id, title, price, productImageUrl } = item;

            // Check if product already exists in cart
            const isInCart = cartItems.some((p) => p.id === id);

            return (
              <div
                key={id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image */}
                <img
                  src={productImageUrl}
                  alt={title}
                  onClick={() => navigate(`/productinfo/${id}`)}
                  className="h-56 w-full object-cover cursor-pointer"
                />

                {/* Product Content */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">E-bharat</p>

                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    {title.length > 25
                      ? title.substring(0, 25) + "..."
                      : title}
                  </h2>

                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    ₹{price}
                  </p>

                  {/* ================= CART BUTTON ================= */}
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
            );
          })}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {getAllProduct?.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-10">
            No products found
          </p>
        )}
      </section>
    </Layout>
  );
};

export default AllProduct;




