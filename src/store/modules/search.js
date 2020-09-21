//搜索模块的数据
import {reqProductList} from '@/api'
const state={
  productList:{}
}
const mutations={//接收保存相关数据
  RECEIVE_PRODUCE_LIST(state,productList){
    state.productList=productList
  }
}
const actions={//异步action发送数据
    async getProductList({commit},searchParams){
      //过滤属性值为空串的属性
      // Object.keys:得到对象本身所有属性名的数组
      // Object.value
      Object.keys(searchParams).forEach(key=>{
        if (searchParams[key]==='') {
          delete searchParams[key]//组件中的options也改变了
         //不改变组件中的options
         //searchParams={...searchParams}
        }
      })
      const result= await reqProductList(searchParams)
      if (result.code===200) {
        const productList=result.data
        commit('RECEIVE_PRODUCE_LIST',productList)
      }
    }
}
const getters={
  trademarkList(state){//返回品牌列表
    return state.productList.trademarkList||[]
  },
  attrsList(state){//返回属性列表
    return state.productList.attrsList||[]
  },
  goodsList(state){//返回商品列表
    return state.productList.goodsList||[]
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}