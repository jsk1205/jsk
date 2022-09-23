<template>
  <!-- <a-config-provider> -->
    <div id="app">
      <!-- <div v-if="loading" class="a-loading-wrap">
        <a-spin
          class="a-loading"
          :spinning="loading"
          tip="数据加载中..."
          size="large"
        ></a-spin>
      </div> -->
      <router-view></router-view>
    </div>
  <!-- </a-config-provider> -->
</template>
<script>
import store from "@/store";
import { mapGetters, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loading: (state) => state.app.loading,
    }),
  },
  mounted(){
    console.log(this.loading,'----')
  }
};
</script>

<style lang="scss"  scoped>
#app {
  height: 100%;
  width: 100%;
  background-color: #e7eaf5;
}
</style>
