import request from '@/utils/request'



export function GetCoinAllTypeList() {
  return request({
    url: `/wallet/MisWallet/GetCoinAllTypeList`,
    method: 'get',
  })
}


export function GetPowerProfit() {
  return request({
    url: `/mall/MallMis/GetPowerProfit`,
    method: 'get',
  })
}

export function SetUpPowerProfit(data) {
  return request({
    url: `/mall/MallMis/SetUpPowerProfit`,
    method: 'post',
    data
  })
}

export function AddPowerProfit(data) {
  return request({
    url: `/mall/MallMis/AddPowerProfit`,
    method: 'post',
    data
  })
}

export function GetMisGoods(params) {
  return request({
    url: `/mall/MallMis/GetMisGoods`,
    method: 'get',
    params
  })
}
export function GetMisGoodsInfo(params) {
  return request({
    url: `/mall/MallMis/GetMisGoodsInfo/${params}`,
    method: 'get',
   
  })
}
export function GetGiveGoodsList(params) {
  return request({
    url: `/mall/MallMis/GetGiveGoodsList/${params}`,
    method: 'get',
   
  })
}

export function GetCoinTypeList() {
  return request({
    url: `/wallet/MisWallet/GetCoinTypeList`,
    method: 'get',
  })
}

export function UpdateGoods(data) {
  return request({
    url: `/mall/MallMis/UpdateGoods`,
    method: 'put',
    data
  })
}

export function AddGoods(data) {
  return request({
    url: `/mall/MallMis/AddGoods`,
    method: 'post',
    data
  })
}





