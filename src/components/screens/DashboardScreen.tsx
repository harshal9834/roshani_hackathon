import React from 'react';
import { 
  Search, 
  Shield, 
  MapPin, 
  Share2, 
  AlertCircle, 
  Users, 
  SunMedium, 
  ArrowRight, 
  Bell, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { ScreenId } from '../../types';
import { MapEngine } from '../MapEngine';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenSos: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onOpenSos }) => {
  return (
    <div className="relative min-h-[640px] h-full flex flex-col bg-[#F8FAFC] overflow-y-auto no-scrollbar pb-20">
      {/* Top Header Card */}
      <div className="p-5 pb-3 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 p-0.5 shadow-md shadow-blue-500/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                  alt="Shivani avatar"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Good Evening, Shivani 👋
                </h1>
              </div>
              <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Safe Guardian Network: <strong className="text-emerald-700">Online</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-dash-bell"
              onClick={() => onNavigate('safety_alert')}
              className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Recent Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
          </div>
        </div>

        {/* Search Bar: 📍 Where do you want to go? */}
        <div
          onClick={() => onNavigate('route_search')}
          className="mt-4 p-3 px-4 rounded-2xl bg-[#F1F5F9] hover:bg-[#E2E8F0]/70 cursor-pointer border border-slate-200 transition-all flex items-center justify-between group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
              📍 Where do you want to go?
            </span>
          </div>
          <span className="px-2 py-1 rounded-xl bg-white text-[10px] font-bold text-blue-600 border border-slate-200 shadow-xs">
            Plan Safe Route
          </span>
        </div>
      </div>

      {/* Map Preview: Live City Map with interactive overlay */}
      <div className="relative mx-4 mt-4 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <MapEngine
          heightClass="h-48"
          showHeatmap={true}
          showHelpPoints={true}
          showStreetlights={true}
          interactive={false}
        />
        {/* Floating live map overlay label */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold text-slate-800">Downtown Safe Zone (Live)</span>
        </div>
        <button
          onClick={() => onNavigate('route_search')}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Expand Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Quick Actions
          </h2>
          <span className="text-[10px] font-semibold text-blue-600">Priority AI Services</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Action 1: Find Safe Route */}
          <button
            id="btn-quick-find-route"
            onClick={() => onNavigate('route_search')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                Find Safe Route
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                AI lighting & crowd analysis
              </div>
            </div>
          </button>

          {/* Action 2: Share Live Location */}
          <button
            id="btn-quick-share-location"
            onClick={() => onNavigate('trusted_contacts')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-800 group-hover:text-purple-600 transition-colors">
                Share Live Location
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Real-time beacon for family
              </div>
            </div>
          </button>

          {/* Action 3: Emergency SOS */}
          <button
            id="btn-quick-emergency-sos"
            onClick={onOpenSos}
            className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 hover:border-rose-400 hover:shadow-md transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-rose-800 group-hover:text-rose-900 transition-colors">
                Emergency SOS
              </div>
              <div className="text-[10px] text-rose-600/80 mt-0.5">
                Instant sirens & 911 dispatch
              </div>
            </div>
          </button>

          {/* Action 4: Trusted Contacts */}
          <button
            id="btn-quick-trusted-contacts"
            onClick={() => onNavigate('trusted_contacts')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-3 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                Trusted Contacts
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Mother, Friend, Sister (3 Active)
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Safety Overview Card */}
      <div className="px-4 mt-5">
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900">Safety Overview Card</h3>
                <p className="text-[10px] text-slate-500">Current GPS Radius (500m)</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Secure Zone
            </span>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Area Safety Score: 86% */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/40 border border-blue-100">
              <div className="text-[10px] font-semibold text-slate-500">Area Safety Score</div>
              <div className="text-2xl font-black text-blue-700 mt-0.5 flex items-baseline gap-1">
                86%
                <span className="text-[10px] font-bold text-emerald-600">+4% vs avg</span>
              </div>
              <div className="w-full bg-blue-200/50 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full w-[86%]"></div>
              </div>
            </div>

            {/* Street Lighting: Good */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-100">
              <div className="text-[10px] font-semibold text-slate-500">Street Lighting</div>
              <div className="text-base font-extrabold text-amber-800 mt-1 flex items-center gap-1.5">
                <SunMedium className="w-4 h-4 text-amber-500 fill-amber-500" />
                Good (94 Lux)
              </div>
              <p className="text-[9px] text-slate-500 mt-1">Smart municipal LEDs active</p>
            </div>

            {/* Crowd Activity: Medium */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50/40 border border-purple-100">
              <div className="text-[10px] font-semibold text-slate-500">Crowd Activity</div>
              <div className="text-base font-extrabold text-purple-800 mt-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-purple-500" />
                Medium
              </div>
              <p className="text-[9px] text-slate-500 mt-1">Open shops & transit footfall</p>
            </div>

            {/* Nearby Help Points: 5 */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-100">
              <div className="text-[10px] font-semibold text-slate-500">Nearby Help Points</div>
              <div className="text-base font-extrabold text-emerald-800 mt-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                5 Available
              </div>
              <p className="text-[9px] text-slate-500 mt-1">Police, Metro & 24/7 Booth</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('shap_explain')}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              View Deep AI Explainability (SHAP Analysis)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
