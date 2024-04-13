import request from '@/utils/request'
import type { PageType } from '@/types/commonTypes'

export type JobCategoryType = {
  id: number
  name: string
  children: JobCategoryType[]
}

export type JobSearchFormType = {
  keyword?: string
  city?: number
  current: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
} & JobFilterType

export type JobFilterType = {
  jobStandardId?: number | null // 职位类型
  jobType?: number | null // 求职类型
  experience?: number | null // 经验
  salary?: number | null // 薪资
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
  stageId?: number
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

/**
 * 获取岗位分类
 * 类型 待补充
 */
export function getJobCategoryApi() {
  return request
    .Get(
      '/job/category',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<JobCategoryType[]>
}
