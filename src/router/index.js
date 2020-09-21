// 路由器模块
import Vue from "vue";
import VueRouter from 'vue-router'//插件
import routes from './routes'
import store from '@/store'   
// 在组件中不需要引入:在组件中她已经挂载了 this.$store,可以直接用
//解决2:修正vue原型上的push和replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
//给成功回调的参数指定一个默认的空函数--push

VueRouter.prototype.push=function (location,onComplate=()=>{},onAbort) {
return originPush.call(this,location,onComplate,onAbort)
}
//或通过失败的回调--replace
// VueRouter.prototype.replace=function (location,onComplate,onAbort=()=>{}) {
//  return originPush.replace(this,location,onComplate,onAbort)
// }
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
}

//声明使用vue的插件
Vue.use(VueRouter)

// 创建路由器对象 
const router = new VueRouter({
  // mode:'hash',//路由的哈希值(路由路径带#的)
  mode:'history',
  //配置应用中的所有路由
  routes,
  //配置滚动行为-->跳转路由时自动滚动到最上面
  scrollBehavior(to,from,savedPosition){
    return {// return  期望回滚到哪个的位置
      x:0,
      y:0//竖直方向
    }
  }
})
//添加全局前置守卫-->进行路由跳转前的回调函数
//to :目标的路由route对象
//form:当前的路由route对象
//next:用来控制路由跳转的函数
// next()//代表放行
// next(path)//代表强制要跳转的路由
//不选择next()代表不放行(没有跳转的效果,看不到目标界面)

// a.只有登录了,才能查看交易/支付/个人中心界面
const checkPaths=['/trade','/pay','/center']

router.beforeEach((to,from,next)=>{
  //console.log('beforeEach',to,from,next)
  const targetPath=to.path//要跳转的目标路径
  //如果targetPath在checkPath中,那就需要检查
  //if (checkPaths.indexOf(targetPath)!==-1) {//但是不严谨
    if (checkPaths.find(path=>targetPath.indexOf(path)===0)) {//检查是以checkPaths中的某个路径或其子路径的,其里面的子路由也会被检查
      //如果已登录,放行
      if (store.state.user.userInfo.name) {
        next()//代表放行
      }else{//没有,就跳到登录界面
        next('/login?redirect=' + targetPath)//使用query参数携带需要将目标路径携带给login
      }
      
  }else{//否则不需要检查直接放行
    next()
  }
  //否则不需要检查,直接放行
  
//  next('/login')//会进入死页面
//  if (to.path!='/login') {
//   next('/login')
//  }else{//请求的是login 需要去放行
//   next()//代表放行
//  }
  
})
// 向外暴露一个路由器对象
export default router