const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export function getToken() {
  return localStorage.getItem('token');
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
