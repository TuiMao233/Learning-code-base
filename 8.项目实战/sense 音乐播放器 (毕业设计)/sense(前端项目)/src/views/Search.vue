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
            <i class="el-icon-video-play" v-if="!isPlay" @click="handleClick(scope.row)" />
            <i class="el-icon-video-pause" v-else />
            <i class="el-icon-chat-dot-square" />
            <i class="el-icon-crop" />
          </template>
        </el-table-column>
      </el-table>

      <!-- <div v-for="o in 4" :key="o" class="text item">
        <img :src="'/timg.jpg'" alt />
        <span>1/6 -genesis mix-</span>
        <span>EXIT TUNES PRESENTS Vocalogenesis</span>
        <span>初音ミク / ぼーかりおどP</span>
        <div class="controls">
          <i class="el-icon-video-play" v-if="!isPlay" />
          <i class="el-icon-video-pause" v-else />
          <i class="el-icon-chat-dot-square" />
          <i class="el-icon-crop" />
        </div>
        <el-divider />
      </div>-->
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
  })
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
.el-table.cell {
  float: right;
  font-size: 25px;
  i {
    margin-right: 25px;
  }
}
</style>