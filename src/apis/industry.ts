import request from '@/utils/request'

export type IndustryListType = {
  code: number
  name: string
  children?: IndustryListType[]
}

export function getIndustryListApi() {
  return request
    .Get(
      '/industry/allIndustries',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<IndustryListType[]>
}
