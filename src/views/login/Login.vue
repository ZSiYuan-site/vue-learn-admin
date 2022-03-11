<template>
  <div class="login">
    <div class="login_wrap">
      <!-- 左侧的表单区域 -->
      <div class="login_form">
        <h1 class="logo">LOGO</h1>
        <div class="mobileBox">
          <form action="">
            <input
              type="text"
              placeholder="手机"
              v-model="loginForm.mobile"
              name="mobile"
              v-validate="'required|mobile'"
            />
            <span
              class="warningText"
              style="color: red; font-size: 12px"
              v-show="errors.has('mobile')"
              >{{ errors.first("mobile") }}</span
            >
            <button
              class="getCodeText"
              @click.prevent="getCode"
              :disabled="isGettingCode"
            >
              {{ isGettingCode ? `${countDownTime}s后重新获取` : "获取验证码" }}
            </button>
          </form>
        </div>
        <div class="passwordBox">
          <input
            type="password"
            placeholder="密码"
            v-model="loginForm.password"
            name="pwd"
            v-validate="'required|pwd'"
          />
          <span
            class="warningText"
            style="color: red; font-size: 12px"
            v-show="errors.has('pwd')"
            >{{ errors.first("pwd") }}</span
          >
        </div>
        <div class="codeBox">
          <input
            type="text"
            placeholder="验证码"
            v-model="loginForm.code"
            name="code"
            v-validate="'required|code'"
          />
          <span class="warningText" v-show="errors.has('code')">{{
            errors.first("code")
          }}</span>
          <div class="codePic">
            <img :src="codePic" alt="" v-if="codePic" />
            <span v-else>暂无验证码</span>
          </div>
        </div>
        <button @click="submitLogin">登录</button>
      </div>
      <!-- 右侧的图片区域 -->
      <div class="right_pic">
        <img src="./image/pic.png" alt="" class="pic" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 验证码倒计时
      countDownTime: 0,
      isGettingCode: false,
      codePic: "",
      loginForm: {
        mobile: "",
        password: "",
        code: "",
      },
    };
  },
  created() {},
  methods: {
    // 点击登录按钮进行登录
    async submitLogin() {
      const success = await this.$validator.validateAll(); // 如果不传参数对所有表单项进行验证
      // console.log(success);
      if (success) {
        // const result = await this.$http.post(
        //   "/api/ucenter/member/login",
        //   this.loginForm
        // );
        // console.log(result);
        this.$store.dispatch("getUserInfoAction", this.loginForm);
        // if (result.code !== 20000) {
        //   return this.$message.error("登录失败，请重新输入！！");
        // }
        // const token = result.data.token;
        // window.sessionStorage.setItem("token", token);
        // this.$message.success("登录成功！！");
        // this.codePic = "";
        // this.loginForm = {};
        // this.$router.push("/welcome");
        // console.log(result);
      }
    },
    // 点击获取验证码
    async getCode() {
      // 验证手机的合法性
      const success = await this.$validator.validateAll(["mobile"]);
      if (success) {
        // 重置倒计时时间
        this.countDownTime = 60;
        this.isGettingCode = true;
        let intervalId = setInterval(() => {
          this.countDownTime--;
          if (this.countDownTime === 0) {
            clearInterval(intervalId);
            this.isGettingCode = false;
          }
        }, 1000);
        const result = await this.$http.get(
          "/api/ucenter/member/getVerifyCode",
          {
            responseType: "blob",
          }
        );
        // 将流图片转为请求地址
        this.codePic = window.URL.createObjectURL(result.data);
      }
    },
  },
};
</script>

<style lang="less" scope>
.login {
  width: 100%;
  height: 100%;
  background: url("./image/login__bg.png") no-repeat;
  background-size: 100% 100%;
  .login_wrap {
    // 外部的大容器
    width: 872px;
    height: 426px;
    // background: red;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow: hidden;
    // 左侧的登录盒子
    .login_form {
      text-align: center;
      width: 350px;
      height: 100%;
      background: #fff;
      position: absolute;
      top: 0px;
      left: 0px;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      padding: 20px;
      // 验证的提示信息
      .warningText {
        display: flex;
        color: red;
        font-size: 12px;
      }
      .logo {
        margin-bottom: 50px;
      }
      input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #e6e6e5;
        padding: 10px;
        margin: 10px 0;
        height: 40px;
        outline: 0;
      }
      > button {
        width: 100%;
        height: 40px;
        color: #fff;
        background: #2e8ef3;
        border: 0;
        border-radius: 5px;
        margin-top: 10px;
      }
      .mobileBox {
        position: relative;
        .getCodeText {
          outline: none;
          background-color: transparent;
          line-height: inherit;
          width: max-content;
          border: 0;
          font-size: 13px;
          position: absolute;
          top: 20px;
          left: 170px;
          color: #a8a8a7;
          width: 130px;
        }
      }
      .codeBox {
        position: relative;
        .codePic {
          position: absolute;
          font-size: 12px;
          line-height: 35px;
          color: #a8a8a7;
          width: 100px;
          height: 35px;
          top: 13px;
          left: 200px;
          img {
            background-size: contain;
            width: 100px;
            height: 35px;
          }
        }
      }
    }
    // 右侧的图片区域
    .right_pic {
      width: 522px;
      height: 100%;
      background: #f1f6ff;
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 10px;
      // 右侧的图片样式
      .pic {
        width: 412px;
        height: 327px;
        position: relative;
        top: 63px;
        left: 61px;
      }
    }
  }
}
</style>