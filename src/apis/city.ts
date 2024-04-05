import request from '@/utils/request'

export type CityItemType = {
  code: string
  name: string
}

export function getHotCities() {
  return request.Get('/city/hotCities').send(true) as Promise<CityItemType[]>
}
