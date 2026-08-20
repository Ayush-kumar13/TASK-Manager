import React from 'react'

const StatsCards = ({ tasks }) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"

  ).length;
  return (
    <div className="flex justify-between mt-8">

  <div className="bg-white rounded-xl border border-gray-200 p-6 w-60">
    <p className="text-gray-500 text-sm">
      Total Tasks
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {totalTasks}
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-200 p-6 w-60">
    <p className="text-gray-500 text-sm">
      pendingTasks
    </p>

    <h2 className="text-3xl font-bold mt-2">
       {pendingTasks}
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-200 p-6 w-60">
    <p className="text-gray-500 text-sm">
      In Progress
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {inProgressTasks}
    </h2>
  </div>

  <div className="bg-white rounded-xl border border-gray-200 p-6 w-60">
    <p className="text-gray-500 text-sm">
      Completed
    </p>
    <h2 className="text-3xl font-bold mt-2">
      {completedTasks}
    </h2>
  </div>

</div>
  )
}

export default StatsCards
