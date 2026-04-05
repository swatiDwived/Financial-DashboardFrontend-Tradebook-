// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import MonthPicker from "../components/MonthPicker";
import axiosInstance from "../utils/axios"; // axios instance with baseURL + auth
import TradesTable from "../components/TradesTable";
import EditTradeModal from "../components/EditTradeModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import AddTradeModal from "../components/AddTradeModal";// ✅ Import AddTradeModal
import SummaryCard from "../components/SummaryCard"; // ✅ Import SummaryCard
import ProfitLossPieChart from "../components/ProfitLossPieChart";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [selectedTagsTrade, setSelectedTagsTrade] = useState(null); // ✅ for tags modal
  const [selectedNotesTrade, setSelectedNotesTrade] = useState(null); // for notes
  const [editTrade, setEditTrade] = useState(null);
  const [deleteTrade, setDeleteTrade] = useState(null);
  // ✅ Add trade modal state
  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [pieData, setPieData] = useState(null);
  const [showPieModal, setShowPieModal] = useState(false);
  const [role, setRole] = useState("admin"); // default = admin

  // 🔐 Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/login");
    } else {
      setUsername(storedUsername || "Trader");
    }
  }, [navigate]);

  // 📡 Fetch trades when selectedMonth changes
  useEffect(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    setLoading(true);
    axiosInstance
      .get(`/trades?year=${year}&month=${month}`)
      .then((res) => {
        const fetchedTrades = res.data.trades || [];
        setTrades(fetchedTrades);
      })
      .catch((err) => {
        console.error("Error fetching trades:", err);
        setTrades([]);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 300);
      });
  }, [selectedMonth]);

  // ✅ Reusable function to fetch pie data
  const fetchPieData = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    axiosInstance
      .get(`/trades/pie?year=${year}&month=${month}`)
      .then((res) => {
        setPieData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching pie data:", err);
        setPieData(null);
      });
  };

  // 📡 Fetch pie chart data when selectedMonth changes
  useEffect(() => {
    fetchPieData();
  }, [selectedMonth]);

  const monthName = selectedMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // ✅ Calculate summary values
  const totalTrades = trades.length;
  const netPL = trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
  const successRate =
    totalTrades > 0
      ? ((trades.filter((t) => t.profitLoss > 0).length / totalTrades) * 100).toFixed(1)
      : 0;

  return (
    <motion.section
      className="min-h-screen bg-gray-900 text-white p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🧑‍💼 Welcome Section */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FaUserCircle className="text-blue-400 text-4xl" />
            <h1 className="text-2xl font-bold">
              Welcome, {username} !
            </h1>
          </div>
        </motion.h1>

        {/* 📅 Month Picker + Add Trade Button */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* ➕ Add Trade Button */}
          {role === "admin" && (
            <motion.button
              onClick={() => setShowAddTradeModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-xl shadow-md transition"
            >
              Add Trade
            </motion.button>
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <MonthPicker
            selectedMonth={selectedMonth}
            onChange={setSelectedMonth}
          />
        </motion.div>
      </motion.div>

      {/* 📦 Summary Cards */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <SummaryCard title="🔢 Total Trades" value={totalTrades} />
        <SummaryCard title="💰 Net P/L" value={netPL} isCurrency />
        <SummaryCard title="🎯 Success Rate" value={`${successRate}%`} />
      </motion.section>

      {/* 🥧 Pie Chart */}
      <motion.section
        className="bg-gray-800 p-6 rounded-2xl shadow text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4">🥧 Profit vs Loss</h2>

        {pieData ? (
          <>
            <p className="text-gray-400 mb-2">
              Profit: {pieData.profitPercentage}% | Loss: {pieData.lossPercentage}%
            </p>
            <button
              onClick={() => setShowPieModal(true)}
              className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl text-sm shadow-md"
            >
              View Pie Chart
            </button>
          </>
        ) : (
          <p className="text-gray-400 italic">No data available</p>
        )}
      </motion.section>

      {/* 📓 Trade Table */}
      <motion.section
        className="bg-gray-800 p-6 rounded-2xl shadow relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.h2
          className="text-lg font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          📓 Trades Table ({monthName})
        </motion.h2>

        {/* 🔄 Loading OR Table */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.p
              key="loading"
              className="text-center text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading trades...
            </motion.p>
          ) : (
            <TradesTable
              key="table"
              trades={trades}
              role={role}
              onView={(trade) => setSelectedTrade(trade)}
              onEdit={(trade) => setEditTrade(trade)}
              onDelete={(trade) => setDeleteTrade(trade)}
              onTagsClick={(trade) => setSelectedTagsTrade(trade)}
              onNotesClick={(trade) => setSelectedNotesTrade(trade)}
            />
          )}
        </AnimatePresence>

        {/* 🔍 Trade Details Modal */}
        <AnimatePresence>
          {selectedTrade && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">🔍 Trade Details</h2>
                <p><span className="font-medium">Symbol : </span> {selectedTrade.symbol}</p>
                <p><span className="font-medium">Type : </span> {selectedTrade.type}</p>
                <p><span className="font-medium">Date : </span> {new Date(selectedTrade.date).toLocaleDateString()}</p>
                <p>
                  <span className="font-medium">Profit/Loss:</span>{" "}
                  <span className={selectedTrade.profitLoss >= 0 ? "text-green-400" : "text-red-400"}>
                    ₹{selectedTrade.profitLoss}
                  </span>
                </p>
                <p><span className="font-medium">Tags : </span> {(selectedTrade.tags || []).join(", ") || "—"}</p>
                <p><span className="font-medium">Notes : </span> {selectedTrade.notes || "—"}</p>

                <div className="mt-6 flex justify-end">
                  <button
                    className="rounded-xl bg-red-600/80 hover:bg-red-600 px-4 py-2 text-sm"
                    onClick={() => setSelectedTrade(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🏷️ Tags Modal */}
        <AnimatePresence>
          {selectedTagsTrade && (
            <motion.div
              key="tags-modal"
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">🏷️ Trade Tags</h2>
                {selectedTagsTrade.tags && selectedTagsTrade.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTagsTrade.tags.map((tag, i) => (
                      <span
                        key={`tag-${i}`}
                        className="px-3 py-1 rounded-full bg-gray-700/70 text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No tags added.</p>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    className="rounded-xl bg-red-600/80 hover:bg-red-600 px-4 py-2 text-sm"
                    onClick={() => setSelectedTagsTrade(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📝 Notes Modal */}
        <AnimatePresence>
          {selectedNotesTrade && (
            <motion.div
              key="modal-notes"
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">📝 Trade Notes</h2>
                <p className="text-gray-300 whitespace-pre-line">
                  {selectedNotesTrade.notes || "No notes available for this trade."}
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    className="rounded-xl bg-red-600/80 hover:bg-red-600 px-4 py-2 text-sm"
                    onClick={() => setSelectedNotesTrade(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✏️ Edit Modal */}
        <AnimatePresence>
          {editTrade && (
            <EditTradeModal
              trade={editTrade}
              onClose={() => setEditTrade(null)}
              onSaved={(updated) => {
                setTrades((prev) =>
                  prev.map((t) => (t._id === updated._id ? updated : t))
                );
                fetchPieData(); // ✅ refresh pie after edit
                setEditTrade(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* 🗑️ Delete Modal */}
        <AnimatePresence>
          {deleteTrade && (
            <DeleteConfirmModal
              trade={deleteTrade}
              onClose={() => setDeleteTrade(null)}
              onDeleted={(deletedTrade) => {
                setTrades((prev) => prev.filter((t) => t._id !== deletedTrade._id));
                fetchPieData(); // ✅ refresh pie after delete
              }}
            />
          )}
        </AnimatePresence>

        {/* ➕ Add Trade Modal */}
        <AnimatePresence>
          {showAddTradeModal && (
            <AddTradeModal
              onAdded={(newTrade) => {
                const tradeDate = new Date(newTrade.date);
                const tradeYear = tradeDate.getFullYear();
                const tradeMonth = tradeDate.getMonth();

                // only add if it matches currently selected month
                if (
                  tradeYear === selectedMonth.getFullYear() &&
                  tradeMonth === selectedMonth.getMonth()
                ) {
                  setTrades((prev) => [newTrade, ...prev]);
                }
                fetchPieData(); // ✅ refresh pie after add
              }}
              onClose={() => setShowAddTradeModal(false)}   // ✅ added this line
            />
          )}
        </AnimatePresence>

        {/* Pie chart modal */}
        <AnimatePresence>
          {showPieModal && pieData && (
            <ProfitLossPieChart
              pieData={pieData}
              onClose={() => setShowPieModal(false)}
            />
          )}
        </AnimatePresence>
      </motion.section>

      {/* 📊 Timeline */}
      <motion.section
        className="bg-gray-800 p-6 rounded-2xl shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Timeline selectedMonth={selectedMonth} trades={trades} />
      </motion.section>
    </motion.section>
  );
};

export default Dashboard;
