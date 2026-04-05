import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaBook, FaTools } from "react-icons/fa";

const aboutHighlights = [
  {
    icon: <FaChartLine size={28} className="text-indigo-400" />,
    title: "Smart Trade Analytics",
    bullets: ["Add trades", "Analyze Trades", "Yearly overview"],
  },
  {
    icon: <FaBook size={28} className="text-purple-400" />,
    title: "Learning Hub",
    bullets: ["Analyze winning trades", "Understand mistakes", "Improve strategy"],
  },
  {
    icon: <FaTools size={28} className="text-pink-400" />,
    title: "Trading Tools",
    bullets: ["Risk-to-Reward Calculator", "Position Size Calculator", "Profit/Loss Potential Estimator"],
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden text-gray-200"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.1),_transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 mb-6 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]"
        >
          About TradeBook
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 font-semibold drop-shadow-[0_0_6px_rgba(99,102,241,0.2)]"
        >
          Your personal companion to track, analyze, and grow as a trader.
        </motion.p>

        {/* Story */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10"
        >
          Trading can be overwhelming with numbers, charts, and countless trades to track.
          TradeBook simplifies this process — log trades, add notes, and analyze patterns effortlessly.
          With our intuitive dashboard and smart insights, you can focus on learning, improving,
          and making confident decisions every day.
        </motion.p>

        {/* Mini feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          {aboutHighlights.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-gray-800 rounded-xl p-6 flex flex-col items-start text-left text-white shadow-md border border-gray-700 hover:border-indigo-500/50 cursor-pointer transition-transform duration-300"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.2)]">
                {feature.title}
              </h3>
              <ul className="list-disc list-inside text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* --- NEW CONTENT STARTS HERE --- */}

        {/* How It Works Timeline (with fade-up stagger) */}
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
            How TradeBook Works
          </h3>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { step: "1", title: "Log Your Trades", text: "Add your buy/sell trades with details and tags effortlessly." },
              { step: "2", title: "Analyze Performance", text: "Track profit/loss, monthly stats, and success rate instantly." },
              { step: "3", title: "Learn & Grow", text: "Use notes and analytics to improve your strategy and mindset." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-purple-500/50 shadow-md"
              >
                <div className="text-3xl font-bold text-indigo-400 mb-2">{item.step}</div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts / Quick Stats (added subtle hover scale) */}
        <motion.div
          className="mt-20 grid sm:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: "10+", label: "Smart Insights" },
            { number: "100%", label: "Secure & Private" },
            { number: "∞", label: "Trading Growth Potential" },
          ].map((fact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-xl bg-gray-800 shadow-md border border-gray-700 hover:border-indigo-500/50"
            >
              <motion.h4
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500"
                whileHover={{ scale: 1.1 }}
              >
                {fact.number}
              </motion.h4>
              <p className="text-gray-300 mt-2">{fact.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder’s Note */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto text-center italic text-gray-400 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="border-l-4 border-purple-400 pl-4 text-left leading-relaxed">
            “TradeBook was created with one goal — to make trading more insightful and less stressful.
            It’s not just a tracker; it’s your growth partner that helps you learn from every trade
            and evolve as a smarter trader every day.”
          </p>
        </motion.div>

        {/* Vision Section (with soft glow background) */}
        <motion.div
          className="mt-16 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15),_transparent_70%)] blur-3xl -z-10" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
            Our Vision
          </h3>
          <ul className="text-gray-300 text-base sm:text-lg space-y-2">
            <li>Empower every Indian trader with smart trade tracking tools.</li>
            <li>Turn raw data into meaningful insights, not confusion.</li>
            <li>Build a community of confident, data-driven traders.</li>
          </ul>
        </motion.div>

        {/* --- NEW CONTENT ENDS HERE --- */}

        {/* Call to Action */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-pink-500/30 transition-all duration-300"
          >
            Start Trading Smarter →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
