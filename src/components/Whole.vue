<template>
  <div class="wrapper">
    <!-- 页头 -->
    <div class="header">
      <div class="logo">后台管理系统</div>
      <!-- 水平菜单 -->
      <div style="float: left">
        <el-menu
          mode="horizontal"
          text-color="#000000"
          active-text-color="#3989fa"
          :default-active="toIndex"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, index) in itemList"
            :index="item.path"
            :key="index"
          >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="uesr-avator">
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
    <!-- 页面左侧二级菜单栏，主体内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      itemList: [
        // 水平一级菜单栏的菜单
        { path: "/Home", title: "首页" },
        { path: "/FormGenerator", title: "Form Generator" },
        { path: "/EchartsTable", title: "Echarts图表" },
        { path: "/EchartsRela", title: "Echarts关系" },
        { path: "/ThreeMode", title: "Three建模" },
        { path: "/permission", title: "管理员权限" },
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
    handleSelect(path) {
      this.$router.push({
        path: path,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
  background-color: #b3c0d1;
  color: #333;
  .logo {
    float: left;
    margin-left: 60px;
    margin-top: 17.5px;
    height: 29px;
    width: 160px;
    vertical-align: middle;
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
        margin-left: 20px;
      }
      .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    /* border-bottom: 2px solid #3989fa;
  color: #3989fa; */
    font-weight: bold;
  }
  .el-menu--horizontal > .el-menu-item {
    font-size: 16px;
    margin: 0 15px;
  }
}
</style>