import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);

  // TEMP: store token (later we’ll replace this with login UI)
  useEffect(() => {
    localStorage.setItem("token", "PASTE_YOUR_TOKEN_HERE");
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;