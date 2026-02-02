// OrderDetail Component
// This component displays all orders placed by users
// Admin can view order details and delete an order

import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  // Get orders list and delete function from global context
  const { getAllOrder, orderDelete } = useContext(myContext);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-lg font-semibold text-pink-600 mb-4">All Orders</h1>

      <div className="bg-white rounded-lg border border-pink-200 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-pink-50">
            <tr>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Qty</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {getAllOrder.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {getAllOrder.map((order, orderIndex) =>
              order.cartItems.map((item, itemIndex) => {
                const {
                  id,
                  productImageUrl,
                  title,
                  category,
                  price,
                  quantity,
                } = item;

                return (
                  <tr key={`${order.id}-${id}`} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{orderIndex + 1}</td>

                    <td className="border px-4 py-2">
                      <img
                        src={productImageUrl}
                        alt={title}
                        className="w-12 h-12 object-contain"
                      />
                    </td>

                    <td className="border px-4 py-2">{title}</td>
                    <td className="border px-4 py-2">{category}</td>
                    <td className="border px-4 py-2">₹{price}</td>
                    <td className="border px-4 py-2">{quantity}</td>
                    <td className="border px-4 py-2">₹{price * quantity}</td>
                    <td className="border px-4 py-2 capitalize">
                      {order.status}
                    </td>
                    <td className="border px-4 py-2">
                      {order.addressInfo?.name}
                    </td>
                    <td className="border px-4 py-2">{order.email}</td>
                    <td className="border px-4 py-2">{order.date}</td>
                    <td
                      onClick={() => orderDelete(order.id)}
                      className="border px-4 py-2 cursor-pointer transition stroke-slate-500 text-slate-500 text-red-500"
                    >
                      Delete
                    </td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
