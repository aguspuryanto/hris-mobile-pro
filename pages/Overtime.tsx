
import React from 'react';

const OvertimePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Overtime Tracking</h2>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Accumulated This Month</p>
          <h1 className="text-5xl font-black text-indigo-600 mt-2">12:45</h1>
          <p className="text-xs text-indigo-400 font-bold uppercase mt-2">Hours Worked</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-indigo-600 text-white py-4 rounded-2xl font-bold flex flex-col items-center space-y-1">
            <i className="fa-solid fa-play"></i>
            <span className="text-xs">Start Session</span>
          </button>
          <button className="bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold flex flex-col items-center space-y-1">
            <i className="fa-solid fa-paper-plane"></i>
            <span className="text-xs">Manual Log</span>
          </button>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Logs</h3>
        <div className="space-y-3">
          {[
            { date: '23 Oct', duration: '2h 15m', desc: 'Migration Backend' },
            { date: '21 Oct', duration: '3h 30m', desc: 'Critical Bugfix' },
            { date: '19 Oct', duration: '1h 00m', desc: 'Internal Support' }
          ].map((log, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {log.date}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{log.desc}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Validated by Manager</p>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-800">{log.duration}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OvertimePage;
