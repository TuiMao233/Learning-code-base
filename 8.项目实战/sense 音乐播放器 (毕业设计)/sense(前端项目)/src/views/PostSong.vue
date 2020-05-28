<template>
  <div>
    <el-card class="box-card-postSong">
      <div slot="header" class="clearfix">发布歌曲</div>
      <div class="card-content">
        <el-upload
          class="upload-song"
          drag
          :limit="1"
          action
          name="mp3"
          :on-change="handleUpLoginChange"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
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
          <el-button type="primary" class="send_song" @click="submitFile">点击上传</el-button>
        </div>
        <audio class="browse_audio" :src="mp3Url" controls></audio>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    file: null,
    audio_name: "",
    album_name: "",
    singer_name: "",
    mp3Url: ""
  }),
  computed: {
    isCompleteSong() {
      // 歌曲信息是否完整
      let bool = true;
      const { file, audio_name, album_name, singer_name } = this;
      [file, audio_name, album_name, singer_name].forEach(item => {
        if (!item) bool = false;
      });
      return bool;
    }
  },
  methods: {
    isMP3Lt5M(file) {
      if (!file) return this.$message.error("文件不能为空!");
      const isMP3 = file.raw.type === "audio/mpeg";
      const isLt5M = file.raw.size / 1024 / 1024 < 15;
      if (!isMP3) return this.$message.error("上传音频文件只能是 mp3 格式!");
      if (!isLt5M) return this.$message.error("上传头像图片大小不能超过 15MB!");
      return isMP3 && isLt5M;
    },
    submitFile() {
      // 将需要提交的文件，和附带的数据，append  FormData中 然后提交

      const {
        file,
        $message,
        audio_name,
        album_name,
        singer_name,
        isMP3Lt5M,
        isCompleteSong
      } = this;
      // 文件判断

      if (!isMP3Lt5M(file)) return false;
      if (!isCompleteSong) return $message.error("歌曲信息不正确 !");
      const fromData = new FormData();
      fromData.append("mp3", file.raw);
      // 发送上传请求, 请求url带歌曲的id,
      return axios({
        url: "/upload_song",
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        data: fromData,
        params: {
          audio_name: audio_name.trim(),
          album_name: album_name.trim(),
          singer_name: singer_name.trim()
        }
      });
    },
    handleUpLoginChange(file) {
      const isMP3 = file.raw.type === "audio/mpeg";
      if (!isMP3) return false;
      this.audio_name = file.raw.name.split(".")[0];
      this.mp3Url = window.webkitURL.createObjectURL(file.raw);
    }
  }
};
</script>

<style lang="less">
.card-content {
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

.el-upload__tip {
}
</style>