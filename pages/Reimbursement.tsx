
import React, { useState } from 'react';

const ReimbursementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');

  const history = [
    { title: 'Client Lunch - Meeting A', amount: 'Rp 450.000', date: '22 Oct 2024', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
    { title: 'Internet Allowance', amount: 'Rp 200.000', date: '15 Oct 2024', status: 'Approved', color: 'bg-green-100 text-green-600' },
    { title: 'Travel Expenses - Jakarta', amount: 'Rp 1.200.000', date: '05 Oct 2024', status: 'Approved', color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reimbursement</h2>
          <p className="text-gray-500 text-sm">Expenses & Claims</p>
        </div>
        <button className="bg-indigo-600 text-white w-12 h-12 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center">
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
      </div>

      <div className="bg-white p-2 rounded-2xl flex space-x-2 shadow-sm border border-gray-100">
        {['all', 'pending', 'approved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                  <i className="fa-solid fa-receipt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 leading-tight">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{item.date}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.color}`}>
                {item.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
               <p className="text-sm font-bold text-indigo-600">{item.amount}</p>
               <button className="text-gray-400 text-xs font-semibold flex items-center">
                 Details <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-indigo-50 p-4 rounded-3xl border border-indigo-100">
            <p className="text-[10px] text-indigo-400 uppercase font-bold mb-1">Total Claimed</p>
            <p className="text-lg font-bold text-indigo-600">Rp 4.2M</p>
         </div>
         <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100">
            <p className="text-[10px] text-orange-400 uppercase font-bold mb-1">In Process</p>
            <p className="text-lg font-bold text-orange-600">Rp 450k</p>
         </div>
      </div>
    </div>
  );
};

export default ReimbursementPage;
