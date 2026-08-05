// shared/api.js

import axios from 'axios';
import { getToken } from './authToken';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Automatically attach the JWT token to every request.
 */
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle API errors globally.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Server responded with an error
    if (error.response) {
      return Promise.reject(
        new Error(
          error.response.data?.message ||
          error.response.data?.error ||
          'Request failed.'
        )
      );
    }

    // No response from server
    if (error.request) {
      return Promise.reject(
        new Error(
          'Unable to reach the server. Please check your internet connection.'
        )
      );
    }

    // Something else happened
    return Promise.reject(
      new Error(error.message || 'An unexpected error occurred.')
    );
  }
);

/**
 * Generic API helper.
 *
 * Example:
 * await apiRequest('/auth/login', {
 *   method: 'POST',
 *   data: { email, password }
 * });
 */
export async function apiRequest(path, options = {}) {
  const response = await api({
    url: path,
    ...options,
  });

  return response.data;
}

export default api;