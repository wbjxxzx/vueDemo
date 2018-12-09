<template>
  <div class="login-container">
    <el-form :model="ruleForm2"
             :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  placeholder="用户名">
          <template slot="prepend">
            <span class="fa fa-user fa-lg"
                  style="width: 13px"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="pwdType"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="密码"
                  @input="hanldeEnterPass"
                  @keyup.enter.native="handleSubmit">
          <template slot="prepend">
            <span class="fa fa-lock fa-lg"
                  style="width: 13px"></span>
          </template>
          <template slot="suffix">
            <span class="password-eye"
                  @click="showPassword"
                  :class="eyeType"
                  style=""></span>
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="rememberme"
                   class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   :disabled="isNotValidBrowser"
                   @click="handleSubmit"
                   :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'Login',
  created(){
    if(! window.Promise){
      this.isNotValidBrowser = true
      window.alert('浏览器版本过低，无法登陆，建议使用最新版谷歌')
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: '',
        password: '',
      },
      rules2: {
        username: [{ required: true, message: 'please enter your account', trigger: 'blur' }],
        password: [{ required: true, message: 'enter your password', trigger: 'blur' }]
      },
      rememberme: false,
      pwdType: 'password',
      eyeType: 'fa fa-eye-slash fa-lg',
      hidePassword: '',
      isNotValidBrowser: false,
      redirect: undefined,
    }
  },
  methods: {
    showPassword() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eyeType = 'fa fa-eye fa-lg'
      } else {
        this.pwdType = 'password'
        this.eyeType = 'fa fa-eye-slash fa-lg'
      }
    },
    handleSubmit(event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          // 触发 vuex 中 LoginByUsername 事件
          const username = this.ruleForm2.username
          let password = md5(this.ruleForm2.password)
          if(this.hidePassword !== '' && this.ruleForm2.password === '********'){
            password = this.hidePassword
          }
          this.$store.dispatch('LoginByUsername', {'username': username, 'password': password})
            .then(() => {
              this.logining = false
              if(this.rememberme){
                this.setCookie(this.ruleForm2.username, password, 7)
              }else{
                this.clearCookie()
              }
              // 重定向到首页
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(err => {
              this.logining = false
              this.$alert(err, {
                type: 'warning',
                confirmButtonText: 'ok'
              })
            })
        } else {
          console.log('error submit!');
          return false;
        }
      })
    },
    
    hanldeEnterPass(){
      this.hidePassword = ''
    },
    setCookie(name, pass, days){
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    clearCookie(){
      this.setCookie('', '', -1)
    },
    getCookie(){
      if(document.cookie.length){
        let arr = document.cookie.split('; ')
        for(let i=0; i<arr.length; i++){
          let arr2 = arr[i].split('=')
          if(arr2[0] === 'C-username'){
            this.ruleForm2.username = arr2[1]
          }else if(arr2[0] === 'C-password'){
            this.ruleForm2.password = '********'
            this.hidePassword = arr2[1]
            this.rememberme = true
          }
        }
      }
    },
    deleteCookie(){
      this.setCookie('', '', -1)
    }
  },
  mounted(){
    this.getCookie()
  }
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .password-eye {
    position: absolute;
    right: 20px;
    top: 11px;
    cursor: pointer;
  }
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>