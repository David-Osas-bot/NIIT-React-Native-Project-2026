const BASE_URL = 'https://niit-react-native-project-2026.onrender.com/api';

// TODO: replace with real token retrieval once login/auth flow stores a token
// e.g. AsyncStorage.getItem('token') or SecureStore.getItemAsync('token')
async function getToken() {
  return null;
}

export async function apiRequest(path, options = {}) {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error || data?.message || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}