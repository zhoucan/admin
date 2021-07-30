import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/auth/UserApp/GetUserList',
    method: 'get',
    params,
  })
}

export function doEdit(data) {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}

export function FreeezeUser(data) {
  return request({
    url: `/auth/UserApp/FreeezeUser?id=${data}`,
    method: 'put',
  })
}
export function ResumeUser(data) {
  return request({
    url: `/auth/UserApp/ResumeUser?id=${data}`,
    method: 'put',
  })
}

