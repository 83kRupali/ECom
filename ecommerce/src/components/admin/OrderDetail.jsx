import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const { getAllOrder, orderDelete, loading } = useContext(myContext);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-lg font-semibold text-pink-600 mb-4">
        All Orders
      </h1>

      <div className="bg-white rounded-lg border border-pink-200 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-pink-50">
            <tr>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* 🔄 Loading */}
            {loading && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading orders...
                </td>
              </tr>
            )}

            {/* ❌ No Orders */}
            {!loading && getAllOrder.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}

            {/* ✅ Orders */}
            {!loading &&
              getAllOrder.map((order, index) => (
                <tr key={order.id} className="align-top">
                  <td className="border px-4 py-2">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-2">
                    {order.orderId || order.id}
                  </td>

                  {/* PRODUCTS */}
                  <td className="border px-4 py-2">
                    {Array.isArray(order.cartItems) &&
                    order.cartItems.length > 0 ? (
                      order.cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 mb-2"
                        >
                          <img
                            src={item.productImageUrl}
                            alt={item.title}
                            className="w-10 h-10 object-contain"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.category} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        No products
                      </p>
                    )}
                  </td>

                  {/* TOTAL */}
                  <td className="border px-4 py-2 font-semibold">
                    ₹{order.totalAmount || 0}
                  </td>

                  {/* STATUS */}
                  <td className="border px-4 py-2 capitalize">
                    {order.status || "N/A"}
                  </td>

                  {/* USER */}
                  <td className="border px-4 py-2">
                    {order.addressInfo?.name || "—"}
                  </td>

                  {/* DATE */}
                  <td className="border px-4 py-2">
                    {order.date || "—"}
                  </td>

                  {/* DELETE */}
                  <td
                    onClick={() => orderDelete(order.id)}
                    className="border px-4 py-2 text-red-500 cursor-pointer hover:underline"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
