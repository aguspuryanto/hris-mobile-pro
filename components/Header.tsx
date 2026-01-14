
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-3">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" 
        />
        <div>
          <h2 className="text-sm font-bold text-gray-800 leading-tight">{user.name}</h2>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="relative p-2 text-gray-400 hover:text-indigo-600">
          <i className="fa-solid fa-bell text-lg"></i>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-600"
        >
          <i className="fa-solid fa-right-from-bracket text-lg"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
