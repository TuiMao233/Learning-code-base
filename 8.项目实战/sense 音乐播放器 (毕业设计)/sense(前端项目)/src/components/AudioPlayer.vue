<template>
  <div class="audio_player">
    <div class="left-controls">
      <el-image class="album_img" :src="playerSongList[0].album_img_path" />
      <el-button type="text" icon="el-icon-arrow-left"></el-button>
      <el-button type="text" icon="el-icon-video-play" v-if="paused" @click="toggleAudiostatus"></el-button>
      <el-button type="text" icon="el-icon-video-pause" v-else @click="toggleAudiostatus"></el-button>
      <el-button type="text" icon="el-icon-arrow-right"></el-button>
    </div>
    <div class="center-controls">
      <div class="song_msg">
        {{playerSongList[0].audio_name}} |
        {{playerSongList[0].album_name}} |
        {{playerSongList[0].singer_name}}
      </div>
      <AudioProgress :audio="$refs.audio" :paused="paused" :change="change" />
    </div>
    <div class="right-controls">
      <VolumeProgress
        style="width:140px; margin-right:20px"
        :audio="$refs.audio"
        :muted="muted"
        :change="change"
      />
      <el-button type="text" icon="el-icon-folder-add"></el-button>
      <el-button type="text" icon="el-icon-delete"></el-button>
    </div>
    <audio
      :src="playerSongList[0].audio_path"
      ref="audio"
      @durationchange="()=> change = !change"
      @pause="()=> paused = true"
      @play="()=> paused = false"
      @volumechange="headleVolumechange"
    ></audio>
  </div>
</template>

<script>
import AudioProgress from "./AudioProgress";
import VolumeProgress from "./VolumeProgress";
import { mapState } from "vuex";
export default {
  data: () => ({
    // audio_url: "http://localhost:3003/audio/TRaRv2N9cm.mp3",
    paused: true, // 媒体是否暂停
    change: true, // 源文件是否发生变化
    muted: true // 媒体是否静音
  }),
  computed: {
    ...mapState(["playerSongList"])
  },
  mounted() {},
  methods: {
    headleVolumechange() {
      // 音量发生改变
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
    .song_msg{
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