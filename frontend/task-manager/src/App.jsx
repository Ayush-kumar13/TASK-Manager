import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import MyTasks from "./components/MyTasks";
import CreateTask from "./components/CreateTask";
import SetTheme from "./components/SetTheme";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [darkMode,setDarkMode]=useState(false)

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
  <div
  className={`flex min-h-screen ${
    darkMode
      ? "bg-gray-900"
      : "bg-white"
  }`}
>
      <Sidebar />

      <main className="flex-1 p-10 text-white">

<div className="flex justify-between items-start">

  <div>
    <h1 className="text-3xl font-bold">
      Good morning, Ayush 👋
    </h1>

    <p className="text-gray-500 mt-2">
      Manage your tasks and stay productive.
    </p>
  </div>


  <div className="flex items-center gap-4">

    {/* Notification */}
    <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
      🔔
    </button>


    {/* Profile */}
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
        A
      </div>

      <div>
        <p className="text-sm font-semibold">
          Ayush Kumar
        </p>

        <p className="text-xs text-gray-500">
          User
        </p>
      </div>

    </div>

  </div>

</div>
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
        <SetTheme 
        darkMode={darkMode}
        setDarkMode={setDarkMode}/>

      </main>

    </div>
  );
}

export default App;