import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

type Login = {
  account: string;
  password: string;
};

/**
 * @description 登录
 * @param { Object } params
 * @param { string } params.account - 账号
 * @param { string } params.password - 密码
 */
export const login = ({ account, password }: Login): AxiosPromise => {
  const data = { account, password };

  return axios.request({
    url: '/login',
    method: 'post',
    data
  });
};

type Register = {
  account: string;
  password: string;
  code: string;
};

/**
 * @description 注册
 * @param { Object } params
 * @param { string } params.account - 账号
 * @param { string } params.password - 密码
 * @param { string } params.code - 验证码
 */
export const register = ({
  account,
  password,
  code
}: Register): AxiosPromise => {
  const data = { account, password, code };

  return axios.request({
    url: '/register',
    method: 'post',
    data
  });
};

type FieldAccount = {
  account: string;
};

/**
 * @description 校验账号是否存在
 * @param { Object } params
 * @param { string } params.account - 账号
 */
export const fieldAccount = ({ account }: FieldAccount): AxiosPromise => {
  const data = { account };

  return axios.request({
    url: '/account',
    method: 'post',
    data
  });
};

/**
 * @description 图形验证码
 */
export const getCaptcha = (): AxiosPromise => {
  return axios.request({
    url: '/captcha',
    method: 'get'
  });
};

type FiledCaptcha = {
  phone: string;
  code: string;
  type: string;
};

/**
 * @description 校验图片验证码并发送短信验证码
 * @param { Object } params
 * @param { string } params.phone - 手机号
 * @param { string } params.code - 图片验证码
 * @param { string } params.type - 类型(注册: register, 找回密码: forget)
 */
export const filedCaptcha = ({
  phone,
  code,
  type
}: FiledCaptcha): AxiosPromise => {
  const params = { phone, code, type };

  return axios.request({
    url: '/code',
    method: 'get',
    params
  });
};

type FiledPhoneCode = {
  phone: string;
  code: string;
};

/**
 * @description 校验短信验证码
 * @param { Object } params
 * @param { string } params.phone - 手机号
 * @param { string } params.code - 手机验证码
 */
export const filedPhoneCode = ({
  phone,
  code
}: FiledPhoneCode): AxiosPromise => {
  const data = { phone, code };

  return axios.request({
    url: '/code',
    method: 'post',
    data
  });
};

/**
 * @description 用户信息
 */
export const userinfo = (): AxiosPromise => {
  return axios.request({
    url: '/user',
    method: 'get'
  });
};

type ModifyPassword = {
  password: string;
};

/**
 * @description 修改密码
 * @param { Object } params
 * @param { string } params.password - 新密码
 */
export const modifyPassword = ({ password }: ModifyPassword): AxiosPromise => {
  const data = { password };

  return axios.request({
    url: '/user/password',
    method: 'put',
    data
  });
};
