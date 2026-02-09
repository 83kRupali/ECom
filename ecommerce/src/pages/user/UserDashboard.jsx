import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const UserDashboard = () => {
  // Logged-in user (from localStorage)
  const user = JSON.parse(localStorage.getItem("users"));

  // Global loading state (optional)
  const { loading } = useContext(myContext);

  // Orders state
  const [userOrders, setUserOrders] = useState([]);

  // 🔥 Fetch user orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      try {
        const q = query(
          collection(fireDB, "orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

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

          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* No Orders */}
          {!loading && userOrders.length === 0 && (
            <p className="text-gray-500">No orders found</p>
          )}

          {/* Orders List */}
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="mt-6 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
            >
              {/* LEFT */}
              <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold">Order ID</p>
                    <p className="text-sm">{order.id}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Date</p>
                    {/* <p className="text-sm">{order.date}</p> */}
                    <p className="text-sm">
  {order.date ||
    (order.createdAt?.seconds
      ? new Date(order.createdAt.seconds * 1000).toDateString()
      : "—")}
</p>

                  </div>

                  <div>
                    <p className="text-sm font-semibold">Status</p>
                    <p className="text-sm capitalize">{order.status}</p>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex-1 p-6">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.cartItems?.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col py-6 md:flex-row md:items-center"
                    >
                      <img
                        src={item.productImageUrl}
                        alt={item.title}
                        className="h-20 w-20 rounded-lg border object-contain"
                      />

                      <div className="ml-5 flex-1">
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.category}
                        </p>
                        <p className="text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>

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























