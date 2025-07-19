import NetInfo from '@react-native-community/netinfo';
import { isIOS } from '@rneui/base';
import axios from 'axios';

import endpoints from './endpoints';


// Base URLs
const live = `https://bestport-e2da7425a372.herokuapp.com/api/v1`;
const dev = 'http://192.168.1.104:3000/api/v1';

export const socketUrl = 'https://bestport-e2da7425a372.herokuapp.com'

const baseApi = axios.create({
  baseURL: `${live}`,
  timeout: 20000,
  timeoutErrorMessage: 'Request timeout.',
  headers: {
    'access-key': '12345',
  },
});

// Request Interceptor – Check Internet Before Each Request
baseApi.interceptors.request.use(
  async (request) => {
    // try {
    //   // Use NetInfo to check connection
    //   const netState = await NetInfo.fetch();

    //   if (!isIOS && !netState.isConnected || !netState.isInternetReachable) {
    //     return Promise.reject({
    //       message: 'No internet connection. Please check your network.',
    //       isOffline: true,
    //     });
    //   }
    // } catch (e) {
    //   console.error('NetInfo fetch failed:', e);
    //   // Optionally allow the request to proceed if NetInfo fails
    // }

    // ✅ Optional: Debug logging in development
    if (__DEV__ && request?.baseURL) {
      console.log('🚀 API Request:', {
        method: request.method?.toUpperCase(),
        url: request?.baseURL + request.url,
        headers: request.headers,
        data: request.data,
        params: request.params,
      });
    }

    return request;
  },
  (error) => {
    console.error('❌ API Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor – Optional Debug Logging
baseApi.interceptors.response.use(
  (response) => {
    if (__DEV__ && response?.config?.baseURL) {
      console.log('✅ API Response:', {
        url: response.config.baseURL + response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ API Response Error:', {
        url: error.response.config.baseURL + error.response.config.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error('❌ Network/API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export { endpoints }

export default baseApi;
