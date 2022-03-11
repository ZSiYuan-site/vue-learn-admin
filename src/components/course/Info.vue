<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <template>
        <el-breadcrumb-item v-if="!$route.params.id"
          >添加课程</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else>修改课程</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-card>
      <div>
        <h2 v-if="!$route.params.id">发布新课程</h2>
        <h2 v-else>修改课程</h2>
      </div>

      <el-form
        label-width="80px"
        :model="courseInfoForm"
        :rules="courseInfoFormRules"
        ref="courseInfoFormRef"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="课程标题" prop="name">
              <el-input
                v-model="courseInfoForm.name"
                placeholder="事例: 前端项目课,从基础到精通"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 课程分类 -->
        <el-form-item label="课程分类">
          <el-cascader
            expand-trigger="hover"
            :options="CourseCategoryOptions"
            v-model="selectedOptions"
            @change="cascaderHandleChange"
            :props="cascaderProps"
          >
          </el-cascader>
        </el-form-item>

        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select v-model="courseInfoForm.userid" placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 总课时 -->
        <el-form-item label="总课时">
          <el-input-number
            v-model="courseInfoForm.lessonNum"
            controls-position="right"
            :min="1"
            :max="20"
          ></el-input-number>
        </el-form-item>

        <!-- 课程简介 -->
        <el-form-item label="课程简介">
          <quill-editor v-model="courseInfoForm.description"></quill-editor>
        </el-form-item>

        <!-- 课程封面 -->
        <el-form-item label="课程封面">
          <el-upload
            list-type="picture-card"
            :action="uploadURL"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :on-exceed="handleloadExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 课程价格 -->
        <el-form-item label="课程价格">
          <el-input-number
            v-model="courseInfoForm.buyCount"
            controls-position="right"
            :min="0"
          ></el-input-number>
          元
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCourseInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 添加课程基本信息表单的验证规则
      courseInfoFormRules: {
        name: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
      },
      // 讲师列表
      teacherList: [],
      teacherListOptions: [],
      // 课程分类 级联选择器的配置项
      cascaderProps: {
        value: "id",
        label: "name",
        children: "children",
      },
      // 级联选择器 选中的值
      selectedOptions: [],
      CourseCategoryOptions: [],
      // 上传课程封面的url
      uploadURL: "http://fgcy-333.gnway.cc/admin/oss/file/upload",
      // 提交的表单数据
      courseInfoForm: {
        name: "",
        mt: "",
        st: "",
        description: "",
        userid: "",
        lessonNum: 0,
        buyCount: 0,
        pic: "",
      },
    };
  },
  created() {
    this.getTeacherList();
    this.getCourseList();
    this.init();
  },
  methods: {
    // 文件超出个数限制时的钩子
    handleloadExceed(file, fileList) {
      this.$message.warning("想要重新上传图片封面，请删除已上传的图片封面");
    },
    // 级联选择器 改变的回调
    cascaderHandleChange() {
      // console.log(this.selectedOptions);
      this.courseInfoForm.mt = this.selectedOptions[0];
      this.courseInfoForm.st = this.selectedOptions[1];
    },
    // 课程封面上传成功的回调函数
    handleAvatarSuccess(res, file) {
      this.courseInfoForm.pic = res.data.fileSystem.filePath;
      // console.log(res);
    },
    // 课程封面上传之气的回调
    beforeAvatarUpload(file) {
      // 规定上传的图片的格式以及大小
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        return this.$message.error("上传封面图片只能是JPG格式！");
      }
      if (!isLt2M) {
        return this.$message.error("上传封面图片大小不能超过2MB！");
      }
      return isJPG && isLt2M;
    },
    // 保存课程基本信息
    saveCourseInfo() {
      // 去除富文本编辑器自带的标签
      this.courseInfoForm.description = this.courseInfoForm.description.replace(
        /<[^>]+>/g,
        ""
      );
      this.$refs.courseInfoFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 发布新课程
        if (!this.$route.params.id) {
          const { data: result } = await this.$http.post(
            "/admin/edu/course/courseinfo/save/info",
            this.courseInfoForm
          );
          if (result.code !== 20000) {
            return;
          }
          this.$message.success("保存成功");
          this.$refs.courseInfoFormRef.resetFields();
          this.courseInfoForm = {};
          this.selectedOptions = [];
          // console.log(result);
        } else {
          // 去除富文本编辑器自带的标签
          this.courseInfoForm.description =
            this.courseInfoForm.description.replace(/<[^>]+>/g, "");
          const { data: result } = await this.$http.put(
            `/admin/edu/course/courseinfo/update/${this.$route.params.id}`,
            this.courseInfoForm
          );
          // console.log(result);
          if (result.code !== 20000) {
            return this.$message.error("修改失败，请重试！！");
          }
          this.$message.success("修改成功！！");
          // this.$router.push(`/teacher/course/${this.$route.params.id}`);
          this.$refs.courseInfoFormRef.resetFields();
          this.courseInfoForm = {};
          this.selectedOptions = [];
          console.log(result);
        }
      });
    },
    // 获取讲师列表
    async getTeacherList() {
      const { data: result } = await this.$http.get("/admin/edu/teacher/list");
      // console.log(result);
      this.teacherList = result;
    },
    // 获取课程分类列表
    async getCourseList() {
      const res = await this.$http.get("/admin/edu/course/coursecate/list");
      // console.log(res);
      // 删除第一个无用的
      res.data.children.splice(0, 1);
      this.CourseCategoryOptions = res.data.children;
      // console.log(res.data.children);
    },
    //根据课程id查询课程基本信息
    async getCourseInfoById(courseId) {
      const result = await this.$http.get(
        `/admin/edu/course/courseinfo/get/${courseId}`
      );
      this.courseInfoForm = result.data;
      this.selectedOptions = [result.data.mt, result.data.st];
      // console.log(result);
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const courseId = this.$route.params.id;
        // 路径有id，调用根据课程id查询课程信息
        this.getCourseInfoById(courseId);
      } else {
        this.courseInfoForm = {};
        this.selectedOptions = [];
      }
    },
  },
  watch: {
    // 监听路由变化 ， 这个方法就会执行
    $route(to, from) {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
}
.el-form {
  margin-top: 20px;
}
.el-select {
  margin-right: 10px;
}
</style>
