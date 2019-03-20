<template>
  <div class="home-container">
    <el-row class="container">
      <el-col :span="24" class="header" >
        <el-col :span="4"
                class="logo"
                :class="collapsed ? 'logo-collapsed' : 'logo-width'">
          {{ collapsed ? '' : logoname }}
        </el-col>
        <el-col :span="2">
          <div class="collapse"
               @click.prevent="collapseFunc">
            <i v-show="! collapsed" class="el-icon-d-arrow-left"></i>
            <i v-show="collapsed" class="el-icon-d-arrow-right"></i>
          </div>
        </el-col>
        <el-col :span="12">
          <el-menu
            style="height: 64px"
            :default-active="activeIndex"
            class="el-menu-demo tab-page"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4"
                class="userinfo">
          <el-dropdown trigger="hover" :hide-on-click="false">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
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
      <el-col :span="24" class="main">
        <aside :class="collapsed ? 'aside-collapsed' : 'aside-expanded'">
          
          <!--导航菜单-->
          <el-menu default-active="1" 
            class="el-menu-vertical-demo" 
            unique-opened 
            router 
            v-show="!collapsed">
            <template v-for="(item, idx) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="idx + ''" v-if="!item.leaf">
                <el-menu-item v-for="child in item.children" 
                :index="child.path" 
                :key="child.path" 
                v-if="!child.children">
                  {{ child.name }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf && item.chidlren.length > 0"
                :index="item.chidlren[0].path">
                <i :class="item.iconCls"></i>{{item.children[0].name}}
              </el-menu-item>
            </template>
          </el-menu>
           <!--导航菜单折叠-->
           <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
            <li v-for="(item,index) in $router.options.routes" 
              v-if="!item.hidden" class="el-submenu item">
              <template v-if="!item.leaf">
                <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                  <i :class="item.iconCls"></i>
                </div>
                <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                  <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;height: 56px;line-height: 56px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                </ul>
              </template>
              <template v-else>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" 
                  style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" 
                  :class="$route.path==item.children[0].path?'is-active':''" 
                  @click="$router.push(item.children[0].path)">
                  <i :class="item.iconCls"></i></div>
                </li>
              </template>
            </li>
          </ul>
          <el-menu default-active="2" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="collapsed">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </aside>
        <section class="content-container">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in"></transition>
              <router-view/>
          </el-col>
          
  
        </section>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      collapsed: false,
      logoname: 'VUEDEMO',
      activeIndex: '1',
      isCollapse: true
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
    },
    handleSelect(key, keyPath){
      console.log(key, keyPath);
    },
    showMenu(i, status){
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },
  
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #545c64;
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
      width: 64px;
    }
    .collapse {
      padding: 0 25px;
      width: 14px;
      height: 64px;
      line-height: 64px;
      cursor: pointer;
    }
    .userinfo {
      text-align: right;
      padding-right: 35px;
      color: #fff;
      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
      }
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      background: rgb(240,240,240);
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 64px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 64px;
          height: auto;
          z-index: 999;
          display: none;
        }
      }
    }
    .aside-collapsed {
      flex: 0 0 64px;
      width: 64px!important;
    }
    .aside-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      .breadcrumb-container {
        padding-left: 5px;
        background-color: #fff;
        color: #aaa;
        border: {
          bottom: 5px;
          color: rgb(240,240,240);
          style: solid;
        }
      }
      .content-wrapper {
        border: 1px solid rgb(240,240,240);
        padding: 20px;
        background: #fff;
        box-sizing: border-box;
      }
    }
  }
}

</style>
