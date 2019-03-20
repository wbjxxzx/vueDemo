import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/TheLogin'
import Page404 from '@/views/404'
import Container from '@/containers/Container'
import Dashboard from '@/views/dashboard'

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
    redirect: '/dashboard',
    component: Container,
    name: '首页',
    hidden: false,
    meta: { title: '首页', icon: '', noCache: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '首页', icon: 'fa fa-dashboard fa-lg', noCache: true }
      },
      {
        path: 'dashboard2', 
        name: '首页2', 
        component: Dashboard,
        children: [
          {path: 'dashboard21', name: '首页21', component: Dashboard,},
          {path: 'dashboard22', name: '首页22', component: Dashboard, },
        ] },
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

