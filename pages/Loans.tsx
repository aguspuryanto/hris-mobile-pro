
import React from 'react';

const LoanPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Cash Advance</h2>
        <p className="text-gray-500 text-sm">Financial Support Program</p>
      </div>

      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <p className="text-emerald-100 text-xs font-bold uppercase mb-1">Active Loan Balance</p>
        <h1 className="text-3xl font-bold">Rp 2.400.000</h1>
        <div className="mt-4 flex space-x-4">
           <div>
             <p className="text-[10px] text-emerald-100 uppercase">Monthly Deduction</p>
             <p className="text-sm font-bold">Rp 600.000</p>
           </div>
           <div>
             <p className="text-[10px] text-emerald-100 uppercase">Remaining Terms</p>
             <p className="text-sm font-bold">4 Months</p>
           </div>
        </div>
        <i className="fa-solid fa-sack-dollar absolute top-6 right-6 text-emerald-500 text-4xl opacity-50"></i>
      </div>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h3 className="text-lg font-bold text-gray-800">New Application</h3>
        <div className="space-y-4">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase">Desired Amount</label>
             <input type="number" placeholder="Rp 0" className="w-full mt-1 px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 font-bold" />
           </div>
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase">Installments (Months)</label>
             <select className="w-full mt-1 px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500">
               <option>3 Months</option>
               <option>6 Months</option>
               <option>12 Months</option>
             </select>
           </div>
           <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
             Submit Request
           </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Past Applications</h3>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between opacity-60">
           <div className="flex items-center space-x-3">
             <i className="fa-solid fa-circle-check text-green-500"></i>
             <div>
               <p className="text-sm font-bold">Rp 5.000.000</p>
               <p className="text-[10px] text-gray-400">Paid Off on 20 Aug 2024</p>
             </div>
           </div>
           <i className="fa-solid fa-chevron-right text-gray-300"></i>
        </div>
      </section>
    </div>
  );
};

export default LoanPage;
