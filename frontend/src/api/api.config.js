
const getApiBaseUrl = () => {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;

  if (envUrl) {
    return envUrl;
  }

  if (import.meta.env?.DEV) {
    console.warn('VITE_API_BASE_URL not set, using localhost fallback');
    return 'http://localhost:8888/api/v1';
  }

  throw new Error('VITE_API_BASE_URL is required in production');
};

export const API_BASE_URL = getApiBaseUrl();

export const ENDPOINTS = {
  AUTH: `${API_BASE_URL}/auth`,
  JOBS: `${API_BASE_URL}/jobs`,
  APPLICANT: `${API_BASE_URL}/applicant`,
  COMPANY: `${API_BASE_URL}/company`,
  APPLICATIONS: `${API_BASE_URL}/applications`,
  NOTIFICATIONS: `${API_BASE_URL}/notifications`,
};

if (import.meta.env?.DEV) {
  console.log('API Configuration:', {
    baseUrl: API_BASE_URL,
    environment: import.meta.env?.MODE || 'unknown',
  });
}

export default ENDPOINTS
