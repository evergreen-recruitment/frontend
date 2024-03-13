export type SimpleJobItem = {
  id: string
  title: string
  company: string
  salary: [string?, string]
  address: string
  tags: string[]
}

export type JobItem = {
  id: string
  title: string
  company: string
  salary: string[]
  experience: string
  description: string
  education: string
  address: string
  tags: string[]
  hr: string
  createTime: string
}
