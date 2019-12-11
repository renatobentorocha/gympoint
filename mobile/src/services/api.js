import axios from 'axios';
import { API_ADDR } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_ADDR,
});

export default api;
