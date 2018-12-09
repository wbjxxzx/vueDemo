import Container from '@/containers/Container'
/**
 * 系统管理相关路由
 */
const systemRouter = {
  path: '/system',
  component: Container,
  redirect: '/system/permit/account',
  name: '系统管理',
  meta: {
    title: '系统管理',
    roles: ['/system']
  },
  children: [
    {
      path: 'permit',
      name: '权限管理',
      hidden: false, 
      redirect: '/system/permit/account',
      component: () => import('@/views/system/permit'),
      meta: { 
        title: '权限管理', 
        icon: 'fa fa-cog fa-lg',
        roles: ['/system/permit']  
      },
      children: [
        { path: 'account', name: '用户', 
          component: () => import('@/views/system/permit/account'), 
          meta: { title: '用户', icon: 'form', roles: ['/system/permit/account'] } 
        },
        { path: 'accountgroup', name: '用户组',  
          component: () => import('@/views/system/permit/accountgroup'), 
          meta: { title: '用户组', icon: 'form', roles: ['/system/permit/accountgroup'] } 
        },
        { path: 'role', name: '角色', 
          component: () => import('@/views/system/permit/role'),
           meta: { title: '角色', icon: 'form', roles: ['/system/permit/role'] } 
        },
        { path: 'authorize', name: '授权', 
          component: () => import('@/views/system/permit/authorize'),
           meta: { title: '授权', icon: 'form', roles: ['/system/permit/authorize'] } 
        },
      ]
    },
        
  ],
}

export default systemRouter