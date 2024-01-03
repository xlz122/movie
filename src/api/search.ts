import axios from '@/utils/axios';

export type SearchParams = {
  keyword: string;
  type: string;
  page: number;
  per_page: number;
};

/**
 * @description 影视/影人/角色信息查询
 * @param { Object } params
 * @param { string } params.keyword - 关键字
 * @param { string } params.type - 类别
 * @param { number } [params.page] - 页数
 * @param { number } [params.per_page] - 条数
 */
export const searchDetail = ({
  keyword,
  type,
  page,
  per_page
}: SearchParams) => {
  const params = { keyword, type, page, per_page };

  return axios.request({
    url: '/search',
    method: 'get',
    params
  });
};
