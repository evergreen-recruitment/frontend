import request from '@/utils/request'

export type CompanyType = {
  id: string
  name: string
  logo: string
  address: string
  description: string
  scaleId: number
  stageId: number
  industryId: number
  jobIds: string[]
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

export function getHotCompanyApi() {
  return request
    .Get(
      '/company/hotCompanies',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<CompanyType[]>
}
