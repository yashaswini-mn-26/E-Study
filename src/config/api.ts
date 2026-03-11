

const API_URL = import.meta.env.VITE_API_URL;

export const API = {
  signup: `${API_URL}/api/auth/signup`,
  login: `${API_URL}/api/auth/login`,
  google: `${API_URL}/api/auth/google`,
  forgot: `${API_URL}/api/auth/forgot-password`,
  dashboard:`${API_URL}/api/dashboard`,
  user:`${API_URL}/api/users`,
  message:`${API_URL}/api/messages`,
  reset: (token: string) => `${API_URL}/api/auth/reset-password/${token}`
};