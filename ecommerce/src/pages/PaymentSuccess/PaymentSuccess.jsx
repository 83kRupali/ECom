import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = params.get("order_id");

  useEffect(() => {
    if (!orderId) {
      navigate("/cart");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/verify?order_id=${orderId}`)
      .then((res) => {
        if (res.data.order_status === "PAID") {
          // ✅ CLEAR CART HERE
          dispatch(clearCart());
          localStorage.removeItem("cart");

          // ✅ REDIRECT TO DASHBOARD
          toast.success("Payment successful");
          navigate("/user-dashboard");
        } else {
          toast.success("payment failed");
          navigate("/cart");
        }
      })
      .catch(() => {
        navigate("/cart");
      });
  }, [orderId, navigate, dispatch]);

  return <p>Verifying payment...</p>;
};

export default PaymentSuccess;
