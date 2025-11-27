import React, { useState, useEffect } from 'react';
import mockData from './data/mockData.json';
import { loadDataFromStorage, saveDataToStorage } from './utils/localStorage';
import Dashboard from './components/Dashboard';
import TaskFilter from './components/TaskFilter';
import AddTask from './components/AddTask';
import EmployeeList from './components/EmployeeList';
import TaskSearch from './components/TaskSearch';
import SortOptions from './components/SortOptions';
import ToastContainer from './components/ToastContainer';
import TaskEditModal from './components/TaskEditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [employees, setEmployees] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isDark, setIsDark] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Load data from localStorage or use mock data
  useEffect(() => {
    const savedData = loadDataFromStorage();
    if (savedData && savedData.employees) {
      setEmployees(savedData.employees);
    } else {
      setEmployees(mockData.employees);
      saveDataToStorage(mockData);
    }
    
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save to localStorage whenever employees data changes
  useEffect(() => {
    if (employees.length > 0) {
      saveDataToStorage({ employees });
    }
  }, [employees]);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toast notification system
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Handle adding a new task
  const handleAddTask = (employeeId, newTask) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === employeeId
          ? { ...emp, tasks: [...emp.tasks, newTask] }
          : emp
      )
    );
    showToast('Task added successfully!', 'success');
  };

  // Handle editing a task
  const handleEditTask = (task, employeeId) => {
    setEditingTask({ task, employeeId });
  };

  const handleSaveTask = (employeeId, taskId, updatedData) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === employeeId
          ? {
              ...emp,
              tasks: emp.tasks.map(task =>
                task.id === taskId ? { ...task, ...updatedData } : task
              )
            }
          : emp
      )
    );
    setEditingTask(null);
    showToast('Task updated successfully!', 'success');
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId, employeeId, taskTitle) => {
    setDeletingTask({ taskId, employeeId, taskTitle });
  };

  const confirmDeleteTask = () => {
    if (deletingTask) {
      setEmployees(prevEmployees =>
        prevEmployees.map(emp =>
          emp.id === deletingTask.employeeId
            ? {
                ...emp,
                tasks: emp.tasks.filter(task => task.id !== deletingTask.taskId)
              }
            : emp
        )
      );
      showToast('Task deleted successfully!', 'success');
      setDeletingTask(null);
    }
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Handle task status change
  const handleTaskStatusChange = (taskId, employeeId) => {
    const statusOrder = ['Pending', 'In Progress', 'Completed'];
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === employeeId
          ? {
              ...emp,
              tasks: emp.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      status: statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length]
                    }
                  : task
              )
            }
          : emp
      )
    );
    showToast('Task status updated!', 'info');
  };

  // Handle sort change
  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder || sortOrder);
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />

      {/* Header */}
      <header className="relative pt-12 pb-4">
        <div className="container mx-auto px-4">
          <div className="bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-white/10 rounded-3xl shadow-2xl shadow-slate-900/10 backdrop-blur-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 text-white flex items-center justify-center text-3xl shadow-xl shadow-slate-900/20">
                  <i className='bx bx-group'></i>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Workspace</p>
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Employee Task Tracker</h1>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl">
                Fluid, modern workspace for managing team workloads, priorities, and delivery timelines in one beautiful view.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Active tasks</p>
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">{employees.flatMap(e => e.tasks).length}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Completion</p>
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                  {employees.flatMap(e => e.tasks).length
                    ? Math.round(
                        (employees.flatMap(e => e.tasks).filter(task => task.status === 'Completed').length /
                          employees.flatMap(e => e.tasks).length) * 100
                      )
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 space-y-8">
        <Dashboard employees={employees} />
        
        <AddTask employees={employees} onAddTask={handleAddTask} />
        
        <TaskSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <TaskFilter
              selectedStatus={statusFilter}
              onStatusChange={handleStatusFilterChange}
            />
          </div>
        </div>
        
        <SortOptions
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        
        <EmployeeList
          employees={employees}
          statusFilter={statusFilter}
          onStatusChange={handleTaskStatusChange}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          searchQuery={searchQuery}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-3xl backdrop-blur-2xl shadow-lg shadow-slate-900/10 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2 text-slate-500 dark:text-slate-400">
              <i className='bx bx-code-alt'></i>
              <p>Employee Task Tracker &copy; {new Date().getFullYear()}</p>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">Built with React + Tailwind. Designed for modern teams by <b className='text-sky-500 dark:text-sky-300'>Jayadeep Pendela.</b></p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {editingTask && (
        <TaskEditModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask.task}
          employeeId={editingTask.employeeId}
          onSave={handleSaveTask}
        />
      )}

      {deletingTask && (
        <DeleteConfirmModal
          isOpen={!!deletingTask}
          onClose={() => setDeletingTask(null)}
          onConfirm={confirmDeleteTask}
          taskTitle={deletingTask.taskTitle}
        />
      )}
    </div>
  );
}

export default App;

