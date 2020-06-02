<template>
  <div>
    <el-card class="box-card-postSong">
      <div slot="header" class="clearfix">发布歌曲</div>
      <section class="card-content-one">
        <el-upload
          class="upload-song"
          drag
          :limit="1"
          action
          :on-change="handleUpLoadMp3Change"
          :auto-upload="false"
          ref="uploadSong"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将mp3文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传mp3文件，且不超过15m</div>
        </el-upload>
        <div class="center-input-block">
          <span>歌曲名称：</span>
          <el-input v-model="audio_name" placeholder="请输入歌曲名称"></el-input>
          <span>专辑名称：</span>
          <el-input v-model="album_name" placeholder="请输入专辑名称"></el-input>
          <span>歌手名称：</span>
          <el-input v-model="singer_name" placeholder="请输入歌手名称"></el-input>
        </div>
        <div class="right-commit-block">
          <el-button type="primary" class="send_song" @click="sendSongFile">点击上传</el-button>
        </div>
      </section>
      <section class="card-content-to">
        <el-upload
          class="avatar-uploader albumImg-uploader"
          action
          :on-change="handleUpLoadImageChange"
          :show-file-list="false"
          :auto-upload="false"
          ref="uploadAlbumImg"
        >
          <div
            v-if="imageUrl"
            :style="{backgroundImage:`url(${imageUrl})`}"
            class="postSong_album_img"
          ></div>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <div class="el-upload__text">点击上传专辑图片(可选)</div>
        </el-upload>
        <audio class="browse_audio" :src="mp3Url" controls></audio>
      </section>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    mp3File: null,
    imageFile: null,
    audio_name: "",
    album_name: "",
    singer_name: "",
    mp3Url: "",
    imageUrl: "",
    progress: ""  // 上传进度
  }),
  methods: {
    ...mapActions(["receiveSongList", "modifySongIndex"]),
    isJPGLt2M(imageFile) {
      if (!imageFile) return false;
      const isLt2M = imageFile.raw.size / 1024 / 1024 < 2;
      if (!isLt2M) this.$message.error("上传专辑图片大小不能超过 2MB!");
      return isLt2M;
    },
    isMP3Lt15M(mp3File) {
      if (!mp3File) {
        this.$message.error("上传音频文件不能为空!");
        return false;
      }
      const isMP3 = mp3File.raw.type.match(/audio\/mpeg|audio\/mp3/);
      const isLt5M = mp3File.raw.size / 1024 / 1024 < 15;
      if (!isMP3) {
        this.$message.error("上传音频文件只能是 mp3 格式!");
        return false;
      }
      if (!isLt5M) {
        this.$message.error("上传音频文件大小不能超过 15MB!");
        return false;
      }
      return isMP3 && isLt5M;
    },
    async sendSongFile() {
      // 发送请求
      const { $message, audio_name, submitFile, isMP3Lt15M, mp3File } = this;
      // mp3文件判断, 不符合不进行发送请求
      if (!isMP3Lt15M(mp3File)) return false;
      // 提示用户必须填写歌曲名称
      if (!audio_name) return $message.error("歌曲名称未填写 !");
      const loadingInstance = this.$loading({
        background: "rgba(255,255,255,.2)",
        text: "少女祈祷中...."
      });
      const result = await submitFile();
      loadingInstance.close();
      if (result && result.code !== 0) return this.$message.error(result.msg);
      // 上传歌曲成功, 提示信息, 移除页面数据, 将数据传入歌曲列表中
      this.$message({ type: "success", message: "上传歌曲成功" });
      this.remoteData();
      this.receiveSongList([result.data]);
      this.modifySongIndex(0);
    },
    remoteData() {
      // 移除所有数据
      this.$refs.uploadSong.uploadFiles = [];
      this.$refs.uploadAlbumImg.uploadFiles = [];
      this.imageUrl = "";
      this.mp3Url = "";
      this.audio_name = "";
      this.album_name = "";
      this.singer_name = "";
    },
    submitFile() {
      // 将需要提交的文件，和附带的数据，append  FormData中 然后提交
      const {
        mp3File,
        audio_name,
        album_name,
        singer_name,
        imageFile
      } = this;
      // 创建表单数据, 并将MP3文件添加到表单数据
      const fromData = new FormData();
      fromData.append("audio", mp3File.raw);
      // 如果专辑图片文件有数据, 添加到fromData中
      if (imageFile && imageFile.raw) {
        const isLt2M = imageFile.raw.size / 1024 / 1024 < 2;
        if (isLt2M) fromData.append("album_image", imageFile.raw);
      }
      // 发送上传请求, 请求url带歌曲的id,
      return axios({
        url: "/upload_song",
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        data: fromData,
        // 添加上传进度监听事件
        onUploadProgress: e => {
          const completeProgress = (((e.loaded / e.total) * 100) | 0) + "%";
          this.progress = completeProgress
        },
        params: {
          audio_name: audio_name.trim(),
          album_name: album_name.trim(),
          singer_name: singer_name.trim()
        }
      });
    },
    handleUpLoadMp3Change(file) {
      // MP3文件改变时添加本地浏览地址, 并储存到this中
      this.mp3File = file;
      const isMP3 = file.raw.type.match(/audio\/mpeg|audio\/mp3/);
      if (!isMP3) return false;
      this.audio_name = file.raw.name.split(".")[0];
      this.mp3Url = window.webkitURL.createObjectURL(file.raw);
    },
    handleUpLoadImageChange(file) {
      // image文件改变时添加本地浏览地址, 并储存到this中
      if (!this.isJPGLt2M(file)) return false;
      this.imageUrl = window.webkitURL.createObjectURL(file.raw);
      this.imageFile = file;
    }
  }
};
</script>

<style lang="less">
.albumImg-uploader {
  width: 200px;
  height: 200px;
  margin: 0 80px;
  .el-upload.el-upload--text {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .el-upload__text {
      color: #606266 !important;
      font-size: 14px;
      text-align: center;
    }
    .postSong_album_img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
    img {
      width: 200px;
      height: 200px;
    }
  }
}
.browse_audio {
  flex: 1;
  margin-right: 70px;
}
.card-content-to {
  display: flex;
  align-items: center;
}
.card-content-one {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.right-commit-block {
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
}
.send_song {
  width: 200px;
  height: 100px;
  span {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 20px;
    color: #ffffff;
  }
}
.center-input-block {
  .el-input {
    min-width: 100px;
  }
  height: 180px;
  float: left;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 50px;
  margin-bottom: 30px;
  span {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.7);
  }
}
.el-icon-postSong {
  cursor: pointer;
}
.box-card-postSong {
  margin-top: -5px;
  text-align: left;
  .el-icon-postSong {
    *zoom: 1;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .text {
      font-size: 14px;
    }
  }
}
.controls {
  font-size: 25px;
  i {
    margin-right: 25px;
  }
  text-align: right;
}
.upload-song {
  width: 360px;
  margin-right: 50px;
  margin-bottom: 30px;
  float: left;
  .el-upload.el-upload--text {
    width: 360px;
    height: 180px;
  }
}
</style>