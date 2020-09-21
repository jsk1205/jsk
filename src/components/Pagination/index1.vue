<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button :disabled="currentPage===1" 
    @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start>2">···</button>
    <!-- 连续页码 -->
    <!-- 注意v-if的优先级低于v-for: 遍历每个元素时解析v-if -->
    <button v-for="no in startEnd" :key="no"
    v-if="no>=startEnd.start"
    :class="{active:currentPage===no}"
    >{{no}}
    </button>
    

    <!-- 省略号 -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left:30px">共{{pageConfig.total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data(){
      return{
      //在data中可以读取props和vue原型对象上的属性
      //不能直接读取data对象中的数据
        currentPage:this.pageConfig.pageNo
      }
    },
    props:{
      pageConfig:{
        type:Object,
        default:{
          total:0,//总记录数量
          pageSize:10,//一页最多显示几条记录
          pageNo:1,//当前页码
          showPageNo:5 //连续显示的页码数
        }
      }
    },
    methods:{
      //当前页码改为指定页码
      changeCurrentPage(page){
        this.currentPage=page
      }
    },
    computed:{//计算连续页码 start end
    //总页码数 
      totalPages(){
        const {total,pageSize}=this.pageConfig
        return Math.ceil(total/pageSize)
      },
    //  currentPage:当前页码  showPageNo:连续显示几页码  totalPages 总页码数
      startEnd(){
        const currentPage=this.currentPage
        const showPageNo=this.pageconfig.showPageNo
        const totalPages=this.totalPages
      //const {totalPages,currentPage,pageconfig:{showPageNo}}=this

        let start=0
        let end=0
        start=currentPage-Math.floor(showPageNo/2)
        if (start<1) {
          start=1
        }
        end=start+showPageNo-1
        if (end>totalPages) {
          end=totalPages
          start=end-showPageNo+1
          if(start<1){
            start=1
          }
        }
        return {state,end}
      },

    }
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>