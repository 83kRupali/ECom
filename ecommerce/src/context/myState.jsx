
/**
 * MyState.jsx
 * -----------
 * This file acts as the GLOBAL STATE PROVIDER for the application.
 * It uses React Context + Firebase Firestore realtime listeners
 * to manage products, orders, users, and loading state.
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
  // ================= GLOBAL LOADING STATE =================
  const [loading, setLoading] = useState(false);

  // ========================================================
  // ====================== PRODUCTS ========================
  // ========================================================

  // Store all products
  const [getAllProduct, setGetAllProduct] = useState([]);

  /**
   * Fetch all products from Firestore in real-time
   * Uses onSnapshot to listen for live updates
   */
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
          ...doc.data(),
          id: doc.id,
        }));
        setGetAllProduct(products);
        setLoading(false);
      },
      (error) => {
        console.error("Product Firestore Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // ========================================================
  // ======================= ORDERS =========================
  // ========================================================

  // Store all orders
  const [getAllOrder, setGetAllOrder] = useState([]);

  /**
   * Fetch all orders from Firestore in real-time
   */
  const getAllOrderFunction = () => {
    setLoading(true);

    const q = query(
      collection(fireDB, "order"),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGetAllOrder(orders);
        setLoading(false);
      },
      (error) => {
        console.error("Order Firestore Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  /**
   * Delete an order by ID
   */
  const orderDelete = async (id) => {
    if (!id) return toast.error("Invalid order id");

    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order deleted successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // ======================== USERS =========================
  // ========================================================

  // Store all users
  const [getAllUser, setGetAllUser] = useState([]);

  /**
   * Fetch all users from Firestore in real-time
   */
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
          ...doc.data(),
          id: doc.id,
        }));
        setGetAllUser(users);
        setLoading(false);
      },
      (error) => {
        console.error("User Firestore Error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // ========================================================
  // ================= APP INITIAL LOAD =====================
  // ========================================================

  /**
   * Run all Firestore listeners when app loads
   * Clean up listeners on unmount
   */
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

  // ========================================================
  // ================= CONTEXT PROVIDER =====================
  // ========================================================

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






