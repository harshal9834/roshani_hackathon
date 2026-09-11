import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  ShieldAlert, 
  Lock, 
  ChevronRight, 
  Check, 
  LogOut, 
  Sparkles,
  Phone,
  Radio,
  FileText
} from 'lucide-react';
import { ScreenId } from '../../types';

interface ProfileSettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  onNavigate,
  onLogout
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English (US)');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [incidentAudioRecording, setIncidentAudioRecording] = useState(true);
  const [anonymizeGps, setAnonymizeGps] = useState(false);
  const [autoSosThreshold, setAutoSosThreshold] = useState('30 Seconds');

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between bg-[#F8FAFC] overflow-y-auto no-scrollbar p-4 pb-20">
      <div>
        {/* Top Header */}
        <div className="pt-2 flex items-center justify-between mb-4">
          <button
            id="btn-settings-back"
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <span>Account & Preferences</span>
          </div>
          <div className="w-8" />
        </div>

        {/* User Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5 mb-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 p-0.5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                alt="Shivani avatar"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[8px]">
              ✓
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Shivani Sharma</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Verified SafeID
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">shivani.safety@gmail.com</p>
            <p className="text-[10px] text-blue-600 font-semibold mt-1">
              Member of SafeRoute Network since 2025
            </p>
          </div>
        </div>

        {/* Settings Group 1: Account & Regional */}
        <div className="space-y-3 mb-5">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
            Preferences & Security
          </h3>

          {/* Option 1: Personal Information */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Personal Information</div>
                <div className="text-[10px] text-slate-400">Emergency ID, blood group & medical note</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Option 2: Language Selection */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Language Selection</div>
                <div className="text-[10px] text-slate-400">Voice navigation guidance & text</div>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs font-bold text-blue-600 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="English (US)">English (US)</option>
              <option value="Español">Español</option>
              <option value="Français">Français</option>
              <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
            </select>
          </div>

          {/* Option 3: Dark Mode (Prompt Requirement) */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Night / Dark Mode</div>
                <div className="text-[10px] text-slate-400">Dim display for low-light night walking</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Settings Group 2: Safety & Emergency Preferences */}
        <div className="space-y-3 mb-5">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
            Safety & System Protocols
          </h3>

          {/* Option 4: Notification Settings */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Notification Settings</div>
                <div className="text-[10px] text-slate-400">Incident flash alerts & crowd warnings</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Option 5: Emergency Preferences */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Emergency Preferences</div>
                <div className="text-[10px] text-slate-400">SOS countdown threshold duration</div>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
              30 Seconds
            </span>
          </div>

          {/* Option 6: Privacy Controls */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Privacy Controls</div>
                <div className="text-[10px] text-slate-400">Auto-delete GPS logs after 24h safe arrival</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={anonymizeGps}
                onChange={(e) => setAnonymizeGps(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        {/* Logout Button */}
        <button
          id="btn-logout"
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of SafeRoute AI</span>
        </button>
      </div>
    </div>
  );
};
