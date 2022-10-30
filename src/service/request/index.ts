import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { ElLoading } from 'element-plus';
import 'element-plus/es/components/loading/style/css';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

import { ORquestConfig, ORequestInterceptors } from './type';

const DEAFULT_LOADING = true;

class ORequest {
  instance: AxiosInstance;
  interceptors?: ORequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: ORquestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    //保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;

    // 1.添加单实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例拦截成功: 请求');

        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }

        return config;
      },
      (err) => {
        console.log('所有实例拦截失败: 请求');
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例拦截成功: 响应');

        // 将loading移除
        this.loading?.close();

        const data = res.data;
        if (data.code === 0) {
          return data;
        }
      },
      (err) => {
        console.log('所有实例拦截失败: 响应');
        return err;
      }
    );
  }

  request<T = any>(config: ORquestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单请求拦截器处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单请求响应处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3. 返回结果
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: ORquestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: ORquestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: ORquestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: ORquestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default ORequest;
