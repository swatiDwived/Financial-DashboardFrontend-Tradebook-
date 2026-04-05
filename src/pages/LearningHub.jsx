import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LessonCard from "../components/LessonCard";

export default function LearningHub() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/login");
    } else {
      setUsername(storedUsername || "Trader");
    }
  }, [navigate]);

  // ✅ Categories with lessons
  const categories = [
    {
      id: "risk",
      title: "🟢 Risk Management",
      description: "Learn how to protect your capital and manage risks like a pro.",
      lessons: [
        { title: "Risk Only 2% Per Trade", description: "Never risk more than 2% of your total trading capital on a single trade." },
        { title: "Always Use Stop-Loss", description: "A stop-loss protects you from huge unexpected moves and limits losses." },
        { title: "Maintain a Positive Risk-Reward Ratio", description: "Only take trades where potential reward is at least twice the risk (1:2)." },
        { title: "Avoid Over-Leveraging", description: "Too much leverage amplifies losses and can wipe out your account." },
      ],
    },
    {
      id: "psychology",
      title: "🟡 Trading Psychology",
      description: "Master your emotions and stick to your trading plan.",
      lessons: [
        { title: "Control Emotions, Follow the Plan", description: "Stick to your pre-defined rules instead of impulsive decisions." },
        { title: "Avoid Revenge Trading", description: "Don’t try to win back losses immediately; it usually leads to more mistakes." },
        { title: "Patience is Also a Strategy", description: "Wait for quality setups instead of forcing bad trades." },
        { title: "Confidence Comes from Discipline", description: "Consistency builds true trading confidence, not lucky wins." },
      ],
    },
    {
      id: "strategy",
      title: "🔵 Strategy & Execution",
      description: "Build, backtest, and refine strong trading strategies.",
      lessons: [
        { title: "Master One Strategy First", description: "Focus on one strategy deeply before juggling multiple ones." },
        { title: "Keep a Trading Journal", description: "Document every trade to learn from mistakes and successes." },
        { title: "Backtest Before Going Live", description: "Test strategies on past market data before risking real money." },
        { title: "Avoid Over-Trading", description: "Quality trades matter more than quantity." },
      ],
    },
    {
      id: "discipline",
      title: "🔴 Motivation & Discipline",
      description: "Stay consistent, recover from losses, and grow steadily.",
      lessons: [
        { title: "Consistency Over Perfection", description: "Small, steady improvements beat chasing perfect trades." },
        { title: "One Bad Day Doesn’t Define You", description: "Losses are normal; focus on recovery and discipline." },
        { title: "Survival is the Key", description: "Protect your capital first, profits will follow later." },
        { title: "Learn from Mistakes, Don’t Repeat Them", description: "Analyze mistakes and make sure they don’t repeat." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-left"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2">
          <motion.span
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            📘
          </motion.span>
          Learning Hub
        </h1>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl mb-6 text-gray-400 hover:text-gray-300"
        >
          Hey {username}, master the mindset and skills of a disciplined trader.
        </motion.h2>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-base md:text-lg max-w-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-medium mb-10"
      >
        ✨ Explore bite-sized lessons to strengthen your trading discipline.
        At the end, test your knowledge with a quick quiz and see your progress instantly.
      </motion.p>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <LessonCard
              title={cat.title}
              description={cat.description}
              lessons={cat.lessons}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
