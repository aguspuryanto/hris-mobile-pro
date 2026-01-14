
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('john.doe@company.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: '1',
        name: 'John Doe',
        role: 'Senior Software Engineer',
        avatar: 'https://picsum.photos/seed/user1/200',
        email: email
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-indigo-600 flex flex-col justify-center px-6">
      <div className="bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-briefcase text-4xl text-indigo-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">HRIS Pro</h1>
          <p className="text-gray-500">Employee Self-Service</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded" defaultChecked /> Remember me
            </label>
            <a href="#" className="text-indigo-600 font-semibold">Forgot Password?</a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
            ) : null}
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          Not your company? <a href="#" className="text-indigo-600 font-semibold">Contact HR</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
