import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LessonCard({ title, description, lessons }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative bg-gray-800 p-6 rounded-xl shadow-md cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Gradient border glow effect on hover */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition duration-300 pointer-events-none"></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Header with Title + Chevron */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-gray-400" />
          </motion.div>
        </div>

        {/* Expandable Lessons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-4 space-y-3 overflow-hidden"
            >
              {lessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start bg-gray-700 p-3 rounded-lg hover:bg-gray-600 hover:shadow-md transition"
                >
                  <span className="mr-2 text-blue-400">📌</span>
                  <div>
                    <h4 className="font-medium text-white">{lesson.title}</h4>
                    <p className="text-gray-300 text-sm">{lesson.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
