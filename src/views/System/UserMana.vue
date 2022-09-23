<template>
  <div class="container">
    <el-row :gutter="20">
      <el-form
        :inline="true"
        :model="formline"
        ref="formline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称:" prop="userName">
          <el-input
            v-model="formline.userName"
            placeholder="请输入用户名称"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phonenumber">
          <el-input
            v-model="formline.phonenumber"
            placeholder="请输入手机号码"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker
            size="small"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
            size="mini"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button @click="resetQuery" size="mini" icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleAdd"
            icon="el-icon-plus"
            >新增</el-button
          ></el-col
        >
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            >修改</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            >删除</el-button
          >
        </el-col>
        <el-col :span="1.5"
          ><el-button
            type="info"
            size="mini"
            @click="handleImport"
            plain
            icon="el-icon-upload2"
            >导入</el-button
          ></el-col
        >
        <el-col :span="1.5"
          ><el-button
            type="warning"
            size="mini"
            @click="handleExport"
            plain
            icon="el-icon-download"
            >导出</el-button
          ></el-col
        >
      </el-row>

      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column
          type="index"
          label="用户编号"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="update"
          label="创建时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="opt" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      >
      </el-pagination>
    </el-row>
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <!-- <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择归属部门"
              /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户名称"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formline: {
        userName: "",
        phonenumber: "",
      },
      multiple: true,
      value1: null,
      tableData: [
        {
          update: "2016-05-02",
          name: "王小虎",
          nickname: "shh",
          department: "工信",
          phone: "12345678901",
        },
        {
          update: "2016-05-02",
          name: "王小虎",
          nickname: "shh",
          department: "工信",
          phone: "12345678901",
        },
        {
          update: "2016-05-02",
          name: "王小虎",
          nickname: "shh",
          department: "工信",
          phone: "12345678901",
        },
        {
          update: "2016-05-02",
          name: "王小虎",
          nickname: "shh",
          department: "工信",
          phone: "12345678901",
        },
      ],
      pageNum: 1,
      pageSize: 10,
      currentPage4: 1,
      single: true,
      open: false,
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        // headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        // url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 表单参数
      form: {},
      deptOptions: null,
      title: "",
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // console.log(this.value1, "value1");
  },
  methods: {
    //搜索
    onSearch() {},
    // 重置
    resetQuery() {
      //   this.dateRange = [];
      //   this.resetForm("formline");
      this.onSearch();
    },
    //导入
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
    //   this.download('system/user/importTemplate', {
    //   }, `user_template_${new Date().getTime()}.xlsx`)
    },
    //导出
    handleExport() {},
    // 新增
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户";
    },
    // 修改
    handleUpdate(row) {
      this.reset();
      //   const id = row.id || this.ids
      //   getMarkScreenData(id).then(response => {
      //     this.form = response.data;
      this.open = true;
      this.title = "修改用户";
      //   });
    },
    // 删除
    handleDelete(row) {
      //   const ids = row.id || this.ids;
      //   this.$modal.confirm('是否确认删除大屏数据编号为"' + ids + '"的数据项？').then(function() {
      //     return delMarkScreenData(ids);
      //   }).then(() => {
      //     this.getList();
      //     this.$modal.msgSuccess("删除成功");
      //   }).catch(() => {});
    },
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    // 表单
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        // userId: undefined,
        // deptId: undefined,
        // userName: undefined,
        // nickName: undefined,
        // password: undefined,
        // phonenumber: undefined,
        // email: undefined,
        // sex: undefined,
        // status: "0",
        // remark: undefined,
        // postIds: [],
        // roleIds: []
      };
      //   this.resetForm("form");
    },
    submitForm: function () {
      //   this.$refs["form"].validate(valid => {
      //     if (valid) {
      //       if (this.form.userId != undefined) {
      //         updateUser(this.form).then(response => {
      //           this.$modal.msgSuccess("修改成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       } else {
      //         addUser(this.form).then(response => {
      //           this.$modal.msgSuccess("新增成功");
      //           this.open = false;
      //           this.getList();
      //         });
      //       }
      //     }
      //   });
    },
    // 导入
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
    //   this.$refs.upload.clearFiles();
    //   this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
    //   this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
}
</style>