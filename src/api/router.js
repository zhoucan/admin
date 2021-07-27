import request from '@/utils/request'

export function getRouterList() {
  return request({
    url: 'auth/AdminAuthentication/GetAuthMenus',
    method: 'get',
  })
}

export function FindMenusAsTreeCte() {
  return request({
    url: 'auth/MenuApp/FindMenusAsTreeCte',
    method: 'post',
  })
}
