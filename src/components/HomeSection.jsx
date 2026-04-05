import React from "react";
import { motion } from "framer-motion";

const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200 overflow-hidden"
    >
      {/* Soft glowing background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),_transparent_75%)] pointer-events-none" />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 mb-6 leading-tight drop-shadow-[0_0_12px_rgba(99,102,241,0.3)]"
        >
          Track Your Trades, Rule the Market 
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-300 text-lg sm:text-2xl mb-10 font-medium tracking-wide leading-relaxed"
        >
          <span className="text-indigo-400 font-semibold">TradeBook</span> helps you{" "}
          <span className="text-purple-400 font-semibold">analyze</span>,{" "}
          <span className="text-pink-400 font-semibold">organize</span>, and{" "}
          <span className="text-emerald-400 font-semibold">grow</span> your trading journey — 
          with smart insights, charts, and tools built for modern traders.
        </motion.p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signup")}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-pink-500/30 transition-all duration-300"
          >
            Get Started 
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-gray-600 px-6 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
