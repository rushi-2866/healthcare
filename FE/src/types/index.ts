export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone: string;
  specialties: string[];
  tier: 'Platinum' | 'Gold' | 'Silver';
  isCashless: boolean;
  nabhAccredited: boolean;
  preAuthAvgTime: string; // e.g. "30 mins"
  distanceKm?: number;
  rating: number;
  bedsCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  badge: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  badgeText: string;
}

export interface ClaimRecord {
  claimId: string;
  patientName: string;
  hospitalName: string;
  city: string;
  admissionDate: string;
  claimedAmount: number;
  approvedAmount: number;
  status: 'Pre-Auth Approved' | 'Under Review' | 'Settled' | 'Discharge In Progress';
  currentStep: number; // 1 to 4
  steps: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    active: boolean;
  }[];
  policyNumber: string;
}
