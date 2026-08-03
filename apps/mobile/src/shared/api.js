import axios from 'axios';
import { getToken } from './authToken';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export async function apiRequest(path, options = {}) {
    try {
        const response = await api({
            url: path,
            ...options,
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        throw new Error(message);
    }
}
