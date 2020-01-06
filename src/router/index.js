import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/TheLogin'
import Page404 from '@/views/404'
import Container from '@/containers/Container'
import Dashboard from '@/views/dashboard'
import Dashboard2 from '@/views/dashboard2'

/** router modules */
import systemRouter from './modules/system'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/login',
    hidden: true,
    component: Login
  },
  {
    path: '/404',
    hidden: true,
    component: Page404
  },
  {
    path: '/',
    component: Dashboard,
    name: '首页',
    hidden: false,
    meta: { title: '首页', icon: '', noCache: true },
  },
  {
    path: '/dashboard2',
    redirect: '/dashboard2/entry',
    component: Container,
    name: '首页2',
    hidden: false,
    meta: { title: '首页', icon: '', noCache: true },
    children: [
      {
        path: 'entry',
        name: 'Dashboard',
        component: Dashboard2,
        meta: { title: '首页', icon: 'fa fa-dashboard fa-lg', noCache: true }
      },
      {
        path: 'dashboard2',
        name: 'Dashboard2',
        component: Dashboard2,
        children: [
          {path: 'dashboard21', name: '首页21', component: Dashboard2,},
          {path: 'dashboard22', name: '首页22', component: Dashboard2, },
          {
            path: 'nested',
            name: '嵌套菜单',
            component: Dashboard2,
            children: [
              {path: '嵌套1', name: '嵌套1', component: Dashboard2,},
              {path: '嵌套2', name: '嵌套2', component: Dashboard2, },
            ]
          },
        ]
      },
    ]
  },
]

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** 其他的异步路由表 */
  systemRouter,
  { path: '*', redirect: '/404', hidden: true }
]

