#### 跳转路由的2种基本方式
声明式路由跳转<router-link to="">

编程式路由跳转 this.router.push()/replace()

this.$router:得到的是路由器对象(包含跳动路由的一些方法)
this.$route:得到的是当前路由信息对象(包含的是当前路由的相关数据属性:path/meta/params)

this.$router.push('/search',()={
})

#### 问题:编程式路由跳转到当前路由,控制台抛出navigationDuplicated 的错误(它不影响效果) 但是麻烦
方案1:在跳转时指定成功或失败的回调--home->index.vue

this.$router.push('/search',()={})
this.$router.push('/search').then(()={}) //不可以
this.$router.push('/search',undefined,()={})可以
this.$router.push('/search').catch(()={})//可以

方案2:修正vue原型上的push和replace方法(不让这个错误抛出来)--->router->index.js
//解决2:修正vue原型上的push和replace方法
const originPush=VueRouter.prototype.push
//给成功回调的参数指定一个默认的空函数--push

// VueRouter.prototype.push=function (location,onComplate=()=>{},onAbort) {
// return originPush.call(this,location,onComplate,onAbort)
// }
//或通过失败的回调--replace
// VueRouter.prototype.replace=function (location,onComplate,onAbort=()=>{}) {
//  return originPush.replace(this,location,onComplate,onAbort)
// }
VueRouter.prototype.replace=function (location,onComplate,onAbort) {
   return originPush.replace(this,location,onComplate,onAbort).catch(()=>{})
  }

#### 跳转路由携带参数 params/query
header->index.js 携带query参数
  **v-model:来搜索数据** 
  //携带query参数-->search取到数据
  this.$router.push(`/search?keyword=${this.keyword}`)

 search中去取到参数 
 <p>query参数:keyword={{this.$route.query.keyword}}</p>

  this.$router.push(`/search'?keyword=this.$route.query.keyword`)

  query参数之对象形式::  

this.$router.push({path:'/search',keyword:{this.$route.query.keyword}})

  params参数 
  {path: '/search/:keyword?', 

//路由部分的路径要用 冒 号 来声明,

然后 问 号 代表可传可不传参数 
  component: Search
  }
  //使用params参数
      this.$router.push(`/search/${this.keyword}`)
   search中去取   

  <p>params参数:keyword={{this.$route.params.keyword}}</p>
 //使用params参数之对象形式
  <!-- this.$router.push({path:'/search',params:{keyword:this.keyword}}) --> //不可以
 //此时未把数据带过去---->需要为路由指定个name属性
  {
   name:'search',//使用params参数时 需 要 指 定 此 名 称
   path:'/search/:keyword?,
   component:Search
  }
  即不可以用path和params配置的组合
  只能用name和params配置的组合
  但params中数据为''时,地址栏会有警告提示,那我们需要加个判断来指定params(前提是你的params参数为可有或者可无的)

#### 不传参时去跳转
 {path: '/search/:keyword?' //?代表params参数可以不传
 }
 this.$router.push({name:'search',params:{keyword:this.keyword}})
 出现只加载页面 无样式---路径多了一个,所以public->index.html 里面要写绝对路径
 #### 路由组件能不能传递props数据?
 可以:可将query或params参数映射成props传递给路由组件对象
 routers.js
 {props:(route)=>({keyword1:route.params.keyword,
      keyword2:route.query.keyword})
 }
search.vue 

  <p>params=>props: keyword1={{keyword1}}</p>
  <p>params=>query: keyword2={{keyword2}}</p>
   export default {
    name:'Search',
    props:['keyword1','keyword2']
  }

#### 如何控制footer/header部分路由组件是否为显示
vue中 data里面的有个$route->meta:{}
即利用路由的meta配置
//routers.js
 { meta:{
      isHideFooter:true//标识footer是否隐藏
  }
  //app.vue
  <Footer v-if="!$route.meta.isHideFooter"/>


  name:运行递归调用的自身
  后台支持的请求格式:json urlcoded(不支持)
#### 任务
  ajax与后台交互
  vuex
  TypeNav动态组件
  mock数据接口
  利用mock数据实现动态ListConter组件与Floor组件

#### 使用postman测试接口
  输入url参数进行请求测试
#### 交互前后台之ajax
1)封装ajax请求模块之对axios二次封装-->api->ajax.js 
  npm install -S axios nprogress
  1.基本请求配置
  2.添加拦截器-->显示请求进度条
  3.成功的返回数据为response.data
  4.统一处理请求错误
