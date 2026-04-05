import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PositionSizeCalculator() {
  const [entry, setEntry] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [capitalRisk, setCapitalRisk] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const entryPrice = parseFloat(entry);
    const stop = parseFloat(stopLoss);
    const capital = parseFloat(capitalRisk);

    if (isNaN(entryPrice) || isNaN(stop) || isNaN(capital)) {
      return;
    }

    const riskPerShare = Math.abs(entryPrice - stop);
    const maxQty =
      riskPerShare > 0 ? Math.floor(capital / riskPerShare) : 0;

    setResult({
      riskPerShare: riskPerShare.toFixed(2),
      maxQty,
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
            placeholder="Capital Willing to Risk (₹)"
            value={capitalRisk}
            onChange={(e) => setCapitalRisk(e.target.value)}
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
            key="pos-result-box"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gray-700 rounded-xl p-4 space-y-2 shadow-lg border border-indigo-500"
          >
            <p>
              <span className="font-semibold text-red-400">
                Risk per Share:
              </span>{" "}
              ₹{result.riskPerShare}
            </p>
            <p>
              <span className="font-semibold text-green-400">
                Max Quantity to Buy:
              </span>{" "}
              {result.maxQty} shares
            </p>
            <p className="font-semibold mt-2 text-indigo-300">
              {result.maxQty > 0
                ? `✅ Buy up to ${result.maxQty} shares within your risk limit.`
                : "⚠️ Invalid setup. Risk is undefined."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
