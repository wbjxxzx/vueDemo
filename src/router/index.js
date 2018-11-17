import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/TheLogin'
import SidebarMenu from '@/views/SidebarMenu'
import Container from '@/containers/Container'
import Dashboard from '@/views/dashboard'
import Article from '@/views/article'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: '主页',
      component: Container,
      children: [
        {
          path: 'dashboard',
          name: '首页',
          component: Dashboard,
        },
        {
          path: 'article',
          name: '文章',
          component: Article,
        },
      ]
    },
  ]
})