2)定义接口请求函数-->api->index.js
  函数的返回值为promise
3)调用接口请求函数发送请求(用到async/await简化promise语法)
  app.vue:
  async mounted(){
      const result=await reqBaseCategoryList()
      console.log('result',result)
      //此时出现404-->未指定前面的基础路径-->数据代理来解决
    },
4)配置代理解决跨域问题
  在vue.config.js里面配置 devserver
     devServer: {
    proxy: {
      '/api': {//只处理api开头的了路径请求
        target: 'http://182.92.128.115/',
        <!-- ws: true, -->
        changeOrigin: true,//支持跨域
      }
    }
  },

#### 引入vuex并使用(vuex最核心的管理对象)-->store
  npm install -S vuex
  vuex的基本使用
  vuex多模块编程--拆分(modules)
    1>拆分
    2>组件触发vuex的异步action请求数据
    对应的actions发请求,获取数据,通过mutations把数据存储到当前的这个状态(baseCategoryList)中去
    //总状态的结构
    // {
    // home:{
    //   baseCategoryList:[],
    // },
    // user:{
    //   userInfo:{},
    // }
    // }

#### TypeNav组件之动态显示3级列表
 1>组件与vuex交互,动态显示3级分类
  组件读取vuex里面的data数据-->需要用到映射函数
  import { mapState } from 'vuex'
  //读取数据-->映射
  computed:{
    //...mapState(['home']),//{baseCategoryList:[]}
    //不能直接写 home.baseCategoryList-->mapState的辅助函数
    ...mapState({
      //计算属性值由vue自动调用右侧的函数返回(state=>state.count:回调函数)
      //state是vue自动传的总state对象
      categoryList:state=>state.home.baseCategoryList
    })
  2>控制2/3级分类列表的显示与隐藏
    v-for去动态获取数据--->控制2/3级分类获取列表

     item_on:true 来监控鼠标是否移上来了
     &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }

  3>点击某个分类型,实现 router-link跳转到搜索路由
  /search?categoryName=电子书&category2Id=1
  categoryName:xxx
  category1Id/category2Id/category3Id
  如:<router-link :to="{path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link>

