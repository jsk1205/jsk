//管理购物车vuex模块相关数据
import {reqAddToCart,reqCartList,
  reqCheckCartItem,reqDeleteCartItem} 
  from '@/api'
const state={
  cartList:[],
}
const mutations={
  RECEIVE_CART_LIST(state,cartList){
    state.cartList=cartList
  }
}
 const actions={
   //添加到购物车的异步action-->利用回调函数callback
  async addToCart({commit},{skuId,skuNum,callback}){
    const result=await reqAddToCart(skuId,skuNum)
    if(result.code===200){
      callback('')
    }else{
      callback(result.errorMsg||'添加失败')
    }
  },
  //添加到购物车的异步action-->用await返回结果来标识是否成功
  async addToCart2({commit},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
     return result.code===200 ?'':(result.errorMsg||'添加失败')  
     //失败的promise
     //throw 
  },
  //获取购物车数据列表的异步action
  async getCartList ({commit}) {
    const result = await reqCartList()
    if (result.code===200) {
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  },
  //删除购物车指定项
  async deleteItem({commit},skuId){
    const result =await reqDeleteCartItem(skuId)
      // if (resule.code===200) {
      //   //成功,告诉组件重新获取购物车列表数据
      //  }else{//出错告诉组件显示失败的提示
      // }
      //第一种写法(后续会有问题)
    //return result.code===200?'':result.message||'删除购物项失败'
  //return~  返回来的是成功的与(有promise的)外面的promise就不匹配了 
  //第二种写法应该这么写-->
  //删除失败抛出一个error并显示文本即可--->需要用到try catch 来接收异常
  if (result.code!==200) {
    throw new Error('删除失败')
    // return Promise.reject(new Error('删除失败'))
  }  
  },
  //设置购物项的选中状态
  async checkCartItem ({commit}, {skuId, isChecked}) {
    const result = await reqCheckCartItem(skuId, isChecked)
    if (result.code!==200) {
      throw new Error('勾选购物项失败')
    }
  },
  //成功时,分发请求获取最新购物车列表,可以自己处理,不用组件处理
  async addToCart3({commit,state,dispatch},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
    if (result.code===200) {
      dispatch('getCartList')//成功时,分发请求获取最新购物车列表的action
    }else{//可以自己处理,不用组件处理
      alert(result.message||'添加购物车失败')//自己处理
      //return  (result.message||'添加购物车失败')//让外部(组件)处理
    }
    return result.code===200?'':(result.message||'添加购物车失败')
  }
 



}
const getters={
  //总数量
  totalCount(state){
    //累加
    //let total=0
    // cartList.forEach(item=>{
    //   if (item.isChecked===1) {
    //     total+=item,skuNum
    //   }
    // })
    //return total
    
    //reduce累加写法
    return state.cartList.reduce((pre,item,index)=>{
    // if (item.isChecked===1) {
    //   return pre+item.skuNum
    // }else{
    //   return pre
    // }
    return item.isChecked===1?pre+item.skuNum:pre
    },0)

    
  },
  //总价格
  totalPrice(state){
      return state.cartList.reduce((pre,item,index)=>{
        return item.isChecked===1?pre+item.skuNum*item.cartPrice:pre
    },0)
    },
  //是否全选
  isAllChecked(state){
    //array.every() 判断所有的元素是够都满足条件
    return state.cartList.every((item,index)=>item.isChecked===1)
  },
  //所有选中购物项-->   用来删除所有选中项
  selectedItems(state){
    //filter() 返回所有满足条件的数组元素组成的新数组
    //return state.cartList.filter((item,index)=>item.isChecked===1)
//返回累加后的最后结果
    return state.cartList.reduce((pre,item)=>{
      if (item.isChecked===1) {
        pre.push(item)
      }
      return pre //初始指定的数组,只是很可能前面添加了item元素
    },[])
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}