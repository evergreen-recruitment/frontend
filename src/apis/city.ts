import request from '@/utils/request'

export type CityItemType = {
  code: string
  name: string
}

export function getHotCities() {
  return request
    .Get(
      '/city/hotCities',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<CityItemType[]>
}