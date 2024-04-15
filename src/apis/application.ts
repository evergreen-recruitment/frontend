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
