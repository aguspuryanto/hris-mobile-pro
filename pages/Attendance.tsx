
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { validateFaceImage } from '../services/geminiService';

interface AttendanceProps {
  user: User;
}

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const [step, setStep] = useState<'info' | 'camera' | 'verifying' | 'success'>('info');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step === 'camera') {
      startCamera();
    }
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
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
      setError("Geolocation is not supported by your browser.");
    }
  };

  const captureAndVerify = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        
        // Stop camera
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());

        setStep('verifying');
        setStatusMessage("Verifying face identity...");

        const result = await validateFaceImage(imageData);
        
        if (result.isValid) {
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
    <div className="flex flex-col h-full space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Attendance</h2>
        <p className="text-gray-500 text-sm">Thursday, 24 Oct 2024</p>
      </div>

      {step === 'info' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-ping opacity-25"></div>
            <i className="fa-solid fa-location-dot text-6xl text-indigo-600"></i>
          </div>
          <div className="text-center space-y-2 px-6">
            <h3 className="text-xl font-bold text-gray-800">Office Zone</h3>
            <p className="text-gray-600 text-sm">Please allow location and camera access to verify your presence in the workspace.</p>
          </div>
          <button 
            onClick={getGPSLocation}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-fingerprint text-xl"></i>
            <span>Clock In Now</span>
          </button>
        </div>
      )}

      {step === 'camera' && (
        <div className="flex-1 flex flex-col items-center space-y-6">
          <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-indigo-500/30 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-dashed border-white/50 rounded-[100px]"></div>
            </div>
            {error && (
              <div className="absolute top-4 inset-x-4 bg-red-500/90 text-white text-xs p-2 rounded-lg text-center font-medium">
                {error}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 text-center px-6">Position your face inside the frame and stay still.</p>
          <button 
            onClick={captureAndVerify}
            className="w-20 h-20 bg-white border-8 border-indigo-600 rounded-full shadow-lg"
          ></button>
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />
        </div>
      )}

      {step === 'verifying' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-indigo-50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-face-smile text-3xl text-indigo-600"></i>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{statusMessage}</h3>
            <p className="text-gray-500 text-sm mt-1">Checking against database...</p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
            <i className="fa-solid fa-check text-5xl text-green-600"></i>
          </div>
          <div className="text-center px-6">
            <h3 className="text-2xl font-bold text-gray-800">Check In Success</h3>
            <p className="text-gray-500 mt-2">You have successfully clocked in at 08:32 AM</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl w-full space-y-3">
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location:</span>
                <span className="font-semibold text-gray-800">HQ Office (Zone A)</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Device:</span>
                <span className="font-semibold text-gray-800">iPhone 14 Pro</span>
             </div>
          </div>
          <button 
            onClick={() => setStep('info')}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
