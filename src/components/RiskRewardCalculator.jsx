import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RiskRewardCalculator() {
  const [entry, setEntry] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const entryPrice = parseFloat(entry);
    const stop = parseFloat(stopLoss);
    const tgt = parseFloat(target);
    const qty = parseFloat(quantity);

    if (isNaN(entryPrice) || isNaN(stop) || isNaN(tgt) || isNaN(qty)) {
      return;
    }

    const riskPerShare = Math.abs(entryPrice - stop);
    const rewardPerShare = Math.abs(tgt - entryPrice);

    const riskAmount = riskPerShare * qty;
    const rewardAmount = rewardPerShare * qty;
    const rrRatio =
      riskAmount > 0 ? (rewardAmount / riskAmount).toFixed(2) : "∞";

    setResult({
      riskAmount: riskAmount.toFixed(2),
      rewardAmount: rewardAmount.toFixed(2),
      rrRatio,
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            step="0.01"
            placeholder="Entry Price"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Stop Loss"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Target Price"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            step="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Calculate
          </button>
        </div>
      </form>

      {/* Animated Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result-box"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`rounded-xl p-4 space-y-2 shadow-lg ${
              parseFloat(result.rrRatio) >= 2
                ? "bg-green-800/60 border border-green-500"
                : "bg-red-800/60 border border-red-500"
            }`}
          >
            <p>
              <span className="font-semibold text-red-400">Risk:</span> ₹
              {result.riskAmount}
            </p>
            <p>
              <span className="font-semibold text-green-400">Reward:</span> ₹
              {result.rewardAmount}
            </p>
            <p>
              <span className="font-semibold text-indigo-400">R:R Ratio:</span>{" "}
              {result.rrRatio}
            </p>
            <p className="font-semibold mt-2">
              R:R = 1:{result.rrRatio} →{" "}
              {parseFloat(result.rrRatio) >= 2
                ? "✅ Good trade opportunity."
                : "⚠️ Risky trade, reconsider."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
