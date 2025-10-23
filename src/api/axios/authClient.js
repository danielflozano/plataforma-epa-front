import axios from 'axios';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Manda el refreshToken por cookie.
  headers: {
    'Content-Type': 'application/json',
  },
});
