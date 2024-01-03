import axios from '@/utils/axios';

/**
 * @description 图片详情
 * @param { Object } params
 * @param { number } params.id - 图片id
 */
export const photosDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/photos/${id}`,
    method: 'get',
    params
  });
};
