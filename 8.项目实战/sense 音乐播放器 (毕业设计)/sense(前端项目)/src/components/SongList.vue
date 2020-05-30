<template>
  <el-table :data="songList" style="width: 100%" class="song_list">
    <el-table-column width="100">
      <template slot-scope="scope">
        <el-image
          class="album_img"
          :src="scope.row.album_img_path ? scope.row.album_img_path : '/images/timg.jpg'"
          fit="cover"
        />
      </template>
    </el-table-column>

    <el-table-column show-overflow-tooltip prop="audio_name" label="歌曲名" width="200"></el-table-column>
    <el-table-column show-overflow-tooltip prop="album_name" label="专辑" width="200"></el-table-column>
    <el-table-column show-overflow-tooltip prop="singer_name" label="歌手" width="200"></el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <div class="controls">
          <i class="el-icon-video-play" v-if="!scope.row.isPlay" @click="headlePlayStatus(scope.row)" />
          <i class="el-icon-video-pause" v-else @click="headlePlayStatus(scope.row)"/>
          <i class="el-icon-folder-add" @click="addUserSong(scope.row)"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["songList"],
  data: () => ({
    isPlay: false
  }),
  computed: {
    ...mapState(['songIndex']),
  },
  methods: {
    ...mapActions(["receiveSongList", "modifySongIndex", 'modifySongItemStatus', "switchSongItemStatus"]),
    addUserSong (row) {
      console.log(row)
    }, 
    headlePlayStatus(row) {
      console.log(row)
      const audio = document.querySelector('audio')
      const oldIndex = this.songIndex

      // 如果旧索引与新索引不相同, 代表需要切换歌曲
      this.receiveSongList(this.songList);
      if (oldIndex !== row.index) {
        this.modifySongIndex(row.index);
      }
      
      // 如果旧索引与新索引相同, 代表点击的是同一曲
      // 进行切换播放/暂停状态
      if(oldIndex == row.index){
        if (!audio) return;
        if (audio.paused) audio.play();
        else audio.pause();
      }
    }
  }
};
</script>

<style lang="less">
.song_list {
  .controls {
    i {
      cursor: pointer;
    }
  }
}
</style>