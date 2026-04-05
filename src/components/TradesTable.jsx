import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return "-";
  }
}

export default function TradesTable({
  trades = [],
  role = "user",
  onView = () => { },
  onEdit = () => { },
  onDelete = () => { },
  onTagsClick = () => { },
  onNotesClick = () => { },
}) {
  if (!trades || trades.length === 0) {
    return (
      <motion.p
        className="text-center text-xl font-semibold text-gray-400"
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        📭 No trades for this month.Start by adding one!
      </motion.p>
    );
  }

  return (
    <>
      {/* Desktop / Tablet table */}
      <div className="hidden md:block">
        <motion.table
          className="w-full text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-2">View</th>
              <th className="py-3 px-2">Symbol</th>
              <th className="py-3 px-2">Type</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Profit/Loss</th>
              <th className="py-3 px-2">Tags</th>
              <th className="py-3 px-2">Notes</th>
              <th className="py-3 px-2">Edit</th>
              <th className="py-3 px-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {trades.map((t) => (
                <motion.tr
                  key={t._id}
                  className="border-b border-gray-800"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <td className="py-2 px-2">
                    <button
                      className="rounded-xl bg-gray-700/60 hover:bg-gray-700 px-3 py-1 text-sm"
                      onClick={() => onView(t)}
                    >
                      🔍 View
                    </button>
                  </td>
                  <td className="py-2 px-2 font-medium">{t.symbol}</td>
                  <td className="py-2 px-2">
                    {t.type ? t.type.charAt(0).toUpperCase() + t.type.slice(1) : ""}
                  </td>
                  <td className="py-2 px-2">{formatDate(t.date)}</td>
                  <td
                    className={`py-2 px-2 ${(t.profitLoss ?? 0) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                      }`}
                  >
                    ₹{(t.profitLoss ?? 0).toLocaleString("en-IN")}
                  </td>
                  <td className="py-2 px-2">
                    {t.tags && t.tags.length > 0 ? (
                      <button
                        className="rounded-xl bg-purple-600/80 hover:bg-purple-600 px-3 py-1 text-sm"
                        onClick={() => onTagsClick(t)}
                      >
                        View Tags
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </td>
                  <td className="py-2 px-2">
                    {t.notes ? (
                      <button
                        className="rounded-xl bg-yellow-600/80 hover:bg-yellow-600 px-3 py-1 text-sm"
                        onClick={() => onNotesClick(t)}
                      >
                        View Notes
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </td>
                  <td className="py-2 px-2">
                    {role === "admin" ? (
                      <button
                        className="rounded-xl bg-blue-600/80 hover:bg-blue-600 px-3 py-1 text-sm"
                        onClick={() => onEdit(t)}
                      >
                        ✏️ Edit
                      </button>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>

                  <td className="py-2 px-2">
                    {role === "admin" ? (
                      <button
                        className="rounded-xl bg-red-600/80 hover:bg-red-600 px-3 py-1 text-sm"
                        onClick={() => onDelete(t)}
                      >
                        🗑️ Delete
                      </button>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {trades.map((t) => (
            <motion.div
              key={`m-${t._id}`}
              className="rounded-2xl bg-gray-800 p-4 shadow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{t.symbol}</div>
                <div
                  className={`text-sm ${(t.profitLoss ?? 0) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  ₹{(t.profitLoss ?? 0).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-sm text-gray-300">
                <div>
                  <span className="text-gray-400">Type:</span> {t.type}
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>{" "}
                  {formatDate(t.date)}
                </div>
                <div className="mt-2">
                  {t.tags && t.tags.length > 0 ? (
                    <button
                      className="rounded-xl bg-purple-600/80 hover:bg-purple-600 px-3 py-1 text-sm"
                      onClick={() => onTagsClick(t)}
                    >
                      View Tags
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">No Tags</span>
                  )}
                </div>
                <div className="mt-2">
                  {t.notes ? (
                    <button
                      className="rounded-xl bg-gray-700/60 hover:bg-gray-700 px-3 py-1 text-sm"
                      onClick={() => onNotesClick(t)}
                    >
                      Open Notes
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">No Notes</span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  className="flex-1 rounded-xl bg-gray-700/60 hover:bg-gray-700 px-3 py-2 text-sm"
                  onClick={() => onView(t)}
                >
                  🔍 View
                </button>

                {role === "admin" && (
                  <>
                    <button
                      className="flex-1 rounded-xl bg-blue-600/80 hover:bg-blue-600 px-3 py-2 text-sm"
                      onClick={() => onEdit(t)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="flex-1 rounded-xl bg-red-600/80 hover:bg-red-600 px-3 py-2 text-sm"
                      onClick={() => onDelete(t)}
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
