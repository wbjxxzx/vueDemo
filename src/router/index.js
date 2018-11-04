import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/TheLogin'
import SidebarMenu from '@/views/SidebarMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'SidebarMenu',
      iconCls: 'el-icon-menu',
      component: Home,
      children: [{
        path: '/menu',
        component: SidebarMenu,
        name: '菜单'
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
  ]
})
