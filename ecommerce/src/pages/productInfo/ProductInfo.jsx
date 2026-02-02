// ================= IMPORTS =================
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const ProductInfo = () => {
  // ================= ROUTING & CONTEXT =================
  const navigate = useNavigate();
  const { id } = useParams(); // product id from URL

  const { loading, setLoading } = useContext(myContext);

  // ================= REDUX =================
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // ================= LOCAL STATE =================
  const [product, setProduct] = useState(null);

  // ================= FETCH SINGLE PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productRef = doc(fireDB, "product", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          // Store product data with document id
          setProduct({
            ...productSnap.data(),
            id: productSnap.id,
          });
        } else {
          toast.error("Product not found");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= CART HELPERS =================
  // Check if product already exists in cart
  const isInCart = cartItems.some(
    (item) => item.id === product?.id
  );

  // Add product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  // Remove product from cart
  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(product.id));
    toast.success("Removed from cart");
  };

  // ================= SAVE CART TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* Loader */}
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          product && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* ================= PRODUCT IMAGE ================= */}
              <div className="flex justify-center">
                <img
                  src={product.productImageUrl}
                  alt={product.title}
                  className="rounded-lg max-h-[500px] object-contain"
                />
              </div>

              {/* ================= PRODUCT DETAILS ================= */}
              <div>
                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-gray-300"
                    />
                  ))}
                </div>

                {/* Price */}
                <p className="text-xl font-semibold mt-4">
                  ₹{product.price}
                </p>

                {/* Description */}
                <div className="mt-4">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-gray-600 text-sm">
                    {product.description}
                  </p>
                </div>

                {/* ================= CART BUTTON ================= */}
                <div className="mt-6">
                  {isInCart ? (
                    <button
                      onClick={handleDeleteFromCart}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
