
/**
 * AdminDashboard.jsx
 * -------------------
 * Admin dashboard page that shows:
 * - Admin profile information
 * - Total products, orders, and users count
 * - Tab-based navigation for managing products, orders, and users
 */

import {
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";

import { useContext } from "react";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";

const AdminDashboard = () => {
  // ================= ADMIN DATA =================
  // Logged-in admin details stored in localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // ================= GLOBAL CONTEXT =================
  // Fetch products, orders, and users from global state
  const { getAllProduct, getAllOrder, getAllUser } =
    useContext(myContext);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-5 px-5 mt-5">
        <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h1 className="text-center text-2xl font-bold text-pink-500">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="px-5">
        {/* ================= ADMIN PROFILE ================= */}
        <div className="mb-8">
          <div className="bg-pink-50 py-6 rounded-xl border border-pink-100 flex flex-col items-center gap-3">
            {/* Profile Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              alt="admin"
              className="w-20 h-20"
            />

            {/* Admin Details */}
            <div>
              <h1 className="text-center text-lg">
                <span className="font-bold">Name:</span> {user?.name}
              </h1>

              <h1 className="text-center text-lg">
                <span className="font-bold">Email:</span> {user?.email}
              </h1>

              <h1 className="text-center text-lg">
                <span className="font-bold">Date:</span> {user?.date}
              </h1>

              <h1 className="text-center text-lg">
                <span className="font-bold">Role:</span> {user?.role}
              </h1>
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD TABS ================= */}
        <Tabs value="products">
          {/* ================= STATS CARDS ================= */}
          <TabsHeader className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Products Count */}
              <Tab
                value="products"
                className="bg-pink-50 border border-pink-200 rounded-xl p-6 flex flex-col items-center hover:shadow-md transition"
              >
                <ShoppingCartIcon className="w-8 h-8 text-pink-600 mb-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {getAllProduct.length}
                </h2>
                <p className="text-sm text-pink-700">Total Products</p>
              </Tab>

              {/* Orders Count */}
              <Tab
                value="orders"
                className="bg-pink-50 border border-pink-200 rounded-xl p-6 flex flex-col items-center hover:shadow-md transition"
              >
                <ClipboardDocumentListIcon className="w-8 h-8 text-pink-600 mb-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {getAllOrder.length}
                </h2>
                <p className="text-sm text-pink-700">Total Orders</p>
              </Tab>

              {/* Users Count */}
              <Tab
                value="users"
                className="bg-pink-50 border border-pink-200 rounded-xl p-6 flex flex-col items-center hover:shadow-md transition"
              >
                <UsersIcon className="w-8 h-8 text-pink-600 mb-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {getAllUser.length}
                </h2>
                <p className="text-sm text-pink-700">Total Users</p>
              </Tab>
            </div>
          </TabsHeader>

          {/* ================= TAB CONTENT ================= */}
          <TabsBody className="mt-8">
            {/* Products Management */}
            <TabPanel value="products">
              <ProductDetail />
            </TabPanel>

            {/* Orders Management */}
            <TabPanel value="orders">
              <OrderDetail />
            </TabPanel>

            {/* Users Management */}
            <TabPanel value="users">
              <UserDetail />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
    </Layout>
  );
};

export default AdminDashboard;


