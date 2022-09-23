<template>
  <div class="container">
    <el-form :inline="true" :model="formline" class="demo-form-inline">
      <el-form-item label="角色名称:">
        <el-input
          v-model="formline.user"
          placeholder="角色名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限字符:">
        <el-input
          v-model="formline.region"
          placeholder="权限字符"
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
        <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-search"
          >查询</el-button
        >
        <el-button @click="reset" size="small" icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          size="mini"
          type="primary"
          plain
          @click="add"
          icon="el-icon-plus"
          >新增</el-button
        ></el-col
      >
      <el-col :span="1.5"
        ><el-button
          size="mini"
          @click="handleExport"
          plain
          icon="el-icon-upload2"
          >导入</el-button
        ></el-col
      >
      <el-col :span="1.5"
        ><el-button size="mini" @click="port" plain icon="el-icon-download"
          >导出</el-button
        ></el-col
      >
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="角色编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="date" label="角色名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="权限字符" width="180" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="opt" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['data:markScreenData:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['data:markScreenData:remove']"
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
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formline: {
        user: "",
        region: "",
      },
      value1: null,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage4: 1,
    };
  },
  created() {
    // console.log(this.value1, "value1");
  },
  methods: {
    onSubmit() {},
    reset() {},
    handleExport() {},
    port() {},
    add() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleUpdate(row) {
      //   this.reset();
      //   const id = row.id || this.ids
      //   getMarkScreenData(id).then(response => {
      //     this.form = response.data;
      //     this.open = true;
      //     this.title = "修改数据";
      //   });
    },
    handleDelete(row) {
      //   const ids = row.id || this.ids;
      //   this.$modal.confirm('是否确认删除大屏数据编号为"' + ids + '"的数据项？').then(function() {
      //     return delMarkScreenData(ids);
      //   }).then(() => {
      //     this.getList();
      //     this.$modal.msgSuccess("删除成功");
      //   }).catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
}
</style>