
/**
 * UpdateProductPage.jsx
 * ---------------------
 * This page allows an admin to:
 * - Fetch a single product using its ID
 * - Pre-fill the form with existing product data
 * - Update product details in Firebase Firestore
 */

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

// ================= PRODUCT CATEGORIES =================
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

const UpdateProductPage = () => {
  // ================= GLOBAL CONTEXT =================
  const { loading, setLoading } = useContext(myContext);

  // ================= ROUTER =================
  const navigate = useNavigate();
  const { id } = useParams(); // product id from URL

  // ================= PRODUCT STATE =================
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: "",
    quantity: "",
  });

  // ================= FETCH PRODUCT BY ID =================
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(fireDB, "product", id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          // Pre-fill form with existing product data
          setProduct({
            title: data.title || "",
            price: data.price || "",
            productImageUrl: data.productImageUrl || "",
            category: data.category || "",
            description: data.description || "",
            time: data.time || Timestamp.now(),
            date: data.date || "",
          });
        } else {
          toast.error("Product not found");
          navigate("/admin-dashboard");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, setLoading]);

  // ================= UPDATE PRODUCT HANDLER =================
  const updateProductHandler = async (e) => {
    e.preventDefault();

    const { title, price, productImageUrl, category, description } = product;

    // Form validation
    if (!title || !price || !productImageUrl || !category || !description) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = doc(fireDB, "product", id);

      // Update product in Firestore
      await updateDoc(productRef, {
        title,
        price: Number(price),
        productImageUrl,
        category,
        description,
        time: Timestamp.now(), // update timestamp
      });

      toast.success("Product updated successfully 🎉");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Loader */}
      {loading && <Loader />}

      {/* Update Form Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-pink-600 mb-6 text-center">
          Update Product
        </h1>

        <form onSubmit={updateProductHandler} className="space-y-4">
          {/* Product Title */}
          <input
            type="text"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            placeholder="Product Title"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Product Price */}
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            placeholder="Product Price"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Product Image URL */}
          <input
            type="text"
            value={product.productImageUrl}
            onChange={(e) =>
              setProduct({
                ...product,
                productImageUrl: e.target.value,
              })
            }
            placeholder="Product Image URL"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Category Dropdown */}
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="">Select Category</option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Product Description */}
          <textarea
            rows="4"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
            placeholder="Product Description"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;





