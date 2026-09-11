export type ScreenId =
  | 'splash'            // Screen 1
  | 'login'             // Screen 2
  | 'dashboard'         // Screen 3
  | 'route_search'      // Screen 4
  | 'route_comparison'  // Screen 5
  | 'shap_explain'      // Screen 6
  | 'live_navigation'   // Screen 7
  | 'safety_alert'      // Screen 8 (Modal/Screen)
  | 'dynamic_reroute'   // Screen 9
  | 'safety_checkin'    // Screen 10
  | 'emergency_sos'     // Screen 11
  | 'trusted_contacts'  // Screen 12
  | 'safety_analytics'  // Screen 13
  | 'profile_settings'; // Screen 14

export interface RouteOption {
  id: string;
  name: string;
  distance: string;
  time: string;
  safetyScore: number;
  isRecommended?: boolean;
  tagline?: string;
  reasons?: string[];
  riskFactors?: string[];
  lightingScore: number; // 0-100
  crowdDensity: 'Low' | 'Medium' | 'High';
  policeCoverage: boolean;
  metroNearby: boolean;
  pathPoints: { x: number; y: number }[];
  color: string;
}

export interface ShapFeature {
  name: string;
  category: 'positive' | 'negative';
  value: number;
  description: string;
  iconName: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isLiveSharing: boolean;
  avatarUrl?: string;
  batteryLevel?: number;
  status?: string;
}

export interface EmergencyHelpPoint {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'metro' | 'pharmacy' | 'booth';
  distance: string;
  eta: string;
  isOpen247: boolean;
  coords: { x: number; y: number };
  phone: string;
}

export interface HeatmapZone {
  x: number;
  y: number;
  radius: number;
  riskLevel: 'safe' | 'medium' | 'high';
  label: string;
}

export interface NavStep {
  instruction: string;
  distance: string;
  turnType: 'straight' | 'left' | 'right' | 'slight_right' | 'destination';
  safetyNote: string;
  lightingStatus: 'High' | 'Good' | 'Moderate';
}
