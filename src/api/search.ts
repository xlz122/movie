import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

type SearchDetail = {
  keyword: string;
  type: string;
  page?: number;
  per_page?: number;
};

/**
 * @description 搜索详情
 * @param { Object } params
 * @param { string } params.keyword - 关键字
 * @param { string } params.type - 类别(影视/影人/角色)
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const searchDetail = ({
  keyword,
  type,
  page,
  per_page
}: SearchDetail): AxiosPromise => {
  const params = { keyword, type, page, per_page };

  return axios.request({
    url: '/search',
    method: 'get',
    params
  });
};
