<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>讲师管理</el-breadcrumb-item>
      <el-breadcrumb-item>讲师列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row class="search">
        <el-input
          placeholder="请输入讲师名称"
          class="input-with-select"
          v-model="searchStr"
          clearable
          @clear="getTeacherList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchTeacher"
          ></el-button>
        </el-input>
      </el-row>

      <!-- 讲师列表 -->
      <el-table :data="teacherList" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="100">
        </el-table-column>
        <el-table-column prop="intro" label="介绍" width="200">
        </el-table-column>
        <el-table-column prop="career" label="资历"> </el-table-column>
        <el-table-column prop="level" label="级别" width="100">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.level === 1">一级</el-tag>
            <el-tag size="mini" v-else-if="scope.row.level === 2">二级</el-tag>
            <el-tag size="mini" v-else-if="scope.row.level === 3">三级</el-tag>
            <el-tag size="mini" v-else>四级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="50"> </el-table-column>
        <!-- <el-table-column prop="joinDate" label="添加时间"></el-table-column> -->
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="checkTeacher(scope.row.id)"
              >查看</el-button
            >
            <router-link :to="'/teacher/edit/' + scope.row.id">
              <!-- 编辑按钮 -->
              <el-button type="warning" size="mini">编辑</el-button>
            </router-link>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              @click="deleteTeacherById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TeacherList",
  data() {
    return {
      // 搜索讲师的输入框
      searchStr: "",
      // 讲师列表
      teacherList: [
        {
          name: "",
          intro: "",
          career: "",
          level: "",
          sort: "",
          joinDate: "",
        },
      ],
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    // 清空搜索内容
    clearInput() {},
    // 点击查看讲师
    async checkTeacher(teacherId) {
      this.$router.push(`/teacher/course/${teacherId}`);
      // console.log(result);
    },
    // 点击搜索讲师
    async searchTeacher() {
      const { data: result } = await this.$http.get(
        `/admin/edu/teacher/list/teacher/${this.searchStr}/0`
      );
      if (result.code !== 200) {
        return this.$message.info("暂无此讲师！！");
      }
      // console.log(result);
      this.teacherList = result.data;
    },
    //   获取讲师列表
    async getTeacherList() {
      const { data: res } = await this.$http.get("/admin/edu/teacher/list");
      this.teacherList = res;
      // console.log(res);
    },
    // 根据Id删除讲师
    async deleteTeacherById(teacherId) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除讲师, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult == "cancel") {
        return this.$message.info("已取消删除");
      } else {
        const { data: result } = await this.$http.delete(
          `/admin/edu/teacher/remove/${teacherId}`
        );
        this.$message.success("删除讲师成功！！！");
        this.getTeacherList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-button {
  margin-right: 10px;
}
.search {
  width: 300px;
}
</style>