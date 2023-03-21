import request from '@/utils/request'

export function channelList(query) {
  return request({
    url: '/channel/channel_list',
    method: 'get',
    params: query
  })
}

export function channelDelete(query) {
  return request({
    url: '/channel/channel_delete',
    method: 'get',
    params: query
  })
}

export function channelCreate(data) {
  return request({
    url: '/channel/channel_create',
    method: 'post',
    data
  })
}

export function channelJoin(data) {
  return request({
    url: '/channel/channel_join',
    method: 'post',
    data
  })
}

export function channelInstallCC(data) {
  return request({
    url: '/channel/channel_installCC',
    method: 'post',
    data
  })
}

export function channelInitCC(data) {
  return request({
    url: '/channel/channel_initCC',
    method: 'post',
    data
  })
}

export function channelMy(data) {
  return request({
    url: '/channel/channel_my',
    method: 'post',
    data
  })
}

// 合约部分
export function contentList(query) {
  return request({
    url: '/channel/content_list',
    method: 'get',
    params: query
  })
}

// 服务使用部分-图表
export function MapData(query) {
  return request({
    url: '/channel/content/dhtdashboard/baidu_map',
    method: 'get',
    params: query
  })
}

export function serviceNumStat(query) {
  return request({
    url: '/channel/content/dhtdashboard/service_num',
    method: 'get',
    params: query
  })
}

export function temperatureData(query) {
  return request({
    url: '/channel/content/dhtdashboard/dht_get',
    method: 'get',
    params: query
  })
}

export function carData(query) {
  return request({
    url: '/channel/content/cardata_get',
    method: 'get',
    params: query
  })
}

export function panelGroupData2(query) {
  return request({
    url: '/channel/content/dhtdashboard/panel_group_data2',
    method: 'get',
    params: query
  })
}

export function dhtData(query) {
  return request({
    url: '/channel/content/dhtdashboard/dhtdata_get',
    method: 'get',
    params: query
  })
}

export function dhtsettingAdd(data) {
  return request({
    url: '/channel/content/dhtdashboard/dhtsetting',
    method: 'post',
    data
  })
}

export function mapData1(query) {
  return request({
    url: '/channel/content/dhtdashboard/mapdata1_get',
    method: 'get',
    params: query
  })
}

export function mapData2(query) {
  return request({
    url: '/channel/content/dhtdashboard/mapdata2_get',
    method: 'get',
    params: query
  })
}
