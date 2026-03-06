const API_URL = import.meta.env.VITE_API_URL;

export const API = {
  signup: `${API_URL}/api/auth/signup`,
  login: `${API_URL}/api/auth/login`,
  google: `${API_URL}/api/auth/google`,
};