#### 函数节流(throttle)/函数防抖(debounce)
  1>事件频繁触发导致浏览器性能降低
  函数节流:在函数需要频繁触发时,函数执行一次后,只有大于设定的执行周期后才会执行第二次,适合多次事件按时间做评价分配触发
  函数防抖:在函数需要频繁触发时,在规定时间内,只让最后一次生效,前面的不生效,适合多次事件一次响应的情况
  需要用到lodash ,向外暴露的对象
  npm i -S lodash
  _.throttle(handleFn,delay,options)返回一个新函数,也就是绑定事件监听的回调函数
  handleFn:接收的是处理事件的回调函数,由throttle()返回的函数内部指定delay时间后调用 
  import _ from 'lodash'//会打包整个lodash库
  @mouseenter="showSub(index)"
   methods:{
    //showSub:_.throttle(function(index){//通过lodash对象_的throttle方法来处理
    showSub:throttle(function(index){//按需引入的
      console.log('处理事件',index)
      this.currentIndex=index
    },500) 
  },
  2>对lodash实现按需引入打包
  import throttle from "lodash/throttle" //按需打包
  showSub:throttle(function(index)
  3>利用事件委托,优化事件处理效率--->事件冒泡到祖先身上:event.target.targetName='A'(跳转的是a标签就可以跳转) this.$router.push({path:'/search'})
   他们的祖先:<div class="all-sort-list2" @click="toSearch">
  4>利用标签自定义属性携带动态数据
    1>>在发生事件的 标 签 指定以data-xxx开头的属性
    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId"></a>
    2>>在事件回调函数通过event得到标签,从而取出自定义属性
    const value=event.target.dataSet.xxx(xxx是全小写的)
    3>>取出自定义属性值
    const{categoryname,category3id}=value(xxx是小写的)
    4>>再去判断点击的是分类项去跳转路由并携带query参数
    const query={categoryName:categoryname}
    if(category3id){
      query.category3Id=category3id
    }
    //跳转路由并携带query参数
    this.$router.push({path:'/search'},query)
  5>控制1级列表的显示与隐藏
  mounted(){
    //触发vuex的getBaseCategoryList,actions调用
     this.$store.dispatch('getBaseCategoryList')
     //得到当前路由路径
     const path=this.$route.path
     //若不在首页指定隐藏一级分类列表
     if(path!='/'){
       this.isShowFirst=false
     }
  },
   hideCate():
    //出了2/3级列表就隐藏
    this.currentIndex=-1
    //1级只有不在首页时才隐藏
  6>优化请求执行的位置,减少请求次数
    在search的index.vue 和home的index.vue 中都有<TypeNav /> 所以多次重复发请求(切换路由组件多次获取分类列表的请求多次)
    把mounted 里面的
    //触发vuex的getBaseCategoryList,actions调用
     this.$store.dispatch('getBaseCategoryList')
     放到App.vue里面即可

#### mock接口
  1>首页只有分类列表的接口,其他数据接口还没有?
  自己mock数据接口
  2>设计json数据
  3>如何mock(模拟)
  mockjs:生成随机数据,拦截ajax请求,返回随机生成数据(json数据)--->拦截ajax数据,即浏览器不知它发的请求
   1).使用mockjs来实现mock接口
   npm install -S mockjs
   //利用mock来定义模拟mock接口--mockServer.js
   import banners from './banners.json'//就变成了 js数组(自动解析)
     json本身是一个json即字符串类型
     //定义返回两个数据的接口 Mock.mock(地址,模板)
     //请求mock的接口,默认get请求
     Mock.mock('/mock/banners',{code:200,data:banners})

     本模块不需要向外暴露数据,但需要必须执行一次-->接口可访问
    必须执行一次->加入入口文件即可-->就可以去请求地址了
    --->main.js //加载mock的模块
    import './mock/mockServer'

   2).二次封装mockAjax路径为mock--mockAjax.js
     处理所有接口请求函数--index.js
     -->home的index.vue//触发添加mock接口来请求数据到state中 调用/vuex的异步action调用
    mounted(){
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
    },//此时浏览器访问不到数据,因为mockjs拦截ajax请求,但是得到了数据,
   3).用swiper实现轮播
    npm install -S swiper
    ListCountainer.vue
    //创建swiper对象必须要在轮播列表页面显示之后执行才可以-->否则有问题(轮播)
    //可以写在mounted里面---具体请参照文档
    bug:创建的swiper会对其他组件界面中的swiper界面产生影响
    原因: new Swiper(.swiper-container )类选择器会匹配页面中的所有此类型元素,都会产生效果
    解决:使用vue技术来定位swiper的根元素 :ref="swiper"
    //引入swiper的css样式-->可以写到main.js
    import "swiper/css/swiper.min.css";

    import {mapState} from 'vuex'//读取状态
    //v-for 展现状态-->然后轮播效果消失
    因为mounted第一次执行的时候没有数据,由于banners的数据是异步获取的
#### 实现动态轮播图效果--swiper
    1>mounted很早就执行了,而banndes是异步获取的,可否给mounted加个定时器哪?--->但是延迟多少秒哪,请求数据返回的时间不确定-->不合适
    2>watch + $nextTick
      $nextTick(callback):能知道界面因为这个数据改变而更新
      需要引入import  vue.$nextTick
    watch : 利用监视来监测数据发生改变,界面更新即数据绑定
    但界面还未更新,数据改变,同步调用监视的回调然后界面是'异步'更新
    $nextTick：将回调延迟到下次dom更新循环之后执行,在修改数据之后立即使用它,然后等待dom更新,即他只能用在监视里面,能达到我们的要求
    即watch:{
      banners(){
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swiper, {})
        })
      }
    }
    3>callback+$nextTick 以后讲

#### 复用并抽取轮播组件Carousel
  1>将ListContainer中的swiper模板页面和js部分抽取到carousel的index.vue去定义接收轮播数组数据:carousel并显示
  2>在ListContainer和Floor组件中使用Carousel:

<carousel :carouselList="Array">
  3>但是Floor组件中的轮播没反应,即没有执行<Carousel>没有执行watch的回调->也没有创建对应的swiper对象

  分析:floor开始时是[]:初始显示时没有渲染Floor组件-->没有渲染它内部的Carousel-->即没有创建Carousel对象
  后面异步获取了Floors数组[{}]-->渲染两 个Floor-->渲染两个他内部的Carousel-->创建Carousel对象-->调用mounted(),有数据,此时长度为3-->即没有更新的过程-->也就不会执行watch的回调
  //算两次,

  banners的空数组-->渲染Carousel-->创建Carousel,调用mounted,没有数据(长度为0)
  异步获取banners数组-->更新渲染Carousel-->调用watch的回调
  而banners传的是一般属性,属性值没有他也会渲染
  <Carousel :carouselList="banners"/>
  而floor 的
  <floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
  一旦floors里面没数据,他是不会渲染的

