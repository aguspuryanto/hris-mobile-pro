
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'fa-house', label: 'Home' },
    { path: '/attendance', icon: 'fa-calendar-check', label: 'Absen' },
    { path: '/payroll', icon: 'fa-wallet', label: 'Gaji' },
    { path: '/progress', icon: 'fa-list-check', label: 'Tugas' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center py-2 px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] safe-bottom">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              isActive ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-xl mb-1`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
