import request from '@/utils/request'

/**
 * 工作经历表单
 */
export type WorkExpInfoFormType = {
  companyName: string // 公司名称
  industry: string // 所属行业
  position: string // 职位
  positionType: string // 职位类别
  startTime: string // 开始时间
  endTime: string // 结束时间
  salary: string // 当时月薪
  workContent: string // 工作内容
}

/**
 * 项目信息表单
 */
export type ProjectInfoFormType = {
  projectName: string // 项目名称
  projectType: string // 项目类型
  startTime: string // 开始时间
  endTime: string // 结束时间
  projectContent: string // 项目内容
}

/**
 * 技能信息表单
 */
export type SkillInfoFormType = {
  skillName: string // 技能名称
  skillUsingTime: string // 使用时长
  skillLevel: string // 技能等级 一般 良好 熟练 精通
  skillContent: string // 技能内容
}

/**
 * 证书信息表单
 */
export type CertificateInfoFormType = {
  certificateName: string // 证书名称
  certificateTime: string // 获得时间
}

/**
 * 自我介绍表单
 */
export type SelfIntroductionFormType = {
  selfIntroduction: string // 自我介绍内容
}

export type ApplicationListType = {
  id: string
  pdfUrl?: string
  imageUrl?: string
  active?: boolean
}

export function uploadApplicationApi(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request
    .Post(
      '/application/upload',
      formData,
      // @ts-ignore 这里不要自己添加Content-Type，会自动识别
      { setTimeout: 60 * 10 }, // 设置十分钟超时
    )
    .send(true) as Promise<string>
}

export function getCurrentApplicationApi() {
  return request.Get('/application/current').send(true) as Promise<ApplicationListType>
}

export function getApplicationListApi() {
  return request.Get('/application/list').send(true) as Promise<ApplicationListType[]>
}

export function activeApplicationApi(id: string) {
  return request.Post('/application/active', { id }).send(true) as Promise<boolean>
}

export function deleteApplicationApi(id: string) {
  return request.Get('/application/delete', { params: { id } }).send(true) as Promise<boolean>
}
