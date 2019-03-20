<template>
<div class="navbar-font">
  <!-- 默认激活首页 -->
    <el-menu :default-active="defaultActive"
             class="el-menu-demo"
             mode="horizontal"
             router
             @select="handleSelect"
             active-text-color="#409EFF"
            >
      <template v-for="item in topLevelRoutes">
        <el-menu-item v-if="item.children && item.children.length"
          :key="item.path"
          :index="item.path">
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
</div>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: {
    topLevelRoutes: {
      type: Array
    }
  },
  data() {
    return {
      activeSidebar: []
    }
  },
  computed: {
    // 默认激活的路由, 用来激活菜单选中状态
    defaultActive: function(){
      let pathname = this.$route.path
      pathname = pathname.substring(1)
      pathname = pathname.substring(0, pathname.indexOf('/'))
      return  '/' + pathname
    },
  },
  methods: {
    handleSelect: function(key, keyPath) {
      let to = this.topLevelRoutes.filter(el => {
        return el.path === key
      })[0]
      console.log('navbar changed, call GenSidebarRoutes: ', to)
      this.$store.dispatch('GenSidebarRoutes', to)
      console.log(key, keyPath)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-font {
  font-size: 1.5em;
  font-weight: 900;
}
</style>
