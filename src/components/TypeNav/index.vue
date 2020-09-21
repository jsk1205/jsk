<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst=true" @mouseleave="hideCate">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" v-if="isShowFirst" @click="toSearch">
            <div class="all-sort-list2">
              <!-- item_on:true 来监控鼠标是否移上来了 -->
              <div
                class="item"
                :class="{item_on:currentIndex===index}"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="showSub(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <router-link :to="{path:'/search',query:{categoryName:c1.categoryName,
                  category1Id:c1.categoryId}}">{{c1.categoryName}}</router-link>-->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <router-link :to="{path:'/search',query:{categoryName:c2.categoryName,
                        category2Id:c2.categoryId}}">{{c2.categoryName}}</router-link>-->
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                          <!-- <router-link :to="{path:'/search',query:{categoryName:c3.categoryName,
                          category3Id:c3.categoryId}}">{{c3.categoryName}}</router-link>-->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; //读取数据-->映射
// import _ from 'lodash'//会打包整个lodash库
import throttle from "lodash/throttle"; //按需打包

export default {
  name: "TypeNav",
  data() {
    //在data里面读不到$route.path
    return {
      isShowFirst: true,
      currentIndex: -1 //需要显示2/3级分类列表的一级分类下标
    };
  },
  methods: {
    // showSub:_.throttle(function(index){//通过lodash对象_的throttle方法来处理
    showSub: throttle(function(index) {
      //按需引入的
      // console.log('处理事件',index)
      this.currentIndex = index;
    }, 500),
    toSearch(event) {
      //点击某个分类项跳到search路由
      const dataset = event.target.dataset;
      //得到标签上的data自定义属性
      // console.log('dataset',dataset)
      const { categoryname, category1id, category2id, category3id } = dataset;
      if (categoryname) {
        //跳转路由携带quert参数
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //得到当前路由路径
        const path = this.$route.path;
        if (path.indexOf("/search") === 0) {
          //当前为搜索界面时
          this.$router.replace({ path, query });
          //replace 是为了后面直接跳转到home
        } else {
          //当前没在搜索界面时
          this.$router.push({ path: "/search", query });
        }
      }
    },
    hideCate() {
      //出了2/3级列表就隐藏
      this.currentIndex = -1;
      //1级只有不在首页时才隐藏
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    }
  },
  mounted() {
    //得到当前路由路径
    const path = this.$route.path;
    //若不在首页指定隐藏一级分类列表
    if (path != "/") {
      this.isShowFirst = false;
    }
  },
  computed: {
    //...mapState(['home']),//{baseCategoryList:[]}
    //不能直接写 home.baseCategoryList-->mapState的辅助函数
    // ...mapState({
    //   home:'home'
    // })//也不能直接写home.baseCategoryList
    ...mapState({
      //计算属性值由vue自动调用右侧的函数返回(state=>state.count:回调函数)
      //state是vue自动传的总state对象
      categoryList: state => state.home.baseCategoryList
    })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.move-enter-active,&.move-leave-active{
        transition:all .3s ;
      }
      &.move-enter,&.move-leave-to{
        opacity: 0;
        height: 0;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>