<template>
  <el-container class="home_container">
    <!-- 主体区域 -->
    <el-container>
      <!-- 左侧侧边栏 -->
      <div class="left_menu">
        <el-aside :width="isFold ? '64px' : '200px'">
          <div class="logo">LOGO</div>
          <div class="toggle" @click="handleFold">|||</div>
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#264ae8"
            text-color="#8a9cf3"
            active-text-color="#fff"
            unique-opened
            :collapse="isFold"
            :collapse-transition="false"
            router
          >
            <!-- 下面的:index 必须是字符串 -->
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in menuLists"
              :key="index"
            >
              <template slot="title">
                <i :class="[item.icon, 'levelOneMenuIcon']"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="'/' + submenuItem.path"
                v-for="submenuItem in item.children"
                :key="submenuItem.id"
                @click="handleItem('/' + submenuItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ submenuItem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <!--主体部分 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="header_left">学习者画像</div>
          <div class="header_right">
            <div class="logout" @click="logout">
              <i class="iconfont icon-tuichu"></i>
            </div>
            <div class="avatar"></div>
            <div class="username">{{ userInfo.username }}</div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      // 左侧列表
      menuLists: [
        {
          id: 100,
          name: "课程管理",
          icon: "iconfont icon-kecheng",
          children: [
            {
              id: 3202,
              name: "添加课程",
              path: "course/info",
            },
            {
              id: 2222,
              name: "课程分类",
              path: "course/cate",
            },
          ],
        },
        {
          id: 6,
          name: "讲师管理",
          icon: "iconfont icon-jiangshi",
          children: [
            {
              id: 601,
              name: "讲师列表",
              path: "teacher/list",
            },
            {
              id: 602,
              name: "添加讲师",
              path: "teacher/add",
            },
          ],
        },
        {
          id: 10,
          name: "营销管理",
          icon: "iconfont icon-yingxiao",
          children: [
            {
              id: 677,
              name: "课程营销",
              path: "market/course",
            },
          ],
        },
      ],
      isFold: false, // 控制是否折叠
      activePath: "", // 被激活的链接地址
    };
  },
  created() {
    // 调用请求做左侧菜单列表
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 退出登录
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取左侧数据列表
    async getMenuList() {
      // const { data: res } = await this.$http.get("/api/menu");
      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取左侧列表数据失败！");
      // }
      // this.menuLists = res.data;
    },
    // 点击是否折叠的回调函数
    handleFold() {
      this.isFold = !this.isFold;
    },
    // 点击每一项的回调函数
    handleItem(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background: #f0f3f8;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(43, 45, 54, 0.01);
  .header_right {
    display: flex;
    align-items: center;
    .logout {
      color: #a0a5ba;
    }
    .avatar {
      margin: 0 15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: red;
    }
    .username {
      font-size: 14px;
      color: #a0a5ba;
    }
  }
}
.left_menu {
  height: 100%;
  background: #264ae8;
  border-radius: 0px 0px 40px 0px;
  .el-aside {
    background: #264ae8;
    width: 100%;
    .el-menu {
      border-right: 0;
    }
    .logo {
      height: 80px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      line-height: 80px;
    }
    .toggle {
      height: 40px;
      background: #2549e7;
      line-height: 40px;
      text-align: center;
      letter-spacing: 0.5em;
      cursor: pointer;
      color: #fff;
    }
  }
}

.el-main {
  background: #f0f3f8;
}
// 一级菜单图标样式
.levelOneMenuIcon {
  color: #8a90e4;
  margin-right: 10px;
  font-size: 18px;
}
</style>