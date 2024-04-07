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

export function getHotCompanyApi() {
  return request
    .Get(
      '/company/hotCompanies',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<CompanyType[]>
}
