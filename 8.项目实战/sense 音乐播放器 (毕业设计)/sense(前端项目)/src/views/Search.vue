/* 搜索页面 */
<template>
  <div>
    <el-card class="box-card-search">
      <div slot="header" class="clearfix">
        <el-input placeholder="请输入内容">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%">
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
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    isPlay: false,
    tableData: [
      {
        song: "1/6 -genesis mix-",
        album: "EXIT TUNES PRESENTS Vocalogenesis",
        singer: "初音ミク / ぼーかりおどP"
      },
      {
        song: "1/6 -genesis mix-",
        album: "EXIT TUNES PRESENTS Vocalogenesis",
        singer: "初音ミク / ぼーかりおどP"
      },
      {
        song: "1/6 -genesis mix-",
        album: "EXIT TUNES PRESENTS Vocalogenesis",
        singer: "初音ミク / ぼーかりおどP"
      }
    ]
  }),
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less">
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