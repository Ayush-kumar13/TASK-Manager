import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200 p-6'>
      <h2 className='text-xl font-bold mb-10'>
        Task Manager
      </h2>
      <nav className='space-y-2'>
        <a href='#' className='block px-4 py-3 rounded-lg bg-gray-100 text-gray-900 font-medium'>
            Dashboard
        </a>
        <a href='#'className='block px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100'>
            My Tasks
        </a>
        <a href='#'className='block px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100'>
            Calandar
        </a>
      </nav>
      <div className="space-y-2">
        <a href='#' className='block px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100'>
          Settings
        </a>
        <a href='#' className='block px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-100'>
          Logout
        </a>
      </div>
    </div>
  )
}

export default Sidebar
