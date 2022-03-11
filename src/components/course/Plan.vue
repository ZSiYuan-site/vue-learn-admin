<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程计划</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <span class="courseTitle">{{ currentCourse }}</span>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="addSubsection">添加小节</el-button>
        </el-col>
      </el-row>
      <el-tree
        :data="coursePlanList"
        :props="coursePlanProps"
        accordion
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-card>

    <!-- 添加小节的对话框 -->
    <el-dialog
      title="添加课程小节 "
      :visible.sync="addSubsectionDialogVisible"
      width="50%"
      @close="addSubsectionDialogClose"
    >
      <span>
        <el-form
          :model="addSubsectionForm"
          :rules="addSubsectionFormRule"
          ref="addSubsectionFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="课程标题" prop="pname">
            <el-input v-model="addSubsectionForm.pname"></el-input>
          </el-form-item>
          <el-form-item label="课程难度">
            <el-select v-model="addSubsectionForm.grade" placeholder="请选择">
              <el-option label="易" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="难" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程类型">
            <el-select v-model="addSubsectionForm.ptype" placeholder="请选择">
              <el-option label="视频" value="1"></el-option>
              <el-option label="文档" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程章节">
            <el-select
              v-model="selectedChapter"
              placeholder="请选择课程章节"
              @change="selectedChange"
            >
              <el-option
                v-for="item in coursePlanList"
                :key="item.id"
                :label="item.pname"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程描述">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="addSubsectionForm.description"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="课程时长">
            <el-input v-model="addSubsectionForm.timelength"></el-input>
          </el-form-item> -->
          <el-form-item label="排序字段">
            <el-input v-model="addSubsectionForm.orderby"></el-input>
          </el-form-item>
          <!-- <el-form-item label="课程状态">
            <el-input v-model="addSubsectionForm.status"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="是否试学">
            <el-input v-model="addSubsectionForm.trylearn"></el-input>
          </el-form-item> -->
          <el-form-item label="上传视频">
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-remove="handleVideoRemove"
              :on-success="handleVideoUploadSuccess"
              multiple
              :limit="1"
              :on-exceed="handleVideoExceed"
              :file-list="fileList"
              :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSubsectionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddSubsection">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 上传视频的文件列表
      fileList: [],
      // 上传视频的url
      uploadURL: "http://fgcy-333.gnway.cc/admin/vod/media/upload",
      // 选择器选中的章节的id值
      selectedChapter: "",
      // 添加课程小节的表单验证对象
      addSubsectionFormRule: {
        pname: [{ required: true, message: "请输入课程标题", trigger: "blur" }],
      },
      // 添加课程小节的表单对象
      addSubsectionForm: {
        pname: "",
        grade: "",
        ptype: "",
        description: "",
        timelength: 1,
        courseid: "",
        orderby: "",
        status: 0,
        trylearn: 0,
      },
      // 控制添加小节对话框的显示与隐藏
      addSubsectionDialogVisible: false,
      // 树形控件的配置对象
      coursePlanProps: {
        children: "children",
        label: "pname",
      },
      // 当前的课程的id
      courseId: "",
      //   课程计划列表
      coursePlanList: [],
      //   当前的大课程
      currentCourse: "",
    };
  },
  created() {
    this.addSubsectionForm.parentid = this.$route.params.id;
    this.getCoursePlan();
  },
  methods: {
    // onProgress(event, file, fileList){
    //     console.log(event)
    //     console.log(file)
    //     console.log(fileList)
    // },
    async beforeUpload(file) {
      // console.log(file);
      // const result = await this.$http.post("/admin/vod/media/upload", {
      //   file,
      // });
      // console.log(result);
    },
    // 上传的视频多于一个视频
    handleVideoExceed() {
      this.$message.warning("想要上传视频，请先删除已上传的视频");
    },
    // 视频上传成功的回调
    handleVideoUploadSuccess(response, file, fileList) {
      console.log("上传视频成功！！");
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    // 视频移除的回调
    handleVideoRemove() {},
    // 选中的章节发生变化的回调
    selectedChange() {
      this.addSubsectionForm.courseid = this.selectedChapter;
      console.log(this.selectedChapter);
    },
    // 点击提交添加小节
    submitAddSubsection() {
      console.log(this.addSubsectionForm);
      this.$refs.addSubsectionFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const result = await this.$http.post(
          "/admin/edu/course/courseplan/add",
          this.addSubsectionForm
        );
        console.log(result);
      });
    },
    // 添加小节的对话框关闭的回调
    addSubsectionDialogClose() {
      this.$refs.addSubsectionFormRef.resetFields();
      this.addSubsectionForm.description = "";
      this.selectedChapter = "";
    },
    // 点击添加小节
    addSubsection() {
      this.addSubsectionDialogVisible = true;
    },
    // 树形 变化的回调
    handleNodeClick(data) {
      // console.log(data);
    },
    //   根据课程id获取课程计划
    async getCoursePlan() {
      const { data: result } = await this.$http.get(
        `/admin/edu/course/courseplan/list/${this.addSubsectionForm.parentid}`
      );
      // console.log(result);
      this.coursePlanList = result.children;
      this.currentCourse = result.pname;
      // console.log(this.coursePlanList);
    },
  },
};
</script>

<style lang="less" scoped>
// 课程的大标题
.courseTitle {
  font-size: 30px;
  font-weight: 800;
}
.el-tree {
  margin-top: 15px;
}
</style>