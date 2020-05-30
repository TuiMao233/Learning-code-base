/* 我的歌单 */
<template>
  <div>
    <el-card class="box-card-search">
      <div slot="header" class="clearfix">我的歌曲</div>
      <SongList v-if="userInfo" :songList="userInfo.song_list" />
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongList from "../components/SongList";
export default {
  components: { SongList },
  data: () => ({}),
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style>
</style>