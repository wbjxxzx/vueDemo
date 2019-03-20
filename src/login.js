import router from './router'
import NProgress from 'nprogress'
import {clearRequest} from '@/utils/request'
import axios from 'axios'
import store from './store'

function hasPermission(roles, permissionRoles){
  if(roles.indexOf('admin') >= 0){
    return true  // admin 权限  直接通过
  }
  // 没有配置权限的菜单直接进入
  if(! permissionRoles){
    return true
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', ]   // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log('to.path: ' + to.path)
  console.log('store.getters.token: ' + store.getters.token)
  // 切换路由时清空上个路由未完成的所有请求
  const cancelToken = axios.CancelToken
  clearRequest.source.cancel && clearRequest.source.cancel()
  clearRequest.source = cancelToken.source()

  if(whiteList.indexOf(to.path) !== -1){
    next()
  }else{
    if(store.getters.token){
      if(to.path === '/login'){
        next({path: '/'})
        NProgress.done()
      }else{
        // 拉取用户信息
        if(store.getters.roles.length === 0){
          store.dispatch('GetUserInfo')
          .then(resp => {
            const roles = resp.data.roles
            console.log('roles: ', roles)
            // 根据权限生成可访问的路由表
            store.dispatch('GenerateRoutes', {roles})
            .then(() => {
              // 动态添加路由表
              router.addRoutes(store.getters.addRouters)
              next({...to, replace: true})  // 确保 addRouters 已完成
            })
          })
          .catch(err => {
            store.dispatch('FedLogOut')
            .then(() => {
              console.log('认证失败，请重新登陆')
              next({path: '/login'})
            })
          })
        }else{
          console.log('call GenSidebarRoutes')
          store.dispatch('GenSidebarRoutes', to)
          .then(() => {
            if(hasPermission(store.getters.roles, to.meta.role)){
              next()
            }else{
              next({path: '/', query: {noGoBack: true}})
            }
          })
        }
      }
    }else{
      // 重定向到 /login
      next({path: '/login', query: {redirect: to.fullpath}})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})