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
  id: string
  realName: string
  avatar: string
  position: string
  jobIds: string[]
}
