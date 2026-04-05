import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../utils/axios";

const AddTradeModal = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({
    symbol: "",
    type: "Buy",
    date: new Date(),
    profitLoss: "",
    tags: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        date: form.date ? form.date.toISOString().split("T")[0] : "",
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      };
      const res = await axiosInstance.post("/trades/", payload);
      if (res.data.success) {
        onAdded(res.data.trade);
        onClose();
      }
    } catch (err) {
      console.error("Error adding trade:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold flex justify-center items-center gap-2 text-green-400">
            <FiPlus className="text-xl" /> Add Trade
          </h2>
          <motion.p
            className="text-gray-400 text-sm mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            📈 Every trade counts—log it now!
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Symbol */}
          <input
            type="text"
            name="symbol"
            placeholder="Symbol (e.g., NIFTY)"
            value={form.symbol}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
            required
          />

          {/* Type */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
          >
            <option>Buy</option>
            <option>Sell</option>
          </select>

          {/* Date Picker */}
          <DatePicker
            selected={form.date}
            onChange={(date) => setForm({ ...form, date })}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
            calendarClassName="custom-calendar"
            popperClassName="custom-calendar-popper"
          />

          {/* Profit/Loss */}
          <input
            type="number"
            name="profitLoss"
            placeholder="(+)Profit / (-)Loss"
            value={form.profitLoss}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
            required
          />

          {/* Tags */}
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
          />

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-green-400 
                       hover:bg-gray-700 transition"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 
                         transition shadow-lg"
            >
              {loading ? "Saving..." : "Save Trade"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddTradeModal;
