import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false); // 🎯 Animation state

  useEffect(() => {
    setAnimate(true); // Trigger animation after mount
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;
      const username = res.data.user.username;
      const userId = res.data.user.id;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className={`bg-gray-800 p-6 rounded-lg w-full max-w-sm space-y-4 shadow-md border border-transparent hover:border-green-400 hover:shadow-green-500/20 transition-all duration-500 ease-in-out transform ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-green-400 flex items-center justify-center gap-2">
          <FaUserCircle />
          Login
        </h2>

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 pr-10 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-3 text-xl cursor-pointer text-gray-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold tracking-wide transition duration-300"
        >
          Login
        </button>

        {/* 📌 Don't have an account link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
