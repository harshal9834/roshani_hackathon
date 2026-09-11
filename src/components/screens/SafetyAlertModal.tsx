import React from 'react';
import { AlertTriangle, ShieldCheck, ArrowRight, X, Sparkles, MapPin, Radio } from 'lucide-react';
import { ScreenId } from '../../types';

interface SafetyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecalculate: () => void;
}

export const SafetyAlertModal: React.FC<SafetyAlertModalProps> = ({
  isOpen,
  onClose,
  onRecalculate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl border border-rose-100 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-rose-500/15 blur-2xl pointer-events-none" />

        {/* Warning Icon Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-red-600 p-0.5 shadow-lg shadow-rose-500/30 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white drop-shadow-md animate-bounce" />
              </div>
            </div>
          </div>
          <button
            id="btn-alert-close"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            ⚠️ Safety Warning
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider">
            High Priority
          </span>
        </div>

        {/* Message (Exact prompt text) */}
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          “Route conditions have changed due to a recently reported incident nearby.”
        </p>

        {/* Incident telemetry details card */}
        <div className="mt-3.5 p-3 rounded-2xl bg-rose-50/70 border border-rose-100 text-[11px] text-rose-900 space-y-1.5">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              Reported: Suspicious Gathering
            </span>
            <span className="text-[10px] text-rose-600">3 min ago</span>
          </div>
          <p className="text-slate-600 text-[10px]">
            Location: Elm Street crossing • 220 meters ahead of current trajectory.
          </p>
        </div>

        {/* Action Buttons (Prompt Requirements) */}
        <div className="mt-5 space-y-2.5">
          {/* Recalculate Safer Route */}
          <button
            id="btn-alert-recalculate"
            onClick={onRecalculate}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Recalculate Safer Route</span>
          </button>

          {/* Continue Route */}
          <button
            id="btn-alert-continue"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs transition-colors"
          >
            Continue Route Anyway
          </button>
        </div>
      </div>
    </div>
  );
};
