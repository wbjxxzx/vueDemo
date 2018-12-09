import { loginByUsernameApi, logoutApi, getUserInfoApi } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: ( state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登入
    LoginByUsername({commit}, userinfo){
      const username = userinfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsernameApi(username, userinfo.password)
        .then(resp => {
          const data = resp.data
          setToken(data.token)
          console.log('in LoginByUsername, setToken: ', data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户权限等
    GetUserInfo({commit, state}) {
      console.log('in GetUserInfo')
      return new Promise((resolve, reject) => {
        getUserInfoApi(state.token)
        .then(resp => {
          if(!resp.data){
            reject('error')
          }
          const data = resp.data
          if(data.roles && data.roles.length){
            commit('SET_ROLES', data.roles)
          }else {
            reject('getUserInfoApi: roles must be a non-null array!')
          }
          if(data.name){
            commit('SET_NAME', data.name)
          }
          if(data.avatar){
            commit('SET_AVATAR', data.avatar)
          }
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    LogOut({commit, state}){
      return new Promise((resolve, reject) => {
        logoutApi(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    // 前端登出
    FedLogOut({commit}){
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user