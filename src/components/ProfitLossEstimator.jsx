import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfitLossEstimator() {
  const [entry, setEntry] = useState("");
  const [target, setTarget] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // ✅ error state added

  const handleCalculate = (e) => {
    e.preventDefault();

    const entryPrice = parseFloat(entry);
    const tgt = parseFloat(target);
    const stop = parseFloat(stopLoss);
    const qty = parseInt(quantity);

    if (isNaN(entryPrice) || isNaN(tgt) || isNaN(stop) || isNaN(qty)) {
      return;
    }

    // ✅ Validation rules
    if (tgt < entryPrice) {
      setError("❌ Invalid setup: Target price is below Entry price.");
      setResult(null);
      return;
    }

    if (stop > entryPrice) {
      setError("❌ Invalid setup: Stop Loss is above Entry price.");
      setResult(null);
      return;
    }

    const profitPerShare = tgt - entryPrice;
    const lossPerShare = entryPrice - stop;

    const maxProfit = profitPerShare * qty;
    const maxLoss = lossPerShare * qty;

    setResult({
      maxProfit: maxProfit.toFixed(2),
      maxLoss: maxLoss.toFixed(2),
    });
    setError(null);
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
            placeholder="Target Price"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-red-400 font-semibold"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Animated Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="pl-result-box"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gray-700 rounded-xl p-4 space-y-2 shadow-lg border border-indigo-500"
          >
            <p>
              <span className="font-semibold text-green-400">
                Potential Profit:
              </span>{" "}
              ₹{result.maxProfit}
            </p>
            <p>
              <span className="font-semibold text-red-400">Max Loss:</span> ₹
              {result.maxLoss}
            </p>
            <p className="font-semibold mt-2 text-indigo-300">
              {parseFloat(result.maxProfit) > parseFloat(result.maxLoss)
                ? "✅ Reward outweighs risk. Possible good trade."
                : "⚠️ Loss risk is high compared to reward."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
