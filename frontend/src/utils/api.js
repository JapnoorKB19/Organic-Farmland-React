import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.DEV
    ? '/api' // In dev, handled by Vite proxy
    : 'https://your-backend.onrender.com/api', // In prod, use full backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default API;
