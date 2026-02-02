
/**
 * ProductDetail Component
 * -----------------------
 * Displays all products for the admin dashboard.
 * Admin can view, add, edit, and delete products.
 * Data is fetched from Firebase Firestore using global context.
 */

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  // Access global state and functions from context
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct } = context;

  const navigate = useNavigate();

  /**
   * Delete Product Function
   * Deletes a product from Firestore by product ID
   */
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "product", id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete Product Error:", error);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-pink-600">
          All Products
        </h1>

        {/* Add Product Button */}
        <Link to="/addproduct">
          <button className="bg-pink-100 text-pink-600 px-4 py-2 rounded-md border border-pink-200 hover:bg-pink-200 transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* ================= LOADER ================= */}
      {loading && (
        <div className="flex justify-center my-10">
          <Loader />
        </div>
      )}

      {/* ================= PRODUCT TABLE ================= */}
      {!loading && (
        <div className="bg-white rounded-lg border border-pink-200 overflow-x-auto">
          <table className="w-full border-collapse">
            
            {/* Table Header */}
            <thead className="bg-pink-50">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {Array.isArray(getAllProduct) && getAllProduct.length > 0 ? (
                getAllProduct.map((item, index) => {
                  const {
                    id,
                    title,
                    price,
                    category,
                    date,
                    productImageUrl,
                  } = item;

                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      {/* Serial Number */}
                      <td className="border px-4 py-2">
                        {index + 1}
                      </td>

                      {/* Product Image */}
                      <td className="border px-4 py-2">
                        <img
                          src={productImageUrl}
                          alt={title}
                          className="w-20 h-16 object-contain"
                        />
                      </td>

                      {/* Product Details */}
                      <td className="border px-4 py-2">{title}</td>
                      <td className="border px-4 py-2">₹{price}</td>
                      <td className="border px-4 py-2 capitalize">
                        {category}
                      </td>
                      <td className="border px-4 py-2">{date}</td>

                      {/* Actions */}
                      <td className="border px-4 py-2 space-x-3">
                        <button
                          onClick={() =>
                            navigate(`/updateproduct/${id}`)
                          }
                          className="text-green-600 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProduct(id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                // No product message
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
