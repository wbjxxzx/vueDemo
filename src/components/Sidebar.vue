<template>
  <div>
    <el-menu class="el-menu-vertical-demo"
          :default-active="defaultActive"
            router
            :collapse="collapse"
            >
      <SidebarItem v-for="(item, idx) in sidebar_routers.children"
        :subroute="item"
        :fatherpath="sidebar_routers.path"
        :barIdx="idx" :key="idx" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  naem: "Sidebar",
  components: {
    SidebarItem
  },
  props: {
    collapse: {
      type: Boolean
    },
    routes: {
      type: Object
    }
  },
  computed: {
    ...mapGetters([
      'sidebar_routers',
    ]),
     // 首次进入页面时展开当前页面所属的菜单
    defaultActive(){
      return this.$route.path
    },
  }
}
</script>

<style>

</style>
