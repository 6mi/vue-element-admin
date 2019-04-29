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

export function delMenu(id) {
  return request({
    url: '/api/sysconfig/delmenu',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function GetAllMenuList(data) {
  return request({
    url: '/api/sysconfig/GetAllMenuList',
    method: 'post',
    data
  })
}

export function getMenuBtnList(menuId) {
  return request({
    url: '/api/sysconfig/getMenuBtnList',
    method: 'get',
    params: {
      menuId: menuId
    }
  })
}

export function editMenuBtn(data) {
  return request({
    url: '/api/sysconfig/editmenubtn',
    method: 'post',
    data
  })
}

export function delMenuBtn(id) {
  return request({
    url: '/api/sysconfig/delmenubtn',
    method: 'delete',
    params: {
      id: id
    }
  })
}
