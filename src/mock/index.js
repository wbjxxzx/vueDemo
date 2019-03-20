import Mock from 'mockjs'
import login from './login'
import permit from './system'

// 登录相关
Mock.mock(/\/api\/auth\/api-token-auth/, 'post', login.loginByUsername)
Mock.mock(/\/api\/auth\/logout/, 'post', login.logout)
Mock.mock(/\/api\/userinfo/, 'get', login.getUserInfo)

// 系统相关
Mock.mock(/\/api\/permit\/role/, 'get', permit.roleList)
Mock.mock(/\/api\/permit\/role\/\d+/, 'post', permit.createRole)
Mock.mock(/\/api\/permit\/role\/\d+/, 'patch', permit.updateRole)
Mock.mock(/\/api\/permit\/role\/\d+/, 'delete', permit.deleteRole)

export default Mock