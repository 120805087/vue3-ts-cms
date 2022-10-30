import ORequest from './request';

import { BASE_URL, TIME_OUT } from './request/config';

const oRequest = new ORequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log('单实例拦截成功: 请求');
      return config;
    },
    requestInterceptorCatch(error) {
      console.log('单实例拦截成功: 请求');
      return error;
    },
    responseInterceptor(res) {
      console.log('单实例拦截成功: 响应');
      return res;
    },
    responseInterceptorCatch(error) {
      console.log('单实例拦截成功: 响应');
      return error;
    }
  }
});

export default oRequest;
