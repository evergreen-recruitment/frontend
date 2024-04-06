// 用于配置主题色
export const primaryColorEnum = {
  origin: '#e877d7',
  red: '#F5222D',
  orange: '#FA541C',
  yellow: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  blue: '#2F54EB',
  purple: '#722ED1',
} as const

export type primaryColorEnumType = keyof typeof primaryColorEnum
