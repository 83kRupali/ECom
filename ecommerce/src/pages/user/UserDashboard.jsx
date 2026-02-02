
import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";

const UserDashboard = () => {
  // Get logged-in user data from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Get global state from context
  const { loading, getAllOrder } = useContext(myContext);

  // Filter orders that belong to the logged-in user
  const userOrders = getAllOrder.filter(
    (order) => order.userid === user?.uid
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8">
        
        {/* ================= USER PROFILE ================= */}
        <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              alt="User"
              className="w-16 h-16"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-3 space-y-1">
            <h1>
              <span className="font-bold">Name:</span> {user?.name}
            </h1>
            <h1>
              <span className="font-bold">Email:</span> {user?.email}
            </h1>
            <h1>
              <span className="font-bold">Date:</span> {user?.date}
            </h1>
            <h1>
              <span className="font-bold">Role:</span> {user?.role}
            </h1>
          </div>
        </div>

        {/* ================= USER ORDERS ================= */}
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Order Details
          </h2>

          {/* Loading State */}
          {loading && <p>Loading...</p>}

          {/* No Orders Found */}
          {!loading && userOrders.length === 0 && (
            <p className="text-gray-500">No orders found</p>
          )}

          {/* Orders List */}
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="mt-6 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
            >
              {/* ===== LEFT : ORDER INFO ===== */}
              <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold">Order ID</p>
                    <p className="text-sm">{order.id}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Date</p>
                    <p className="text-sm">{order.date}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Status</p>
                    <p className="text-sm capitalize">
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT : PRODUCT DETAILS ===== */}
              <div className="flex-1 p-6">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col py-6 md:flex-row md:items-center"
                    >
                      {/* Product Image */}
                      <img
                        src={item.productImageUrl}
                        alt={item.title}
                        className="h-20 w-20 rounded-lg border object-contain"
                      />

                      {/* Product Info */}
                      <div className="ml-5 flex-1">
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.category}
                        </p>
                        <p className="text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-right">
                        ₹{item.price * item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
