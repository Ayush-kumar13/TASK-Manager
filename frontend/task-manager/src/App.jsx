import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import MyTasks from "./components/MyTasks";
import CreateTask from "./components/CreateTask";
import SetTheme from "./components/SetTheme";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const [refreshTasks, setRefreshTasks] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  // Get all tasks
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

  // Fetch tasks after login
  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn, refreshTasks]);

  // Login / Register screen
  if (!isLoggedIn) {

    if (showRegister) {
      return (
        <Register
          onRegister={() => setShowRegister(false)}
          onBackToLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onLogin={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
        }}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  // Dashboard
  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >

      {/* Sidebar */}
      <Sidebar
        onLogout={() => {
          setUser(null);
          setIsLoggedIn(false);
        }}
      />

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-start">

          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Good morning, {user?.name || "Ayush"} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your tasks and stay productive.
            </p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">

            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              🔔
            </button>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {user?.name || "Ayush Kumar"}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.email || "User"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Stats Cards */}
        <StatsCards tasks={tasks} />

        {/* My Tasks */}
        <MyTasks
          tasks={tasks}
          setTasks={setTasks}
          onCreateTask={() => setShowCreateTask(true)}
          refreshTasks={refreshTasks}
        />

        {/* Create Task Modal */}
        {showCreateTask && (
          <CreateTask
            onClose={() => setShowCreateTask(false)}
            onTaskCreated={() => {
              setRefreshTasks((prev) => !prev);
            }}
          />
        )}

        {/* Theme */}
        <SetTheme
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

      </main>
    </div>
  );
}

export default App;