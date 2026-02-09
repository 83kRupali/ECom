import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

// Icons
import { TrashIcon } from "@heroicons/react/24/outline";

// Layout
import Layout from "../../components/layout/Layout";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  clearCart,
} from "../../redux/cartSlice";

// Utils
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

// Firebase
import { fireDB } from "../../firebase/FirebaseConfig";

// Components
import BuyNowModal from "../../components/buyNowModel/BuyNowModel";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // ================= REDUX STATE =================
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();

  // ================= USER DATA =================
  // Logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // ================= PRICE CALCULATION =================
  // Calculate total price based on quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Original price (can be used for discount logic)
  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Discount calculation
  const discount = originalTotal - totalPrice;

  // ================= ADDRESS STATE =================
  // Address information entered in Buy Now modal
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobilenumber: "",
  });

  // ================= CART ACTIONS =================
  // Remove product from cart
  const deleteCartItem = (id) => {
    dispatch(deleteFromCart(id));
    toast.success("Item removed from cart");
  };

  // Increase product quantity
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  // Decrease product quantity
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const safeCartItems = cartItems.map((item) => ({
  id: item.id,
  title: item.title,
  price: item.price,
  quantity: item.quantity,
  category: item.category,
  productImageUrl: item.productImageUrl,
  // 🔥 convert time safely
  time:
    typeof item.time === "number"
      ? item.time
      : Date.now(),
}));



const buyNowFunction = async ({
  amount,
  userId,
  cartItems: safeCartItems,
  addressInfo,
}) => {
  try {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const cashfree = await load({ mode: "sandbox" });

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/payment`, {
      amount,
      userId,
      cartItems,
      addressInfo,
    });

    const { paymentSessionId } = res.data;

    if (!paymentSessionId) {
      alert("Payment session not created");
      return;
    }

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self",
    });
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed");
  }
};


  // ================= LOCAL STORAGE =================
  // Persist cart data in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Empty Cart Message */}
            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty</p>
            )}

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border-b pb-6"
              >
                {/* Product Image */}
                <img
                  src={item.productImageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h2 className="font-medium text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{item.price}
                  </p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="px-3"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-3"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => deleteCartItem(item.id)}
                      className="flex items-center gap-1 text-red-500 hover:underline"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PRICE DETAILS ================= */}
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="font-semibold mb-4">Price Details</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{originalTotal}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {/* Buy Now Modal */}
            <div className="mt-6">
              <BuyNowModal
                addressInfo={addressInfo}
                setAddressInfo={setAddressInfo}
             buyNowFunction={() =>
    buyNowFunction({
      amount: totalPrice,
      userId: user?.uid,
      cartItems: safeCartItems, // ✅ SAFE DATA
      addressInfo,
    })}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;







