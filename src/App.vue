<template>
  <div class="app">
    <Header />
    <!-- 一级路由显示在此处  -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from './components/Header'
import Footer from './components/Footer';
// import {reqBaseCategoryList} from "@/api";
  export default {
    name:'App',
     async mounted(){
    //   const result=await reqBaseCategoryList()
    //   console.log('result',result)
    //   //此时出现404-->未指定前面的基础路径-->数据代理来解决
    //触发vuex的getBaseCategoryList,actions调用-->切换路由时不会在执行
     this.$store.dispatch('getBaseCategoryList')
    },
    components:{
      Header,
      Footer
    }
  }
</script>

<style lang="less" scoped>

 
</style>

