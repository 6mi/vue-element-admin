import Layout from '@/layout'

const SysConfig = {
  path: '/sysconfig',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: 'sysConfig',
    icon: 'system'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/sys-config/menu/menu.vue'),
      name: 'Menu',
      meta: { title: 'menuConfig', icon: 'menu' }
    },
    {
      path: 'icon',
      component: () => import('@/views/svg-icons/index'),
      name: 'Icons',
      meta: { title: 'icons', icon: 'icon' }
    }
  ]
}
export default SysConfig
