<template>
  <div class="center-box">
    <div class="login-box">
      <div class="title">用户登录</div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="code" v-if="captchaOnOff">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item> -->
        <el-checkbox
          v-model="loginForm.rememberMe"
          style="margin: 0px 0px 25px 0px"
          >记住密码</el-checkbox
        >
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right" v-if="register">
            <router-link class="link-type" :to="'/register'"
              >立即注册</router-link
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的用户名" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      register: false,
      loading: false,
    };
  },
  created() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$router.push("/home");
          //   if (this.loginForm.rememberMe) {
          //     Cookies.set("username", this.loginForm.username, { expires: 30 });
          //     Cookies.set("password", encrypt(this.loginForm.password), {
          //       expires: 30,
          //     });
          //     Cookies.set("rememberMe", this.loginForm.rememberMe, {
          //       expires: 30,
          //     });
          //   } else {
          //     Cookies.remove("username");
          //     Cookies.remove("password");
          //     Cookies.remove("rememberMe");
          //   }
          // this.$api.post("api/user/login", params).then((res) => {
          //   if (res.err_code === 1) {
          //     // 把用户的基本信息储存在vuex，中
          //     this.$store.dispatch("setBaseInfo", res.data).then(() => {
          //       // 获取有权限的路由表，添加到路由
          //       router.addRoutes(this.$store.getters.addRouters);
          //       this.$router.push({ name: "home" });
          //     });
          //   }
          //   this.loading = false;
          // });
          //   this.$store
          //     .dispatch("Login", this.loginForm)
          //     .then(() => {
          //       //   this.getInfo();
          //       this.$router.push("/Home");
          //       // this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          //     })
          //     .catch(() => {
          //       this.loading = false;
          //       this.$message.error("登陆失败");
          //     });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.center-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    border-radius: 4px;
    background: #fff;
    padding: 32px 32px 0;
    width: 300px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.2);
    .title {
      text-align: center;
      margin-bottom: 24px;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}
</style>