// src/components/SummaryCard.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SummaryCard = ({ title, value, isCurrency = false }) => {
  const displayValue =
    isCurrency && typeof value === "number"
      ? `₹${value.toLocaleString("en-IN")}`
      : value;

  const valueColor =
    isCurrency && typeof value === "number"
      ? value > 0
        ? "text-green-400"
        : value < 0
        ? "text-red-400"
        : "text-gray-300"
      : "text-white";

  return (
    <motion.div
      className="relative bg-gray-900 p-6 rounded-2xl shadow-lg text-center overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* 🌈 Strong Border Glow */}
      <div
        className="absolute inset-0 rounded-2xl border border-transparent 
        group-hover:border-purple-500 
        group-hover:shadow-[0_0_40px_15px_rgba(168,85,247,1),
                            0_0_80px_30px_rgba(236,72,153,0.95),
                            0_0_120px_45px_rgba(59,130,246,0.9)] 
        transition duration-500 pointer-events-none"
      ></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* ✨ Title with stronger hover glow */}
        <h3
          className="text-lg font-semibold mb-3 text-gray-200 
          transition duration-300 group-hover:text-purple-300 
          group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,1)]"
        >
          {title}
        </h3>

        {/* Value with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.p
            key={displayValue} // re-animates on value change
            className={`text-3xl font-bold ${valueColor} transition duration-300 
              group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]`}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {displayValue}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
