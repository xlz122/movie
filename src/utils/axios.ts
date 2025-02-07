import axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';
import { Platform } from 'react-native';
import store from '@/store/index';

// 标识请求
const getRequestIdentify = (config: AxiosRequestConfig, isReuest = false) => {
  let url = config.url;
  if (config.url && isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }

  return config.method === 'get'
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};

// 取消重复请求
const pending: { [key: string]: (message: string) => void } = {};
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求');
  }

  delete pending[key];
};

class HttpRequest {
  getInsideConfig(): AxiosRequestConfig {
    const config = {
      baseURL: Platform.OS === 'web' ? '/api' : 'https://movie.xlz122.cn/api',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      withCredentials: true,
      timeout: 60000
    };

    return config;
  }

  interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 标识请求
        const requestIdentify: string = getRequestIdentify(config, true);
        // 取消重复请求
        removePending(requestIdentify, true);
        config.cancelToken = new axios.CancelToken(cancel => {
          pending[requestIdentify] = cancel;
        });

        const token = store.getState().routine.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return Promise.resolve(config);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.headers['content-type'].includes(
          'application/json'
        )
          ? response.data
          : response;

        // 无权限
        if (res.code === 401) {
          store.dispatch({ type: 'routine/setLogout', payload: '' });
        }

        return Promise.resolve(res);
      },
      (error: AxiosError) => {
        // 无权限
        if (error.response?.status === 401) {
          store.dispatch({ type: 'routine/setLogout', payload: '' });
        }

        return Promise.reject(error);
      }
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
