// 入口js
import Vue from 'vue'
import App from './App.vue'

//注册路由器
import router from './router'

import TypeNav from './components/TypeNav'
import store from './store'
//加载mock的模块
import './mock/mockServer'
//引入swiper的css样式
import "swiper/css/swiper.min.css";
import Carousel from './components/Carousel'
import Pagination from "./components/Pagination";
import * as API from './api' //引入包含所有接口请求函数方法的对象
import './elements' //加载所有element
// 将API对象挂载到Vue原型对象上
Vue.prototype.$API = API  // 所有的组件中都可以通过this.$API来访问

//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate(){//全局事件总线 
    Vue.prototype.$bus=this//所有组件都可见
  },
  render: h => h(App),
  router,//配置路由器
  store,//配置vuex的核心管理对象store,可通过$store得到store对象
}).$mount('#app')
