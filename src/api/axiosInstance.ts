import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 5000,
});
