<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row class="btn">
        <el-button type="primary" class="btn" @click="addCategory"
          >添加分类</el-button
        >
      </el-row>
      <tree-table
        :data="coursesCategoryList"
        :columns="columns"
        show-index
        :selection-type="false"
        :expand-type="false"
        border
      >
        <template slot="isok">
          <i class="el-icon-success" style="color: lightgreen"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.id.split('-').length === 2"
            >一级</el-tag
          >
          <el-tag v-else size="mini" type="success">二级</el-tag>
        </template>
      </tree-table>
    </el-card>

    <!-- 添加课程分类对话框 -->
    <el-dialog
      title="添加课程分类"
      :visible.sync="addCourseCateDialogVisible"
      width="50%"
      @closed="addCourseCateDialogClosed"
    >
      <span>
        <el-form
          :model="addCourseCateForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="addCourseCateFormRule"
          ref="addCourseCateFormRef"
        >
          <el-form-item label="课程id" prop="id">
            <el-input v-model="addCourseCateForm.id"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-select
              v-model="selectedKey"
              placeholder="请选择"
              @change="selectChange"
            >
              <el-option
                v-for="item in coursesCategoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="name">
            <el-input
              v-model="addCourseCateForm.name"
              placeholder="请输入二级分类名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCourseCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCourseCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addCourseCateFormRule: {
        id: [{ required: true, message: "请输入课程id", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
      },
      selectedKey: "",
      // 添加课程分类表单
      addCourseCateForm: {
        id: "",
        name: "",
        parentid: "",
      },
      // 控制添加课程分类对话框的显示与隐藏
      addCourseCateDialogVisible: false,
      // table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
      ],
      // 课程分类列表
      coursesCategoryList: [],
    };
  },
  created() {
    this.$store.dispatch(getCoursesListAction);
    this.getCoursesList();
  },
  methods: {
    // 添加课程分类对话框关闭
    addCourseCateDialogClosed() {
      this.$refs.addCourseCateFormRef.resetFields();
      this.selectedKey = "";
    },
    // 点击确定  提交 添加课程分类
    submitAddCourseCate() {
      this.$refs.addCourseCateFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: result } = await this.$http.post(
          "/admin/edu/course/coursecate/",
          this.addCourseCateForm
        );
        if (result.code !== 200) {
          return;
        }
        this.$message.success("新增课程分类成功！！");
        this.getCoursesList();
        this.addCourseCateForm = {};
        this.selectedKey = "";
        this.addCourseCateDialogVisible = false;
        // console.log(result);
      });
    },
    // 选择器发生变化的回调
    selectChange() {
      // console.log(this.selectedKey);
      this.addCourseCateForm.parentid = this.selectedKey;
    },
    // 点击添加分类
    addCategory() {
      this.addCourseCateDialogVisible = true;
    },
    // 获取课程分类列表
    async getCoursesList() {
      // const { data: result } = await this.$http.get(
      //   "/admin/edu/course/coursecate/list"
      // );
      const result = await getCoursesList();
      // 删除掉第一项
      result.children.splice(0, 1);
      // console.log(result.children);
      this.coursesCategoryList = result.children;
      console.log(this.coursesCategoryList);
    },
  },
  computed: {
    ...mapState({
      coursesCategoryList: (state) => state.courseList,
    }),
  },
};
</script>

<style>
.btn {
  margin-bottom: 15px;
}
</style>