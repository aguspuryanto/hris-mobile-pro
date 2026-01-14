
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const quickActions = [
    { label: 'Reimburse', icon: 'fa-receipt', color: 'bg-orange-100 text-orange-600', path: '/reimbursement' },
    { label: 'Overtime', icon: 'fa-clock', color: 'bg-blue-100 text-blue-600', path: '/overtime' },
    { label: 'Loans', icon: 'fa-hand-holding-dollar', color: 'bg-green-100 text-green-600', path: '/loans' },
    { label: 'Leave', icon: 'fa-plane-departure', color: 'bg-purple-100 text-purple-600', path: '/leave' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold mt-1">{user.name}</h1>
          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-indigo-100 uppercase font-bold tracking-wider">Clock In</p>
              <p className="text-lg font-bold">08:15 AM</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-indigo-100 uppercase font-bold tracking-wider">Work Hours</p>
              <p className="text-lg font-bold">07:45:00</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fa-solid fa-briefcase text-[120px] -rotate-12 translate-x-8 -translate-y-8"></i>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.path} className="flex flex-col items-center space-y-2">
              <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                <i className={`fa-solid ${action.icon} text-xl`}></i>
              </div>
              <span className="text-[11px] font-semibold text-gray-600">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Announcements</h3>
          <button className="text-indigo-600 text-sm font-semibold">View All</button>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
          <h4 className="font-bold text-gray-800 mb-1">Office Outage Update</h4>
          <p className="text-sm text-gray-600 line-clamp-2">The main office network will be under maintenance this weekend from Saturday 8PM to Sunday 4AM...</p>
          <div className="flex items-center mt-3 text-[10px] text-gray-400 font-medium">
            <i className="fa-regular fa-clock mr-1"></i>
            <span>2 hours ago</span>
          </div>
        </div>
      </section>

      {/* Task Summary */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Tasks</h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Update Sprint Report</p>
                  <p className="text-xs text-gray-500">Project Phoenix</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-600 text-[10px] px-2 py-1 rounded-full font-bold">In Progress</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
