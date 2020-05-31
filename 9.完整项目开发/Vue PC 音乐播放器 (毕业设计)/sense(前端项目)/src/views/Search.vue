/* 搜索页面 */
<template>
  <div>
    <el-card class="box-card-search">
      <div slot="header" class="clearfix">
        <el-input v-model="searchStr" placeholder="请输入搜索内容 (all搜索数据库所有歌曲)">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSong"></i>
        </el-input>
      </div>
      <SongList :songList="songList" />
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SongList from "../components/SongList";
import { reqSearchSong } from "../api";
export default {
  components: { SongList },
  data: () => ({
    searchStr: "",
    songList: []
  }),
  created() {
    document.onkeydown = e => {
      if (window.event.keyCode == 13) this.searchSong();
    };
  },
  computed: {},
  methods: {
    async searchSong() {
      // 发送请求获取歌曲列表
      let loadingInstance;
      try {
        const searchStr = this.searchStr.trim();
        if (!searchStr) return this.$message.error("搜索内容不能为空");
        loadingInstance = this.$loading({
          background: "rgba(255,255,255,.2)",
          text: "少女祈祷中...."
        });
        const result = await reqSearchSong(searchStr);
        loadingInstance.close();
        if (result.code !== 0) return this.$message.error(result.msg);
        this.songList = result.data;
      } catch (error) {
        loadingInstance.close();
      }
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