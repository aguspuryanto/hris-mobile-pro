
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
      { label: 'Income Tax (PPH 21)', amount: 500000, icon: 'fa-receipt' },
    ]
  };

  const formatCurrency = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Payroll & Benefits</h2>
        <p className="text-gray-500 text-sm">Rincian gaji Oktober 2024</p>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Total Net Pay</p>
          <h1 className="text-3xl font-black mt-1">Rp 9.500.000</h1>
          <div className="mt-6 pt-6 border-t border-indigo-400/30 flex justify-between text-sm font-bold">
            <span>Status: Paid</span>
            <span>28 Oct 2024</span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 px-1">Rincian Gaji</h3>
        
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4 text-green-600 font-black text-xs uppercase tracking-widest">
              <i className="fa-solid fa-arrow-trend-up"></i>
              <h4>Earnings</h4>
            </div>
            <div className="space-y-3">
              {breakdown.earnings.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <i className={`fa-solid ${item.icon} w-4`}></i>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-50 flex justify-between font-black text-green-600">
                <span>Total Bruto</span>
                <span>{formatCurrency(10500000)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4 text-red-500 font-black text-xs uppercase tracking-widest">
              <i className="fa-solid fa-arrow-trend-down"></i>
              <h4>Deductions</h4>
            </div>
            <div className="space-y-3">
              {breakdown.deductions.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <i className={`fa-solid ${item.icon} w-4`}></i>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-50 flex justify-between font-black text-red-500">
                <span>Total Potongan</span>
                <span>-{formatCurrency(1000000)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Grafik Penghasilan</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="amount" radius={[5, 5, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#4f46e5' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default PayrollPage;
