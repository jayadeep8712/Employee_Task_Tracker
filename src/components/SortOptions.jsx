import React from 'react';

const SortOptions = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'title', label: 'Title', icon: 'bx-sort-a-z' },
    { value: 'status', label: 'Status', icon: 'bx-filter' },
    { value: 'priority', label: 'Priority', icon: 'bx-star' },
    { value: 'dueDate', label: 'Due Date', icon: 'bx-calendar' },
    { value: 'employee', label: 'Employee', icon: 'bx-user' }
  ];

  return (
    <div className="mb-6 bg-white/80 dark:bg-slate-900/70 rounded-2xl border border-white/50 dark:border-white/10 shadow-lg shadow-slate-900/10 backdrop-blur-xl p-4 transition-colors duration-300">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <i className='bx bx-sort text-xl text-sky-500 dark:text-sky-300'></i>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Sort by:</span>
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value, sortOrder)}
              className={`px-3 py-1.5 rounded-2xl text-sm font-medium transition-all flex items-center space-x-1 ${
                sortBy === option.value
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md shadow-slate-900/15'
                  : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-200 border border-slate-100/60 dark:border-white/10 hover:border-slate-200 dark:hover:border-slate-500'
              }`}
            >
              <i className={`bx ${option.icon}`}></i>
              <span>{option.label}</span>
            </button>
          ))}
          <button
            onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1.5 rounded-2xl text-sm font-medium bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-200 border border-slate-100/60 dark:border-white/10 hover:border-slate-200 dark:hover:border-slate-500 transition-all"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <i className={`bx ${sortOrder === 'asc' ? 'bx-sort-up' : 'bx-sort-down'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;

