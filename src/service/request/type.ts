import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ORequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface ORquestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ORequestInterceptors<T>;
  showLoading?: boolean;
}
