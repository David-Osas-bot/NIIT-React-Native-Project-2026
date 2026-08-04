// import axios from 'axios';
// import { getToken } from './authToken';

// const api = axios.create({
//     baseURL: process.env.EXPO_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Interceptor to inject the token before every request
// api.interceptors.request.use(
//     async (config) => {
//         const token = await getToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// export async function apiRequest(path, options = {}) {
//     try {
//         const response = await api({
//             url: path,
//             ...options,
//         });
//         return response.data;
//     } catch (error) {
//         // Axios puts the server response in error.response
//         const message = error.response?.data?.message || error.message;
//         throw new Error(message);
//     }
// }

import axios from 'axios';
import { getToken } from './authToken';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to inject the token before every request
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
        // Axios puts the server response in error.response
        const message = error.response?.data?.message || error.message;
        const apiError = new Error(message);
        // Attach the HTTP status code so callers can branch on it
        // (e.g. force logout on 401) without string-matching messages.
        apiError.status = error.response?.status;
        throw apiError;
    }
}