import request from '@/utils/request'

export function panelGroupData(query) {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get',
    params: query
  })
}

export function serviceNumStat(query) {
  return request({
    url: '/dashboard/serviceNum_stat',
    method: 'get',
    params: query
  })
}

export function servicelineStat(query) {
  return request({
    url: '/dashboard/serviceline_stat',
    method: 'get',
    params: query
  })
}
