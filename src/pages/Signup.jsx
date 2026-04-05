import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✨ Animation state
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50); // small delay for smooth entry
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axiosInstance.post("/auth/register", {
        username: name,
        email,
        password
      });

      toast.success("Signup successful! Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className={`bg-gray-800 p-8 rounded-xl w-full max-w-sm space-y-6 shadow-xl border border-transparent hover:border-green-300 transition-all duration-700 ease-in-out cursor-pointer transform
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h3 className="text-3xl font-bold mb-4 text-center text-green-400 flex items-center justify-center gap-2">
          <FaUserPlus className="text-green-400" />
          Signup
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Password input with toggle */}
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

        {/* Confirm Password input with toggle */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 pr-10 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            onClick={() => setShowConfirmPassword(prev => !prev)}
            className="absolute right-3 top-3 text-xl cursor-pointer text-gray-400"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold tracking-wide transition duration-300"
        >
          Signup
        </button>

        {/* ✅ Already have an account? */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
