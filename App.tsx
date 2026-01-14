
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import PayrollPage from './pages/Payroll';
import ReimbursementPage from './pages/Reimbursement';
import OvertimePage from './pages/Overtime';
import LoanPage from './pages/Loans';
import ProgressPage from './pages/Progress';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50 shadow-xl overflow-hidden relative">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto pb-24 p-4">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/attendance" element={<Attendance user={user} />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/reimbursement" element={<ReimbursementPage />} />
            <Route path="/overtime" element={<OvertimePage />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </HashRouter>
  );
};

export default App;
