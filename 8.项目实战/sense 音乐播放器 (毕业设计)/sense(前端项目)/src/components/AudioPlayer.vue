<template>
  <div class="audio_player">
    <div class="left-controls">
      <el-image
        class="album_img"
        src="//i2.hdslb.com/bfs/face/bb66210af78bc61e0cefcaaf834ac5f1bd5e2613.jpg_64x64.jpg"
      />
      <el-button type="text" icon="el-icon-arrow-left"></el-button>
      <el-button type="text" icon="el-icon-video-play"></el-button>
      <el-button type="text" icon="el-icon-arrow-right"></el-button>
    </div>
    <AudioProgress
      src="http://localhost:3003/audio/cqO8WY1nLj.mp3"
    />
    <div class="right-controls">
      <el-button type="text" icon="el-icon-folder-add"></el-button>
      <el-button type="text" icon="el-icon-delete"></el-button>
    </div>
  </div>
</template>

<script>
import AudioProgress from "./AudioProgress";
export default {
  components: { AudioProgress }
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

  .right-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0 25px;
    .el-button {
      i {
        font-size: 35px;
      }
    }
  }
}
</style>