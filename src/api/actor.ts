import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 影人详情
 * @param { Object } params
 * @param { number } params.id - 影人id
 */
export const actorsDetail = ({ id }: { id: number }): AxiosPromise => {
  const params = { id };

  return axios.request({
    url: `/actors/${id}`,
    method: 'get',
    params
  });
};

/**
 * @description 影人详情 - 关注
 * @param { Object } params
 * @param { number } params.id - 影人id
 */
export const followActor = ({ id }: { id: number }): AxiosPromise => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 影人详情 - 取消关注
 * @param { Object } params
 * @param { number } params.id - 影人id
 */
export const unFollowActor = ({ id }: { id: number }): AxiosPromise => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'delete'
  });
};

type ActorPhotos = {
  id: number;
  type: string;
  page?: number;
  per_page?: number;
};

/**
 * @description 影人详情 - 相册列表
 * @param { Object } params
 * @param { number } params.id - 影人id
 * @param { string } params.type - 类型(all全部, portrait写真, cut截图, other其它)
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const actorPhotos = ({
  id,
  type,
  page,
  per_page
}: ActorPhotos): AxiosPromise => {
  const params = { id, type, page, per_page };

  return axios.request({
    url: `/actors/${id}/photos`,
    method: 'get',
    params
  });
};

type ActorWorks = {
  id: number;
  page?: number;
  per_page?: number;
  sortby?: string;
};

/**
 * @description 影人详情 - 作品列表
 * @param { Object } params
 * @param { number } params.id - 影人id
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 * @param { string } [params.sortby] - 排序方式(hot热度, year时间, rating评分)
 */
export const actorWorks = ({
  id,
  page,
  per_page,
  sortby
}: ActorWorks): AxiosPromise => {
  const params = { id, page, per_page, sortby };

  return axios.request({
    url: `/actors/${id}/works`,
    method: 'get',
    params
  });
};
