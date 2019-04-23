import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/api/sysconfig/GetPermissions',
    method: 'get'
  })
}

export function getParentMenuList() {
  return request({
    url: '/api/sysconfig/getparentmenulist',
    method: 'get'
  })
}

export function submitMenu(data) {
  return request({
    url: '/api/sysconfig/submitmenu',
    method: 'post',
    data
  })
}

export function getMenuEntity(id) {
  return request({
    url: '/api/sysconfig/getmenuentity',
    method: 'get',
    params: {
      id: id
    }
  })
}
