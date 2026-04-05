import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RiskRewardCalculator from "../components/RiskRewardCalculator";
import PositionSizeCalculator from "../components/PositionSizeCalculator";
import ProfitLossEstimator from "../components/ProfitLossEstimator";

export default function Tools() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [openTool, setOpenTool] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true); // ✅ New state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/login");
    } else {
      setUsername(storedUsername || "Trader");
    }
  }, [navigate]);

  const toggleTool = (tool) => {
    setOpenTool(openTool === tool ? null : tool);
  };

  // Variants for staggered card entry (gentle)
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          📊 Trading Tools – Make smart decisions before every trade.
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base md:text-lg text-gray-400"
        >
          Hi {username}, here are your tools
        </motion.p>
      </motion.div>

      {/* ⚠️ Dismissible Disclaimer */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-6 text-gray-400 text-sm md:text-base"
          >
            ⚠️ These tools are designed to guide your decisions. Please do not rely on them completely and always manage your risk responsibly.
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-0 right-0 text-gray-400 hover:text-gray-200 font-bold text-lg"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tools Accordion */}
      <div className="space-y-4">
        {[
          { id: "rr", title: "⚖️ Risk-to-Reward Calculator", instruction: "Check before entering a trade to assess potential risk vs reward." },
          { id: "pos", title: "📏 Position Size Calculator", instruction: "Calculate how many units to buy based on your risk tolerance." },
          { id: "pl", title: "💹 Profit/Loss Potential Estimator", instruction: "Estimate potential profit or loss before placing your trade." },
        ].map((tool, i) => (
          <motion.div
            key={tool.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleTool(tool.id)}
              className="w-full flex flex-col items-start px-6 py-4 text-lg font-semibold transition-all duration-200 hover:bg-gray-700"
            >
              <span className="transition-all duration-200 hover:text-xl">
                {tool.title}
              </span>
              {/* Small instruction text with fade-in animation */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm font-normal text-gray-400 mt-1"
              >
                {tool.instruction}
              </motion.span>
              <motion.span
                animate={{ rotate: openTool === tool.id ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-auto text-2xl"
              >
                {openTool === tool.id ? "−" : "+"}
              </motion.span>
            </button>

            <AnimatePresence>
              {openTool === tool.id && (
                <motion.div
                  key={`${tool.id}-content`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-6 py-4 border-t border-gray-700 overflow-hidden"
                  layout
                >
                  {tool.id === "rr" && <RiskRewardCalculator />}
                  {tool.id === "pos" && <PositionSizeCalculator />}
                  {tool.id === "pl" && <ProfitLossEstimator />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
