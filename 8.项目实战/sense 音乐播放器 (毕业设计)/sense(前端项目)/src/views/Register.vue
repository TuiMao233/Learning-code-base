<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header">你就是我的master吗？</div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    password_rep: "",
    error_msg: "",
    imageUrl: ''
  }),
  computed: {
    ...mapState(["userInfo"]),
    isLogin() {
      let error_msg = [];
      const { name, email, password, password_rep } = this;
      if (!name.trim()) {
        error_msg.push("昵称格式不正确");
      }
      if (!isEmail(email)) {
        error_msg.push("邮箱格式不正确");
      }
      if (!(password.trim() > 3)) {
        error_msg.push("密码必须三位数以上");
      }
      if (!(password.trim() === password_rep.trim())) {
        error_msg.push("重复密码不相同");
      }

      return error_msg.join(" | ");
    }
  },
  mounted() {
    if (this.userInfo.email) this.$router.replace("/home");
  },
  methods: {
    ...mapActions(["getRegister"]),
    send_login() {
      const { name, email, password } = this;
      if (!this.isLogin) {
        // 准备发送请求
        this.error_msg = "";
        const loadingInstance = this.$loading({
          background: "rgba(255,255,255,.2)",
          text: "少女祈祷中...."
        });
        this.getRegister({
          name,
          email,
          password,
          ob: bool => {
            if (bool) {
              // 登录成功
              loadingInstance.close();
              this.$router.replace("/home");
            } else {
              // 登录失败
              this.$notify.error({
                title: "注册失败",
                message: "请联系管理员"
              });
            }
          }
        });
      } else {
        this.error_msg = this.isLogin;
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = window.webkitURL.createObjectURL(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
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