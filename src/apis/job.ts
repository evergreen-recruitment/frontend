import request from '@/utils/request'
import type { PageRequestType, PageType } from '@/types/commonTypes'

export type JobCategoryType = {
  id: number
  name: string
  children: JobCategoryType[]
}

export type JobSearchFormType = {
  keyword?: string
  city?: number
} & JobFilterType &
  PageRequestType

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

export const JobTypeEnum = {
  0: '类型不限',
  1: '全职',
  4: '实习',
}

export const JobExperienceEnum = {
  0: '经验不限',
  1: '在校/应届',
  2: '1年以下',
  3: '1-3年',
  4: '3-5年',
  5: '5-10年',
  6: '10年以上',
}

export const JobSalaryEnum = {
  0: '薪资不限',
  1: '3k以下',
  2: '3-5k',
  3: '5-10k',
  4: '10-20k',
  5: '20-50k',
  6: '50k以上',
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

export function getNewJobsApi(pageParam: PageRequestType) {
  return request
    .Post(
      'job/newJobs',
      // @ts-ignore
      pageParam,
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}
