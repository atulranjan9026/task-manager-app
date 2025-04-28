const API_URL = process.env.REACT_APP_API_URL || 'https://task-manager-app-8wkx.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/api/auth/register`,
    LOGIN: `${API_URL}/api/auth/login`,
  },
  TASKS: {
    BASE: `${API_URL}/api/tasks`,
    BY_ID: (id) => `${API_URL}/api/tasks/${id}`,
  },
}; 