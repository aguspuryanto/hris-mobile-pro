
import React from 'react';

const OvertimePage: React.FC = () => {
  const overtimeSessions = [
    { 
      id: 'OT-102',
      date: '23 Oct 2024', 
      startTime: '05:30 PM',
      endTime: '07:45 PM',
      duration: '2h 15m', 
      task: 'Migration Backend v2',
      status: 'Approved',
      managerNotes: 'Database migration was successful, good performance.'
    },
    { 
      id: 'OT-101',
      date: '21 Oct 2024', 
      startTime: '06:00 PM',
      endTime: '09:30 PM',
      duration: '3h 30m', 
      task: 'Critical Bugfix - Payment Gateway',
      status: 'Approved',
      managerNotes: 'Emergency fix appreciated.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Lembur & Overtime</h2>
        <p className="text-gray-500 text-sm">Pantau jam kerja ekstra</p>
      </div>
      
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 text-center">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Akumulasi Bulan Ini</p>
        <h1 className="text-5xl font-black text-indigo-600 mt-2">12:45</h1>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-indigo-600 text-white py-4 rounded-2xl font-bold text-xs">Start Session</button>
          <button className="bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold text-xs">Manual Log</button>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Detail Riwayat Lembur</h3>
        <div className="space-y-4">
          {overtimeSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">{session.task}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{session.date}</p>
                </div>
                <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-green-100 text-green-600 uppercase">
                  {session.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50 my-3 text-center">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Mulai</p>
                  <p className="text-xs font-bold">{session.startTime}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Selesai</p>
                  <p className="text-xs font-bold">{session.endTime}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Durasi</p>
                  <p className="text-xs font-black text-indigo-600">{session.duration}</p>
                </div>
              </div>

              {session.managerNotes && (
                <div className="bg-gray-50 p-3 rounded-2xl flex items-start space-x-3">
                  <i className="fa-solid fa-comment-dots text-indigo-300 mt-1"></i>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Manager Notes</p>
                    <p className="text-xs text-gray-600 italic leading-relaxed">"{session.managerNotes}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OvertimePage;
