import React from 'react';
import { Shield, Sparkles, ArrowRight, Compass, Lock } from 'lucide-react';
import { ScreenId } from '../../types';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-[#F8FAFC] to-[#EFF6FF] overflow-hidden">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-300/20 to-emerald-300/15 blur-3xl pointer-events-none" />

      {/* Top Brand Pill */}
      <div className="pt-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          AI Safety Shield Active
        </div>
        <button
          id="btn-splash-skip"
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Skip to Home →
        </button>
      </div>

      {/* Hero Visual Area: AI-powered Shield & Animated Route Graphic */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 z-10 text-center">
        {/* Glowing Shield Emblem */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-30 animate-pulse" />
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#4F46E5] to-[#7C3AED] p-0.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-white/15 to-transparent backdrop-blur-sm flex flex-col items-center justify-center">
              <Shield className="w-14 h-14 text-white drop-shadow-md stroke-[1.75]" />
              <div className="absolute -bottom-2 px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI Core
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <span>SafeRoute</span>
          <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
            AI
          </span>
        </h1>
        <p className="text-sm font-medium text-slate-600 mt-2 max-w-xs">
          “Safer Routes. Smarter Travel.”
        </p>

        {/* Animated route path graphic */}
        <div className="mt-8 w-full max-w-xs p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg shadow-blue-900/5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
            <span>Dynamic Route Evaluation</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 98% Confidence
            </span>
          </div>

          {/* SVG Animated Route Path */}
          <div className="relative h-14 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center px-4">
            <svg viewBox="0 0 240 40" className="w-full h-10">
              <path
                d="M 10 20 Q 70 5, 120 25 T 230 15"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 10 20 Q 70 5, 120 25 T 230 15"
                fill="none"
                stroke="url(#splash-route-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
              <defs>
                <linearGradient id="splash-route-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {/* Pulsing origin and destination nodes */}
              <circle cx="10" cy="20" r="4" fill="#2563EB" />
              <circle cx="120" cy="25" r="3" fill="#7C3AED" />
              <circle cx="230" cy="15" r="5" fill="#10B981" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-1.5 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-400 font-medium">Lighting</div>
              <div className="text-xs font-bold text-slate-800">96% Lux</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-400 font-medium">Activity</div>
              <div className="text-xs font-bold text-emerald-600">High Crowd</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-400 font-medium">Help Points</div>
              <div className="text-xs font-bold text-blue-600">4 Nearby</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-3 z-10 pb-2">
        <button
          id="btn-splash-get-started"
          onClick={() => onNavigate('dashboard')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white font-bold text-sm shadow-xl shadow-blue-600/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          id="btn-splash-sign-in"
          onClick={() => onNavigate('login')}
          className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Lock className="w-4 h-4 text-slate-400" />
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};
