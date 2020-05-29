/* 我的歌单 */
<template>
  <div>
      <el-card class="box-card-search">
      <div slot="header" class="clearfix">
        我的歌曲
      </div>
      <el-table :data="userInfo.songList" style="width: 100%">
        <el-table-column prop="song" label="歌曲名" width="180"></el-table-column>
        <el-table-column prop="album" label="专辑" width="340"></el-table-column>
        <el-table-column prop="singer" label="歌手"></el-table-column>
        <el-table-column prop="singer" label>
          <template slot-scope="scope">
            <div class="controls">
              <i class="el-icon-video-play" v-if="!isPlay" @click="handleClick(scope.row)" />
              <i class="el-icon-video-pause" v-else />
              <i class="el-icon-chat-dot-square" />
              <i class="el-icon-crop" />
              <i class="el-icon-delete" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    isPlay: false
  }),
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style>

</style>