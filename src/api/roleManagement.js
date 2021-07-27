import request from '@/utils/request'

export function getList() {
  return request({
    url: 'auth/RoleApp/GetRoles',
    method: 'get',
  })
}

export function doEdit(data) {
  return request({
    url: '/auth/RoleApp/UpdateRole',
    method: 'put',
    data,
  })
}
export function doAddRole(data) {
  return request({
    url: '/auth/RoleApp/AddRole',
    method: 'post',
    data,
  })
}

export function doGetRoleMenus(params) {
  return request({
    url: '/auth/RoleApp/GetRoleMenus',
    method: 'get',
    params,
  })
}

export function doDelete(data) {
  return request({
    url: '/roleManagement/doDelete',
    method: 'post',
    data,
  })
}

export function doAuthMenus(data) {
  return request({
    url: '/auth/MenuApp/AuthMenus',
    method: 'post',
    data,
  })
}
