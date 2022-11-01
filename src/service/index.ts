import ORequest from './request';
import localCache from '@/utils/cache';

import { BASE_URL, TIME_OUT } from './request/config';

const oRequest = new ORequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getLocalCache('token');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch(error) {
      return error;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(error) {
      return error;
    }
  }
});

export default oRequest;
