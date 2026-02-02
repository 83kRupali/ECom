
/**
 * AddProductPage.jsx
 * ------------------
 * Admin page to add a new product into Firestore.
 * Uses React Context for global loading state
 * and Firebase Firestore for database operations.
 */

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

/**
 * Static list of product categories
 */
const categoryList = [
  "fashion",
  "shirt",
  "jacket",
  "mobile",
  "laptop",
  "shoes",
  "home",
  "books",
];

const AddProductPage = () => {
  // ================= CONTEXT =================
  // Get loading state from global context
  const { loading, setLoading } = useContext(myContext);

  // Navigation hook
  const navigate = useNavigate();

  // ================= PRODUCT STATE =================
  // Holds product form data
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(), // Firestore timestamp
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ================= ADD PRODUCT FUNCTION =================
  const addProductFunction = async () => {
    // Form validation
    if (
      !product.title ||
      !product.price ||
      !product.productImageUrl ||
      !product.category ||
      !product.description
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      // Add product to Firestore
      await addDoc(collection(fireDB, "product"), product);

      toast.success("Product added successfully");

      // Redirect to admin dashboard
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Add product failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Show loader when API call is in progress */}
      {loading && <Loader />}

      {/* ================= FORM CARD ================= */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-center text-2xl font-semibold text-pink-600 mb-6">
          Add Product
        </h2>

        {/* Product Title */}
        <input
          type="text"
          placeholder="Product Title"
          value={product.title}
          onChange={(e) =>
            setProduct({ ...product, title: e.target.value })
          }
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Product Price */}
        <input
          type="number"
          placeholder="Product Price"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Product Image URL */}
        <input
          type="text"
          placeholder="Product Image URL"
          value={product.productImageUrl}
          onChange={(e) =>
            setProduct({
              ...product,
              productImageUrl: e.target.value,
            })
          }
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Category Dropdown */}
        <select
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        >
          <option value="">Select Category</option>
          {categoryList.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Product Description */}
        <textarea
          rows="4"
          placeholder="Product Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Submit Button */}
        <button
          onClick={addProductFunction}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;



