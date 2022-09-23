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
        { path: "dataSortList", title: "数据检索" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>