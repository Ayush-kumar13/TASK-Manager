import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import MyTasks from "./components/MyTasks";
import CreateTask from "./components/CreateTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/tasks"
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTasks]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold">
          Good morning, Ayush 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your tasks and stay productive.
        </p>

        <StatsCards tasks={tasks} />

        <MyTasks
          tasks={tasks}
          setTasks={setTasks}
          onCreateTask={() => setShowCreateTask(true)}
          refreshTasks={refreshTasks}
        />

        {showCreateTask && (
          <CreateTask
            onClose={() => setShowCreateTask(false)}
            onTaskCreated={() =>
              setRefreshTasks((prev) => !prev)
            }
          />
        )}

      </main>

    </div>
  );
}

export default App;