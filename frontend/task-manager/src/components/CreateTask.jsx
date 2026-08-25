import { useState } from "react";
import axios from "axios";

function CreateTask({ onClose, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [deadline, setDeadline] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tasks",
        {
          title: title,
          description: description,
          priority: priority,
          status: status,
          deadline: deadline || null,
        }
      );

      console.log("Task created:", response.data);

      onTaskCreated();
      onClose();

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl p-8 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Task
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new task to your task list
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

        </div>


        {/* Title */}
        <div className="mt-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-gray-400"
          />

        </div>


        {/* Description */}
        <div className="mt-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            placeholder="Enter task description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none focus:border-gray-400"
          />

        </div>


        {/* Priority / Status / Deadline */}
        <div className="flex gap-5 mt-5">

          {/* Priority */}
          <div className="flex-1">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

          </div>


          {/* Status */}
          <div className="flex-1">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

          </div>


          {/* Deadline */}
          <div className="flex-1">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
            />

          </div>

        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-7">

          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateTask}
            className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateTask;