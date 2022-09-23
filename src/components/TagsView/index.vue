<template>
  <div class="tags">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in levelList"
        :key="index"
      >
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    isIndex (route) {
      const redirect = route && route.redirect
      if (!redirect) {
        return false
      }
      return redirect === '/index'
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isIndex(first)) {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
        this.levelList = matched
      } else {
        this.levelList = [{ path: '/index', meta: { title: '首页' } }]
      }
      //如果不是首页
      // if (!this.isHome(matched[0])) {
      //   matched = [{ path: "/Home", meta: { title: "首页" } }].concat(matched);
      // }
      this.breadList = matched;
      console.log(this.breadList, "matched");
    },
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 30px;
}
</style>