import React from "react";

const Sidebar = ({ onLogout }) => {

  return (
    <div className="w-64 min-h-screen p-4">

      <div className="h-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-5 shadow-2xl text-white">

        <h2 className="text-2xl font-bold mb-10">
          Task Manager
        </h2>

        <nav className="space-y-3">

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/30 text-white font-medium"
          >
            <span>Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <span>My Tasks</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <span>Calendar</span>
          </a>

        </nav>

        {/* Logout */}
        <div className="mt-10 pt-5 border-t border-white/10">

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default Sidebar;