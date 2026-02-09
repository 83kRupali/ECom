
/**
 * MyState.jsx
 * -----------
 * Global Context Provider
 * Manages products, orders, users, and loading state
 */

import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const MyState = ({ children }) => {
  // ================= GLOBAL LOADING =================
  const [loading, setLoading] = useState(false);

  // ================= PRODUCTS ======================
  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = () => {
    setLoading(true);

    const q = query(
      collection(fireDB, "product"),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetAllProduct(products);
        setLoading(false);
      },
      (error) => {
        console.error("Product Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // ================= ORDERS =========================
  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderFunction = () => {
    setLoading(true);

    // ✅ CORRECT COLLECTION NAME
    const q = query(
      collection(fireDB, "orders"),
      orderBy("createdAt", "desc") // ✅ field exists
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetAllOrder(orders);
        setLoading(false);
      },
      (error) => {
        console.error("Order Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  const orderDelete = async (id) => {
    if (!id) return toast.error("Invalid order ID");

    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "orders", id));
      toast.success("Order deleted successfully ✅");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  // ================= USERS ==========================
  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFunction = () => {
    setLoading(true);

    const q = query(
      collection(fireDB, "user"),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetAllUser(users);
        setLoading(false);
      },
      (error) => {
        console.error("User Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // ================= INITIAL LOAD ===================
  useEffect(() => {
    const unsubscribeProducts = getAllProductFunction();
    const unsubscribeOrders = getAllOrderFunction();
    const unsubscribeUsers = getAllUserFunction();

    return () => {
      unsubscribeProducts && unsubscribeProducts();
      unsubscribeOrders && unsubscribeOrders();
      unsubscribeUsers && unsubscribeUsers();
    };
  }, []);

  // ================= CONTEXT ========================
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllOrder,
        getAllUser,
        orderDelete,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;





