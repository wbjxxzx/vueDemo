<template>
<el-dialog :visible.sync="dialogModifyRoleMenuVisible"
            title="角色分配菜单"
              width="40%">
    <el-tree
      ref="tree"
      accordion
      :data="data3"
      :props="props"
      show-checkbox
      >
    </el-tree>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogModifyRoleMenuVisible=false">确定</el-button>
      <el-button type="primary" @click="getCheckedNodes">确定</el-button>

    </span>
  </el-dialog>
</template>

<script>
import topicRouter from '@/router/modules/topic'
import systemRouter from '@/router/modules/system'

export default {
  name: 'DialogRoleMenu',
  props: {
    show: true,
  },
  data() {
      return {
        data3: [topicRouter, systemRouter],
        props: {
          children: 'children',
          label: 'name'
        },
        dialogModifyRoleMenuVisible: false,
      }
    },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    
  }
}
</script>

<style>

</style>
