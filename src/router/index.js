import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
},
{
  path: '/app',
  redirect: '/app/app_list',
  component: Layout,
  name: '网络管理',
  meta: {
    title: '网络管理',
    icon: 'user'
  },
  children: [{
    path: 'app_list',
    component: () => import('@/views/app/app_list'),
    name: '网络配置',
    meta: {
      title: '网络配置',
      icon: 'user',
      affix: false
    }
  },
  {
    path: 'app_create',
    component: () => import('@/views/app/app'),
    name: 'Createapp',
    meta: {
      title: '重新配置网络',
      icon: 'edit'
    },
    hidden: true
  },
  {
    path: 'app_add',
    component: () => import('@/views/app/app_add'),
    name: 'AppAdd',
    meta: {
      title: '添加新的节点',
      icon: 'edit'
    },
    hidden: true
  },
  {
    path: 'app_prove',
    component: () => import('@/views/app/app2'),
    name: 'Proveapp',
    meta: {
      title: '日志信息',
      icon: 'edit'
    },
    hidden: true
  }
  ]
},

// --------channel--------//

{
  path: '/channel',
  component: Layout,
  redirect: '/channel/list',
  name: '通道管理',
  meta: {
    title: '通道管理',
    icon: 'component'
  },
  children: [{
    path: 'list',
    component: () => import('@/views/channel/list'),
    name: '通道列表',
    meta: {
      title: '通道列表',
      icon: 'component',
      affix: true
    }
  },
  {
    path: 'channel_create',
    component: () => import('@/views/channel/channelcreate'),
    name: '创建通道',
    meta: {
      title: '创建通道',
      icon: 'component',
      affix: false
    },
    hidden: true
  },
  {
    path: 'channel_join',
    component: () => import('@/views/channel/channeljoin'),
    name: '加入通道',
    meta: {
      title: '加入通道',
      icon: 'component',
      affix: false
    },
    hidden: true
  },
  {
    path: 'channel_installCC',
    component: () => import('@/views/channel/channelinstallCC'),
    name: '安装链码',
    meta: {
      title: '安装链码',
      icon: 'component',
      affix: false
    },
    hidden: true
  },
  {
    path: 'channel_initCC',
    component: () => import('@/views/channel/channelinitCC'),
    name: 'init链码',
    meta: {
      title: 'init链码',
      icon: 'component',
      affix: false
    },
    hidden: true
  },
  {
    path: 'channel_my',
    component: () => import('@/views/channel/channelmy'),
    name: '我的通道',
    meta: {
      title: '我的通道',
      icon: 'component',
      affix: false
    }
  },
  {
    path: 'content_list',
    component: () => import('@/views/channel/content'),
    name: '合约服务列表',
    meta: {
      title: '合约服务列表',
      icon: 'component',
      affix: false
    }
  },
  {
    path: 'dhtdashboard',
    component: () => import('@/views/dhtdashboard/index'),
    name: '图表展示',
    meta: {
      title: '图表展示',
      icon: 'dashboard',
      affix: true
    },
    hidden: true
  },
  {
    path: 'dhtdate',
    component: () => import('@/views/dhtdate/index'),
    name: '数据展示',
    meta: {
      title: 'Dhtdate',
      icon: 'dashboard',
      affix: true
    },
    hidden: true
  },
  {
    path: '/channel/content/dhtdashboard/dht_setting',
    component: () => import('@/views/dhtdashboard/dhtsetting'),
    name: 'Createapp',
    meta: {
      title: '采样设置',
      icon: 'edit'
    },
    hidden: true
  },

  {
    path: 'cardata',
    component: () => import('@/views/cardata/index'),
    name: 'car数据展示',
    meta: {
      title: 'Cardata',
      icon: 'dashboard',
      affix: true
    },
    hidden: true
  }]
}]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require channel support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
