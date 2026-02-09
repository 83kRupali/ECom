import { Button } from "@material-tailwind/react";
import{
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registrations/Signup";
import Login from "./pages/registrations/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import {Toaster} from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

export default function Example() {
  return (
   
    <MyState>
      <Router>
        <ScrollTop />
                {/* ✅ Toaster MUST be here */}
        <Toaster position="top-center " reverseOrder={false} />

        <Routes>
           <Route path="/" element={<HomePage />}/>
           <Route path="/*" element={<NoPage/> } />
           <Route path="/productinfo/:id" element={<ProductInfo/> } />
           <Route path="/cart" element={<CartPage/> } />
           <Route path="/allproducts" element={<AllProduct/> } />
           <Route path="/signup" element={<Signup/> } />
           <Route path="/login" element={<Login/> } />
           <Route path="/category/:categoryname" element={<CategoryPage/> } />
           <Route path="/payment-success" element={<PaymentSuccess />} />

           <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
            } />
           <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard/> 
            </ProtectedRouteForAdmin>
           } />
           <Route path="/addproduct" element={ 
          <ProtectedRouteForAdmin>
              <AddProductPage/>
            </ProtectedRouteForAdmin>
          } />
          
          {/* // App.jsx */}
          <Route path="/updateproduct/:id" element={<ProtectedRouteForAdmin>
              <UpdateProductPage/>
            </ProtectedRouteForAdmin>} />

        </Routes>
      </Router>
    </MyState>

  )
}