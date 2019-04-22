import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/api/sysconfig/GetPermissions',
    method: 'get'
  })
}
