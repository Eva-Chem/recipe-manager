// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ pct }) {
  return (
    <div style={{ height: 12, background: "#222", borderRadius: 8, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: pct >= 100 ? "#22c55e" : "#60a5fa",
          transition: "width 300ms ease",
        }}
      />
    </div>
  );
}
