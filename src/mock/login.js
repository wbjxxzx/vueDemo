import { param2Obj } from '@/utils'

const usermap = {
  admin: {
    token: 'admin',
    introduction: '我是超级管理员',
    name: 'Super Admin',
    pass: 'e10adc3949ba59abbe56e057f20f883e',
    roles: ['admin']
  },
  developer: {
    token: 'developer',
    introduction: '我是开发',
    name: '工程师小王',
    pass: 'e10adc3949ba59abbe56e057f20f883e',
    roles: ['/system', '/system/permit', '/system/permit/account']
  }
}

export default {
  loginByUsername: config => {
    const { username, password } = JSON.parse(config.body)
    console.log('loginByUsername username, password: ', username, password)
    if(username === 'admin'){
      if(usermap[username].pass === password){
      return usermap['admin']
      }else{
        return []
      }
    }
    return usermap[username]
  },
  getUserInfo: config => {
    console.log('getUserInfo config: ', config)
    const { token } = param2Obj(config.url)
    let tok = false
    for(let key in usermap){
      if(token.indexOf(usermap[key].token) !== -1){
        tok = usermap[key]
        break;
      }
    }
    return tok

  },
  logout: () => 'success'
}