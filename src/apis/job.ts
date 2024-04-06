import request from '@/utils/request'
import type { PageType } from '@/types/commonTypes'

export type JobSearchFormType = {
  keyword: string
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
}

export type EmployeeVOType = {
  id: string
  realName: string
  avatar: string
  jobIds: string[]
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

export function getJobDetail(jobId: string) {
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
