import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Clock, 
  CheckCircle2, 
  Send, 
  Users, 
  BellRing,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ScreenId } from '../../types';

interface SafetyCheckInScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSafe: () => void;
  onNeedHelp: () => void;
}

export const SafetyCheckInScreen: React.FC<SafetyCheckInScreenProps> = ({
  onNavigate,
  onSafe,
  onNeedHelp
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);
  const [confirmedSafe, setConfirmedSafe] = useState(false);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      setTimerExpired(true);
      return;
    }
    if (confirmedSafe) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, confirmedSafe]);

  const handleSafeClick = () => {
    setConfirmedSafe(true);
    setTimeout(() => {
      onSafe();
      onNavigate('live_navigation');
    }, 1200);
  };

  // SVG circular progress calculation
  const totalSeconds = 30;
  const strokeDashoffset = (1 - secondsRemaining / totalSeconds) * 283;

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-slate-50 to-[#EFF6FF] overflow-hidden">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('live_navigation')}
          className="p-2 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Scheduled Check-In</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-4">
        {confirmedSafe ? (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Status Recorded: Safe!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Thank you Shivani. Navigation will resume seamlessly.
            </p>
          </div>
        ) : timerExpired ? (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-rose-100 border-4 border-rose-500 text-rose-600 flex items-center justify-center shadow-xl shadow-rose-500/20 mb-4 animate-bounce">
              <BellRing className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-black text-rose-700">Timer Expired!</h2>
            <p className="text-xs text-rose-600 mt-1 max-w-xs font-semibold">
              Automatically dispatched live alert & coordinates to Mother, Friend, and Sister.
            </p>
          </div>
        ) : (
          <>
            {/* Title: Are you safe? */}
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Are you safe?
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Periodic automated check-in while travelling through night corridor.
            </p>

            {/* Circular Countdown Timer Graphic: 30 Seconds Remaining */}
            <div className="relative my-7 flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E2E8F0"
                  strokeWidth="7"
                  fill="transparent"
                />
                {/* Animated Gradient Progress */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={secondsRemaining <= 10 ? '#EF4444' : '#2563EB'}
                  strokeWidth="7"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-4xl font-black tracking-tight ${
                  secondsRemaining <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
                }`}>
                  {secondsRemaining}s
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                  Remaining
                </span>
              </div>
            </div>

            {/* Expiry Warning Policy */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-left max-w-xs text-[11px] text-amber-900 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Guardian Fail-Safe:</span> If timer expires without confirmation, SafeRoute AI automatically notifies your 3 trusted contacts with live audio & GPS tracking.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Buttons (Prompt Requirements) */}
      <div className="space-y-3 pb-2 z-10">
        {/* ✅ I'm Safe */}
        <button
          id="btn-checkin-im-safe"
          onClick={handleSafeClick}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white font-black text-sm shadow-xl shadow-emerald-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>✅ I'm Safe</span>
        </button>

        {/* 🚨 Need Help */}
        <button
          id="btn-checkin-need-help"
          onClick={onNeedHelp}
          className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-xl shadow-rose-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <AlertOctagon className="w-5 h-5" />
          <span>🚨 Need Help</span>
        </button>
      </div>
    </div>
  );
};
