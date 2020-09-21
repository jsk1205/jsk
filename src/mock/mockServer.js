//利用mock来定义mock接口
import Mock from "mockjs"
import banners from './banners.json'//就变成了 js数组(自动解析)
//json本身是一个json即字符串类型
import floors from './floors.json'

//定义返回两个数据的接口 Mock.mock(地址,模板)
Mock.mock('/mock/banners',{code:200,data:banners})

Mock.mock('/mock/floors',{code:200,data:floors})

//本模块不需要向外暴露数据,但需要必须执行一次-->接口可访问
//必须执行一次->加入入口文件即可-->就可以去请求地址了

//console.log('mockServer执行了..')