import request from '@/utils/request'

export type SearchFormType = {
  keyword: string
}
export function searchApi(searchForm: SearchFormType) {
  return request.Post(
    '/job/search',
    searchForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}
