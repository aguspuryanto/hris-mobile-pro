
import React, { useState } from 'react';
import { LeaveRequest } from '../types';

const LeavePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');
  const [formData, setFormData] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const history: LeaveRequest[] = [
    {
      id: 'LR-001',
      type: 'Sick Leave',
      startDate: '2024-10-10',
      endDate: '2024-10-11',
      reason: 'Seasonal flu',
      status: 'approved',
      requestDate: '2024-10-09',
    },
    {
      id: 'LR-002',
      type: 'Annual Leave',
      startDate: '2024-12-20',
      endDate: '2024-12-27',
      reason: 'Year end family vacation',
      status: 'pending',
      requestDate: '2024-10-15',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-orange-100 text-orange-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Leave Management</h2>
        <p className="text-gray-500 text-sm">Request and track time off</p>
      </div>

      <div className="bg-white p-2 rounded-2xl flex space-x-2 shadow-sm border border-gray-100">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'request' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'
          }`}
        >
          New Request
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'
          }`}
        >
          History
        </button>
      </div>

      {activeTab === 'request' ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          {showSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-100 animate-bounce">
              <i className="fa-solid fa-circle-check mr-2"></i>
              Leave request submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Leave Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                required
              >
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Personal Leave</option>
                <option>Maternity Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
                placeholder="Brief description for your leave..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                ) : (
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                )}
                Submit Request
              </button>
            </div>
          </form>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-start space-x-3">
              <i className="fa-solid fa-circle-info text-indigo-400 mt-1"></i>
              <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">
                Requests should be submitted at least 3 days in advance for annual leave. 
                Remaining balance: <span className="font-bold">12 Days</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
               <i className="fa-solid fa-calendar-xmark text-4xl text-gray-200 mb-2"></i>
               <p className="text-gray-400 text-sm font-medium">No leave history found</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <i className="fa-solid fa-plane-arrival text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 leading-tight">{item.type}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">{item.id}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 my-2">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">From</p>
                    <p className="text-xs font-bold text-gray-800">{item.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">To</p>
                    <p className="text-xs font-bold text-gray-800">{item.endDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-gray-500 italic flex-1 truncate pr-4">"{item.reason}"</p>
                  <p className="text-[10px] text-gray-400 whitespace-nowrap">{item.requestDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LeavePage;
