import React from "react";
import { motion } from "framer-motion";
import { FaChartBar, FaStickyNote, FaCalendarAlt, FaTools, FaBook, FaLock } from "react-icons/fa";

const features = [
  { icon: <FaChartBar size={30} className="text-indigo-400" />, title: "Smart Trade Analytics", description: "Instantly visualize monthly stats, profit/loss trends, and success rate." },
  { icon: <FaStickyNote size={30} className="text-indigo-400" />, title: "Tags & Notes", description: "Add tags and personal reflections for each trade to track your style and learnings." },
  { icon: <FaCalendarAlt size={30} className="text-indigo-400" />, title: "Yearly Timeline", description: "See your trading performance across months for a clear yearly overview." },
  { icon: <FaTools size={30} className="text-indigo-400" />, title: "Trading Tools", description: "Use Risk-to-Reward Calculator, Position Size Calculator, and Profit/Loss Potential Estimator." },
  { icon: <FaBook size={30} className="text-indigo-400" />, title: "Learning Hub", description: "Access curated resources and tips to improve your trading strategies." },
  { icon: <FaLock size={30} className="text-indigo-400" />, title: "Secure & Private", description: "JWT authentication and MongoDB protection ensure only you can access your data." },
];

// Variants for parent container to stagger children
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden text-gray-200"
    >
      {/* Soft glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),_transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 mb-3 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            Why Choose TradeBook?
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl font-semibold drop-shadow-[0_0_6px_rgba(99,102,241,0.3)]">
            Everything you need to grow as a trader.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.06, y: -5 }}
              className="bg-gray-800 rounded-2xl p-8 flex flex-col items-start text-left text-white shadow-lg border border-gray-700 hover:border-indigo-500/50 cursor-pointer transition-transform duration-300 will-change-transform"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
