import { navigate } from '@/navigation/NavigationService';
import axios from 'axios';

import { useAuthStore } from '../store';


const apiUrl = 'http://192.168.0.100:3000/api/v1'

// Create axios instance
export const axiosInstance = axios.create({
    baseURL:'https://bestport.up.railway.app/api/v1',
    //  apiUrl,

    
    // 'https://bestport.up.railway.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['access-key'] = '12345';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()

      // ✅ window.location nahi hota RN mein — navigation service use karo
      navigate('Login');
    }

    if (error.response?.status === 403) {
      console.error('Access Denied: You do not have permission.');
    }

    if (error.response?.status === 500) {
      console.error('Server Error: Please try again later.');
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;



