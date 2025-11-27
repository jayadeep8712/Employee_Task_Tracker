import React from 'react';

const EmployeeList = ({ employees, statusFilter, onStatusChange, onEditTask, onDeleteTask, searchQuery, sortBy, sortOrder }) => {
  // Filter tasks based on selected status
  const filterTasks = (tasks) => {
    if (statusFilter === 'All') return tasks;
    return tasks.filter(task => task.status === statusFilter);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      'Pending': 'bg-orange-50 text-orange-700 border-orange-200',
      'In Progress': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Completed': 'bg-green-50 text-green-700 border-green-200'
    };
    return styles[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      'Pending': 'bx-time-five',
      'In Progress': 'bx-loader-circle',
      'Completed': 'bx-check-circle'
    };
    return icons[status] || 'bx-task';
  };

  // Get status icon color
  const getStatusIconColor = (status) => {
    const colors = {
      'Pending': 'text-orange-500',
      'In Progress': 'text-yellow-500',
      'Completed': 'text-green-500'
    };
    return colors[status] || 'text-gray-500';
  };

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const styles = {
      'High': 'bg-red-100 text-red-700 border-red-300',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Low': 'bg-blue-100 text-blue-700 border-blue-300'
    };
    return styles[priority] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    const icons = {
      'High': 'bx-error-circle',
      'Medium': 'bx-minus-circle',
      'Low': 'bx-check-circle'
    };
    return icons[priority] || 'bx-circle';
  };

  // Check if task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  // Filter and search tasks
  const filterAndSearchTasks = (tasks) => {
    let filtered = filterTasks(tasks);
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return filtered;
  };

  // Sort tasks
  const sortTasks = (tasks) => {
    const sorted = [...tasks];
    sorted.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
          bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const filteredEmployees = employees.map(emp => ({
    ...emp,
    tasks: sortTasks(filterAndSearchTasks(emp.tasks))
  })).filter(emp => emp.tasks.length > 0);

  if (filteredEmployees.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/70 rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl p-12 text-center transition-colors duration-300">
        <i className='bx bx-search-alt-2 text-6xl text-slate-300 dark:text-slate-600 mb-4'></i>
        <p className="text-slate-600 dark:text-slate-200 text-lg font-medium">No tasks match this view.</p>
        <p className="text-slate-400 dark:text-slate-400 text-sm mt-2">Try adjusting filters or clearing the search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredEmployees.map(employee => (
        <div
          key={employee.id}
          className="bg-white/85 dark:bg-slate-900/70 rounded-3xl border border-white/60 dark:border-white/10 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl p-6 hover:shadow-3xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100/60 dark:border-white/5">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-semibold text-lg shadow-xl shadow-slate-900/20">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{employee.name}</h3>
                <div className="flex items-center mt-1">
                  <i className='bx bx-briefcase text-sm text-slate-400 dark:text-slate-500 mr-1'></i>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{employee.role}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-200 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/60 dark:border-white/10 shadow-inner shadow-slate-900/5">
                <i className='bx bx-task mr-2'></i>
                {employee.tasks.length} {employee.tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {employee.tasks.map(task => (
              <div
                key={task.id}
                className="p-5 bg-white/90 dark:bg-slate-900/60 rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-white/60 dark:border-white/5 transition-all duration-200 group shadow-inner shadow-slate-900/5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`${getStatusIconColor(task.status)} bg-white/70 dark:bg-slate-900/60 p-3 rounded-2xl shadow-sm mt-1`}>
                      <i className={`bx ${getStatusIcon(task.status)} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-slate-800 dark:text-slate-100 font-semibold">{task.title}</h4>
                        {task.priority && (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPriorityBadge(task.priority)} flex items-center`}>
                            <i className={`bx ${getPriorityIcon(task.priority)} text-xs mr-1`}></i>
                            {task.priority}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center ${
                            isOverdue(task.dueDate) 
                              ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                              : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}>
                            <i className='bx bx-calendar text-xs mr-1'></i>
                            {new Date(task.dueDate).toLocaleDateString()}
                            {isOverdue(task.dueDate) && <i className='bx bx-error text-xs ml-1'></i>}
                          </span>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-300 mt-1 line-clamp-2">{task.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100/70 dark:border-white/5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(task.status)} flex items-center`}
                    >
                      <i className={`bx ${getStatusIcon(task.status)} mr-1.5`}></i>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditTask(task, employee.id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-2xl text-xs font-medium hover:from-sky-400 hover:to-blue-500 transition-all duration-200 flex items-center shadow-lg shadow-slate-900/15 transform hover:scale-105"
                      title="Edit task"
                    >
                      <i className='bx bx-edit mr-1'></i>
                      Edit
                    </button>
                    <button
                      onClick={() => onStatusChange(task.id, employee.id)}
                      className="px-3 py-1.5 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-100 rounded-2xl text-xs font-medium border border-slate-100/60 dark:border-white/10 hover:border-slate-200 dark:hover:border-slate-500 transition-all duration-200 flex items-center shadow-inner shadow-slate-900/5 transform hover:scale-105"
                      title="Change status"
                    >
                      <i className='bx bx-refresh mr-1'></i>
                      Status
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id, employee.id, task.title)}
                      className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl text-xs font-medium hover:from-rose-400 hover:to-orange-500 transition-all duration-200 flex items-center shadow-lg shadow-rose-300/30 transform hover:scale-105"
                      title="Delete task"
                    >
                      <i className='bx bx-trash mr-1'></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;

