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
          <i
            class="el-icon-video-play"
            v-if="!scope.row.isPlay"
            @click="headlePlayStatus(scope.row, scope.$index)"
          />
          <i class="el-icon-video-pause" v-else @click="headlePlayStatus(scope.row, scope.$index)" />
          <i class="el-icon-folder-add" v-if="!isMySong" @click="addUserSong(scope.row)" />
          <i class="el-icon-delete" v-if="isMySong" @click="delUserSong(scope.row)" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqAddMySong, reqRemoteMySong } from "../api";
export default {
  props: ["songList", "isMySong"],
  computed: {
    ...mapState(["songIndex", "playerSongList", "userInfo"])
  },
  methods: {
    ...mapActions([
      "receiveSongList",
      "modifySongIndex",
      "unshiftUserSongItem",
      "deleteUserSongItem"
    ]),
    async addUserSong(row) {
      if (!this.userInfo._id) return this.$message.error("请先登录账户");
      const result = await reqAddMySong({
        audio_name: row.audio_name,
        audio_path: row.audio_path,
        album_name: row.album_name,
        album_img_path: row.album_img_path,
        singer_name: row.singer_name
      });
      if (result.code !== 0) return this.$message.error(result.msg);
      this.$message({ type: "success", message: "收藏歌曲成功" });
      this.unshiftUserSongItem(result.data);
    },
    async delUserSong(row) {
      if (!this.userInfo._id) return this.$message.error("请先登录账户");
      const result = await reqRemoteMySong(row.audio_name);
      if (result.code !== 0) return this.$message.error(result.msg);
      this.$message({ type: "success", message: "删除歌曲成功" });
      this.deleteUserSongItem(row.audio_name);
    },
    headlePlayStatus(row, index) {
      const audio = document.querySelector("audio");
      const oldIndex = this.songIndex;

      // 如果旧索引与新索引不相同, 代表需要切换歌曲
      this.receiveSongList(this.songList);
      if (oldIndex !== index) {
        this.modifySongIndex(index);
      }

      // 如果旧索引与新索引相同, 代表点击的是同一曲
      // 进行切换播放/暂停状态
      if (oldIndex == index) {
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