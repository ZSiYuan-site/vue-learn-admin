<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>讲师管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加讲师</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>讲师添加</span>
      </div>
      <div>
        <el-form
          ref="addTeacherFormRef"
          :model="addTeacherForm"
          label-width="80px"
          :rules="addTeacherFormRules"
        >
          <el-form-item label="讲师名称" prop="name">
            <el-row>
              <el-col :span="5">
                <el-input v-model="addTeacherForm.name"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="讲师介绍" prop="intro">
            <el-input
              type="textarea"
              :rows="10"
              v-model="addTeacherForm.intro"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师资历" prop="career">
            <el-input
              type="textarea"
              :rows="10"
              v-model="addTeacherForm.career"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师头衔">
            <el-select
              v-model="addTeacherForm.level"
              placeholder="请选择讲师级别"
            >
              <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>
              <el-option label="四级" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="讲师头像">
            <el-upload
              :action="uploadUrl"
              :on-remove="handleRemove"
              list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="讲师排序">
            <el-input-number
              v-model="addTeacherForm.sort"
              controls-position="right"
              :min="1"
              :max="20"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitTeacherForm('ruleForm')"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddTeacher",
  data() {
    return {
      // 图片上传的url
      uploadUrl: "http://fgcy-333.gnway.cc/admin/oss/file/upload",
      // 添加讲师的表单数据
      addTeacherForm: {
        name: "",
        intro: "",
        career: "",
        level: "",
        avatar: "",
        sort: "",
      },
      // 添加讲师的表单验证规则
      addTeacherFormRules: {
        name: [{ required: true, message: "请输入讲师名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.init();
  },
  watch: {
    // 监听路由变化 ， 这个方法就会执行
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    // 讲师修改
    async updataTeacherInfo() {
      const { data: result } = await this.$http.post(
        "/admin/edu/teacher/save",
        this.addTeacherForm
      );
      if (result.code === 20000) {
        this.$router.push("/teacher/list");
        this.$message.success("修改讲师成功！！！");
      }
    },
    // 路由变化的时候需要调用
    init() {
      // 判断路径是否有id值
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id;
        // 调用【根据id查询讲师方法】
        this.getTeacherInfoById(id);
      } else {
        this.addTeacherForm = {};
      }
    },
    // 根据id查询讲师
    async getTeacherInfoById(id) {
      const { data: result } = await this.$http.get(
        `/admin/edu/teacher/getById/${id}`
      );
      if (result.code !== 20000) {
        return;
      }
      this.addTeacherForm = result.data;
      // console.log(result);
    },
    // 处理上传图片成功
    handleSuccess(response) {
      if (response.code !== 20000) {
        return;
      }
      console.log(response.data.fileSystem.filePath);
      this.addTeacherForm.avatar = response.data.fileSystem.filePath;
      // console.log(response);
    },
    // 处理移除图片
    handleRemove() {},
    // 提交并添加讲师
    submitTeacherForm() {
      // url有讲师id，是修改讲师
      if (this.$route.params && this.$route.params.id) {
        this.updataTeacherInfo();
      } else {
        // 添加讲师
        // 添加讲师表单预验证
        this.$refs.addTeacherFormRef.validate(async (valid) => {
          if (!valid) return;
          const { data: result } = await this.$http.post(
            "/admin/edu/teacher/save",
            this.addTeacherForm
          );
          if (result.code !== 20000) {
            return this.$message.error("添加讲师失败！！");
          }
          this.$message.success("添加讲师成功！！！");
          this.$router.push("/teacher/list");
          this.$refs.addTeacherFormRef.resetFields();
        });
      }
    },
  },
};
</script>

<style>
</style>