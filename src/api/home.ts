import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 首页内容聚合接口
 */
export const indexData = (): AxiosPromise => {
  return axios.request({
    url: '/index',
    method: 'get'
  });
};

type Paging = {
  page?: number;
  per_page?: number;
  sortby?: string;
};

/**
 * @description 正在热映
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const movieTheater = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/theater',
    method: 'get',
    params
  });
};

/**
 * @description 即将上映
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const movieComing = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: 'movie/coming',
    method: 'get',
    params
  });
};

/**
 * @description 高分榜
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const movieTop = ({ page, per_page }: Paging): AxiosPromise => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/top',
    method: 'get',
    params
  });
};

/**
 * @description 奖项
 */
export const movieAwards = (): AxiosPromise => {
  return axios.request({
    url: '/awards',
    method: 'get'
  });
};

/**
 * @description 那年今日
 * @param { Object } params
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 * @param { string } [params.sortby] - 排序方式(hot热度, year时间, rating评分)
 */
export const movieToday = ({
  page,
  per_page,
  sortby
}: Paging): AxiosPromise => {
  const params = { page, per_page, sortby };

  return axios.request({
    url: '/movie/today',
    method: 'get',
    params
  });
};
