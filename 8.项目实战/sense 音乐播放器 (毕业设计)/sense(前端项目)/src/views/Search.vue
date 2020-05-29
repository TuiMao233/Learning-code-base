/* 搜索页面 */
<template>
  <div>
    <el-card class="box-card-search">
      <div slot="header" class="clearfix">
        <el-input v-model="searchStr" placeholder="请输入内容">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSong"></i>
        </el-input>
      </div>
      <el-table :data="searchSongList" style="width: 100%">
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
              <i class="el-icon-video-play" v-if="!isPlay" @click="handleClick(scope.row)" />
              <i class="el-icon-video-pause" v-else />
              <i class="el-icon-chat-dot-square" />
              <i class="el-icon-crop" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    searchStr: "",
    isPlay: false
  }),
  computed: {
    ...mapState(["searchSongList"])
  },
  methods: {
    ...mapActions(["getSearchSongList"]),
    searchSong() {
      const searchStr = this.searchStr.trim();
      if (!searchStr) return this.$message.error("搜索内容不能为空");
      // 准备发送请求
      const loadingInstance = this.$loading({ background: "rgba(255,255,255,.2)", text: "少女祈祷中...." });
      this.getSearchSongList([searchStr, ()=>loadingInstance.close()]);
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less">
.album_img {
  opacity: 1 !important;
  width: 70px !important;
  height: 70px !important;
}
.el-icon-search {
  cursor: pointer;
}
.box-card-search {
  margin-top: -5px;
  text-align: left;
  .text {
    font-size: 14px;
  }
}
.controls {
  font-size: 25px;
  i {
    margin-right: 25px;
  }
  text-align: right;
}
</style>