<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>讲师管理</el-breadcrumb-item>
      <el-breadcrumb-item>讲师课程</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->

    <el-card>
      <el-table :data="teacherCourses" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <!-- <el-table-column
          prop="ap"
          label="先修课程"
          width="100"
        ></el-table-column> -->
        <el-table-column prop="name" label="课程名称" width="100">
        </el-table-column>
        <el-table-column prop="description" label="课程描述"> </el-table-column>
        <el-table-column label="课程状态" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '202002'">已发布</el-tag>
            <el-tag v-else type="danger">未发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="checkCoursePlan(scope.row)"
              >查看</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="publicCourse(scope.row.id)"
              >发布</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="editCourse(scope.row.id)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 讲师的总课程数
      total: 0,
      // 获取讲师课程的请求参数
      queryInfo: {
        page: "0",
        rows: "0",
        key: "",
      },
      // 讲师的课程列表
      teacherCourses: [],
    };
  },
  created() {
    this.queryInfo.key = this.$route.params.id;
    this.getTeacherCourse();
  },
  methods: {
    // 点击查看 去查看课程计划
    checkCoursePlan(row) {
      // console.log(row)
      this.$router.push(`/course/plan/${row.id}`);
    },
    // 点击编辑课程
    async editCourse(courseId) {
      this.$router.push(`/course/info/${courseId}`);
      // const result = await this.$http.put(
      //   `/admin/edu/course/courseinfo/update/${courseId}`
      // );
      // console.log(result);
    },
    // 点击发布课程
    async publicCourse(courseId) {
      const result = await this.$http.get(
        `/admin/edu/course/courseview/publish/${courseId}`
      );
      if (result.status !== 200) {
        return this.$message.error("课程发布失败，请重试！！");
      }
      this.$message.success("课程发布成功！！");
      // console.log(result);
    },
    async getTeacherCourse() {
      const { data: result } = await this.$http.post(
        "/admin/edu/course/courseinfo/self/list",
        this.queryInfo
      );
      this.teacherCourses = result.data;
      this.total = result.total;
      // console.log(result);
    },
  },
};
</script>

<style>
</style>