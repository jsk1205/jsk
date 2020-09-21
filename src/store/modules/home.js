//用于操作首页模块数据的vuex模块
import {reqBaseCategoryList} from "@/api";
import { reqBanners, reqFloors } from "@/api";
const state={
  baseCategoryList:[],
  banners:[],
  floors:[]
}
const mutations={//接收 categorys
  RECEIVE_CATEGORYS(state,categorys){
    // console.log('getBaseCategoryList()')
    state.baseCategoryList=categorys.splice(0,categorys.length-2)
  },
  RECEIVE_BANNERS(state,banners){
    state.banners=banners
  },
  RECEIVE_FLOORS(state,floors){
    state.floors=floors
  }
}
const actions={
  //异步获取分类列表
  async getBaseCategoryList({commit}){
    // console.log('getBaseCategoryList()')
   //调用接口请求函数发异步请求ajax
    const result=await reqBaseCategoryList()
    // console.log('getBaseCategoryList()',result)
   //得到成功的数据后,提交给mutations
    if (result.code===200) {
     const categorys=result.data
    //  console.log('getBaseCategoryList()')
     commit('RECEIVE_CATEGORYS',categorys)
     }
    },
    async getBanners({commit}){
      const result=await reqBanners()
      if (result.code===200) {
        const banners=result.data
        commit('RECEIVE_BANNERS',banners)
      }
    },
    async getFloors({commit}){
      const result=await reqFloors() 
      if (result.code===200) {
        const floors=result.data
        commit('RECEIVE_FLOORS',floors) 
      }
    }
  
}
const getters={}
export default {
  state,
  mutations,
  actions,
  getters
}