import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 图片详情
 * @param { Object } params
 * @param { number } params.id - 图片id
 */
export const photosDetail = ({ id }: { id: number }): AxiosPromise => {
  const params = { id };

  return axios.request({
    url: `/photos/${id}`,
    method: 'get',
    params
  });
};
