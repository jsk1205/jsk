/* 
用于操作首页模块数据的vuex模块
*/
import {getUUID} from '@/utils/storageUtils'
import {reqRegister,reqLogin,reqLogout} from '@/api'
const state = {
  //如果没有指定为空对象,读取的操作发生在初始访问项目或刷新
  userInfo: JSON.parse(localStorage.getItem('user_info_key')) || {}, // 登陆的用户信息对象
  userTempId: getUUID()
}
const mutations = {
  RECEIVE_USER_INFO(state,userInfo){
    state.userInfo=userInfo
  },
  RESET_USER_INFO(state){
    state.userInfo={}
  }
}
const actions = {
  //登录
  async login({commit},{mobile,password}){
    const result=await reqLogin(mobile,password)
    if (result.code===200) {
      const userInfo=result.data
      //保存userInfo的json字符串到localstorage
      localStorage.setItem('user_info_key', JSON.stringify(userInfo))
      commit('RECEIVE_USER_INFO',userInfo)
    }else{
      //return '登录失败'
      throw new Error(result.meaasge||'登录失败')
    }
  },
  //注册--主要是将数据提交到后台保存
  async register({commit},userInfo){
    const result=await reqRegister(userInfo)
    if (result.code!==200) {//注册成功跳到登录页面
      throw new Error(result.meaasge||'注册失败')
    }
  },
  //退出登录
  async logout({commit}){
    const result=await reqLogout()
    if (result.code!==200) {//退出登录失败
      throw new Error(result.meaasge||'退出登录失败') 
    }else{
      //退出登录成功,回到登录界面
      commit('RESET_USER_INFO')
      localStorage.removeItem('user_info_key')
    }
  }

}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}