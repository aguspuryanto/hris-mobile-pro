
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
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Salary & Benefits</h2>
        <p className="text-gray-500 text-sm">Financial overview</p>
      </div>

      {/* Main Stats */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-indigo-100 text-xs font-bold uppercase">Expected Salary (Oct)</p>
            <h1 className="text-3xl font-bold mt-1">Rp 9.500.000</h1>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
             <i className="fa-solid fa-wallet text-xl"></i>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-400/30 grid grid-cols-2 gap-4">
           <div>
             <p className="text-[10px] text-indigo-100 uppercase">Status</p>
             <p className="text-sm font-bold">Processed</p>
           </div>
           <div>
             <p className="text-[10px] text-indigo-100 uppercase">Payment Date</p>
             <p className="text-sm font-bold">28 Oct 2024</p>
           </div>
        </div>
      </div>

      {/* Salary Trend Chart */}
      <section className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-4 px-2">Income Trend</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#4f46e5' : '#e0e7ff'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Payroll List */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Payslip History</h3>
        <div className="space-y-3">
          {['September 2024', 'August 2024', 'July 2024'].map((month, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{month}</p>
                  <p className="text-[10px] text-gray-500 font-medium">Rp {8500000 + (idx * 200000)} • Credited</p>
                </div>
              </div>
              <button className="text-indigo-600 p-2">
                <i className="fa-solid fa-download"></i>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PayrollPage;
