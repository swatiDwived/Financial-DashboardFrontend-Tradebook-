// src/components/DeleteConfirmModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axios";

const DeleteConfirmModal = ({ trade, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!trade) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Call backend API
      await axiosInstance.delete(`/trades/delete/${trade._id}`);

      // ✅ Update parent list via callback
      if (onDeleted) {
        onDeleted(trade);
      }

      onClose(); // ✅ Close modal after deletion
    } catch (err) {
      console.error("Error deleting trade:", err);
      setError("Failed to delete trade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-400">
            ⚠️ Confirm Delete
          </h2>

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <p className="text-gray-300 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{trade.symbol}</span>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-xl bg-gray-700 px-4 py-2 text-sm hover:bg-gray-600"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
