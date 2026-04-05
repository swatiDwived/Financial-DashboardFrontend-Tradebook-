// src/components/Timeline.jsx
import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axios";
import { motion } from "framer-motion";

const Timeline = ({ selectedMonth, trades }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);

  // Fetch timeline for selected year only
  const fetchTimeline = useCallback(async () => {
    try {
      const year =
        selectedMonth instanceof Date
          ? selectedMonth.getFullYear()
          : new Date().getFullYear();

      const res = await axiosInstance.get(`/trades/timeline?year=${year}`);
      setTimelineData(res.data || []);
    } catch (err) {
      console.error("Error fetching timeline:", err);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchTimeline();
    setActiveIdx(null); // reset expanded card when year changes
  }, [fetchTimeline, trades]);

  const monthDot = (label) => (
    <motion.div
      className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                 flex items-center justify-center text-white font-semibold shadow-lg"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 220 }}
    >
      {label}
    </motion.div>
  );

  return (
    <div className="w-full bg-gray-800 rounded-2xl p-6 shadow-md">
      <motion.h2
        className="text-2xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📊 Yearly Timeline
      </motion.h2>

      {/* ======= Desktop / Tablet ======= */}
      <div className="relative hidden md:flex items-center justify-between w-full px-6 py-10">
        {/* connector line */}
        <div className="absolute left-10 right-10 top-1/2 h-[2px] bg-gray-600/40 rounded-full" />

        {timelineData.map((item, idx) => {
          const short = item.month.slice(0, 3);
          const alignLeft = idx <= 1;
          const alignRight = idx >= timelineData.length - 2;

          return (
            <div key={idx} className="relative group flex flex-col items-center">
              {monthDot(short)}

              {/* Hover tooltip */}
              <div
                className={[
                  "pointer-events-none absolute z-20 mt-5",
                  alignLeft
                    ? "left-0 translate-x-0"
                    : alignRight
                      ? "right-0 translate-x-0"
                      : "left-1/2 -translate-x-1/2",
                ].join(" ")}
                style={{ top: "3.5rem" }}
              >
                <div
                  className="w-56 max-w-[70vw] p-4 bg-gray-900/95 backdrop-blur rounded-xl shadow-xl 
                             border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <p className="font-semibold text-lg">{item.month}</p>
                  <p className="text-gray-300">Total Trades: {item.totalTrades}</p>
                  <p className="text-green-400">
                    Profit: ₹{Number(item.totalProfit || 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-red-400">
                    Loss: ₹{Number(item.totalLoss || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======= Mobile ======= */}
      <div className="md:hidden w-full">
        <div className="grid grid-cols-3 gap-4">
          {timelineData.map((item, idx) => {
            const short = item.month.slice(0, 3);
            const open = activeIdx === idx;

            return (
              <div key={idx} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveIdx(open ? null : idx)}
                  className="focus:outline-none"
                >
                  {monthDot(short)}
                </button>

                {open && (
                  <div className="mt-3 w-full rounded-xl bg-gray-900 p-3 border border-gray-700 shadow-lg">
                    <p className="font-semibold">{item.month}</p>
                    <p className="text-gray-300 text-sm">
                      Total Trades: {item.totalTrades}
                    </p>
                    <p className="text-green-400 text-sm">
                      Profit: ₹{Number(item.totalProfit || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="text-red-400 text-sm">
                      Loss: ₹{Number(item.totalLoss || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
