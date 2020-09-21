<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script type="text/ecmascript-6">
// import Vue from "vue";
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    carouselList: Array //外部传入轮播数据
  },
  mounted() {
    //     // var mySwiper = new Swiper(".swiper-container", {//会匹配所有此类名元素
    //        var mySwiper = new Swiper(this.$refs.swiper, {
    //   //direction: "vertical", // 垂直切换选项
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination"
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   },
    //   // 如果需要滚动条
    //   scrollbar: {
    //     el: ".swiper-scrollbar"
    //   }
    // });//此时轮播失效
  },
  watch:{
    carouselList:{
      handler(){
        //只有数组中有数据才需要创建swiper对象
        if (this.carouselList.length===0) return
          this.$nextTick(() => {
          //必须在轮播界面显示之后创建
          var mySwiper = new Swiper(this.$refs.swiper, {
            //direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar"
            }
          });
        });
      },
    immediate: true //初始显示时就立即执行一次,默认为false,只有数据更新时才会立即执行
    }
  }
  // watch: {
    
  //   //利用监视来监测数据发生改变,界面更新即数据绑定
  //   //但界面还未更新,数据改变,同步调用监视的回调然后界面是'异步'更新
  //   carouselList() {
  //      this.$nextTick(() => {
  //         //必须在轮播界面显示之后创建
  //         var mySwiper = new Swiper(this.$refs.swiper, {
  //           //direction: "vertical", // 垂直切换选项
  //           loop: true, // 循环模式选项

  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination"
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev"
  //           },

  //           // 如果需要滚动条
  //           scrollbar: {
  //             el: ".swiper-scrollbar"
  //           }
  //         });
  //       });
  //   }
  // }
};
</script>

<style lang="less" scoped>
</style>
