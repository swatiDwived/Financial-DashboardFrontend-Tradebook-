// src/components/MonthPicker.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function MonthPicker({ selectedMonth, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(selectedMonth.getFullYear());

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(year, monthIndex, 1);
    onChange(newDate);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((v) => !v);

  return (
    <div className="relative inline-block text-left group">
      {/* Subtle glow layer on hover (blur effect only) */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 
                      group-hover:opacity-100 transition duration-300 blur-md 
                      bg-white/5" />

      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleDropdown}
        className="relative flex items-center justify-between w-56 px-4 py-2 
                   bg-gray-800 text-gray-100 font-semibold rounded-2xl shadow-md
                   transition-all duration-300 hover:bg-gray-700"
      >
        <span>
          {`${monthNames[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute mt-2 w-64 bg-gray-900 border border-gray-700 
                       rounded-2xl shadow-lg z-[9999] p-4"
          >
            {/* Year navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setYear((prev) => prev - 1)}
                className="p-1 hover:bg-gray-800 rounded-full transition"
                aria-label="Previous year"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-gray-200 font-semibold">{year}</span>
              <button
                onClick={() => setYear((prev) => prev + 1)}
                className="p-1 hover:bg-gray-800 rounded-full transition"
                aria-label="Next year"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Months grid */}
            <div className="grid grid-cols-3 gap-2">
              {monthNames.map((month, idx) => {
                const isActive =
                  selectedMonth.getMonth() === idx &&
                  selectedMonth.getFullYear() === year;
                return (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(idx)}
                    className={`px-2 py-2 rounded-xl text-sm font-medium transition
                      ${isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
