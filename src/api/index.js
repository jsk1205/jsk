//处理所有接口请求函数

import ajax from "./ajax";
import mockAjax from "./mockAjax";

//三级分类列表的接口  /api/product/getBaseCategoryList
export const reqBaseCategoryList=()=>ajax('/product/getBaseCategoryList')
//登录接口 /api/user/passport/login
export const reqLogin=(mobile,password)=>ajax.post('/user/passport/login',{mobile,password})
//请求mock的接口,默认get请求
export const reqBanners=()=>mockAjax.get('/banners')
export const reqFloors=()=>mockAjax.get('/floors')
//搜索获取匹配的商品分页列表
export const reqProductList=(searchParams)=>ajax.post('/list',searchParams)
// reqProductList({}) //得传一个对象过去

// 详情Detail接口
// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)
//添加到购物车
export const reqAddToCart=(skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
//购物车列表接口
export const reqCartList=()=>ajax.get('/cart/cartList')
//切换指定购物车商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCartItem=(skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
//删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartItem=(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)
//注册 /api/user/passport/register mobile password code
export const reqRegister=(userInfo)=>ajax.post('/user/passport/register',userInfo)
//登录  /api/user/passport/login
//export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password})  
//退出登录 /user/passport/login
export const reqLogout=()=>ajax.get('/user/passport/logout')
// 注册验证码/api/user/passport/code

// reqBanners().then(result=>{
//   console.log('result',result)
// }) 

// 获取订单交易页信息 /api/order/auth/trade
export const reqTradeInfo = () => ajax.get('/order/auth/trade')
//获取订单列表 页码数 每页的数量 /api/order/auth/{page}/{limit}
export const reqMyOrders = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)
//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({
  url: '/order/auth/submitOrder',
  method: 'POST',
  params: { tradeNo },
  data: orderInfo
})
//获取支付信息  /api/payment/weixin/createNative/{orderId} orderId 订单号
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)


//查询支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}
export const reqOrderStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
