import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // This works with the proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
