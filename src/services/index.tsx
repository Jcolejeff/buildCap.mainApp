import axios from 'axios';
import { authDetailsInterface } from 'types';

const baseURL = import.meta.env.VITE_USE_PROXY === 'true' ? '/api' : import.meta.env.VITE_API_URL;
const store = JSON.parse(localStorage.getItem('store') || '{}');
const token = store?.state?.authDetails?.access_token || '';
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,

  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return { ...config, withCredentials: true };
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

// api no auth
export const ApiNoAuth = axios.create({
  baseURL,
  withCredentials: true,
});

ApiNoAuth.interceptors.request.use(
  (config) => {
    return { ...config, withCredentials: true };
  },
  (error) => {
    return Promise.reject(error);
  },
);

ApiNoAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
