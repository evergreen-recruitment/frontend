export type PageType<T> = {
  records: T[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  countId?: any
  maxLimit?: any
  pages: number
}

export type PageRequestType = {
  current?: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
}
