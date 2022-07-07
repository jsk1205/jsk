import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.css';
// import Axios from 'axios';
// import {proxy, unProxy} from "ajax-hook"; 
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$echarts = echarts
Vue.use(Element);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})