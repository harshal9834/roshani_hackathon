import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  BarChart2, 
  TrendingUp, 
  PieChart as PieIcon, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { ScreenId } from '../../types';
import { ANALYTICS_DATA } from '../../data/mockData';

interface SafetyAnalyticsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SafetyAnalyticsScreen: React.FC<SafetyAnalyticsScreenProps> = ({ onNavigate }) => {
  const [activeRange, setActiveRange] = useState<'week' | 'month'>('week');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // SVG Line Chart coordinates calculation for Safety Trends
  const trendScores = ANALYTICS_DATA.trendScores;
  const linePoints = trendScores
    .map((item, idx) => {
      const x = 30 + idx * 45;
      const y = 140 - ((item.score - 60) / 40) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between bg-[#F8FAFC] overflow-y-auto no-scrollbar p-4 pb-20">
      <div>
        {/* Top Header */}
        <div className="pt-2 flex items-center justify-between mb-4">
          <button
            id="btn-analytics-back"
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Safety Telemetry</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Title & Summary */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Safety Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated historical intelligence from your night transit
            </p>
          </div>
          {/* Time range pills */}
          <div className="bg-slate-200/80 p-0.5 rounded-xl flex text-[10px] font-bold">
            <button
              onClick={() => setActiveRange('week')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                activeRange === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setActiveRange('month')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                activeRange === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* AI Insight Card (Prompt Requirement) */}
        <div className="mb-4 p-4 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-purple-600/20 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-200">
                AI Insight Card
              </div>
              <p className="text-xs font-bold text-white mt-1 leading-relaxed">
                “Most reported risks occurred in poorly lit areas after 10 PM.”
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-[10px] text-purple-100 font-medium">
                <span className="px-2 py-0.5 rounded-full bg-white/15">
                  Recommendation: Prioritize Metro corridors past 10 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 1: Bar Chart – Weekly Safe Trips (Prompt Requirement) */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900">Weekly Safe Trips</h3>
                <p className="text-[10px] text-slate-400">Total 20 trips completed</p>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              93.4% Avg Safety
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative h-40 w-full pt-4">
            <svg viewBox="0 0 280 130" className="w-full h-full">
              {/* Horizontal Grid lines */}
              <line x1="20" y1="20" x2="260" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="20" y1="60" x2="260" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="20" y1="100" x2="260" y2="100" stroke="#E2E8F0" strokeWidth="1" />

              {/* Bars for 7 days */}
              {ANALYTICS_DATA.weeklyTrips.map((item, idx) => {
                const barWidth = 22;
                const x = 30 + idx * 34;
                const maxTrips = 5;
                const barHeight = (item.trips / maxTrips) * 80;
                const y = 100 - barHeight;
                const isHovered = hoveredBar === idx;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="6"
                      fill={isHovered ? '#1D4ED8' : '#2563EB'}
                      className="transition-colors"
                    />
                    {/* Trips Count on top of bar */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="9"
                      fontWeight="700"
                    >
                      {item.trips}
                    </text>
                    {/* Day label below */}
                    <text
                      x={x + barWidth / 2}
                      y="116"
                      textAnchor="middle"
                      fill="#475569"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {item.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Chart 2: Line Chart – Safety Trends (Prompt Requirement) */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900">Safety Trends by Hour</h3>
                <p className="text-[10px] text-slate-400">Night safety index vs hour of transit</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-500">8 PM – 1 AM</span>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-36 w-full">
            <svg viewBox="0 0 280 150" className="w-full h-full">
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area Under Line */}
              <polygon
                points={`30,135 ${linePoints} ${30 + (trendScores.length - 1) * 45},135`}
                fill="url(#area-grad)"
              />

              {/* Main Trend Line */}
              <polyline
                fill="none"
                stroke="#7C3AED"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePoints}
              />

              {/* Points & Labels */}
              {trendScores.map((item, idx) => {
                const x = 30 + idx * 45;
                const y = 140 - ((item.score - 60) / 40) * 100;

                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="4" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5" />
                    <text x={x} y={y - 8} textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="800">
                      {item.score}%
                    </text>
                    <text x={x} y="148" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
                      {item.time}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Chart 3: Pie / Donut Chart – Risk Factors Encountered (Prompt Requirement) */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900">Risk Factors Encountered</h3>
                <p className="text-[10px] text-slate-400">Distribution of avoided hazards</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              4 Categories
            </span>
          </div>

          {/* Donut Chart SVG & Legend */}
          <div className="flex items-center gap-4">
            {/* SVG Donut Chart */}
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Poor Lighting: 46% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#EF4444"
                  strokeWidth="16"
                  strokeDasharray="238.7"
                  strokeDashoffset="128.9"
                />
                {/* Low Footfall: 28% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="16"
                  strokeDasharray="238.7"
                  strokeDashoffset="171.8"
                  style={{ transform: 'rotate(165.6deg)', transformOrigin: '50% 50%' }}
                />
                {/* Road Closures: 14% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#6366F1"
                  strokeWidth="16"
                  strokeDasharray="238.7"
                  strokeDashoffset="205.2"
                  style={{ transform: 'rotate(266.4deg)', transformOrigin: '50% 50%' }}
                />
                {/* Alleyway Cuts: 12% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#8B5CF6"
                  strokeWidth="16"
                  strokeDasharray="238.7"
                  strokeDashoffset="210"
                  style={{ transform: 'rotate(316.8deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-slate-800">46%</span>
                <span className="text-[8px] uppercase font-bold text-slate-400">Lighting</span>
              </div>
            </div>

            {/* Factor Breakdown Legend */}
            <div className="flex-1 space-y-2">
              {ANALYTICS_DATA.riskFactors.map((rf, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: rf.color }}
                    />
                    <span className="font-semibold text-slate-700">{rf.factor}</span>
                  </div>
                  <span className="font-bold text-slate-900">{rf.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
