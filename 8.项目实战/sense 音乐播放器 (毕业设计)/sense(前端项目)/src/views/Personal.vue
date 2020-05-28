/* 个人中心 */
<template>
  <el-card class="box-card-personal">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
      <el-button type="danger" circle class="out-login" @click="outLogin_personal">退出</el-button>
    </div>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :on-change="changeFile"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <img class="avatar" :src="userInfo.avatar_file_path" v-if="userInfo.avatar_file_path" alt="">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="upAvater-button" @click="sendUpAvatar">上传头像</el-button>
    <el-divider />
    <span>用户ID：{{userInfo._id}}</span>
    <el-divider />
    <span>昵称：{{userInfo.name}}</span>
    <el-divider />
    <span>电子邮箱：{{userInfo.email}}</span>
    <el-divider />
    <span>账号创建时间：{{userInfo.create_time}}</span>
    <el-divider />
  </el-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    error_msg: "",
    file: null,
    imageUrl: ""
  }),
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
  },
  methods: {
    ...mapActions(["receiveUserInfo", "outLogin"]),
    outLogin_personal() {
      this.outLogin();
      this.$router.replace("/login");
    },
    async sendUpAvatar() {

      // 准备发送请求....
      const loadingInstance = this.$loading({
        background: "rgba(255,255,255,.2)",
        text: "少女祈祷中...."
      });
      loadingInstance.close();
      const result = await this.submitFile(
        this.userInfo.email,
        this.userInfo.avatar_file_path
      );
      // 上传头像成功, 用户数据更新, 将数据储存到store中, 并跳转页面
      if (result && result.code !== 0) return this.$message.error(result.msg);
      if(!result) return this.$message({type: 'warning', message:'未选择图片或图片格式不正确'});
      this.$message({ type: "success", message: "上传头像成功" });
      console.log(result)
      this.receiveUserInfo(result.data);
    },
    submitFile(email, oldAvatar = "") {
      // 将需要提交的文件，和附带的数据，append  FormData中 然后提交
      if (!this.file && !this.isAvatar(this.file)) return false;
      const fromData = new FormData();
      fromData.append("avatar", this.file.raw);
      // 发送上传请求, 请求url带用户的email(登录账户),
      return axios({
        url: "/AvatarUpload",
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        data: fromData,
        params: { email, oldAvatar }
      });
    },
    isAvatar(file) {
      // 是否符合头像文件规则
      if (!file) return false;
      const isJPG = file.raw.type === "image/jpeg";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isJPG) this.$message.error("上传头像图片只能是 JPG 格式!");
      if (!isLt2M) this.$message.error("上传头像图片大小不能超过 2MB!");
      return isJPG && isLt2M;
    },
    changeFile(file) {
      // 表单改变时将file储存到data中
      if (!this.isAvatar(file)) return false;
      // 符合文件的创建本地URL写入IMG标签中, 并保存到this中
      this.imageUrl = window.webkitURL.createObjectURL(file.raw);
      this.file = file;
    }
  }
};
</script>

<style lang="less">
.box-card-personal {
  margin: 0 auto;
  margin-top: 50px;
  width: 500px;
  text-align: left;
  .text {
    font-size: 14px;
  }
  span {
    display: inline-block;
    margin: 0 50px;
  }
}
.el-upload.el-upload--text {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
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
.upAvater-button {
  width: 198px !important;
  height: 40px !important;
  display: block !important;
  margin: 0 auto !important;
}
.out-login {
  padding: 0 !important;
  width: 40px;
  height: 40px;
  float: right;
  margin-top: -12px !important;
  span {
    margin: 5px !important;
    color: #ffffff;
  }
}
</style>