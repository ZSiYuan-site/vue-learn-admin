<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>营销管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程营销</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 选择的区域 -->
      <el-row>
        讲师名称 :
        <el-select
          v-model="selectedTeacherId"
          placeholder="请选择讲师名称"
          @change="selectedTeacherChange"
        >
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        &nbsp; 课程名称 :
        <el-select
          v-model="selectedCourseId"
          placeholder="请选择课程名称"
          @change="selectedCourseChange"
        >
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        &nbsp;
        <el-button type="primary" @click="handleClickBtn">查询</el-button>
      </el-row>
      <!-- 表单区域 -->
      <template>
        <el-form
          :data="courseMarket"
          label-width="100px"
          v-if="formVisible === true"
        >
          <el-form-item label="咨询qq">
            <el-input v-model="courseMarket.qq"></el-input>
          </el-form-item>
          <el-form-item label="课程开始时间">
            <el-input v-model="courseMarket.startTime"></el-input>
          </el-form-item>
          <el-form-item label="课程结束时间">
            <el-input v-model="courseMarket.endTime"></el-input>
          </el-form-item>
          <el-form-item label="课程原价">
            <el-input v-model="courseMarket.price_old"></el-input>
          </el-form-item>
          <el-form-item label="课程折后价">
            <el-input v-model="courseMarket.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editCourseMarketInfo"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
        <div class="panel" v-else>请选择课程</div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制营销课程信息表单的显示与隐藏
      formVisible: "false",
      // 选中的课程
      selectedCourseId: "",
      // 讲师的课程列表
      courseList: [],
      // 课程营销的表单对象
      courseMarket: {
        id: "",
        valid: "",
        qq: "",
        startTime: "",
        endTime: "",
        price_old: "",
        price: "",
      },
      // 讲师列表
      teacherList: [],
      // 已经选中的讲师id
      selectedTeacherId: "",
      // 获取讲师的课程的请求参数
      queryInfo: {
        page: "0",
        rows: "0",
        key: "",
      },
    };
  },
  created() {
    this.getTeacher();
  },
  methods: {
    // 点击确认修改课程营销信息
    async editCourseMarketInfo() {
      const { data: result } = await this.$http.put(
        `/admin/edu/course/coursemarket/update/${this.courseMarket.id}`,
        this.courseMarket
      );
      if (result.code !== 20000) {
        return;
      }
      this.$message.success("修改成功！！");
      console.log(result);
    },
    // 点击查询按钮
    async handleClickBtn() {
      const { data: result } = await this.$http.get(
        `/admin/edu/course/coursemarket/get/${this.selectedCourseId}`
      );
      this.courseMarket = result;
      this.formVisible = true;
      console.log(result);
    },
    // 讲师的课程选择器变化的回调函数
    selectedCourseChange() {
      console.log(this.selectedCourseId);
    },
    // 根据讲师id获取其对应的课程
    async getCourseById() {
      const { data: result } = await this.$http.post(
        "/admin/edu/course/courseinfo/self/list",
        this.queryInfo
      );
      this.courseList = result.data;
      // console.log(this.courseList);
    },
    // 讲师选择器变化的回调
    selectedTeacherChange() {
      this.formVisible = false;
      this.selectedCourseId = "";
      // console.log(this.selectedTeacherId);
      this.queryInfo.key = this.selectedTeacherId;
      this.getCourseById();
    },
    async getTeacher() {
      const { data: result } = await this.$http.get("/admin/edu/teacher/list");
      this.teacherList = result;
      // console.log(result);
    },
  },
};
</script>

<style>
.el-form {
  margin-top: 30px;
}
.panel {
  height: 300px;
  color: #dcdfe6;
  font-size: 30px;
  text-align: center;
  line-height: 300px;
}
</style>