import request from '@/utils/request'
import type { SimpleJobItemType } from '@/apis/job'
import type { SimpleEmployeeType } from '@/apis/employee'
import type { PageRequestType, PageType } from '@/types/commonTypes'

export type CompanySearchFormType = {
  keyword?: string
  city?: number
} & CompanyFilterType &
  PageRequestType

export type CompanyFilterType = {
  industryId?: number | null
  scaleId?: number | null
  stageId?: number | null
  jobNumSort?: number | null // 0 or null 正常 1: 升序 -1: 降序
  employeeNumSort?: number | null // 0 or null 正常 1: 升序 -1: 降序
}

export type SimpleCompanyType = {
  id: string
  name: string
  logo: string
  address: string
  description: string
  scaleId: number
  stageId: number
  industryId: number
  jobNum: number
  employeeNum: number
}

export type CompanyDetailType = {
  id: string
  name: string
  logo: string
  address: string
  description: string
  scaleId: number
  stageId: number
  industryId: number
  longitude: number
  latitude: number
  jobVOList: SimpleJobItemType[]
  employeeVOList: SimpleEmployeeType[]
}

export const CompanyScaleEnum = {
  '-1': '类型不限',
  0: '0-20人',
  1: '20-99人',
  2: '100-499人',
  3: '500-999人',
  4: '1000-9999人',
  5: '10000人以上',
}

export const CompanyStageEnum = {
  '-1': '类型不限',
  0: '未融资',
  1: '天使轮',
  2: 'A轮',
  3: 'B轮',
  4: 'C轮',
  5: 'D轮及以上',
  6: '上市公司',
  7: '不需要融资',
}

export const CompanyJobNumSortEnum = {
  0: '正常',
  1: '升序',
  '-1': '降序',
}

export const CompanyEmployeeNumSortEnum = {
  0: '正常',
  1: '升序',
  '-1': '降序',
}

export function getHotCompanyApi() {
  return request
    .Get(
      '/company/hotCompanies',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<SimpleCompanyType[]>
}

export function companySearchApi(searchForm: CompanySearchFormType) {
  return request
    .Post(
      '/company/search',
      searchForm,
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<PageType<SimpleCompanyType>>
}

export function getCompanyDetailApi(companyId: string) {
  return request
    .Get(
      '/company/detail',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true, params: { companyId } },
    )
    .send(true) as Promise<CompanyDetailType>
}
