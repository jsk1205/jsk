//管理订单相关数据的vuex模块
import { reqTradeInfo, reqPayInfo } from '@/api'
const state = {
  tradeInfo: {}, // 订单交易信息对象
  payInfo: {}, // 支付信息对象
}
const mutations = {
  RECEIVE_TRANDE_INFO (state, {tradeInfo}) { 
    state.tradeInfo = tradeInfo
  },
  RECEIVE_PAY_INFO (state, {payInfo}) {
    state.payInfo = payInfo
  }
}
const actions = {
  //异步获取分类列表
   
  //获取订单交易信息的异步action
  
  async getTradeInfo ({commit}) {
    const result = await reqTradeInfo()
    if (result.code===200) {
      const tradeInfo = result.data
      commit('RECEIVE_TRANDE_INFO', {tradeInfo})  // 传递给mutation的总是包含要传递数据的对象
    }
  },
 /* 
  获取订单支付信息的异步action
  */
 async getPayInfo ({commit}, orderId) {
  const result = await reqPayInfo(orderId)
  if (result.code===200) {
    const payInfo = result.data
    commit('RECEIVE_PAY_INFO', {payInfo}) // 传递给mutation的总是包含要传递数据的对象
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