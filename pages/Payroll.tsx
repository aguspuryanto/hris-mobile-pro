
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { month: 'Jun', amount: 8500000 },
  { month: 'Jul', amount: 8700000 },
  { month: 'Aug', amount: 8500000 },
  { month: 'Sep', amount: 9200000 },
  { month: 'Oct', amount: 9500000 },
];

const PayrollPage: React.FC = () => {
  const breakdown = {
    earnings: [
      { label: 'Basic Salary', amount: 8000000, icon: 'fa-money-bill-wave' },
      { label: 'Transport Allowance', amount: 500000, icon: 'fa-car' },
      { label: 'Meal Allowance', amount: 1000000, icon: 'fa-utensils' },
      { label: 'Overtime Pay', amount: 500000, icon: 'fa-clock' },
    ],
    deductions: [
      { label: 'BPJS Health', amount: 200000, icon: 'fa-heart-pulse' },
      { label: 'BPJS Ketenagakerjaan', amount: 300000, icon: 'fa-shield-halved' },
    ]
  };

  const formatCurrency = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Salary & Benefits</h2>
        <p className="text-gray-500 text-sm">Financial overview for October 2024</p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Estimated Net Pay</p>
              <h1 className="text-3xl font-black mt-1">Rp 9.500.000</h1>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
               <i className="fa-solid fa-wallet text-xl"></i>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-indigo-400/30 flex justify-between">
             <div>
               <p className="text-[10px] text-indigo-100 uppercase font-bold">Status</p>
               <div className="flex items-center mt-1">
                 <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                 <p className="text-sm font-bold">Calculated</p>
               </div>
             </div>
             <div className="text-right">
               <p className="text-[10px] text-indigo-100 uppercase font-bold">Payout Date</p>
               <p className="text-sm font-bold mt-1">28 Oct 2024</p>
             </div>
          </div>
        </div>
        <i className="fa-solid fa-coins absolute -bottom-4 -right-4 text-white opacity-10 text-8xl rotate-12"></i>
      </div>

      {/* Detailed Breakdown Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 px-1">Salary Breakdown</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Earnings */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4 text-green-600">
              <i className="fa-solid fa-circle-arrow-up text-sm"></i>
              <h4 className="text-xs font-black uppercase tracking-widest">Earnings</h4>
            </div>
            <div className="space-y-4">
              {breakdown.earnings.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                      <i className={`fa-solid ${item.icon} text-xs`}></i>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-sm font-black text-gray-800">Total Earnings</span>
                <span className="text-sm font-black text-green-600">{formatCurrency(10000000)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4 text-red-500">
              <i className="fa-solid fa-circle-arrow-down text-sm"></i>
              <h4 className="text-xs font-black uppercase tracking-widest">Deductions</h4>
            </div>
            <div className="space-y-4">
              {breakdown.deductions.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                      <i className={`fa-solid ${item.icon} text-xs`}></i>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-sm font-black text-gray-800">Total Deductions</span>
                <span className="text-sm font-black text-red-500">-{formatCurrency(500000)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Trend Chart */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-6 flex justify-between items-center">
          <span>Income History</span>
          <span className="text-[10px] text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full uppercase">Last 5 Months</span>
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#4f46e5' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Payroll List */}
      <section className="space-y-4 pb-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-gray-800">Download Payslips</h3>
          <button className="text-indigo-600 text-xs font-bold hover:underline">See All</button>
        </div>
        <div className="space-y-3">
          {['September 2024', 'August 2024'].map((month, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-file-pdf text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{month}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Verified & Processed</p>
                </div>
              </div>
              <button className="bg-gray-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fa-solid fa-arrow-down-to-bracket text-sm"></i>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PayrollPage;
