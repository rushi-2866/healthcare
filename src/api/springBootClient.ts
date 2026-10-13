/**
 * Spring Boot 3.3.0 REST API Client
 * Connects frontend views with Spring Boot endpoints at /api/v1/* and /actuator/*
 */

export interface SpringBootResponse<T> {
  timestamp: string;
  status: number;
  controller?: string;
  data: T;
  error?: string;
  message?: string;
  path?: string;
}

export const springBootApi = {
  // 1. Actuator Health & Metrics
  async getHealth() {
    const res = await fetch('/actuator/health');
    return res.json();
  },

  async getInfo() {
    const res = await fetch('/actuator/info');
    return res.json();
  },

  async getMetrics() {
    const res = await fetch('/actuator/metrics');
    return res.json();
  },

  // 2. Hospital Search
  async searchHospitals(params: {
    city?: string;
    specialty?: string;
    query?: string;
    cashlessOnly?: boolean;
  }) {
    const url = new URL('/api/v1/hospitals/search', window.location.origin);
    if (params.city && params.city !== 'All') url.searchParams.set('city', params.city);
    if (params.specialty && params.specialty !== 'All') url.searchParams.set('specialty', params.specialty);
    if (params.query) url.searchParams.set('query', params.query);
    if (params.cashlessOnly !== undefined) url.searchParams.set('cashlessOnly', String(params.cashlessOnly));

    const res = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });
    return res.json();
  },

  // 3. Claims Workflow
  async getClaim(claimId: string) {
    const res = await fetch(`/api/v1/claims/${encodeURIComponent(claimId)}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || `HTTP ${res.status}: Failed to fetch claim`);
    }
    return json;
  },

  // 4. Pre-Auth Intimation
  async submitPreAuth(payload: {
    patientName: string;
    employeeId: string;
    hospitalName: string;
    admissionDate: string;
    treatmentType: string;
  }) {
    const res = await fetch('/api/v1/preauth/intimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || `HTTP ${res.status}: Failed to submit pre-auth`);
    }
    return json;
  },

  // 5. Auth / Login
  async login(role: string, identifier: string) {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ role, identifier }),
    });
    return res.json();
  },

  // 6. MAven Assistant
  async chatMaven(question: string) {
    const res = await fetch('/api/v1/chat/maven', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    return res.json();
  },
};