v-for遍历的如果是空数组,不会渲染组件标签

  所以
  watch:{
    carouselList:{
      handler(){
      //利用监视来监测数据发生改变,界面更新即数据绑定
      //但界面还未更新,数据改变,同步调用监视的回调然后界面是 ' 异步 ' 更新
      },
      immediate: true //是否立即执行一次 默认false :初始显示时就立即执行一次
    }
  }

#### 实现search
  1>复杂的查询参数准备
  2>ajax+vuex :在组件中动态显示:品牌列表,属性列表,商品列表
  3>指定搜索条件进行搜索
    1)根据分类搜索:指定query参数
    2)根据关键字搜索:指定params参数 keyword
    3)Search组件得到分类/关键字参数并发送请求
      mounted()中处理 从首页跳转到搜索
      watch=>$route() 在搜索也改变分类或关键字
      ...合并
  4>bug
    1>>.在搜索页面,在改变分类或关键字时,参数携带有问题即原本参数会消失
      根据分类跳转,没有携带包含keyword的params参数
      分解关键字进行跳转时,没有携带包含分类数据的query参数
      1>>判断是否在搜索界面
      2>>指定需要携带params或query参数
      3>>指定replace的跳转方式
      //解决2:修正vue原型上的push和replace方法 router->index.js
      const originReplace=VueRouter.prototype.replace
    2>>.切换到另一个级别的分类,原分类的id数据依然还在,即没有去重置分类
      categoryName:'',
      category1Id:'',
      category2Id:'',
      category3Id:'',
  5>删除搜索条件(需要重新跳转)
   移出分类条件:
     删除query参数:this.$router.replace(this.$route.path)
   移除关键字条件: 
     去除params参数
     this.$router.replace({path:'/search',query:this.$route.query})

   删除header搜索框里的关键字---全局事件总栈
     beforeCreate(){//全局事件总栈--main.js
      Vue.prototype.$bus=this//所有组件都可见
     }
   Search->index.vue:通过全局总线分发事件
      removeKeyword： 通过全局总线分发删除关键字的自定义事件
      removeKeyword(){//移除关键字条件
      this.options.keyword=''
      //通过全局总线分发删除关键字的自定义事件
      this.$bus.$emit('removeKeyword')
      // this.getProductList()//去除params参数
      this.$router.replace({path:'/search',query:this.$route.query})
      },

   分发事件给:commponents->Header->index.vue
      mounted(){//通过全局事件总线绑定removeKeyword事件监听
     //通过全局事件总线绑定removeKeyword事件监听
     this.$bus.$on('removeKeyword',()=>{
       this.keyword=''
     })
     },

  6>排序问题-->pages->Search->index.vue
    添加新的品牌 :setTrademark
    添加获取商品列表:addProp 
    
    isActive:排序
    //解构写法
    let [flag,orderType]=this.options.order.split(':')
      setOrder:根据某一项排序
      orderIcon：得到要显示的标识排序方式图标 
    
    <li :class="{active:isActive('1')}" @click="setOrder('1')"> 
      <a href="javascript:">综合{{orderIcon('1')}}</a>
    </li>

#### 响应式数据对象:添加新属性与删除属性的问题
 为响应式对象添加一个属性,确保新属性也是响应式的,并能够触发视图更新,这必须用于响应式对象添加新属性,因为vue无法检测到普通属性的添加.
  添加新属性:trademark
  this.options.trademark=id+':'+name //给响应式直接添加,即内部没有监视/劫持-->没有数据绑定效果(新增的不会显示出来)-->可通过vue的set()/$set()来添加新属性
  vm.$set(options,'trademark',value)
  vm.set(options,'trademark',value)
  删除已有属性
  delete this.options.trademark //删除已有属性-->不会触发界面更新-->setter可以监视属性的改变,但不能监视属性的移除-->可通过vue的delete()/$delete()
  vm.$delete(target,key)
  vm.delete(target,key)

