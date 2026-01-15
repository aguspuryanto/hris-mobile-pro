
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { validateFaceImage } from '../services/geminiService';

interface AttendanceProps {
  user: User;
}

// Konfigurasi Lokasi Kantor (Ganti sesuai kebutuhan)
const OFFICE_LOCATION = {
  lat: -7.301505688695009,
  lng: 112.78351636004648
};
const MAX_DISTANCE_METERS = 100;

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const [step, setStep] = useState<'info' | 'camera' | 'verifying' | 'success'>('info');
  const [currentDistance, setCurrentDistance] = useState<number | null>(null);
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
  ]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

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
      setError("Gagal mengakses kamera. Periksa izin perangkat.");
    }
  };

  const handleStartVerification = () => {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError("Perangkat Anda tidak mendukung geolokasi.");
      return;
    }

    setStatusMessage("Mengecek lokasi Anda...");
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const distance = calculateDistance(userLat, userLng, OFFICE_LOCATION.lat, OFFICE_LOCATION.lng);
        
        setLocation({ lat: userLat, lng: userLng });
        setCurrentDistance(distance);

        if (distance > MAX_DISTANCE_METERS) {
          setError(`Anda berada di luar jangkauan (${Math.round(distance)}m dari kantor). Maksimal ${MAX_DISTANCE_METERS}m.`);
        } else {
          setStep('camera');
        }
      },
      (err) => {
        setError("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const captureAndVerify = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8);
        
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());

        setStep('verifying');
        setStatusMessage("Gemini AI memverifikasi wajah...");

        const result = await validateFaceImage(imageData);
        
        if (result.isValid) {
          setAiAnalysis(result.message);
          setStep('success');
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
        <h2 className="text-2xl font-bold text-gray-800">Absensi Kehadiran</h2>
        <p className="text-gray-500 text-sm">Validasi Lokasi & Wajah (AI)</p>
      </div>

      {step === 'info' && (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center justify-center space-y-6 py-6">
            <div className="w-44 h-44 bg-indigo-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-pulse opacity-50"></div>
              <i className="fa-solid fa-location-dot text-5xl text-indigo-600"></i>
            </div>
            
            <div className="text-center space-y-2 px-6">
              <h3 className="text-xl font-bold text-gray-800">Cek Jangkauan Lokasi</h3>
              <p className="text-gray-500 text-sm">
                Radius absen: <strong>{MAX_DISTANCE_METERS}m</strong> dari titik kantor.
              </p>
            </div>

            {currentDistance !== null && (
              <div className={`p-4 rounded-2xl border flex items-center space-x-3 w-full ${currentDistance <= MAX_DISTANCE_METERS ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                <i className={`fa-solid ${currentDistance <= MAX_DISTANCE_METERS ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                <span className="text-xs font-bold">Jarak: {Math.round(currentDistance)} meter</span>
              </div>
            )}

            <button 
              onClick={handleStartVerification}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center space-x-3 active:scale-95"
            >
              <i className="fa-solid fa-camera"></i>
              <span>Verifikasi & Absen</span>
            </button>
            
            {error && (
              <div className="w-full bg-red-100 text-red-700 p-4 rounded-xl text-xs font-bold border border-red-200 flex items-start">
                <i className="fa-solid fa-triangle-exclamation mr-3 mt-0.5"></i>
                <span>{error}</span>
              </div>
            )}
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Log Terakhir</h3>
            <div className="space-y-3">
              {attendanceHistory.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                      <i className="fa-solid fa-calendar-check"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{log.date} • {log.time}</p>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{log.aiStatus} By Gemini AI</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg">Present</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {step === 'camera' && (
        <div className="flex-1 flex flex-col items-center space-y-6 animate-in fade-in duration-300">
          <div className="relative w-full aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-2 border-indigo-400/50 rounded-[100px] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Scan Wajah</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={captureAndVerify}
            className="w-24 h-24 bg-white border-[6px] border-indigo-600 rounded-full shadow-2xl flex items-center justify-center active:scale-90"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <i className="fa-solid fa-camera text-2xl"></i>
            </div>
          </button>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {step === 'verifying' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="w-48 h-48 relative">
            <div className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-8 bg-indigo-50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-robot text-4xl text-indigo-600 animate-pulse"></i>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-gray-800">Memverifikasi...</h3>
            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest">{statusMessage}</p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="flex-1 flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200">
             <i className="fa-solid fa-check text-5xl text-white"></i>
          </div>
          <div className="text-center px-6">
            <h3 className="text-3xl font-black text-gray-800">Berhasil!</h3>
            <p className="text-gray-500 mt-2 font-medium">Absensi Anda telah tercatat.</p>
          </div>
          <div className="bg-white p-6 rounded-[32px] w-full shadow-sm border border-gray-100 space-y-4">
             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase">Jarak</span>
                <span className="text-sm font-bold text-gray-800">{Math.round(currentDistance || 0)}m</span>
             </div>
             <div className="pt-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-2 tracking-widest">Analisis AI</span>
                <p className="text-xs text-gray-600 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/30">
                  {aiAnalysis || "Identity confirmed. Liveness verified."}
                </p>
             </div>
          </div>
          <button onClick={() => setStep('info')} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold">
            Selesai
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
