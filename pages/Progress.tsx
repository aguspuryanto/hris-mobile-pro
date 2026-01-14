
import React from 'react';

const ProgressPage: React.FC = () => {
  const projects = [
    { name: 'Core API Revamp', progress: 75, tasks: '12/16', color: 'bg-indigo-600' },
    { name: 'UI Library Update', progress: 40, tasks: '4/10', color: 'bg-pink-500' },
    { name: 'Security Audit', progress: 95, tasks: '19/20', color: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Work Progress</h2>
        <p className="text-gray-500 text-sm">Task and Performance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Completed</p>
          <p className="text-2xl font-black text-emerald-600">24</p>
          <p className="text-[10px] text-gray-500">Tasks this week</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Efficiency</p>
          <p className="text-2xl font-black text-indigo-600">92%</p>
          <p className="text-[10px] text-gray-500">Top 10% Employee</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Active Projects</h3>
        {projects.map((project, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">{project.name}</h4>
              <span className="text-xs font-bold text-gray-400">{project.tasks}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full ${project.color} transition-all duration-1000`} 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Progress</p>
              <p className="text-xs font-black text-gray-800">{project.progress}%</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2">
          <i className="fa-solid fa-plus-circle"></i>
          <span>Add Work Log</span>
        </button>
      </section>
    </div>
  );
};

export default ProgressPage;
