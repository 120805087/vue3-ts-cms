import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';

import router from './router/router';
import store from './store/store';

import oRequest from './service';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

interface DataType {
  code: number;
  data: any;
}

oRequest
  .request<DataType>({
    url: '/login',
    method: 'POST',
    data: {
      name: 'coderwhy',
      password: '123456'
    },
    interceptors: {
      requestInterceptor(config) {
        console.log('单请求拦截成功: 请求');
        return config;
      },
      responseInterceptor(res) {
        console.log('单请求拦截成功: 响应');
        return res;
      }
    }
  })
  .then((res) => {
    console.log(res);
  });

oRequest
  .post<DataType>({
    url: '/login',
    data: {
      name: 'coderwhy',
      password: '123456'
    }
  })
  .then((res) => {
    console.log(res.code);
    console.log(res.data);
  });
