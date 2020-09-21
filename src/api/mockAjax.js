//二次封装axios(mock的接口)
import axios from "axios";
import NProgress from 'nprogress'//引入
import  'nprogress/nprogress.css'//对应的样式

//配置不显示右上角的旋转进度条即只显示水平进度条
// NProgress.configure({showSpinner:false})

//1.基本请求配置
const ajax=axios.create({
  baseURL:'/mock',//前缀路径  
  timeout:1000
})
//2.添加拦截器-->显示请求进度条
ajax.interceptors.request.use((config)=>{
  //显示请求进度条-->需用到nprogress
  NProgress.start()
  return config//必须返回config
})
ajax.interceptors.response.use(
  (response)=>{
    NProgress.done()//隐藏进度条
    return response.data
    //3.成功的返回数据为response.data
  },
  error=>{
    NProgress.done()//隐藏进度条
    //4.统一处理请求错误
    alert('请求出错:'+error.message||'未知错误')
    
    return Promise.reject(error)//需为失败的
  }
)

//向外暴露ajax
export default ajax