import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/TheLogin'
import SidebarMenu from '@/views/SidebarMenu'
import Container from '@/containers/Container'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'SidebarMenu',
      iconCls: 'el-icon-menu',
      component: Container,
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
