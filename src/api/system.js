import request from '@/utils/request'

export function getRoleListApi(query) {
  return request({
    url: '/api/permit/role/',
    method: 'get',
    params: query
  })
}

export function createRoleApi(data) {
  return request({
    url: '/api/permit/role/',
    method: 'post',
    data
  })
}


export function updateRoleApi(id, data) {
  return request({
    url: '/api/permit/role/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteRoleApi(id) {
  return request({
    url: '/api/permit/role/' + id + '/',
    method: 'delete',
  })
}
