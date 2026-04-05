import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-900 text-white transition-all duration-300">
        {/* Actual Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
