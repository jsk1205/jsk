import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
// import Axios from 'axios';
// import {proxy, unProxy} from "ajax-hook"; 
Vue.config.productionTip = false;
Vue.prototype.$store=store;
new Vue({
  render: h => h(App),
}).$mount('#app')
