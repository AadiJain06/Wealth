import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://web-production-db7c.up.railway.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      throw new Error(data.message || `HTTP ${status}: ${data.error || 'Request failed'}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to connect to the server');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// Portfolio API endpoints
export const portfolioApi = {
  // Get all portfolio holdings
  getHoldings: () => api.get('/portfolio/holdings'),
  
  // Get portfolio allocation by sector and market cap
  getAllocation: () => api.get('/portfolio/allocation'),
  
  // Get portfolio performance comparison
  getPerformance: () => api.get('/portfolio/performance'),
  
  // Get portfolio summary metrics
  getSummary: () => api.get('/portfolio/summary'),
  
  // Health check
  healthCheck: () => api.get('/health'),
};

// Individual function exports for direct import
export const fetchHoldings = () => api.get('/portfolio/holdings');
export const fetchAllocation = () => api.get('/portfolio/allocation');
export const fetchPerformance = () => api.get('/portfolio/performance');
export const fetchSummary = () => api.get('/portfolio/summary');

export default api;
