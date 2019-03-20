import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过 meta.role 判断是否与当前用户权限匹配
 */
function hasRoles (roles, route){
  if(route.meta && route.meta.roles){
    return roles.some(role => route.meta.roles.includes(role))
  }else{
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, roles){
  const accessedRouters = asyncRouterMap.filter(route => {
    // 404
    if(route.path === '*'){
      return true 
    }else if(hasRoles(roles, route)){
      if(route.children && route.children.length){
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 在有权限的路由表里，查找是否有到目标path的路由
// 为了保持路由唯一性，拼接父子路由
function hasDestRoute (froute, permitRouterMap, to) {
  let r = froute === '/' ? '' : froute
  return permitRouterMap.some(route => {
    let path = r + '/' + route.path
    if (to.path.indexOf(path) !== -1) {
      return true;
    }
    if (route.children && route.children.length) { //如果有孩子就遍历孩子
      return hasDestRoute(path, route.children, to)
    }
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    sidebar_routers: {},
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers,
      state.routers = constantRouterMap.concat(routers)
    },
    SET_NOW_ROUTERS: (state, to) => {
      console.log('in SET_NOW_ROUTERS')
      // 由于首页重定向到 /dashboard，并且不参与权限控制，特殊处理
      if(to.path === '/dashboard'){
        let dashboard = state.routers.filter(v => v.path === '/' )
        state.sidebar_routers = dashboard[0]
      }else{
          // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给 sidebar_routers
          state.addRouters.forEach(e => {
          if (e.children && e.children.length) {
              if ( hasDestRoute(e.path, e.children, to)){
                  if(state.sidebar_routers.path){
                      // 存在 sidebar_routers 且与目标路由不同
                      if(state.sidebar_routers.path !== e.path){
                          state.sidebar_routers = e;
                      }
                  }else{
                      state.sidebar_routers = e;
                  }
              }
          }
          })
      }
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      console.log('in GenerateRoutes')
      return new Promise(resolve => {
        const {roles} = data
        let accessedRouters
        if(roles.includes('admin')){
          accessedRouters = asyncRouterMap
        }else{
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GenSidebarRoutes({commit}, data) {
      console.log('in GenSidebarRoutes')
      return new Promise(resolve => {
        commit('SET_NOW_ROUTERS', data)
        resolve()
      })
    }
  }
}

export default permission