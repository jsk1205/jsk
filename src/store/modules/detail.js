import { reqDetailInfo } from '@/api'

const state = {
  detailInfo:{} // 商品详情信息
}

const mutations = {
  /* 
  接收商品详情信息
  */
  RECEIVE_DETAIL_INFO (state,detailInfo){
    state.detailInfo=detailInfo
  }
}

const actions = {
  /* 
  获取指定skuid的商品信息的异步action
  */
  async getDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      commit('RECEIVE_DETAIL_INFO',result.data)
    }
  }, 
  
//   /* 
//   添加到购物的异步action
//   */
// //   async addToCart({commit},{skuId,skuNum}){
// //     const result=await reqAddToCart(`/${skuId}/${skuNum}`)
// //     // 如果请求失败返回提示文本, 否则返回''
// //     return result.code!==200 ? '商品添加失败' : ''
// //   }
 }

const getters = {
  /* 
  返回三级分类名称数据的对象
  */
  categoryView (state) {
    const categoryView = state.detailInfo.categoryView
    return categoryView ? categoryView : {}
  },

  /* 
  返回商品sku相关信息对象
  */
  skuInfo(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },

  /* 
  返回商品的轮播的图片数组
  */
  skuImageList(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  
  /* 
  返回商品SPU销售属性列表
  */
  spuSaleAttrList(state){
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList
    return spuSaleAttrList ? spuSaleAttrList : []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}