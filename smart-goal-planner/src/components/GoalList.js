import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

function daysLeft(deadline) {
  if (!deadline) return Infinity;
  const ms = new Date(deadline) - new Date();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function GoalItem({ goal, onDelete, onDeposit, onUpdate }) {
  const [deposit, setDeposit] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  const total = Number(goal.targetAmount || 0);
  const saved = Number(goal.savedAmount || 0);
  const pct = total > 0 ? Math.round((saved / total) * 100) : 0;
  const remaining = Math.max(0, total - saved);
  const dLeft = daysLeft(goal.deadline);
  const completed = total > 0 && saved >= total;
  const overdue = !completed && dLeft < 0;
  const warning = !completed && dLeft >= 0 && dLeft <= 30;

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = Number(deposit);
    if (!amount || amount <= 0) return;
    onDeposit(goal.id, amount);
    setDeposit("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updates = {
      name: form.name,
      targetAmount: Number(form.targetAmount),
      category: form.category,
      deadline: form.deadline,
    };
    onUpdate(goal.id, updates);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        marginBottom: 18,
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "white",
      }}
    >
      {!isEditing ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ fontSize: 16, color: "#111" }}>
                {goal.name || "(no name)"}
              </strong>
              <div style={{ color: "#6b7280", fontSize: 13 }}>
                {goal.category || ""}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                ${saved.toLocaleString()}
              </div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>
                ${total.toLocaleString()} target
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <ProgressBar pct={pct} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              <div>{pct}%</div>
              <div>${remaining.toLocaleString()} remaining</div>
            </div>
          </div>

          <div style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>
            Deadline: {goal.deadline || "—"}
            {completed && (
              <span style={{ marginLeft: 8, color: "#22c55e", fontWeight: 600 }}>
                • Completed
              </span>
            )}
            {overdue && (
              <span style={{ marginLeft: 8, color: "#ef4444", fontWeight: 600 }}>
                • Overdue
              </span>
            )}
            {warning && !overdue && !completed && (
              <span style={{ marginLeft: 8, color: "#f59e0b", fontWeight: 600 }}>
                • {dLeft} days left
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <form onSubmit={handleDeposit} style={{ display: "flex", gap: 6 }}>
              <input
                type="number"
                min="1"
                step="1"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Deposit amount"
                style={{ padding: "6px 8px", width: 140 }}
              />
              <button type="submit">Deposit</button>
            </form>

            <div style={{ flex: 1 }} />

            <button onClick={() => setIsEditing(true)} style={{ padding: "6px 10px" }}>
              Edit
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              style={{ padding: "6px 10px", background: "#ef4444", color: "white" }}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} style={{ marginTop: 8 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              value={form.targetAmount}
              onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
            />
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default function GoalList({ goals = [], onDelete, onDeposit, onUpdate }) {
  if (!goals || goals.length === 0)
    return <p>No goals yet. Add one above 👆</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {goals.map((g) => (
        <GoalItem key={g.id} goal={g} onDelete={onDelete} onDeposit={onDeposit} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
