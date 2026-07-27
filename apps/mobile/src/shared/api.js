import { getToken } from './authToken';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiRequest(path, options = {}) {
    const token = await getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || `Request failed: ${response.status}`);
    }

    return data;
}