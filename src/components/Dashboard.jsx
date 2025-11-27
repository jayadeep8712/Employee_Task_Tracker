import React from 'react';

const Dashboard = ({ employees }) => {
  // Calculate statistics
  const allTasks = employees.flatMap(emp => emp.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = allTasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = allTasks.filter(task => task.status === 'Pending').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      gradient: 'from-sky-500 to-blue-500',
      icon: 'bx-task',
      glow: 'shadow-sky-300/40'
    },
    {
      label: 'Completed',
      value: completedTasks,
      gradient: 'from-emerald-500 to-teal-500',
      icon: 'bx-check-circle',
      glow: 'shadow-emerald-300/40'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      gradient: 'from-amber-400 to-orange-400',
      icon: 'bx-loader-circle',
      glow: 'shadow-amber-200/50'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      gradient: 'from-violet-500 to-fuchsia-500',
      icon: 'bx-time-five',
      glow: 'shadow-fuchsia-300/40'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/70 rounded-3xl border border-white/60 dark:border-white/10 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl p-8 mb-8 transition-colors duration-300">
      <div className="flex items-center mb-8">
        <i className='bx bx-bar-chart-alt-2 text-3xl text-sky-500 dark:text-sky-300 mr-3'></i>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Team Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${stat.glow} relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <i className={`bx ${stat.icon} text-3xl text-white`}></i>
                </div>
              </div>
              <p className="text-sm font-medium opacity-90 mb-1 tracking-wide">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/70 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 rounded-2xl p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className='bx bx-trending-up text-2xl text-sky-500 dark:text-sky-300 mr-2'></i>
            <span className="text-lg font-semibold text-slate-700 dark:text-slate-100">Completion rate</span>
          </div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100/60 dark:bg-slate-800/80 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-700 ease-out shadow-md relative"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

