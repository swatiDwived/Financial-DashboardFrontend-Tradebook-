// src/components/ProfitLossPieChart.jsx
import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // bright green & red

const ProfitLossPieChart = ({ pieData, onClose }) => {
  const total = pieData.profitValue + pieData.lossValue;

  const chartData = [
    { name: "Profit", value: pieData.profitValue, color: "#22c55e" },
    { name: "Loss", value: pieData.lossValue, color: "#ef4444" },
  ];

  // ✅ Format value with commas in INR
  const formatINR = (value) =>
    `₹${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  // ✅ Render % labels outside with arrows
 const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30; // extra gap from arrow
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <motion.text
      x={x}
      y={y}
      fill={chartData[index].color}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight="bold"
      fontSize={16}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1.2 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {(percent * 100).toFixed(1)}%
    </motion.text>
  );
};

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-lg text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ✨ Animated Heading */}
        <motion.h2
          className="text-2xl font-bold mb-4 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📊 Profit vs Loss - {pieData.month}/{pieData.year}
        </motion.h2>

        {/* 🥧 Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                labelLine={true}
                label={renderCustomizedLabel}
                animationBegin={0}
                animationDuration={1200}
                isAnimationActive={true}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={8}
                    style={{
                      filter: `drop-shadow(0px 0px 8px ${entry.color})`,
                    }}
                  />
                ))}
              </Pie>
              {/* ✅ Tooltip with INR + commas */}
              <Tooltip
                formatter={(value, name) => [formatINR(value), name]}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-red-600/80 hover:bg-red-600 px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfitLossPieChart;
