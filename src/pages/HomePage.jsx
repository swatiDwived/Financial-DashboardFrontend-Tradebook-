import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import HomeSection from "../components/HomeSection";
import FeatureSection from "../components/FeatureSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer"

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="fixed w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg backdrop-blur-md border-b border-gray-700 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo + Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <FaChartLine className="text-indigo-400 text-2xl drop-shadow-lg" />
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                TradeBook
              </span>
            </motion.div>

            {/* Center: Nav Links (Desktop) */}
            <div className="hidden md:flex space-x-8">
              {["home", "features", "about"].map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Link
                    to={section}
                    smooth={true}
                    duration={500}
                    className="relative text-gray-300 hover:text-white font-medium cursor-pointer group transition-all duration-300"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right: Login / Signup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="hidden md:flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/login")}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-pink-500/30 transition-all duration-300"
              >
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/signup")}
                className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 px-5 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-emerald-400/30 transition-all duration-300"
              >
                Signup
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6 text-gray-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-gray-800 border-t border-gray-700"
          >
            {["home", "features", "about"].map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded hover:bg-gray-700 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}

            <button
              onClick={() => (window.location.href = "/login")}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded font-semibold text-white hover:shadow-pink-500/30 transition-all duration-300"
            >
              🔐 Login
            </button>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 px-4 py-2 rounded font-semibold text-white hover:shadow-emerald-400/30 transition-all duration-300"
            >
              📝 Signup
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* Dummy Sections */}
      <HomeSection />
     <FeatureSection />
     <AboutSection/>
     <Footer />
    </div>
  );
};

export default HomePage;
