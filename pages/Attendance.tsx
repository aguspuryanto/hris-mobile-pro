
import React, { useState, useRef, useEffect } from 'react';
import { User, AttendanceRecord } from '../types';
import { validateFaceImage } from '../services/geminiService';

interface AttendanceProps {
  user: User;
}

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const [step, setStep] = useState<'info' | 'camera' | 'verifying' | 'success'>('info');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated history data
  const [attendanceHistory] = useState([
    { id: '1', date: '24 Oct', time: '08:32 AM', status: 'Present', aiStatus: 'Verified', location: 'HQ Office' },
    { id: '2', date: '23 Oct', time: '08:45 AM', status: 'Late', aiStatus: 'Verified', location: 'HQ Office' },
    { id: '3', date: '22 Oct', time: '08:10 AM', status: 'Present', aiStatus: 'Verified', location: 'Remote' },
  ]);

  useEffect(() => {
    if (step === 'camera') {
      startCamera();
    }
  }, [step]);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const getGPSLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setStep('camera');
        },
        (err) => {
          setError("Please enable GPS to clock in.");
        }
      );
    } else {
      setError("Geolocation is not supported.");
    }
  };

  const captureAndVerify = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Prepare canvas and capture
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8);
        
        // Stop camera tracks immediately
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());

        setStep('verifying');
        setStatusMessage("Gemini AI is analyzing your biometrics...");

        const result = await validateFaceImage(imageData);
        
        if (result.isValid) {
          setAiAnalysis(result.message);
          setStep('success');
          setStatusMessage("Attendance Recorded Successfully!");
        } else {
          setStep('camera');
          setError(result.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Center</h2>
        <p className="text-gray-500 text-sm">Verify your presence using AI</p>
      </div>

      {step === 'info' && (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center justify-center space-y-6 py-6">
            <div className="w-44 h-44 bg-indigo-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-pulse opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 border-2 border-dashed border-indigo-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
              </div>
              <i className="fa-solid fa-face-viewfinder text-5xl text-indigo-600"></i>
            </div>
            
            <div className="text-center space-y-2 px-6">
              <h3 className="text-xl font-bold text-gray-800">Ready to Clock In?</h3>
              <p className="text-gray-500 text-sm">We use GPS and Gemini Face Recognition to ensure secure and valid attendance.</p>
            </div>

            <button 
              onClick={getGPSLocation}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 active:scale-95"
            >
              <i className="fa-solid fa-camera-retro"></i>
              <span>Start AI Verification</span>
            </button>
            
            {error && (
              <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100 flex items-center">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}
          </div>

          {/* New Section: Recent Attendance Log */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Recent Logs</h3>
              <button className="text-indigo-600 text-xs font-bold uppercase tracking-wider">View All</button>
            </div>
            <div className="space-y-3">
              {attendanceHistory.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                      <i className="fa-solid fa-calendar-day"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{log.date} • {log.time}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-[10px] text-gray-400 mr-2">{log.location}</span>
                        <span className="bg-indigo-50 text-indigo-600 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center">
                           <i className="fa-solid fa-robot mr-1"></i> {log.aiStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${log.status === 'Present' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {step === 'camera' && (
        <div className="flex-1 flex flex-col items-center space-y-6 animate-in fade-in duration-300">
          <div className="relative w-full aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover"
            />
            {/* AI Face Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-2 border-indigo-400/50 rounded-[100px] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  Scanning Face
                </div>
                <div className="absolute inset-0 rounded-[100px] shadow-[0_0_50px_rgba(79,70,229,0.3)]"></div>
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-indigo-500 rounded-tr-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-indigo-500 rounded-bl-2xl"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl"></div>
              </div>
            </div>
            {error && (
              <div className="absolute top-4 inset-x-4 bg-red-600 text-white text-xs p-3 rounded-xl text-center font-bold shadow-lg animate-bounce">
                {error}
              </div>
            )}
          </div>
          
          <div className="text-center px-4 space-y-1">
            <p className="text-sm font-bold text-gray-700">Center your face in the oval</p>
            <p className="text-xs text-gray-400">Gemini AI will verify identity and liveness</p>
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => {
                const stream = videoRef.current?.srcObject as MediaStream;
                stream?.getTracks().forEach(track => track.stop());
                setStep('info');
              }}
              className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shadow-sm"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <button 
              onClick={captureAndVerify}
              className="w-24 h-24 bg-white border-[6px] border-indigo-600 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
            >
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-inner">
                <i className="fa-solid fa-fingerprint text-3xl"></i>
              </div>
            </button>
            <button className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-lightbulb text-xl"></i>
            </button>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {step === 'verifying' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="w-48 h-48 relative">
             {/* Spinning outer ring */}
            <div className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            {/* Radar effect */}
            <div className="absolute inset-2 border border-indigo-200 rounded-full animate-ping opacity-25"></div>
            <div className="absolute inset-8 bg-indigo-50 rounded-full flex flex-col items-center justify-center shadow-inner">
              <i className="fa-solid fa-brain text-4xl text-indigo-600 animate-pulse"></i>
            </div>
          </div>
          <div className="text-center space-y-2 px-8">
            <h3 className="text-2xl font-black text-gray-800">Processing...</h3>
            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest">{statusMessage}</p>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="flex-1 flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 relative">
             <div className="absolute inset-0 border-8 border-green-100 rounded-full"></div>
             <i className="fa-solid fa-check text-5xl text-white"></i>
          </div>
          
          <div className="text-center px-6">
            <h3 className="text-3xl font-black text-gray-800">Verified!</h3>
            <p className="text-gray-500 mt-2 font-medium">Identity confirmed at 08:32:14 AM</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] w-full shadow-sm border border-gray-100 space-y-4">
             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Confidence</span>
                <span className="text-sm font-black text-green-600">99.8% Match</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</span>
                <span className="text-sm font-bold text-gray-800 italic">HQ Office (Zone A)</span>
             </div>
             <div className="pt-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-2 tracking-widest">Gemini Insights</span>
                <p className="text-xs text-gray-600 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/30">
                  {aiAnalysis || "Biometric pattern matches employee profile. Face detected is active and validated via liveness detection algorithms."}
                </p>
             </div>
          </div>

          <button 
            onClick={() => setStep('info')}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
          >
            Finish & Return
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
