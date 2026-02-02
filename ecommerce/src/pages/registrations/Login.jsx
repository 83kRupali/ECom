
// ================= IMPORTS =================
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Login = () => {
  // ================= CONTEXT =================
  // Global loading state from context
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // ================= ROUTER =================
  const navigate = useNavigate();

  // ================= FORM STATE =================
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // ================= LOGIN FUNCTION =================
  const userLoginFunction = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Form validation
    if (userLogin.email === "" || userLogin.password === "") {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      // Firebase Authentication (Email & Password)
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      // Fetch user details from Firestore using UID
      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users.user.uid)
      );

      const querySnapshot = await getDocs(q);

      let user;
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      // If user data not found in Firestore
      if (!user) {
        toast.error("User data not found");
        setLoading(false);
        return;
      }

      // Store logged-in user in localStorage
      localStorage.setItem("users", JSON.stringify(user));

      // Reset form
      setUserLogin({
        email: "",
        password: "",
      });

      toast.success("Login Successful 🎉");

      // Role-based navigation
      if (user.role === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Loader */}
      {loading && <Loader />}

      {/* Login Card */}
      <div className="bg-pink-100 w-full max-w-sm rounded-xl shadow-md p-6">
        <h2 className="text-center text-xl font-semibold text-pink-700 mb-6">
          Login
        </h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={userLoginFunction}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md border"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md border"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-600 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
