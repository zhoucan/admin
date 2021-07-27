import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return await request({
    url: '/auth/AdminAuthentication/AuthLoginUser',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/AdminAuthentication/GetUserInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
