import request, { alovaInstance } from '@/utils/request'
import type { GraphData } from '@antv/g6'

/**
 * 获取首页轮播图
 * 类型 待补充
 */
export function getHomeBannerApi() {
  return request
    .Get(
      'home/banner',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}

/**
 * 获取热门搜索关键字
 * 类型 待补充
 */
export function getHotSearchApi() {
  return request
    .Get(
      'job/hotSearch',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<string[]>
}

/**
 * 获取首页推荐职位
 * 类型 待补充
 */
export function getHomeRecommendApi() {
  // return request
  //   .Get(
  //     'job/recommend',
  //     // @ts-ignore
  //     { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  //   )
  //   .send(true) as Promise<any>
  return alovaInstance.Get('https://dev.usemock.com/65ca29236309cc7a37766f77/job/recommend').send(true) as Promise<any>
}

/**
 * 获取首页最新职位
 * 类型 待补充
 */
export function getHomeNewJobsApi() {
  return request
    .Get(
      'job/newJobs',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}

/**
 * 获取首页附近职位
 * 类型 待补充
 */
export function getHomeNearbyJobsApi() {
  // return request
  //   .Get(
  //     'job/nearbyJobs',
  //     // @ts-ignore
  //     { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  //   )
  //   .send(true) as Promise<any>
  return alovaInstance
    .Get('https://dev.usemock.com/65ca29236309cc7a37766f77/job/nearbyJobs')
    .send(true) as Promise<GraphData>
}

/**
 * 获取首页知识图谱
 * 类型 待补充
 */
export function getHomeKnowledgeGraphApi() {
  // return request
  //   .Get(
  //     '/job/home/knowledgeGraph',
  //     // @ts-ignore
  //     { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  //   )
  //   .send(true) as Promise<GraphData>
  return alovaInstance
    .Get('https://dev.usemock.com/65ca29236309cc7a37766f77/job/knowledgeGraph')
    .send(true) as Promise<GraphData>
}
