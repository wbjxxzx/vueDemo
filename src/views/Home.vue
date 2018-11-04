<template>
  <el-container>
    <el-header>
      <el-col :span="24">
        <el-col :span="10"
                class="logo"
                :class="collapsed ? 'logo-collapsed' : 'logo-width'">
          {{ collapsed ? '' : logoname }}
        </el-col>
        <el-col :span="10">
          <div class="collapse"
               @click.prevent="collapseFunc">
            <i class="el-icon-d-arrow-left"></i>
          </div>
        </el-col>
        <el-col :span="4"
                class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">
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
        </el-col>
      </el-col>
    </el-header>
    <el-container>

      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      collapsed: false,
      logoname: 'VUEDEMO'
    }
  },
  methods: {
    collapseFunc: function () {
      this.collapsed = !this.collapsed;
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        })
        .catch(() => { });
    }
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  }
}
</script>

<style scoped lang="scss">
body > .el-container {
  margin-bottom: 10px;
}

.el-header {
  height: 60px;
  line-height: 60px;
  background: #444444;
  color: #fff;
  padding: 0px;
  border-bottom: {
    width: 1px;
    color: #fff;
    style: solid;
  }
  .logo {
    height: 60px;
    font-size: 30px;
    padding: {
      left: 15px;
      right: 15px;
    }
    border: {
      color: #fff;
      right: {
        width: 1px;
        style: solid;
      }
    }
  }
  .logo-width {
    width: 230px;
  }
  .logo-collapsed {
    width: 60px;
  }
  .collapse {
    padding: 0 25px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    &-inner {
      cursor: pointer;
      color: #fff;
    }
  }
}

.el-aside {
  background: rgb(240,240,240);
  .collapsed {
    width: 60px;
    .item {
      position: relative;
    }
  }
  .menu-collapsed {
    width: 60px;
    flex: 0 0 60px;
  }
  .menu-expanded {
    width: 230px;
    flex: 0 0 230px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
