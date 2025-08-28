import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount.trim()) return;

    const newGoal = {
      id: Date.now(),
      name: title,
      targetAmount: Number(amount),
      savedAmount: 0,
      category: "",
      deadline: "",
    };

    onAddGoal(newGoal);
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Goal Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <input
        type="number"
        placeholder="Goal Amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
