import axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { Platform } from 'react-native';
import store from '@/store';

class HttpRequest {
  getInsideConfig(): AxiosRequestConfig {
    const config = {
      baseURL: Platform.OS === 'web' ? '/prod-api' : 'https://movie.xlz122.cn/prod-api',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      withCredentials: true,
      timeout: 60000,
    };

    return config;
  }

  interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = store.getState().routine.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return Promise.resolve(config);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.headers['content-type'].includes('application/json')
          ? response.data
          : response;

        if (res.code === 401) {
          store.dispatch({ type: 'routine/setLogout', payload: '' });
        }

        return Promise.resolve(res);
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          store.dispatch({ type: 'routine/setLogout', payload: '' });
        }

        return Promise.reject(error);
      },
    );
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);

    return instance(options);
  }
}

const axiosInstance = new HttpRequest();

export default axiosInstance;
