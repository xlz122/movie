import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 收藏统计
 */
export const userCount = (): AxiosPromise => {
  return axios.request({
    url: '/user/collections/count',
    method: 'get'
  });
};

type Paging = {
  page?: number;
  per_page?: number;
};

/**
 * @description 关注的影人
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const userActors = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/actors',
    method: 'get',
    params
  });
};

/**
 * @description 关注的角色
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const userRoles = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/roles',
    method: 'get',
    params
  });
};

/**
 * @description 收藏的视频
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const userVideos = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/videos',
    method: 'get',
    params
  });
};
