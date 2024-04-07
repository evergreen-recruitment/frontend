import request from '@/utils/request'
import type { PageType } from '@/types/commonTypes'

export type JobSearchFormType = {
  keyword?: string
  city?: [number,number]
  current: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
}

export type JobFilterType = {
  jobType: number | null // 职位类型
  needJobType: number | null // 求职类型
  experience: number | null // 经验
  salary: number | null // 薪资
}

export type JobItemType = {
  id: string
  companyId: string
  companyName: string
  title: string
  description: string
  salary: string
  education: string
  experience: string
  jobSkills: string[]
  jobLabels: string[]
  address: string
  cityName: string
  areaDistrict: string
  businessDistrict: string
  city: number
  welfareList: string[]
  updateTime: string
  jobType: number
  jobStandardName: string
  employeeVO: EmployeeVOType
  companyVO: CompanyVOType
}

export type EmployeeVOType = {
  id: string
  realName: string
  avatar: string
  jobIds: string[]
}

export type CompanyVOType = {
  id: string
  name: string
  logo: string
  address: string
  description: string
  scaleId: number
  stageId?: any
  industryId: number
  jobIds: string
}

export type SimpleJobItemType = {
  id: string
  companyName: string
  title: string
  salary: string
  education: string
  experience: string
  jobLabels: string[]
  jobSkills: string[]
  cityName: string
  areaDistrict: string
  welfareList: string[]
  updateTime: string
  jobType: number
}

export const CompanyScaleEnum = {
  0: '0-20人',
  1: '20-99人',
  2: '100-499人',
  3: '500-999人',
  4: '1000-9999人',
  5: '10000人以上',
}

export const CompanyStageEnum = {
  0: '未融资',
  1: '天使轮',
  2: 'A轮',
  3: 'B轮',
  4: 'C轮',
  5: 'D轮及以上',
  6: '上市公司',
  7: '不需要融资',
}

export function getJobDetailApi(jobId: string) {
  return request
    .Get(
      '/job/jobDetail',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true, params: { jobId } },
    )
    .send(true) as Promise<JobItemType>
}

export function jobSearchApi(searchForm: JobSearchFormType) {
  return request
    .Post(
      '/job/search',
      searchForm,
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<PageType<SimpleJobItemType>>
}

export function similarJobsApi(jobStandardId: string) {
  return request.Get('/job/similarJobs', { params: { jobStandardId } }).send(true) as Promise<any>
}
