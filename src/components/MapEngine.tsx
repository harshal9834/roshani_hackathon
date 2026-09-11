import React, { useState } from 'react';
import { 
  Shield, 
  MapPin, 
  Navigation, 
  Layers, 
  Plus, 
  Minus, 
  Compass, 
  Building2, 
  Cross, 
  Train, 
  SunMedium, 
  AlertTriangle,
  Radio,
  CheckCircle2,
  X
} from 'lucide-react';
import { RouteOption, EmergencyHelpPoint } from '../types';
import { MOCK_HELP_POINTS, MOCK_HEATMAP_ZONES } from '../data/mockData';

interface MapEngineProps {
  activeRoute?: RouteOption;
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  showHeatmap?: boolean;
  showHelpPoints?: boolean;
  showStreetlights?: boolean;
  interactive?: boolean;
  heightClass?: string;
  userProgress?: number; // 0 to 100 for navigation progression
  navMode?: boolean;
  onHelpPointClick?: (hp: EmergencyHelpPoint) => void;
  rerouteMode?: boolean; // for Screen 9 comparison
}

export const MapEngine: React.FC<MapEngineProps> = ({
  activeRoute,
  selectedRouteId = 'route_c',
  onSelectRoute,
  showHeatmap = true,
  showHelpPoints = true,
  showStreetlights = true,
  interactive = true,
  heightClass = 'h-full min-h-[380px]',
  userProgress = 25,
  navMode = false,
  onHelpPointClick,
  rerouteMode = false
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [heatmapVisible, setHeatmapVisible] = useState<boolean>(showHeatmap);
  const [selectedHp, setSelectedHp] = useState<EmergencyHelpPoint | null>(null);

  // Compute interpolated GPS position along active route
  const getGpsPosition = () => {
    if (!activeRoute || !activeRoute.pathPoints || activeRoute.pathPoints.length < 2) {
      return { x: 18, y: 80 };
    }
    const points = activeRoute.pathPoints;
    const totalSegments = points.length - 1;
    const clampedProgress = Math.max(0, Math.min(100, userProgress)) / 100;
    const rawIndex = clampedProgress * totalSegments;
    const segIndex = Math.min(Math.floor(rawIndex), totalSegments - 1);
    const segFraction = rawIndex - segIndex;

    const p1 = points[segIndex];
    const p2 = points[segIndex + 1];

    return {
      x: p1.x + (p2.x - p1.x) * segFraction,
      y: p1.y + (p2.y - p1.y) * segFraction
    };
  };

  const currentGps = getGpsPosition();

  // Helper for SVG polyline points string
  const pointsToSvgPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return '';
    return pts.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x * 5} ${pt.y * 5}` : `${acc} L ${pt.x * 5} ${pt.y * 5}`;
    }, '');
  };

  return (
    <div className={`relative w-full overflow-hidden bg-[#F3F6F9] select-none ${heightClass}`}>
      {/* SVG Vector Map Canvas */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <defs>
          {/* Subtle Grid / Ground Pattern */}
          <pattern id="city-blocks" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="36" height="36" x="2" y="2" rx="3" fill="#EAEFF5" />
          </pattern>
          {/* Park Pattern */}
          <linearGradient id="park-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.6" />
          </linearGradient>
          {/* Waterway Gradient */}
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#BFDBFE" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          {/* Safe Route Glowing Gradient */}
          <linearGradient id="safe-route-glow" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          {/* Radial Gradient for Heatmaps */}
          <radialGradient id="heat-safe" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.38" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat-caution" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat-danger" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#EF4444" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
          {/* Pulse marker animation */}
          <filter id="beacon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base City Blocks */}
        <rect width="500" height="500" fill="#F8FAFC" />
        <rect width="500" height="500" fill="url(#city-blocks)" />

        {/* River / Canal */}
        <path
          d="M -10 320 C 120 310, 210 360, 310 340 C 410 320, 480 370, 520 360 L 520 410 C 480 420, 410 370, 310 390 C 210 410, 120 360, -10 370 Z"
          fill="url(#river-grad)"
          opacity="0.85"
        />

        {/* City Parks & Green Zones */}
        <rect x="230" y="40" width="80" height="70" rx="8" fill="url(#park-grad)" />
        <text x="270" y="78" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="600" opacity="0.8">
          🌿 Memorial Park
        </text>

        <rect x="30" y="190" width="65" height="90" rx="8" fill="url(#park-grad)" />
        <text x="62" y="240" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="600" opacity="0.8">
          Botanical Grove
        </text>

        {/* Secondary Streets & Roads */}
        <g stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <line x1="20" y1="70" x2="480" y2="70" />
          <line x1="20" y1="160" x2="480" y2="160" />
          <line x1="20" y1="260" x2="480" y2="260" />
          <line x1="20" y1="410" x2="480" y2="410" />

          <line x1="80" y1="20" x2="80" y2="480" />
          <line x1="180" y1="20" x2="180" y2="480" />
          <line x1="290" y1="20" x2="290" y2="480" />
          <line x1="410" y1="20" x2="410" y2="480" />
        </g>

        {/* Diagonal Arterial Road (Safe Transit Corridor) */}
        <path
          d="M 50 430 L 170 380 L 260 290 L 370 190 L 450 70"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 50 430 L 170 380 L 260 290 L 370 190 L 450 70"
          stroke="#FEF3C7"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Road Labels */}
        <text x="260" y="65" fill="#64748B" fontSize="8" fontWeight="600" letterSpacing="0.5">
          GRAND BOULEVARD
        </text>
        <text x="210" y="255" fill="#64748B" fontSize="8" fontWeight="600" letterSpacing="0.5">
          CENTRAL AVE (SAFE CORRIDOR)
        </text>
        <text x="310" y="280" fill="#64748B" fontSize="7" fontWeight="500">
          METRO CROSSING
        </text>

        {/* Metro Rail Line (Dashed) */}
        <path
          d="M 60 480 L 160 380 L 330 290 L 440 120"
          stroke="#475569"
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.5"
        />

        {/* Streetlight Nodes (Golden / Warm glow dots along safe avenues) */}
        {showStreetlights && (
          <g opacity="0.9">
            {[
              { x: 90, y: 410 },
              { x: 130, y: 395 },
              { x: 170, y: 380 },
              { x: 215, y: 335 },
              { x: 260, y: 290 },
              { x: 315, y: 240 },
              { x: 370, y: 190 },
              { x: 410, y: 130 },
              { x: 440, y: 80 },
              { x: 180, y: 160 },
              { x: 240, y: 160 },
              { x: 300, y: 160 },
              { x: 360, y: 160 },
              { x: 410, y: 260 }
            ].map((st, i) => (
              <g key={`st-${i}`}>
                <circle cx={st.x} cy={st.y} r="6" fill="#FDE68A" opacity="0.4" />
                <circle cx={st.x} cy={st.y} r="2.2" fill="#F59E0B" />
              </g>
            ))}
          </g>
        )}

        {/* Heatmap Zones Overlay */}
        {heatmapVisible && (
          <g className="transition-opacity duration-300">
            {MOCK_HEATMAP_ZONES.map((zone, idx) => {
              const gradId =
                zone.riskLevel === 'safe'
                  ? 'url(#heat-safe)'
                  : zone.riskLevel === 'medium'
                  ? 'url(#heat-caution)'
                  : 'url(#heat-danger)';
              return (
                <g key={`zone-${idx}`}>
                  <circle
                    cx={zone.x * 5}
                    cy={zone.y * 5}
                    r={zone.radius * 3.2}
                    fill={gradId}
                  />
                  {zone.riskLevel === 'high' && (
                    <g transform={`translate(${zone.x * 5 - 12}, ${zone.y * 5 - 12})`}>
                      <circle cx="12" cy="12" r="12" fill="#EF4444" opacity="0.2" className="animate-ping" />
                      <circle cx="12" cy="12" r="8" fill="#EF4444" />
                      <path d="M12 8v4m0 2h.01" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Comparison Alternative Routes when in comparison mode or search */}
        {rerouteMode && (
          /* Old Route in Red/Amber Dash */
          <path
            d="M 75 400 L 125 350 L 150 275 L 225 175 L 440 75"
            stroke="#EF4444"
            strokeWidth="5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
        )}

        {/* Active Route Line Polyline */}
        {activeRoute && activeRoute.pathPoints && (
          <g>
            {/* Route Shadow/Border */}
            <path
              d={pointsToSvgPath(activeRoute.pathPoints)}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
            {/* Route Main Body */}
            <path
              d={pointsToSvgPath(activeRoute.pathPoints)}
              fill="none"
              stroke={activeRoute.isRecommended ? 'url(#safe-route-glow)' : activeRoute.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Direction chevrons / sparkles along route */}
            {activeRoute.isRecommended && (
              <path
                d={pointsToSvgPath(activeRoute.pathPoints)}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="8 20"
                strokeLinecap="round"
                opacity="0.8"
              />
            )}
          </g>
        )}

        {/* Start Point (Origin Pin) */}
        <g transform="translate(75, 400)">
          <circle cx="0" cy="0" r="8" fill="#2563EB" opacity="0.3" className="animate-ping" />
          <circle cx="0" cy="0" r="6" fill="#2563EB" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          <text x="10" y="4" fill="#1E293B" fontSize="9" fontWeight="700">
            Start (You)
          </text>
        </g>

        {/* Destination Point (End Pin) */}
        <g transform="translate(440, 75)">
          <circle cx="0" cy="0" r="14" fill="#EF4444" opacity="0.2" />
          <path
            d="M0 -14 C-7 -14 -11 -9 -11 -2 C-11 6 0 16 0 16 C0 16 11 6 11 -2 C11 -9 7 -14 0 -14 Z"
            fill="#EF4444"
          />
          <circle cx="0" cy="-4" r="4" fill="#FFFFFF" />
          <text x="-32" y="-18" fill="#1E293B" fontSize="9" fontWeight="700">
            Westwood Residence 🏁
          </text>
        </g>

        {/* Emergency Help Points Markers */}
        {showHelpPoints &&
          MOCK_HELP_POINTS.map((hp) => {
            const px = hp.coords.x * 5;
            const py = hp.coords.y * 5;
            const isPolice = hp.type === 'police';
            const isHosp = hp.type === 'hospital';
            const isMetro = hp.type === 'metro';

            const bgCol = isPolice ? '#2563EB' : isHosp ? '#EF4444' : isMetro ? '#7C3AED' : '#10B981';

            return (
              <g
                key={hp.id}
                transform={`translate(${px}, ${py})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => {
                  setSelectedHp(hp);
                  if (onHelpPointClick) onHelpPointClick(hp);
                }}
              >
                <circle cx="0" cy="0" r="13" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
                <circle cx="0" cy="0" r="11" fill={bgCol} />
                {isPolice && (
                  <path
                    d="M-4 -3 L0 -6 L4 -3 L4 2 C4 4 0 6 0 6 C0 6 -4 4 -4 2 Z"
                    fill="#FFFFFF"
                  />
                )}
                {isHosp && (
                  <path
                    d="M-2 -5 h4 v3 h3 v4 h-3 v3 h-4 v-3 h-3 v-4 h3 Z"
                    fill="#FFFFFF"
                  />
                )}
                {isMetro && (
                  <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                )}
                {!isPolice && !isHosp && !isMetro && (
                  <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                )}
              </g>
            );
          })}

        {/* Live GPS User Beacon (with moving progress & heading cone) */}
        {navMode && (
          <g transform={`translate(${currentGps.x * 5}, ${currentGps.y * 5})`}>
            {/* Heading beam */}
            <path
              d="M 0 0 L -24 -60 A 60 60 0 0 1 24 -60 Z"
              fill="url(#river-grad)"
              opacity="0.35"
            />
            {/* Outer radar pulse */}
            <circle cx="0" cy="0" r="18" fill="#2563EB" opacity="0.25" className="animate-ping" />
            <circle cx="0" cy="0" r="14" fill="#2563EB" opacity="0.3" />
            <circle cx="0" cy="0" r="8" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
            <circle cx="0" cy="0" r="5" fill="#2563EB" />
          </g>
        )}
      </svg>

      {/* Floating Map Controls (Right Side) */}
      <div className="absolute right-3 top-4 flex flex-col gap-2 z-10">
        {/* Compass */}
        <button
          id="btn-map-compass"
          aria-label="Map Compass"
          onClick={() => setZoom(1)}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
        >
          <Compass className="w-4 h-4 text-blue-600" />
        </button>

        {/* Heatmap Toggle */}
        <button
          id="btn-toggle-heatmap"
          aria-label="Toggle Heatmap"
          onClick={() => setHeatmapVisible(!heatmapVisible)}
          className={`w-9 h-9 rounded-full shadow-md border flex items-center justify-center transition-all ${
            heatmapVisible
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
              : 'bg-white/90 text-slate-600 border-slate-200 backdrop-blur-md'
          }`}
          title="Toggle Safety Heatmap"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          id="btn-zoom-in"
          aria-label="Zoom In"
          onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          id="btn-zoom-out"
          aria-label="Zoom Out"
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Heatmap Legend Pill (Top-Left) */}
      {heatmapVisible && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-[11px] font-medium text-slate-700">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300"></span>
            <span>Safe</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Medium</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>High Risk</span>
          </div>
        </div>
      )}

      {/* Help Point Selected Card Popover */}
      {selectedHp && (
        <div className="absolute left-3 right-3 bottom-3 z-20 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 flex items-center justify-between animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                selectedHp.type === 'police'
                  ? 'bg-blue-600'
                  : selectedHp.type === 'hospital'
                  ? 'bg-rose-500'
                  : selectedHp.type === 'metro'
                  ? 'bg-purple-600'
                  : 'bg-emerald-500'
              }`}
            >
              {selectedHp.type === 'police' && <Shield className="w-5 h-5" />}
              {selectedHp.type === 'hospital' && <Cross className="w-5 h-5" />}
              {selectedHp.type === 'metro' && <Train className="w-5 h-5" />}
              {selectedHp.type === 'pharmacy' && <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900">{selectedHp.name}</h4>
                {selectedHp.isOpen247 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    24/7 OPEN
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedHp.distance} away • ETA {selectedHp.eta} walk
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${selectedHp.phone}`}
              className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-semibold text-xs border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              Call
            </a>
            <button
              onClick={() => setSelectedHp(null)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
