import React from 'react';

const TaskFilter = ({ selectedStatus, onStatusChange }) => {
  const statuses = [
    { label: 'All', icon: 'bx-list-ul' },
    { label: 'Pending', icon: 'bx-time-five' },
    { label: 'In Progress', icon: 'bx-loader-circle' },
    { label: 'Completed', icon: 'bx-check-circle' }
  ];

  return (
    <div className="mb-8 bg-white/80 dark:bg-slate-900/70 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl shadow-slate-900/10 backdrop-blur-2xl p-6 transition-colors duration-300">
      <div className="flex items-center mb-4">
        <i className='bx bx-filter-alt text-2xl text-sky-500 dark:text-sky-300 mr-2'></i>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100">Filter tasks</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status.label}
            onClick={() => onStatusChange(status.label)}
            className={`px-5 py-2.5 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 ${
              selectedStatus === status.label
                ? 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-slate-900/15'
                : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-200 border border-slate-100/60 dark:border-white/10 hover:border-slate-200 dark:hover:border-slate-500 shadow-inner shadow-slate-900/5'
            }`}
          >
            <i className={`bx ${status.icon} text-lg`}></i>
            <span>{status.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;

