import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.92.33:3333',
});

export default api;
