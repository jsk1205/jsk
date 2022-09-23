<template>
  <div class="wrapper">
    <!-- 页头 -->
    <div class="header">
      <div class="logo">等离子体层密度数据库系统</div>
      <!-- 水平菜单 -->
      <div style="float: left">
        <!-- active-text-color="#3989fa" -->
        <el-menu
          mode="horizontal"
          text-color="#000000"
          :default-active="toIndex"
          @select="handleSelect"
        >
          <template v-for="(item, index) in itemList">
            <template v-if="item.children">
              <el-submenu :key="index" :index="item.path">
                <template slot="title">{{ item.title }}</template>
                <template v-for="(items, indexs) in item.children">
                  <el-menu-item :index="items.path" :key="indexs">{{
                    items.title
                  }}</el-menu-item>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.path" :key="index">
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="" alt="" />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ username }} <i class="el-icon-caret-bottom"></i
            ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>修改密码</el-dropdown-item>
              <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <TagsView> </TagsView>
    <!-- 页面左侧二级菜单栏，主体内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
import TagsView from "./TagsView/index.vue";
export default {
  name: "home",
  components: {
    TagsView,
  },
  data() {
    return {
      itemList: [
        // 水平一级菜单栏的菜单
        { path: "home", title: "首页" },
        { path: "dataCollect", title: "数据收集" },
        { path: "dataSort", title: "数据整理" },
        { path: "dataRetrieval", title: "数据检索" },
        {
          path: "disSub",
          title: "显示分系统",
          children: [
            { path: "disSubDisMess", title: "统计信息" },
            { path: "disSubSysMess", title: "系统信息" },
          ],
        },
        {
          path: "system",
          title: "系统管理",
          children: [
            { path: "systemMana", title: "数据管理" },
            { path: "systemLogin", title: "登陆日志" },
            { path: "systemUser", title: "用户管理" },
            { path: "systemRole", title: "角色管理" },
            { path: "systemMenu", title: "菜单管理" },
          ],
        },
      ],
    };
  },
  computed: {
    username() {
      return localStorage.getItem("ms_username") || "";
    },
    toIndex() {
      // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
      return "/" + this.$route.path.split("/")[1];
    },
  },
  created() {},
  methods: {
    handleCommand(command) {
      // 用户名下拉菜单选择事件
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push({
          path: "/Login",
        });
      }
    },
    handleSelect(key, keyPath) {
      let index = keyPath[0];
      this.$router.push({
        path: keyPath.length > 1 ? index + key : index,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0 !important;
  border-radius: 4px;
}
.wrapper {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  background-color: #288ce2;
  .logo {
    float: left;
    // margin-left: 60px;
    margin-top: 17.5px;
    height: 29px;
    // width: 160px;
    vertical-align: middle;
    color: #fff;
  }

  /* --------------- 用户头像区域的样式 ---------------- */
  .header-right {
    float: right;
    padding-right: 50px;
    .header-user-con {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      .user-avator {
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
    .user-name {
      margin-left: 10px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
  /* --------------- 水平一级菜单栏的样式--------------------- */
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
    float: left;
    margin-left: 50px;
    background: transparent;
    .el-menu-item {
      color: #fff !important;
    }
    ::v-deep .el-submenu__title {
      color: #fff !important;
      background: #288ce2 !important;
      i {
        color: #fff !important;
      }
    }
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    font-weight: bold;
    background: #396db0;
    color: none;
  }
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
    background: #396db0;
  }
  .el-menu--horizontal > .el-menu-item {
    font-size: 14px;
    margin: 0 15px;
  }
}
</style>