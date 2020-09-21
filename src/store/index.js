// vuex最核心的管理对象
import Vue from "vue"
import Vuex from "vuex"
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// import state from './state'
import modules from './modules'

Vue.use(Vuex)
// const moduleA={
//   state:{
//     xxx:XMLSerializer,
//     yyy:{}
//   },
//   mutations:{},
//   actions:{},
//   getters:{}
// }
// const moduleB={
//   state:{ xz:{}},
//   mutations:{},
//   actions:{},
//   getters:{}
// }
//总状态的结构
// {
    // home:{
    //   baseCategoryList:[],
    // },
    // user:{
    //   userInfo:{},
    // }

// }
//向外暴露store对象
export default new Vuex.Store({
  // state,
  mutations,
  actions,
  getters,
  // modules:{//(用于拆分)
  //  a:moduleA,
  //  b:moduleB
  // }
  modules
})