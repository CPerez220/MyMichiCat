import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://mymichicat-backend.onrender.com', // Backend URL
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;