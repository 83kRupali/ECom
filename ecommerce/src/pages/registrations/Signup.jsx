
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  // Get global loading state from context
  const { loading, setLoading } = useContext(myContext);

  const navigate = useNavigate();

  // ================= USER SIGNUP STATE =================
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  // ================= SIGNUP FUNCTION =================
  const userSignUpFunction = async (e) => {
    e.preventDefault(); // prevent page reload

    // Basic validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      // Create user using Firebase Authentication
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // User data to store in Firestore
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // Store user data in Firestore
      await addDoc(collection(fireDB, "user"), user);

      // Reset form
      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      toast.success("Signup Successfully 🎉");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Loader */}
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <Loader />
        </div>
      )}

      {/* Signup Card */}
      <div className="bg-pink-100 w-full max-w-sm rounded-xl shadow-md p-6">
        <h2 className="text-center text-xl font-semibold text-pink-700 mb-6">
          Signup
        </h2>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={userSignUpFunction}>
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md border"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md border"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-md border"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium"
          >
            Signup
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;









