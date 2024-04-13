import request from '@/utils/request'

export type CityItemType = {
  code: number
  name: string
}

export function getHotCitiesApi() {
  return request
    .Get(
      '/city/hotCities',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<CityItemType[]>
}
