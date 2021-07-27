import request from '@/utils/request'

export function getTree(data) {
  return request({
    url: '/menuManagement/getTree',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/auth/MenuApp/UpdateMenu',
    method: 'put',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/menuManagement/doDelete',
    method: 'post',
    data,
  })
}

export function GetMenus() {
  return request({
    url: '/auth/MenuApp/GetMenus',
    method: 'get',
  })
}


