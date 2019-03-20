<template>

    <div class="right-menu">
      <label>{{ name }}</label>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarItem from './NavbarItem'

export default {
  name: 'Navbar',
  components: {
    NavbarItem
  },
  data() {
    return {
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'name',
      'avatar',
    ])
  },
  methods: {
    handleSelect: function(key, keyPath) {
      console.log(key, keyPath)
    },
    logout: function() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss">

</style>
