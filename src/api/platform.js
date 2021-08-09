import request from '@/utils/request'


export function GetBaseInfo() {
    return request({
      url: '/mall/Dashboard/GetBaseInfo',
      method: 'get',
    })
  }
export function GetAssetInfo() {
    return request({
      url: '/wallet/MisWallet/GetAssetInfo',
      method: 'get',
    })
  }
  export function GetReport(params) {
    return request({
      url: '/wallet/MisWallet/GetReport',
      method: 'get',
      params
    })
  }

  