#### 优化搜索请求,去除不必要的空串参数
Object.value:得到对象本身所有属性值
Object.keys(obj):得到对象本身所有属性名的数组
for in 找整个包括原型链的 
forEach 只找自身的
store->modules->search.js
Object.keys(searchParams).forEach(key=>{
  if (searchParams[key]==='') {
    delete searchParams[key]//组件中的options也改变了
  }
//不改变组件中的options
//searchParams={...searchParams}

#### 自定义通用的分页组件(面试题)
  基本思路
   1>基本布局
   2>设计内部状态数据
     当前页码：currentPage
   3>接收哪些动态属性数据
     pageConfig:{
       total:0,总记录数量
       pageSize:10,一页最多显示几条记录
       pageNo:1,当前在第几页
       showPageNo:5 连续显示的页码数
     }
   4>实习组件内部的交互
     绑定监听->更新数据->组件更新界面

    //保存当前页码
    this.currentPage=currentPage
    //分发自定义事件
    this.$emit('changeCurrentPage',currentPage)
    //在data中可以读取props和vue原型对象上的属性
    但不能直接读取data对象中的数据
     currentPage:this.pageConfig.pageNo
    
     const {totalPages,currentPage,pageconfig:{showPageNo}}=this
     //分页器逻辑
    if(start<1){start=1}
    end=start+showPageNo-1
    
    if(end>totalPages){
      end=totalPages
      start=end-showPageNo+1
    }
    return {start,end}
  5>内部数据发生改变时.通知外部父组件,可以用vue自 定义事件或函数属性来实现
   6>自定义组件与外部组件的通信
   当外部组件传入的数据发生改变时,内部数据也可可能需要变化-->
   直接使用watch来监视外部数据变化-->
   从而修改内部数据
    watch:{//当接收到pageNo发送改变时调用 用''是因为 里面的点 特殊字符
      'pageConfig.pageNo'(value){
        this.currentPage=value//指定为外部传入的值
      }
    }

#### 实现
  使用vue相关技术:
    data/props/computed
    绑定事件监听/methods
    watch(监视外部数据改变,内部同步更新即 6>)/分发自定义事件(内部数据改变通知外部即 5>)
  难点:
  计算:总页数totalPages/连续页码的start和end
  连续页码的显示 v-for +v-if ==>
  v-for的优先级最高,v-if在遍历(v-for)的执行过程中执行多次/(遍历每个元素准备生成一个新的组件对象之前来去执行v-if)

#### 放大镜 zoom
a.配置滚动即路由跳转过去自动滚动到最上面
  router->index.js
  scrollBehavior(to,from,savedPosition){
    return {
      x:0,
      y:0 //竖直方向
    }
  }
b.小图片Swiper轮播 ->skuImageList
  当前页选中  currentIndex==index
  zoom组件动态显示与切换
  修改当前图片下标
  并通知外部父组件改变相应图片->分发自定义事件
c.zoom之初始显示常见错误 Cannot read property 'imgUrl' of   undefined"
  模板中有三层表达式(a,b,c)
  skuImageList[currentImgIndex].imgUrl
  skuImageList的初始值为空[],这个三层表达式在初始解析时就会报错
  解决:判断在初始时为解析 v-if
  v-if="skuImageList.length>0 即可
d.放大镜效果
  鼠标始终在 mask的正中间
  小图  div  图片大小(div大小)  mask
  大图  div(里面包着大图img)  4倍图片大小(4倍div)
  mousemove事件处理
  加在左侧div
  mask的div的left,top值
  右侧img的-2*left,-2*top值
  left的值必须在[0,maskWidth]
  top值必须在[0,maskHeight]
  mask的值可以在 mounted里面获取,它的值是死的,没有必要定义在data里面
  mounted(){//mask 样式里面 为display:none 所以用了另一个div的 因为他们一样大
    this.maskWidth=this.$refs.event.offsetWidth
  }
  methods:{
    handleMove(event){
      //得到事件坐标
      //得到mask宽度
      //计算当前mask要指定left和top
      let left=0
      let top=0
      let=offsetX-maskWidth/2
      //判断left的值必须在[0,maskWidth]
      //指定mask div的left和 top样式
      const maskdiv=this.$refs.mask
      maskdiv.style.left=left+'px'
      //指定大图的left和top样式
      const bigImg=this.$refs.bigImg
      bigImg.style.left=-2*left+'px'
    }
  }
  遮罩的宽度-->这个值是定值,没必要定义在data中
e.适当的节流处理 lodash  thorttle

#### sessionStorage 与localStorage(数据存储)
跳转路由成功 一般携带query 和params参数
还有一种办法sessionStorage(可携带诸多信息)
面试题 区别:
a.点击购物车发送请求
购物车接口(query参数)
   分发action ,如何根据异步action的成功或失败做不同的处理-->
   1>利用callback:
     a.在组件中:在dispatch时携带一个callback回调函数数据,并传入errorMsg(可有值也可无)
     b.在异步actions中:请求处理成功(成功返回空串)或失败(失败提示错误信息)后,调用callback,并传入数据(errorMsg)
     c.在回调函数中:判断接收的errorMsg有值,提示错误,否则做成功后的处理
   2>利用async函数本身的特点
     前提:async函数执行的返回值是一个promies对象
          promise成功的value:函数执行没有错误,return的就是value(不能是失败的promise)
          promise失败的reason:函数体执行出错/抛出错误-->返回一个失败的promise

      a.store.dispatch()的返回值就是action
     函数的返回值 即返回一个promise(成功的) 而promise的结果值 就是return返回的值
      利用callback:
       1>>在组件中:正常分发action: this.$store.dispatch('addToCart2',query) -->成功的
       2>>在组件中:通过await来得到errorMsg,根据他来做相应处理
      利用async函数本身的特点
       2>>在异步action中(利用上这个返回值):在请求处理成功或失败后,返回相关的errorMsg(值可能有)去处理 
    
     Detail->index.vue 即组件中
     //async addToCart(){
      // this.query={skuId:this.skuInfo.id,skuNum:this.skuNum}
      //const errorMsg=await this.$store.dispatch('addToCart',query)//dispatch返回一个promise对象(也就是action返回的promise)
      //this.callback(errorMsg)
      //}
    //shopCart.js 即在异步action中
    async addToCart2({commit},{skuId,skuNum}){
    const result=await reqAddToCart(skuId,skuNum)
     return result.code===200 ?'':(result.errorMsg||'添加失败')  
     //失败的promise
     //throw 
    }

#### 路由跳转携带大量数据
//在跳转前将skuInfo 保 存 到 sessionStorage(只能是字符串类型,value只能存文本)
window.sessionStorage.setItem('SKU_INFO_KEY',JSON.stringify(this.skuInfo))

 sessionStorage(保存到window(json字符串JSON.stringify)) 
 与locaStorage-->用来读取window保存的数据的,读到的是json数据(JSON.parse))
 mounted(){
 this.skuInfo=JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
 //删除sessionStorage中保存的skuInfo
 window.sessionStorage.removeItem('SKU_INFO_KEY')
 }

 就可以使用{{skuInfo.skuName}}了
 ********************** 面试题 ****************************
 相同点:都纯浏览器端存储
而cookie 是存在浏览器端的,但是发请求前需要交给服务器,但还有cookie也很有可能是服务器(自动携带cookie)返回给你的,所以cookie并不是一个纯浏览器端存储
语法一样:都有setTime(key,value)/getItem(key)/remove(key)
 不同点:
 sessionStorage :存在于浏览器的运行时内存中-->关闭浏览器数据被清除,操作相对快些
 locaStorage:保存在浏览器管理的本地文件中-->关闭浏览器数据依然在
    

#### 所有请求携带用户临时(tempid)id
  请求时不携带参数 -->公共请求参数-->每个接口(登录接口不需要)需要的header参数值-->用户临时ID
  未登录/登录前要有个临时登录id的数据 -->String(通过uuidjs生成 (代表生成一个随机唯一的值))
  后台生成:
token: d90aa16f24d04c7d882051412f9ec45b   
  前台生成:
userTempId:b2f79046-7ee6-4dbf-88d0-725b1045460b
问题?
生成后放在哪 得到数据后,怎样保存到后台哪 -->需要用到请求拦截器
如何保证每次请求都能携带这个值
1>userTempId的特点:每个客户端应该不相同
同一个客户端应该不要发生变化,如果中途发生变化了,前面通过userTempId保存在后台的数据就会找不到
2>userTempId的生成与保存
//UID.generate() 这样写的的话每次刷新都会重新生成新的,尽量不要这么做-->那应该有一个工具函数 functiongetUUID(){}
使用uuidjs生成一个随机唯一的值
保存:
  持久化保存:将userTempId保存到localStorage中,读取从localStorage中读取,如果没有则生成一个新的并保存到localStorage中
  内存中保存:将userTempId也保存在vuex的状态中(为了更快的读取)
  即 const state = { userTempId: getUUID()//如果没有则生成一个新的并保存到localStorage中,有则直接返回}
 // uesr.js
  引入并使用 
  const state = {

    userTempId: getUUID()
  }
 // storageUtils.js
  export function getUUID() {
  // 从localStorage中读取
  let uuid = localStorage.getItem('UUID_KEY')
  // 如果没有, 生成一个新的, 并保存到localStorage
  if (!uuid) {
    uuid = UUID.generate() //生成 
    localStorage.setItem('UUID_KEY', uuid)  
  }
  return uuid
}
3>如何保证每次请求都携带上uuid值(目前uuid在状态里面)-->需要用到请求拦截器
  去使用保存的userTempId
  在请求拦截器中:读取state中的userTempId,并添加到请求中
  ajax.js:
  //5.即所有请求都需要携带usetTempId的请求头
  config.headers['userTempId']=store.state.user.userTempId
  别忘记引入 import store from "@/store";

#### 购物车接口测试与接口请求 
异步显示购物车数据_reduce与every
数组方法:reduce 对数组中的每个元素执行一个由你提供的reducer函数(升序执行),将其结果汇总(和)为单个返回值
[1,2,3,4].reduce((pre,item,index)=>pre+item,0//初始值(内部维护的)) ==>10
数组方法:every 一个数组内的 所 有 元 素 是否都能够通过某个指定函数的测试,返回布尔值
实现数组声明式处理系列工具函数
实现map()
实现reduce()
实现filter()
实现find()
实现findIndex()
实现every()
实现some()
#### 购物车数据增删改
  1>删除某指定项
    
  2>删除所有选中的
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
  然后调用
    deleteItems 删除所有项
      selectedItems.forEach(item=>{
        this.$store.dispatch('deleteItem')
      })
      }
  利用promise.all 以及在处理promise的成功,失败的处理

   3>改变某一个选中的状态
   勾选状态发请求  
   不要直接修改别人的数据,否则就违背了基本原则
   根据外部显示的数据,又不能直接修改他==>v-model=计算属性,利用监视来处理 

​     1>>组件中根据从vuex读取的数据来显示是否勾选
​     :checked="item.isChecked" 来确定是否勾选 来触发 @change="checkItem(item)" 调用,分发    checkItem来发送请求,去指定新的勾选状态,然后通知vuex去更新-->请求接口的api   :reqCheckCartItem(skuId,isChecked),根据成功/失败的promise来实现

​     2>>组件中当用户改变了勾选,将最后的勾选状态同步到vuex中(可能要发请求)



4>改变所有项的选中状态
  @change="checkAll"
  checkAll(event){
    event.target.checked 结果是布尔值-->要变为1/0
  }

  5>修改某个购物项的数量
<input tyoe="text" @change="" @input="">
change事件:输入框失去焦点才触发
input事件:输入发生改变时才触发

#### action函数的参数
 changeItemNum({commit,state,dispatch},data){}
 commit:执行触发mutation调用
 state:读取当前状态数据
 dispatch:执行触发action调用
在action中 请求参数-->成功了dispatch('getCartList')获取新的购物车数据
#### 注册登录
 给img重新指定src
 如果src新的值与原本的值相同,浏览器不会自动请求获取图片显示
 解决:携带时间戳(当前时间值)的参数
 `http://182.92.128.115/api/user/passport/code?time=${Date.now()}`
 这样指定的src的值都不一样==>浏览器就自动发请求

  图形验证码总数失败原因:
  http://182.92.128.115/api/user/passport/code
  浏览器直接发送这个请求,并没有经过代理服务器
  而发送注册请求时
   http://182.92.128.115: 由代理服务器转发过去传过去了code/mobile/password,后台要读取对应的code与传过去的code进行对比
   由于两次请求不是同一个人(一般http引擎与ajax引擎),找不到对应的code,进而比对的code不正确
   解决:获取验证码的请求与注册的请求都通过代理服务器发送,不要写完整,只要写一个让代理服务器的路径即可
   即/api/user/passport/code

####　组件何时会自动更新
简单表达:当模板中使用的响应式数据发生了任何变化
 有哪些响应式数据:
 data props vuex:state与getters
 computed
#### 登陆后
  问题:
    1>刷新浏览器后还要是登录状态(保持登录)
    2>关闭浏览器,还是要登录状态(自动登录)
  解决1:保存用户的相关信息到localstorage---不需要额外发请求
    1>登录请求成功后,将得到的userInfo保存到localstorage
      localstorage 存对象时需为json字符串格式
    2>每次初始化的userInfo从localstorage中读取
      JSON.parse(localStorage.getItem('user_info_key')) || {}
    3> 退出登录时,需要清除state和localStorage中的数据
  解决2:登录时只将token保存到local
    需要根据local中保存的token发请求获取对应发用户信息
#### 区别:userTempId与token
    1>userTempId:浏览器临时生成,用于标识一个未登录的客户端,每次请求都需要携带userTempId(尤其是购物车)
    2>token:请求登录成功时服务器返回给浏览器保存的,用于标识这个登录用户的,每次请求如果有token,需要自动携带
    应用场景==>去结算,需要登录,他必须有token
    3>在购物车中的应用
     1>>在未登录前,购物车数据的提交和获取依赖于userTempId
     2>>在登录后,购物车数据的提交和获取依赖于token
     3>>第一次同时携带token和userTempId获取购物数据时,后台将会将其两者合并(将userTempId购物数据移到当前用户下,其实后面只需要token就可以得到所有的购物数据),如果退出登录,通过userTempId,不能在得到前面与他对应的购物数据
#### 订单支付
  什么时候需要拆分子路由
    如果一个路由组件界面上有其局部界面的切换显示
    router-link replace 会报错
#### 导航守卫/路由守卫
  是vue-router提供的2个方面的功能  
  1>监视路由跳转
  2>控制路由跳转

  添加全局前置守卫-->
  进行路由跳转前的回调函数
  router.beforeEach((to,from,next)=>{
  console.log('beforeEach',to,from,next)
   // next()//代表放行
   //  next('/login')//会进入死页面
  if (to.path!='/login') {
    next('/login')
  }else{//请求的是login 需要去放行
    next()//代表放行
  }
  })
    to :目标的路由route对象
    form:当前的路由route对象
    next:用来控制路由跳转的函数
    next()//代表放行
    next(path)//代表强制要跳转的路由
    不选择next()代表不放行(没有跳转的效果,看不到目标界面)
import store from '@/store'    
a.只有登录了,才能查看交易/支付/个人中心界面
-->全局(前置)守卫(beforeEach): router->index.js
b.只有没有登录,才能看到登录界面
-->路由独享(前置)守卫  beforeEnter :router->router.js
-->使用组件前置守卫  beforeRouteEnter
    1>://this.$store.state.user.userInfo.name
    // beforeRouteEnter是在路由组件创建前调用的,this不能直接使用
    //而用引入 store的方式可以,因为引入的方式直接引入了store,
    //并不是说store对象不存在,而是$store看不见所以就this还不存在
    2>:next(component=>{//此回调在组件对象被创建后才自动执行,且传入了组件对象,this还是不要用
    ~
    }
c.只有携带的skuId和skuNum以及sessionStirage中有skuInfo数据,才能查看添加购物车成功的界面
d.只能从购物车界面,才能跳转到交易界面
e.只能从交易界面,才能跳转到支付界面
f.只有从支付界面,才能跳转到支付成功的界面

#### 登录成功后,自动跳转到你未登录时点击的(如想看购物车)路由
  router->indx.js
  //没有,就跳到登录界面
        next('/login?redirect=' + targetPath)//使用query参数携带需要将目标路径携带给login
    login/index.vue
   this.$store.dispatch("login", { mobile, password })
        .then(() => {
          // 登陆成功
          // 跳转到首页
          // this.$router.replace("/");
          const {redirect}=this.$route.query //得到需要跳转的路由路径(不一定有值)
          //跳 转 到 前 面 未 登 录 前 未 去 成 的 界 面
          this.$router.replace(redirect||'/')
        })
#### 我的订单列表
 1>如何使组件中能方便的调用接口请求函数(不需要引入)
  在入口js文件:import * as API from "./api";//引入包含所有接口请求函数方法的对象
  //将api对象挂载到vue原型对象上
  Vue.prototype.$API=API// 所有的组件中都可以通过this.$API来访问

 2>在组件中调用接口请求函数处理 
   在data中定义对应的数据
  mounted()中调用接口请求函数获取数据  ==> 更新到data中
  模板读取data中的数据显示

 3>对多个标签进行统一的控制:template
   方法1:在外层加一个<div>,通过控制div来控制多个标签
   问题:多产生一层不必要的标签==>效率低/样式可能有问题
   方法2:可以在外层添加一个template
   <template>不会生成对应的html标签,不会出现在界面上

####  订单交易
  动态获取数据显示
  收件地址选择功能
    默认选择默认收件地址
    点击选中任意一个
    显示选中的地址
  提交订单
    提交订单请求的参数准备
    npm i qrcode
    二维码提示框
  支付处理
    请求获取订单状态,如果支付已完成自动跳转到支付成功页面  每隔3s-->发请求状态  循环定时器

   




​        





 
