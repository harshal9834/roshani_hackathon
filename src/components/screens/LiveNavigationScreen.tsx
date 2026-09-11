import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Navigation, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  Share2, 
  Compass, 
  CornerUpRight, 
  ChevronRight,
  ShieldAlert,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { ScreenId, RouteOption } from '../../types';
import { NAV_STEPS } from '../../data/mockData';
import { MapEngine } from '../MapEngine';

interface LiveNavigationScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedRoute: RouteOption;
  onTriggerAlert: () => void;
  onTriggerCheckIn: () => void;
  onOpenSos: () => void;
}

export const LiveNavigationScreen: React.FC<LiveNavigationScreenProps> = ({
  onNavigate,
  selectedRoute,
  onTriggerAlert,
  onTriggerCheckIn,
  onOpenSos
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(25);
  const [isSimulating, setIsSimulating] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);

  // Auto progression simulation
  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          return 95;
        }
        const nextP = p + 1.2;
        // update step index based on progress
        const step = Math.min(
          NAV_STEPS.length - 1,
          Math.floor((nextP / 100) * NAV_STEPS.length)
        );
        setCurrentStepIdx(step);
        return nextP;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSimulating]);

  const activeStep = NAV_STEPS[currentStepIdx] || NAV_STEPS[0];

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between bg-[#0F172A] overflow-hidden select-none">
      {/* Full Screen Map Navigation */}
      <div className="absolute inset-0 z-0">
        <MapEngine
          activeRoute={selectedRoute}
          heightClass="h-full"
          showHeatmap={true}
          showHelpPoints={true}
          showStreetlights={true}
          interactive={true}
          navMode={true}
          userProgress={progress}
        />
      </div>

      {/* Top Floating Card: Safety Score 92%, ETA Remaining 14 min (Prompt Requirement) */}
      <div className="relative z-10 p-4 pt-3 space-y-2">
        {/* Top Floating Stats Card */}
        <div className="p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="btn-nav-exit"
              onClick={() => onNavigate('dashboard')}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Exit Navigation"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Live Guidance
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold">
                Destination: Westwood Residence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Safety Score: 92% */}
            <div className="text-right">
              <div className="text-[9px] uppercase font-bold text-slate-400">Safety Score</div>
              <div className="text-base font-black text-emerald-600 flex items-center justify-end gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                92%
              </div>
            </div>

            {/* ETA Remaining: 14 min */}
            <div className="pl-3 border-l border-slate-200 text-right">
              <div className="text-[9px] uppercase font-bold text-slate-400">ETA Remaining</div>
              <div className="text-base font-black text-blue-600 flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                14 min
              </div>
            </div>
          </div>
        </div>

        {/* Turn-by-Turn Instruction Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-xl shadow-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <CornerUpRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">
                {activeStep.instruction}
              </div>
              <div className="text-[10px] text-blue-100 flex items-center gap-2 mt-0.5">
                <span>In {activeStep.distance}</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">{activeStep.safetyNote}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Simulation Bar (Allows tester to simulate incident alert or safety check-in) */}
      <div className="relative z-10 px-4 flex items-center justify-center gap-2">
        <button
          id="btn-simulate-alert"
          onClick={onTriggerAlert}
          className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-lg shadow-rose-900/40 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Simulate Safety Alert (Screen 8)</span>
        </button>
        <button
          id="btn-simulate-checkin"
          onClick={onTriggerCheckIn}
          className="px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Test Check-in (Screen 10)</span>
        </button>
      </div>

      {/* Bottom Floating Navigation Dock */}
      <div className="relative z-10 p-4 pb-5">
        <div className="p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-200 flex items-center justify-between">
          {/* Progress Bar & Walk Speed */}
          <div className="flex-1 pr-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
              <span>Walking Progress ({Math.round(progress)}%)</span>
              <span className="text-blue-600 font-semibold">4.8 km/h Pace</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Play/Pause Simulation */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title={isSimulating ? 'Pause Walk' : 'Resume Walk'}
            >
              {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Emergency SOS Button */}
            <button
              id="btn-nav-sos"
              onClick={onOpenSos}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
