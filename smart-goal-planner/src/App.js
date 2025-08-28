import React, { useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";

function App() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 5000,
      savedAmount: 2000,
      category: "Savings",
      deadline: "2025-09-30",
    },
    {
      id: 2,
      name: "Vacation Trip",
      targetAmount: 3000,
      savedAmount: 3000,
      category: "Travel",
      deadline: "2025-08-15",
    },
    {
      id: 3,
      name: "New Laptop",
      targetAmount: 2000,
      savedAmount: 500,
      category: "Electronics",
      deadline: "2025-08-10",
    },
    {
      id: 4,
      name: "Fitness Goal",
      targetAmount: 1000,
      savedAmount: 200,
      category: "Health",
      deadline: "2025-09-05",
    },
  ]);

  const addGoal = (newGoal) => setGoals([newGoal, ...goals]);

  const updateGoal = (id, updatedFields) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, ...updatedFields } : goal)));
  };

  const deleteGoal = (id) => setGoals(goals.filter((goal) => goal.id !== id));

  const depositGoal = (id, amount) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, savedAmount: Number(goal.savedAmount || 0) + Number(amount) }
          : goal
      )
    );
  };

  return (
    <div style={{ padding: "0 20px" }}>
      {/* Title with icon */}
      <h1 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.8rem", marginBottom: "1rem" }}>
        <span role="img" aria-label="target">
          🎯
        </span>
        Smart Goal Planner
      </h1>

      <GoalForm onAddGoal={addGoal} />
      <GoalList goals={goals} onUpdate={updateGoal} onDelete={deleteGoal} onDeposit={depositGoal} />
    </div>
  );
}

export default App;
