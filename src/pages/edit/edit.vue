<template>
<!-- loading动画 -->
    <div class="container"
        
        v-loading="loading"
        element-loading-text=""
        element-loading-spinner="date"
        element-loading-background="rgba(0, 0, 0, 0)"
    >
        标签列表
        <el-button type="primary" plain class="ml20" @click="addwork">新增标签</el-button>
        <div class="status">
            <!-- ///岗位状态 -->
            <el-row class="block-col-2">
                <el-col :span="12" style="width:300px;">
                        <el-form ref="form" :model="form" label-width="80px">
                            <span class="demonstration">状态：</span>
                                <el-select v-model="form.region" placeholder="全部" style="width: 157px;">
                                    <el-option label="全部"  value=""></el-option>
                                    <el-option label="启用" :value="1"></el-option>
                                    <el-option label="停用" :value="0"></el-option>
                                </el-select>
                        </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="info" size="medium" plain style="float:right;margin-left:20px;" @click="reset">重置</el-button>
                <el-button type="success" size="medium" plain style="float:right;" @click="toquery">查询</el-button>
            </el-row>
        </div>
        <!-- 负责人管理表单 -->
         <el-table
            ref="multipleTable"
            :data="tableData"
            class="table"
            border
            style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column
                width="100px"
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                prop="cLabelTypeName"
                label="标签内容"
                >
            </el-table-column>
            <el-table-column
                prop="cSortNumber"
                label="排序"
                width="300">
            </el-table-column>
            <el-table-column
                prop="cUsedStatus"
                label="状态">
                <template slot-scope="scope">
                    {{ scope.row.cUsedStatus==="1" ? '启用' : '停用' }}
                </template>
            </el-table-column>
             <el-table-column
                fixed="right"
                label="操作"
               >
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="addwork(scope.row)" class="cumula">修改</el-button>
                    <el-button type="text" v-if="scope.row.cUsedStatus == 1" size="small" @click="stop(scope.row.id)">停用</el-button>
                    <el-button type="text" v-if="scope.row.cUsedStatus == 0" size="small" @click="enable(scope.row.id)" >启用</el-button>
                    <el-button @click="deletepost(scope.row.id)" type="text" size="small" class="cumula">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- ////分页 -->
         <div class="block" style="float:right;margin-bottom:100px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="quest.pageNo"
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="quest.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!--弹窗-->
        <el-dialog center width="500px" :before-close="handleClose" :visible.sync="dialogFormVisible">
            <el-form :model="post" :rules="rule" >
                <el-form-item label="标签内容" label-width="100px" prop="cLabelTypeName">
                    <el-input v-model="post.cLabelTypeName" maxlength="12" show-word-limit autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" label-width="100px" prop="cSortNumber">
                    <el-input v-model="post.cSortNumber" maxlength="12" show-word-limit autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
