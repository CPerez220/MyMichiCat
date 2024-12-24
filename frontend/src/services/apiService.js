import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mymichicat-backend.onrender.com', // Deployed backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;