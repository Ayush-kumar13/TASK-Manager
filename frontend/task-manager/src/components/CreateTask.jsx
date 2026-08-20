import { useState } from "react";
import axios from "axios";

function CreateTask({ onClose ,onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [deadline, setDeadline] = useState("");

  const handleCreateTask = async () => {
    console.log("CREATE BUTTON CLICKED");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tasks",
        {
          title: title,
          description: description,
          priority: priority.toLowerCase(),
          status: status.toLowerCase(),
          deadline: deadline || null,
        }
      );

      console.log("TASK CREATED:", response.data);
      onTaskCreated();
      onClose();

    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">

      <h2 className="text-xl font-semibold">
        Create New Task
      </h2>

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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none"
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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none"
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
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
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
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
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
      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 border border-gray-200 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleCreateTask}
          className="px-5 py-2.5 bg-black text-white rounded-lg"
        >
          Create Task
        </button>

      </div>

    </div>
  );
}

export default CreateTask;