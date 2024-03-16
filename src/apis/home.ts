import request from '@/utils/request'
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
 * 获取首页分类
 * 类型 待补充
 */
export function getHomeCategoryApi() {
  return request
    .Get(
      'home/category',
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
      'home/hotSearch',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}

/**
 * 获取首页推荐职位
 * 类型 待补充
 */
export function getHomeRecommendApi() {
  return request
    .Get(
      'home/recommend',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}

/**
 * 获取首页最新职位
 * 类型 待补充
 */
export function getHomeNewJobsApi() {
  return request
    .Get(
      'home/newJobs',
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
  return request
    .Get(
      'home/nearbyJobs',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<any>
}

/**
 * 获取首页知识图谱
 * 类型 待补充
 */
export function getHomeKnowledgeGraphApi() {
  return request
    .Get(
      'home/knowledgeGraph',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<GraphData>
}
