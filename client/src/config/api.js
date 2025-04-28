import axios from 'axios';

const API_URL = 'https://task-manager-app-8wkx.onrender.com';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `/api/auth/register`,
    LOGIN: `/api/auth/login`,
  },
  TASKS: {
    BASE: `/api/tasks`,
    BY_ID: (id) => `/api/tasks/${id}`,
  },
};

export { axiosInstance }; 