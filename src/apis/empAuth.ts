export type EmpInfoType = {
  userId?: string
  avatar?: string
  userAccount?: string
  realName?: string
  phone?: string
  email?: string
  gender?: string
  age?: number
  address?: string
  applyStatus?: number
  createTime?: string
}

export type SimpleEmployeeType = {
  realName: string
  avatar: string
  jobIds: string[]
}
