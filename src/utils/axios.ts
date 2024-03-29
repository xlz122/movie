import axios from 'axios';
import {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  CancelTokenStatic
} from 'axios';
import { Platform } from 'react-native';
import store from '@/store/index';

// 标识请求
const getRequestIdentify = (config: AxiosRequestConfig, isReuest = false) => {
  let url = config.url;
  if (isReuest && config.url) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }
  return config.method === 'get'
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};

// 取消重复请求
type Pending = {
  [key: string]: (message: string) => void;
};
const pending: Pending = {};
const CancelToken: CancelTokenStatic = axios.CancelToken;

const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求');
  }
  delete pending[key];
};

class HttpRequest {
  constructor(externalConfig: AxiosRequestConfig) {
    this.externalConfig = externalConfig;
  }

  externalConfig: AxiosRequestConfig = {};

  getInsideConfig(): AxiosRequestConfig {
    let config = {
      // 基础路径
      baseURL: '',
      // 允许跨域带token,cookie
      withCredentials: true,
      // 请求超时
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    config = Object.assign(config, this.externalConfig);
    return config;
  }

  // 调用方法
  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }

  // 拦截器设置
  interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // 拦截重复请求(即当前正在进行的相同请求)
        const requestData: string = getRequestIdentify(config, true); // 标识请求
        // 取消重复请求
        removePending(requestData, true);
        // 创建当前请求的取消方法
        config.cancelToken = new CancelToken(cancel => {
          pending[requestData] = cancel;
        });

        const token = (await store.getState().routine.token) || '';
        if (token) {
          config.headers = Object.assign(config.headers!, {
            Authorization: `Bearer ${token}`
          });
        }
        return Promise.resolve(config);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const data = res.data;
        return Promise.resolve(data);
      },
      (error: AxiosError) => {
        // 无权限
        if (error.response?.status === 401) {
          store.dispatch({
            type: 'routine/setLogout',
            payload: ''
          });
        }

        return Promise.reject(error);
      }
    );
  }
}

const Axios = new HttpRequest({
  baseURL: Platform.OS === 'web' ? '/api' : 'https://h5-api-test.ixook.com'
});

export default Axios;
