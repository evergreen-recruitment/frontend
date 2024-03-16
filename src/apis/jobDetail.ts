import request from '@/utils/request'

export function getJobDetail(jobId: number) {
  return request
    .Get(
      '/job/jobDetail',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true, params: { jobId } },
    )
    .send(true) as Promise<any>
}
