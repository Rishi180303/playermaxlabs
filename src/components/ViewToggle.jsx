"use client";

import { motion } from "framer-motion";

export default function ViewToggle({ view, setView }) {
  return (
    <div className="relative flex items-center rounded-full border border-card-border bg-card p-1">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-accent"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          left: view === "athlete" ? "4px" : "50%",
          width: "calc(50% - 4px)",
        }}
      />
      <button
        onClick={() => setView("athlete")}
        className={`relative z-10 cursor-pointer rounded-full px-4 py-1.5 font-display text-sm font-medium transition-colors ${
          view === "athlete" ? "text-bg" : "text-muted hover:text-fg"
        }`}
      >
        Athlete
      </button>
      <button
        onClick={() => setView("coach")}
        className={`relative z-10 cursor-pointer rounded-full px-4 py-1.5 font-display text-sm font-medium transition-colors ${
          view === "coach" ? "text-bg" : "text-muted hover:text-fg"
        }`}
      >
        Coach
      </button>
    </div>
  );
}
