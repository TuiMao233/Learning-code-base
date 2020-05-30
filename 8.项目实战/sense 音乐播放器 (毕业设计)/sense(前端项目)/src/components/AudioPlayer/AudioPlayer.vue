<template>
  <div class="audio_player" v-if="playerSongList[songIndex]">
    <div class="left-controls">
      <el-image class="album_img" :src="playerSongList[songIndex].album_img_path" />
      <el-button type="text" icon="el-icon-arrow-left" @click="statusProcessor('prev')"></el-button>
      <el-button type="text" icon="el-icon-video-play" v-if="paused" @click="toggleAudiostatus"></el-button>
      <el-button type="text" icon="el-icon-video-pause" v-else @click="toggleAudiostatus"></el-button>
      <el-button type="text" icon="el-icon-arrow-right" @click="statusProcessor('next')"></el-button>
    </div>
    <div class="center-controls">
      <div class="song_msg" v-if="playerSongList[songIndex].audio_name">
        {{playerSongList[songIndex].audio_name}} |
        {{playerSongList[songIndex].album_name}} |
        {{playerSongList[songIndex].singer_name}}
      </div>
      <AudioProgress
        :audio="$refs.audio"
        :paused="paused"
        :change="change"
        :statusProcessor="statusProcessor"
      />
    </div>
    <div class="right-controls">
      <VolumeProgress
        style="width:140px; margin-right:20px"
        :audio="$refs.audio"
        :muted="muted"
        :change="change"
      />
      <el-button
        type="text"
        v-show="status == 'list'"
        @click="status = 'cycle'"
        style="margin-left: 10px;"
      >
        <i class="icon-yinpinliebiao" />
      </el-button>
      <el-button type="text" v-show="status == 'cycle'" @click="status = 'single_cycle'">
        <i class="icon-xunhuan1" />
      </el-button>
      <el-button type="text" v-show="status == 'single_cycle'" @click="status = 'list'">
        <i class="icon-xunhuan2" />
      </el-button>
      <el-button type="text" icon="el-icon-folder-add" @click="addUserSong"></el-button>
      <el-button type="text" icon="el-icon-delete" @click="delUserSong"></el-button>
    </div>
    <audio
      :src="'http://localhost:3003'+ playerSongList[songIndex].audio_path"
      ref="audio"
      @durationchange="()=> change = !change"
      @pause="()=> paused = true"
      @play="()=> paused = false"
      @volumechange="headleVolumechange"
      @loadeddata="headleLoadeddata"
      @ended="headleEnded"
    ></audio>
  </div>
</template>

<script>
const LIST = "list"; // 列表
const CYCLE = "cycle"; // 循环
const SINGLE_CYCLE = "single_cycle"; // 单曲循环
const PREV = "prev"; // 上一首
const NEXT = "next"; // 下一首

import AudioProgress from "./AudioProgress";
import VolumeProgress from "./VolumeProgress";
import { mapState, mapActions } from "vuex";
import { reqAddMySong,reqRemoteMySong } from "../../api";
export default {
  data: () => ({
    // audio_url: "http://localhost:3003/audio/TRaRv2N9cm.mp3",
    paused: true, // 媒体是否暂停
    change: true, // 源文件是否发生变化
    muted: true, // 媒体是否静音
    status: LIST
  }),
  computed: {
    ...mapState(["playerSongList", "songIndex", "userInfo"])
  },
  mounted() {},
  watch: {
    // 播放状态改变, 改变歌曲列表项的状态
    paused(val) {
      this.modifySongItemStatus([this.songIndex, val]);
    }
  },
  methods: {
    ...mapActions([
      "receiveSongList",
      "modifySongIndex",
      "modifySongItemStatus",
      "switchSongItemStatus",
      "receiveUserSongItem"
    ]),
    async addUserSong() {
      const row = this.playerSongList[this.songIndex];
      if (!this.userInfo._id) return this.$message.error("请先登录账户");
      const result = await reqAddMySong({
        audio_name: row.audio_name,
        audio_path: row.audio_path,
        album_name: row.album_name,
        album_img_path: row.album_img_path,
        singer_name: row.singer_name
      });
      if (result.code !== 0) return this.$message.error(result.msg);
      this.receiveUserSongItem(result.data);
      this.$message({ type: "success", message: "收藏歌曲成功" });
    },
    async delUserSong() {
      const row = this.playerSongList[this.songIndex];
      if (!this.userInfo._id) return this.$message.error("请先登录账户");
      const result = await reqRemoteMySong(row.audio_name)
      if (result.code !== 0) return this.$message.error(result.msg);
      this.
      this.$message({ type: "success", message: "收藏歌曲成功" });
    },
    statusProcessor(behavior) {
      // 状态处理器, 接收下一曲和上一曲的行为
      const { playerSongList, songIndex, modifySongIndex } = this;
      const totalLength = playerSongList.length - 1;
      switch (this.status) {
        case LIST: // 列表
          if (behavior == PREV) {
            if (songIndex == 0) return;
            modifySongIndex(songIndex - 1);
          }
          if (behavior == NEXT) {
            if (songIndex == totalLength) return;
            modifySongIndex(songIndex + 1);
          }
          break;
        case CYCLE: // 循环
          if (behavior == PREV) {
            if (songIndex == 0) return modifySongIndex(totalLength);
            modifySongIndex(songIndex - 1);
          }
          if (behavior == NEXT) {
            if (songIndex == totalLength) return modifySongIndex(0);
            modifySongIndex(songIndex + 1);
          }
          break;
        case SINGLE_CYCLE: // 单曲循环
          if (behavior == PREV) {
            this.$refs.audio.currentTime = 0;
          }
          if (behavior == NEXT) {
            this.$refs.audio.currentTime = 0;
          }
          break;
      }
    },
    headleEnded() {
      // 音乐播放完毕
      this.statusProcessor("next");
    },
    headleLoadeddata() {
      // 元数据发生改变时, 代表切歌, 更改歌曲列表项状态
      this.switchSongItemStatus(this.songIndex);
    },
    headleVolumechange() {
      // 音量发生改变时, 改变自身muted
      const volume = this.$refs.audio.volume;
      if (volume == 0) this.muted = true;
      else this.muted = false;
    },
    toggleAudiostatus() {
      // 切换音频状态(播放/暂停)
      const audio = this.$refs.audio;
      if (audio.paused) audio.play();
      else audio.pause();
    }
  },
  components: { AudioProgress, VolumeProgress }
};
</script>

<style lang="less">
.audio_player {
  display: flex;
  border-top: 1px solid #dcdfe6;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 0 5px;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  .el-button[disabled] {
    color: red;
  }
  .left-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    .album_img {
      margin-right: 10px;
    }
    .el-button {
      i {
        font-size: 35px;
      }
    }
  }
  .center-controls {
    flex: 1;
    position: relative;
    height: 100%;
    .song_msg {
      position: absolute;
      font-size: 13px;
      bottom: 10px;
    }
  }
  .right-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 25px;
    .el-button {
      i {
        font-size: 35px;
      }
    }
  }
}
</style>