js代码
<script>
    // import '../../assets/css/common.css'
  export default {
    name:'edit',
    data() {
      return {
        //   状态
        form: {
          region:''
        },
        loading:false,
        modifylist: [],
        post:{
            cLabelTypeName:'',
            cSortNumber:''
        },
        dialogFormVisible:false,
        ///输入框
        inputs: '',
        input: '',
        //   table表格数据
        tableData: [],
        multipleSelection: [],
        quest: {
              pageNo: 1,
              pageSize: 10,
        },
        total:0,
        rule:{
            cLabelTypeName: [
                { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            cSortNumber: [
                { required: true, message: '请输入描述', trigger: 'blur' }
            ],
        },
        fixid:null
      }
    },
    mounted() {
        this.getlist();
    },
      methods: {
///表单数据列表
        getlist(){
            this.loading = true;
            this.$http.post('v1/api/labelList/selectAll',{
                pageNo:this.quest.pageNo, ///条数
                pageSize:this.quest.pageSize,///页数
                cUsedStatus:this.form.region
            }).then(res => {
                this.loading = false;
　　　　　　////判断 如果数据code值是200 继续执行
                if (res.data.code === 200) {
                    this.tableData = res.data.data.records;
                    this.total = res.data.data.total;
                }
            }, err => {

            }).catch((error) => {

            });
        },
          ////修改
          modify(row) {
              this.dialogFormVisible = true;
              this.ruleForm.leaderName = row.cLeaderName
              this.ruleForm.leaderMobile = row.cLeaderMobile
              if ( row.cSupplierPositionId) {
                  this.checkedPost = (row.cSupplierPositionId.split(",")).map(Number);
              }
          },
          ///新增窗口关闭
          handleClose(){
              this.checkedPost = []
              this.dialogFormVisible = false;
              this.tableData.leaderName="";
              this.tableData.leaderMobile=""
          },
          addwork(row){
              this.dialogFormVisible = true;
              if(row){
                  this.post.cLabelTypeName = row.cLabelTypeName;
                  this.post.cSortNumber = row.cSortNumber;
                  this.fixid = row.id;
              }else{
                  this.fixid = null;
              }
          },
          ////新增提交
          submit(){
              this.loading = true;
              let url = 'v1/api/labelList/save';
              let msg = '新增成功'
              if(this.fixid){
                  this.$set(this.post,'id',this.fixid);
                  url = 'v1/api/labelList/update'
                  msg = "修改成功"
              }else{
                  this.$delete(this.post,'id')
              }
              this.$http.post(url,this.post).then(res => {
                  this.loading = false;
                  if(res.data.code === 200){
                      this.$message({
                          type: 'success',
                          message: msg
                      });
                      this.dialogFormVisible = false;
                      this.post = {
                          cLabelTypeName:'',
                          cSortNumber:''
                      }
                      this.getlist();
                  }else{
                      this.$message({
                          type: 'error',
                          message: res.data.message
                      });
                  }
              }, err => {

              }).catch((error) => {

              });
          },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
         /////停用
          stop(id) {
              this.$confirm('停用后该负责人无法继续在APP端提供服务，是否继续？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.loading = true;
                  this.$http.post('v1/api/labelList/updateStatus',{id:id,cUsedStatus:0}).then(res => {
                      console.log(res)
                      this.loading = false;
                      if(res.data.code === 200){
                          this.$message({
                              type: 'success',
                              message:'停用成功'
                          });
                          this.getlist();
                      }else{
                          this.$message({
                              type: 'error',
                              message: res.data.message
                          });
                      }
                  }, err => {

                  });
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
          /////启用
          enable(id){
              this.$confirm('是否启用？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.loading = true;
                  this.$http.post('v1/api/labelList/updateStatus',{id:id,cUsedStatus:1}).then(res => {
                      // this.loading = false;
                      if(res.data.code === 200){
                          this.$message({
                              type: 'success',
                              message:'启用成功'
                          });
                          this.getlist();
                      }else{
                          this.$message({
                              type: 'error',
                              message: res.data.message
                          });
                      }
                  }, err => {

                  });
              }).catch(() => {

              });
          },
        deletepost(id){
            this.$confirm('该岗位下已配置负责人，删除后会导致该负责人无法继续提供服务，是否删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                this.$http.post('v1/api/labelList/delete',{id:id}).then(res => {
                    this.loading = false;
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.currentPage = 1;
                        this.getlist();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }, err => {

                }).catch((error) => {

                });
            }).catch(() => {

            });
        },
        //分页
         handleSizeChange(val) {
            this.currentsize = val;
            this.getlist()
         },
         handleCurrentChange(val) {
             this.currentPage = val;
             this.getlist()
         },
          toquery(){
            this.getlist();
          },
          reset(){
            this.form = {
                region:''
            };
            this.getlist();
          }
    }
  }
</script>

css样式
<style scoped lang="less">
    .status {
        margin-top: 20px;
    }
    .demonstration {
        margin-right:20px;
    }
    .table {
        margin-top: 30px;
    }
    .cumula {
        padding:0 9px;
    }
    .el-input{
        width: 200px;
    }
/////页面加载小齿轮
    /deep/.el-loading-spinner {
        background: url(../../assets/images/login/loading.gif) no-repeat;
        background-size: 70px;
        background-position: 50% 40%;
        height: 100px;
    }
</style>
