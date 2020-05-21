<template>
  <div class="login">
    <div class="login_header">password Login</div>
    <el-card class="box-card">
      <div slot="header">seanse 统一验证登录</div>
      <el-input v-model="email" placeholder="邮箱" ref="eml_dom" clearable/>
      <el-input v-model="password" placeholder="密码" ref="psd_dom" show-password/>
      <el-button type="primary" @click="send_login" class="send_button">登录</el-button>
      <div class="error_msg">{{ error_msg }}</div>
    </el-card>
    <div class="login_footer">
        <el-link type="primary" class="forget_psd">忘记密码</el-link>
        <el-link type="primary" class="register_user" @click="$router.push('/register')">注册账号</el-link>
    </div>
  </div>
</template>

<script>
import { isEmail } from "../assets/utils";
export default {
  data: () => ({
    email: "",
    password: "",
    error_msg: ""
  }),
  methods: {
    send_login() {
      const { email, password } = this;
      if (password.trim().length > 3 && isEmail(email)) {
        // 验证成功, 准备发送请求
        this.error_msg = "";
      } else {
        // 验证失败
        this.error_msg = "邮箱格式不正确 / 密码不够3位数以上";
      }
    }
  }
};
</script>

<style lang="less">
@import '../assets/style/index.less';
.login {
  margin: 0 auto;
  width: 450px;
  height: 700px;
  .login_header {
    height: 50px;line-height: 50px;
    text-align: center;
    border-bottom: 2px solid @dep_color;
    font-size: 15px;
    margin-bottom: 25px;
  }
  .login_footer {
      margin-top: 30px;
      .forget_psd {
          float: left;
      }
      .register_user {
          float: right;
      }
      .el-link span {
          color: @sub_color !important;
          font-size: 15px;
      }
  }
}
.box-card {
  width: 400px;
  position: relative;
  margin: 0 auto;
  .el-card__body {
    padding: 50px 40px;
  }
  .error_msg {
    color: #f56c6c;
    font-size: 15px;
    position: absolute;
    left: 0;
    right: 0;
    top: 75px;
    margin: auto;
  }
  .el-card__header {
    font-size: 20px;
  }
  .el-input__inner {
    margin-bottom: 25px;
    border-radius: 0 !important;
    border: none !important;
    border-bottom: 1px solid #eee !important;
    &:focus {
      border-bottom: 1px solid @dep_color !important;
    }
  }
  .send_button {
    width: 100% !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    span {
      color: #ffffff !important;
      font-size: 16px;
    }
  }
}
</style>