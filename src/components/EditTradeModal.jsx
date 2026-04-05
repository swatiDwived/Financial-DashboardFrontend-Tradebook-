import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // ✅ import styles
import { CalendarIcon } from "lucide-react";

const EditTradeModal = ({ trade, onClose, onSaved }) => {
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("buy");
  const [date, setDate] = useState(null);
  const [profitLoss, setProfitLoss] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // 🔑 Prefill fields whenever `trade` changes
  useEffect(() => {
    if (trade) {
      setSymbol(trade.symbol || "");
      setType(trade.type || "buy");
      setDate(trade.date ? new Date(trade.date) : null);
      setProfitLoss(trade.profitLoss ?? "");
      setTagsInput((trade.tags || []).join(", "));
      setNotes(trade.notes || "");
    }
  }, [trade]);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const payload = {
        symbol,
        type,
        date,
        profitLoss: Number(profitLoss),
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        notes,
      };
      const { data } = await axiosInstance.put(`/trades/update/${trade._id}`, payload);
      onSaved(data.trade); // ✅ send only the updated trade


      // ❌ Don't call onClose here, Dashboard handles closing smoothly
    } catch (err) {
      console.error(err);
      setError("Failed to save trade.");
    } finally {
      setSaving(false);
    }
  };


  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-lg"
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">✏️ Edit Trade</h2>

        {error && <p className="text-red-400">{error}</p>}

        <div className="space-y-4">
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Symbol"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>

          {/* ✅ Modern DatePicker */}
          <div className="relative">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholderText="Select a date"
              calendarClassName="custom-calendar"
              popperClassName="custom-calendar-popper"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-white w-5 h-5 pointer-events-none" />
          </div>
          <input
            type="number"
            value={profitLoss}
            onChange={(e) => setProfitLoss(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="(+)Profit / (-)Loss"
          />
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Tags (comma separated)"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Notes"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-700 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            onClick={handleSave}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditTradeModal;
