const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch (err) {
    if (err.name === 'TypeError' || err.message?.includes('fetch')) {
      throw new Error(`Cannot connect to backend server at ${API_URL}. Please ensure the server is running (run 'npm start' in folder 'a') and that your network/CORS settings allow the connection.`);
    }
    throw err;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export { API_URL };
