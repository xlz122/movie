import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 影视分类
 */
export const movieCategories = (): AxiosPromise => {
  return axios.request({
    url: '/categories',
    method: 'get'
  });
};

type MovieList = {
  category: string;
  genre: string;
  country: string;
  year: string;
  page?: number;
  per_page?: number;
};

/**
 * @description 影视列表
 * @param { Object } params
 * @param { string } params.category - 分类
 * @param { string } params.genre - 类别
 * @param { string } params.country - 国家
 * @param { string } params.year - 年份
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const moviesList = ({
  category,
  genre,
  country,
  year,
  page,
  per_page
}: MovieList): AxiosPromise => {
  const params = { category, genre, country, year, page, per_page };

  return axios.request({
    url: '/movies',
    method: 'get',
    params
  });
};

/**
 * @description 影视详情
 * @param { Object } params
 * @param { number } params.id - 影视id
 */
export const moviesDetail = ({ id }: { id: number }): AxiosPromise => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}`,
    method: 'get',
    params
  });
};

/**
 * @description 影视详情 - 新增/删除我的想看
 * @param { Object } params
 * @param { number } params.id - 影视id
 */
export const movieWish = ({ id }: { id: number }): AxiosPromise => {
  return axios.request({
    url: `/user/movies/${id}/wish`,
    method: 'post'
  });
};

/**
 * @description 影视详情 - 演员
 * @param { Object } params
 * @param { number } params.id - 影视id
 */
export const movieActor = ({ id }: { id: number }): AxiosPromise => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}/cast`,
    method: 'get',
    params
  });
};

type MoviePhotos = {
  id: number;
  type: string;
  page?: number;
  per_page?: number;
};

/**
 * @description 影视详情 - 相册
 * @param { Object } params
 * @param { number } params.id - 影视id
 * @param { string } params.type - 类型(all全部, poster海报, still剧照, cut截图, other其它)
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const moviePhotos = ({
  id,
  type,
  page,
  per_page
}: MoviePhotos): AxiosPromise => {
  const params = { id, type, page, per_page };

  return axios.request({
    url: `/movies/${id}/photos`,
    method: 'get',
    params
  });
};

type MovieComment = {
  id: number;
  page?: number;
  per_page?: number;
  sortby?: string;
};

/**
 * @description 影视详情 - 评论
 * @param { Object } params
 * @param { number } params.id - 影视id
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 * @param { string } [params.sortby] - 排序
 */
export const movieComment = ({
  id,
  page,
  per_page,
  sortby
}: MovieComment): AxiosPromise => {
  const params = { page, per_page, sortby };

  return axios.request({
    url: `/movies/${id}/comments`,
    method: 'get',
    params
  });
};
