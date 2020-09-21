<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{userInfo.name}}</span>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder" >我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/Logo.png" alt />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    //通过全局事件总线绑定removeKeyword事件监听
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        alert(error.message);
      }
    },
    toSearch() {
      //1.利用router对象来跳转路由,控制台会抛出错误
      //this.$router:得到的是路由器对象(包含跳转路由的一些方法)
      // this.$router.push('/search',()=>{//解决1.指定成功回调函数-->不报错
      //   //console.log('跳转成功')
      // })

      // this.$router.push('/search')
      //携带query参数-->search取到数据
      //路径形式
      //this.$router.push(`/search?keyword=${this.keyword}`)
      //对象形式
      //this.$router.push({path:'/search',query:{keyword:this.keyword}})

      //使用params参数时
      //this.$router.push(`/search/${this.keyword}`)
      //对象形式
      //this.$router.push({path:'/search',params:{keyword:this.keyword}})//不可以
      //此时未把数据带过去--需要为路由指定个name属性
      const { path } = this.$route;
      if (this.keyword) {
        //判断params是否为空时(前提是你的params参数为可有或者可无的)
        if (path.indexOf("/search") === 0) {
          //在当前搜索页面,携带query和params参数
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
            query
          });
        } else {
          //不在搜索页面,携带params参数
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword }
          });
        }
      } else {
        if (path.indexOf("/search") === 0) {
          //在当前搜索页面,携带query参数
          this.$router.push({ name: "search", query });
        } else {
          //不在搜索页面
          this.$router.push({ name: "search" });
        }
      }

      //this.$route:得到的是当前路由信息对象(包含的是当前路由的相关数据属性:如path,params,meta等)
      //this.$route.push('/search')
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
