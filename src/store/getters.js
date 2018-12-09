const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  sidebar_routers: state => state.permission.sidebar_routers,
}

export default getters