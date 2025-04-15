import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 角色详情
 * @param { Object } params
 * @param { number } params.id - 角色id
 */
export const roleDetail = ({ id }: { id: number }): AxiosPromise => {
  const params = { id };

  return axios.request({
    url: `/roles/${id}`,
    method: 'get',
    params
  });
};

/**
 * @description 角色详情 - 关注
 * @param { Object } params
 * @param { number } params.id - 角色id
 */
export const followRole = ({ id }: { id: number }): AxiosPromise => {
  return axios.request({
    url: `/user/roles/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 角色详情 - 取消关注
 * @param { Object } params
 * @param { number } params.id - 角色id
 */
export const unFollowRole = ({ id }: { id: number }): AxiosPromise => {
  return axios.request({
    url: `/user/roles/${id}/collections`,
    method: 'delete'
  });
};
