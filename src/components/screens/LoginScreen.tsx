import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Phone, 
  ScanFace, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ScreenId } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('shivani.safety@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 789-2045');
  const [password, setPassword] = useState('••••••••••••');
  const [faceIdActive, setFaceIdActive] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess();
    onNavigate('dashboard');
  };

  const handleFaceId = () => {
    setFaceIdActive(true);
    setTimeout(() => {
      setFaceIdActive(false);
      if (onLoginSuccess) onLoginSuccess();
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] overflow-y-auto no-scrollbar">
      {/* Top Navigation */}
      <div className="pt-2 flex items-center justify-between">
        <button
          id="btn-login-back"
          onClick={() => onNavigate('splash')}
          className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Shield className="w-4 h-4 text-blue-600 fill-blue-600" />
          <span>SafeRoute AI</span>
        </div>
        <div className="w-8" />
      </div>

      {/* SVG Illustration: Woman walking safely with smart route guidance */}
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className="relative w-full max-w-[260px] h-36 rounded-2xl bg-gradient-to-tr from-blue-50/80 via-purple-50/50 to-emerald-50/60 p-3 border border-blue-100 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Animated Route Aura / Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15),transparent_70%)]" />

          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Street & sidewalk path */}
            <path d="M 10 110 L 80 85 L 190 85" stroke="#CBD5E1" strokeWidth="20" strokeLinecap="round" />
            <path d="M 10 110 L 80 85 L 190 85" stroke="#2563EB" strokeWidth="4" strokeDasharray="6 4" />

            {/* Smart Streetlight Illuminating Pathway */}
            <line x1="45" y1="110" x2="45" y2="25" stroke="#475569" strokeWidth="3" />
            <path d="M 45 25 Q 55 18, 65 24" stroke="#475569" strokeWidth="3" fill="none" />
            <circle cx="65" cy="24" r="5" fill="#FBBF24" />
            {/* Light Cone */}
            <polygon points="65,26 20,110 120,110" fill="#FEF3C7" opacity="0.45" />

            {/* Shield Guidance Beacon */}
            <g transform="translate(145, 30)">
              <circle cx="0" cy="0" r="14" fill="#10B981" opacity="0.2" className="animate-ping" />
              <circle cx="0" cy="0" r="11" fill="#10B981" />
              <path d="M -3 -1 L 0 -4 L 3 -1 L 3 3 C 3 5 0 7 0 7 C 0 7 -3 5 -3 3 Z" fill="#FFFFFF" />
            </g>

            {/* Stylized Woman Walking in Safe Light */}
            <g transform="translate(90, 48)">
              {/* Head / Hair */}
              <circle cx="0" cy="0" r="7" fill="#7C3AED" />
              <circle cx="2" cy="-1" r="5.5" fill="#FCD34D" />
              {/* Body / Coat */}
              <path d="M -6 8 L 6 8 L 10 32 L -10 32 Z" fill="#2563EB" />
              {/* Legs in walking stance */}
              <line x1="-4" y1="32" x2="-8" y2="46" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="32" x2="9" y2="46" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
              {/* Smartphone in hand */}
              <rect x="5" y="14" width="4" height="7" rx="1" fill="#10B981" />
            </g>
          </svg>

          {/* Floating badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-emerald-200 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
            Protected Corridor
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mt-3 text-center">
          Welcome to SafeRoute
        </h2>
        <p className="text-xs text-slate-500 text-center mt-1">
          Verify your identity to unlock AI safety protection
        </p>
      </div>

      {/* Login Options Tab (Email vs Mobile) */}
      <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-semibold text-slate-600 mb-3">
        <button
          id="btn-login-tab-email"
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            loginMethod === 'email'
              ? 'bg-white text-blue-600 shadow-sm font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Email Login
        </button>
        <button
          id="btn-login-tab-phone"
          onClick={() => setLoginMethod('phone')}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            loginMethod === 'phone'
              ? 'bg-white text-blue-600 shadow-sm font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          Mobile Number
        </button>
      </div>

      {/* Form Input Fields */}
      <form onSubmit={handleAuth} className="space-y-3">
        {loginMethod === 'email' ? (
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <input
                id="input-login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm"
                placeholder="name@example.com"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile Phone Number</label>
            <div className="relative">
              <input
                id="input-login-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm"
                placeholder="+1 (555) 000-0000"
                required
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-bold text-slate-600">Password / Security PIN</label>
            <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">Forgot?</span>
          </div>
          <div className="relative">
            <input
              id="input-login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm"
              placeholder="Enter PIN"
              required
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <button
          id="btn-login-submit"
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue Safely</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Alternative Social & Biometric Sign-in */}
      <div className="mt-4 space-y-2.5">
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Or Sign In With
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Google Sign In */}
          <button
            id="btn-login-google"
            onClick={() => onNavigate('dashboard')}
            className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Face ID Authentication */}
          <button
            id="btn-login-faceid"
            onClick={handleFaceId}
            className={`py-2.5 px-3 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
              faceIdActive
                ? 'bg-purple-50 text-purple-700 border-purple-300 ring-2 ring-purple-400'
                : 'bg-white border-slate-200 hover:bg-purple-50/50 text-slate-700'
            }`}
          >
            <ScanFace className={`w-4 h-4 ${faceIdActive ? 'text-purple-600 animate-pulse' : 'text-purple-600'}`} />
            <span>{faceIdActive ? 'Verifying...' : 'Face ID'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="pt-4 text-center">
        <p className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-600" />
          “AI-powered safe navigation for women.”
        </p>
      </div>
    </div>
  );
};
