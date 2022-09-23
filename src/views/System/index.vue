<template>
  <div>
    <!-- 一级菜单下所拥有的二级菜单 -->
    <!-- <el-aside>
      <SideMenu :itemList="itemList" />
    </el-aside> -->
    <!-- 以及二级菜单所对应的页面 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      itemList: [
        { path: "systemMana", title: "数据管理" },
        { path: "systemLogin", title: "登陆日志" },
        { path: "systemUser", title: "用户管理" },
        { path: "systemRole", title: "角色管理" },
        { path: "systemMenu", title: "菜单管理" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0 !important;
}
</style>