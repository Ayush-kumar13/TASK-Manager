import { useEffect, useState } from "react";
import axios from "axios";

const MyTasks = ({ onCreateTask, refreshTasks }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [refreshTasks]);

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

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/tasks/${taskId}`
      );

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <main className="mt-8">

      {/* Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          My Tasks
        </h2>

        <button
          onClick={onCreateTask}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Create Task
        </button>
      </div>


      {/* Search + Filters */}
      <div className="flex justify-between items-center mt-6">



      
      </div>


      {/* Task Table */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 text-sm text-gray-500">

          <div className="w-2/5">
            Task
          </div>

          <div className="w-1/5">
            Priority
          </div>

          <div className="w-1/5">
            Status
          </div>

          <div className="w-1/5">
            Deadline
          </div>

          <div className="w-1/5">
            Actions
          </div>

        </div>


        {/* Tasks */}
        {tasks.map((task) => (

          <div
            key={task.id}
            className="flex items-center px-6 py-5 border-b border-gray-100"
          >

            {/* Task */}
            <div className="w-2/5">

              <p className="font-medium text-gray-900">
                {task.title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {task.description}
              </p>

            </div>


            {/* Priority */}
           <div className="w-1/5">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      task.priority === "high"
        ? "bg-red-100 text-red-600"
        : task.priority === "medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    {task.priority}
  </span>
</div>


            {/* Status */}
           <div className="w-1/5">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      task.status === "completed"
        ? "bg-green-100 text-green-700"
        : task.status === "in progress"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {task.status}
  </span>
</div>


            {/* Deadline */}
            <div className="w-1/5 text-sm text-gray-500">
              {task.deadline}
            </div>


            {/* Actions */}
            <div className="w-1/5">

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
};

export default MyTasks;