import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTc1MTc4OWUyNjBkMDI2YmQ4YTgyMCIsImlhdCI6MTc3Njc2NzQyMSwiZXhwIjoxNzc3MzcyMjIxfQ.eC2m5N1u6cCqXG_HFx1l7mUiUT-1jtnm8iDD_UlWPTI";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setTasks(data);
        setError("");
      } else {
        setTasks([]);
        setError(data.message || "Failed to load tasks");
      }
    } catch {
      setTasks([]);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markCompleted = async (task) => {
    try {
      await fetch(`${API}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: "Completed",
          priority: task.priority,
          dueDate: task.dueDate,
        }),
      });

      fetchTasks();
    } catch {
      alert("Failed to update task");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Task Manager</h1>

      {error && <p>{error}</p>}
      {tasks.length === 0 && !error && <p>No tasks found</p>}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid gray",
            margin: "20px auto",
            padding: "15px",
            width: "320px",
            borderRadius: "10px",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Status:{" "}
            <b style={{ color: task.status === "Completed" ? "lightgreen" : "orange" }}>
              {task.status}
            </b>
          </p>
          <p>Priority: {task.priority}</p>

          {task.status !== "Completed" && (
            <button onClick={() => markCompleted(task)}>
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;