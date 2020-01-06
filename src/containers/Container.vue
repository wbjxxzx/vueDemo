<template>
  <div class="app">
    <el-container>
      <el-header class="app-header">
        <div class="app-header-logo"
          :class="isCollapse ? 'app-header-logo-collapsed' : 'app-header-logo-expanded'">
          <img src="@/assets/logo.png" height="60" width="66">
        </div>

        <div style="width: 60px; cursor: pointer;"
              @click.prevent="toggleSideBar">
          <transition name="hamburger">
            <span class="fa fa-bars fa-lg "
                  :class="isCollapse ? 'fa-rotate-90': 'fa-rotate-0'"></span>
          </transition>
        </div>

        <div style="width: 100%">
          <NavbarItem :topLevelRoutes='permission_routers' />
        </div>

        <div class="app-header-userinfo">
          <el-dropdown trigger="hover"
                        :hide-on-click="false">
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided
                                @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside class="app-side app-side-left"
                  :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
          <!-- <Sidebar :collapse="isCollapse" :routes="$router.options.routes[1].children"/> -->
          <Sidebar :collapse="isCollapse" :routes="sidebar_routers"/>
        </el-aside>

        <el-main class="app-body"
              :class="isCollapse ? 'app-body-collapsed' : 'app-body-expanded'">
          <template>
            <transition name="fade-transform" mode="out-in">
              <router-view/>
            </transition>
          </template>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar'
import NavbarItem from '@/components/NavbarItem'
export default {
  name: 'Container',
  components: {
    Sidebar,
    NavbarItem,
  },
  data() {
    return {
      username: '',
    }
  },
  computed: {
     ...mapGetters(['permission_routers', 'sidebar_routers', 'sidebar']),
     isCollapse(){
       return this.sidebar.opened
     }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
