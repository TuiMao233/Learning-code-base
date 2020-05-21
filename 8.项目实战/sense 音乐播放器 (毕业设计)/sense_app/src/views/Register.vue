<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header">你就是我的master吗？</div>
      <div class="head_img_updata">
        <img src alt />
        <i class="el-icon-circle-plus-outline" />
      </div>
      <el-input v-model="name" placeholder="昵称" clearable />
      <el-input v-model="email" placeholder="邮箱" clearable />
      <el-input v-model="password" placeholder="密码" show-password />
      <el-input v-model="password_rep" placeholder="重复密码" show-password />
      <el-button type="primary" @click="send_login" class="send_button">注册</el-button>
      <div class="error_msg">{{ error_msg }}</div>
    </el-card>
  </div>
</template>

<script>
import { isEmail } from "../assets/utils";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    password_rep: "",
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
        this.error_msg = "邮箱格式不正确 / 重复密码不一致 / 密码不够3位数以上";
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/index.less";
.box-card {
  width: 450px;
  position: relative;
  margin: 0 auto;
  .el-card__body {
    padding: 50px 40px;
  }
  .head_img_updata {
    width: 75px;
    height: 75px;
    margin: 0 auto;
    margin-bottom: 25px;
    background: rosybrown;
    position: relative;
    cursor: pointer;
    i {
        font-size: 22px;
        color: #ffffff;
        position: absolute;
        bottom: 5px; right: 5px;
    }
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