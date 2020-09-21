<template>
  <div class="home">
    <!-- 商品分类 -->
   <TypeNav /> 
    <!--列表-->
    <list-container />
     <!-- 今日推荐 -->
     <TodayRecommend />
    <!-- 商品排行 -->
    <rank />
    <!-- 猜你喜欢 -->
    <like />
    <!--楼层-->
    <floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
    <!-- 楼层 -->
    <!-- <floor /> -->
    <!--商标-->
    <Rank />
  </div>
</template>

<script type="text/ecmascript-6">
import TodayRecommend from './today/TodayRecommend'
import ListContainer from './today/ListContainer'
import Like from "./today/Like"
import Floor from './today/Floor'
import Rank from './today/Rank'
import {mapState} from 'vuex'
export default {
  name: "Home",
  //触发添加mock接口请求数据到state中 调用vuex的异步action调用
  mounted(){
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  },
  computed:{
    ...mapState({
      floors:state=>state.home.floors
    })
  },
  components:{
    TodayRecommend,
    ListContainer,
    Like,
    Floor,
    Rank

    
  }
};
</script>

<style lang="less" scoped>
</style>
