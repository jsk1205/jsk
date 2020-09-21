<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">x</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">x</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">x</i>
            </li>
            <li class="with-x" v-for=" (prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">x</i>
            </li>
            
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProp="addProp"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')"> 
                  <a href="javascript:">综合{{orderIcon('1')}}</a>
                </li>
                <li>
                  <a href="javascript:">销量</a>
                </li>
                <li>
                  <a href="javascript:">新品</a>
                </li>
                <li>
                  <a href="javascript:">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:">价格{{orderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="javascript:">价格 ⬇ ⬆</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <router-link :to="`/detail/${goods.id}`"> -->
                    <router-link :to="{name:'detail',params:{skuId:goods.id}}">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">
                      {{goods.title}}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
          <Pagination :pageConfig="{
            total:productList.total,//总记录数量
            pageNo:options.pageNo,
            showPageNo:3,
            pageSize:options.pageSize
            }"
            @changeCurrentPage="getProductList"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapState,mapGetters} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return{
        options:{
          category1Id:'',
          category2Id:'',
          category3Id:'',
          categoryName:'',
          keyword: '',//搜索关键字
          trademark:'',
          order:'1:desc',
          pageNo:1,
          pageSize:5,
          props:[],

        }
      }
    },
    mounted(){//只有在其他路由跳转到当前路由才执行,但是由当前路由跳到当前路由(指定了某些参数),
    //不会创建组件对象即不会执行
      //query:category1Id/category2Id/category3Id
      //params:keyword
      const{query,params}=this.$route
      const options={//将query,params参数添加到optiops(覆盖以前的)
        ...this.options,
        ...query,//categoryName:query.categoryName
        ...params//keyword:params.params
      }
      //更新options
      this.options=options
      //异步搜索参数请求搜索
      this.getProductList()
    },
    components: {
      SearchSelector
    },
    computed:{
      ...mapState({
        productList:state=>state.search.productList
      }),
      ...mapGetters(['goodsList'])
    },
    watch:{
      '$route'(to,form){//对路由变化(自动调用)做出响应
         const{query,params}=this.$route
         const options={
           ...this.options,
           //重置分类相关数据
           categoryName:'',
           category1Id:'',
           category2Id:'',
           category3Id:'',
           ...query,
           ...params
         }
         this.options=options
         this.getProductList()
      }
    },
    methods:{//指定页码搜索商品列表,默认值为1
      getProductList(currentPage=1){
        this.options.pageNo=currentPage
        this.$store.dispatch('getProductList',this.options)
      },
      // 删除时需要重新跳转
      removeCategory(){//移出分类条件
      this.options.categoryName='',
      this.options.category1Id='',
      this.options.category2Id='',
      this.options.category3Id=''
      // this.getProductList()
      //这样做地址栏信息还在,我们应该删除query参数
      this.$router.replace(this.$route.path)//path中可能包含keyword
      },
      removeKeyword(){//移除关键字条件
      this.options.keyword=''
      //通过全局总线分发删除关键字的自定义事件
      this.$bus.$emit('removeKeyword')
      // this.getProductList()//去除params参数
      this.$router.replace({path:'/search',query:this.$route.query})
      },
      removeTrademark(){
        //this.options.trademark=''
        //this.getProductList()
        //delete this.options.trademark//删除已有属性-->不会触发界面更新
        //setter不能监视属性的移除
        this.$delete(this.options,'trademark')
       
      },
      //添加新的品牌
      setTrademark(id,name){
        //this.options.trademark=id+':'+name//(非响应式的)不能直接触发界面更新
        //this.getProductList()//(响应式的)重新获取商品列表
        this.$set(this.options,'trademark',id+':'+name)
      },
      //添加获取商品列表
      addProp(id,value,name){
        const prop=`${id}:${value}:${name}`
        //添加到options的props中去
        if (this.options.props.indexOf(prop)===-1) {
          this.options.props.push(prop)
          this.getProductList()
        }  
      },
      removeProp(index){//删除一个商品属性
        this.options.props.splice(index,1)
        this.getProductList()
      },
      isActive(orderFlag){//排序
      return this.options.order.indexOf(orderFlag)===0
      },
      setOrder(orderFlag){//根据某一项排序(升降)
        // const arr=this.options.order.split(':')//['1':'desc']
        // const flag=arr[0]
        // const orderType=arr[1]
        //解构写法
        let [flag,orderType]=this.options.order.split(':')
        if(orderFlag===flag){//点击当前项
         orderType="desc"?'asc':'desc'
        } else {//点击非当前项
          flag=orderFlag
          orderType="desc"
        }
        this.options.order=flag+':'+orderType//新值
        this.getProductList()
      },
      orderIcon(orderFlag){//得到要显示的标识排序方式图标  '1'/'2'
       const [flag,orderType]=this.options.order.split(':')
       if(orderFlag===flag){//显示图标
         return orderType==='desc'?'⬆':'⬇'
        }else{//不显示图标
        return ''
        }
      },
      //分页之分发事件
      // changeCurrentPage(currentPage){
      //   //更新当前页码
      //   //this.options.pageNo=currentPage
      //   //重新发送请求来更新页码
      //   this.getProductList(currentPage)

      // }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>