import request from '@/utils/request'

export function loginByUsernameApi(username, password){
  return request({
    url: '/api/auth/api-token-auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfoApi(token){
  return request({
    url: '/api/userinfo',
    method: 'get',
    params: {token}
  })
}

export function logoutApi(){
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}