import axios from 'axios';

import router from '../router';
import { BASE_URL } from './config'
import { message } from '../utils/utils';

const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use(
  config => {
    config.withCredentials = true
    return config
  },
  err => Promise.reject(err)
);

request.interceptors.response.use(
  //不做拦截处理，直接返回
  res => res,
  err => {
    switch (err.response.status) {
      case 400:
        message('error', '账号或密码错误')
        break
      case 401:
        message('error', '未登录状态')
        router.push('/login')
        break;
      case 404:
        message('error', '请求不存在')
        break;
      case 500:
        message('error', '服务器错误')
        break
      default:
        break
    }
    return Promise.reject(err);
  }
);

export default request;