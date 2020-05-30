/* 更新日志 */
<template>
  <div>
    <el-card class="box-card-dataLog">
      <div slot="header" class="clearfix">
        <span>开发日志</span>
      </div>
      <div class="data_log_content">
        <div class="block">
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :type="activity.type"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </div>
        <div class="technology">
          <section>
            开发作者：
            <a href="https://github.com/TuiMao233/">Mr_Mao</a>
          </section>
          <section>
            项目GitHub地址：
            <a
              href="https://github.com/TuiMao233/Learning_code/tree/master/8.项目实战/sense 音乐播放器 (毕业设计)"
            >TuiMao233/Learning_code/sense</a>
          </section>
          <section>
            前端搭建：
            <a href="https://element.eleme.cn/#/zh-CN">element-ui</a>
            |
            <a href="https://cn.vuejs.org/">Vue</a>
            |
            <a href="https://vue-loader.vuejs.org/zh/">Vue-Router</a>
            |
            <a href="https://vuex.vuejs.org/zh/">Vuex</a>
          </section>
          <section>
            后端搭建：
            <a href="https://nodejs.org/zh-cn/">Node</a>
            |
            <a href="https://koa.bootcss.com/">Koa</a>
            |
            <a href="https://www.mongodb.com/">mongoDB</a>
            |
            <a href="http://www.mongoosejs.net/docs/guide.html">mongoose</a>
          </section>
        </div>
        <el-image src="/images/psc.jpg"></el-image>
      </div>
    </el-card>
  </div>
</template>


<script>
// type: "primary",
export default {
  data: () => ({
    reverse: true,
    activities: [
      { type: "primary", content: "完善主页最新歌曲列表展示", timestamp: "2020-05-30" },
      { content: "完善歌曲列表控件", timestamp: "2020-05-30" },
      { content: "构建模糊搜索歌曲", timestamp: "2020-05-29" },
      { content: "完善歌曲上传", timestamp: "2020-05-29" },
      { content: "完善用户头像上传", timestamp: "2020-05-28" },
      { content: "搭建用户后台服务", timestamp: "2020-05-27" },
      { content: "构建页面基本架构", timestamp: "2020-05-26" },
    ]
  })
};
</script>

<style lang="less">
.el-table__row {
}
.data_log_content {
  display: flex;
  justify-content: space-between;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card-dataLog {
  text-align: left;
}
.block {
  width: 250px;
  .radio {
    margin-bottom: 20px;
  }
  border-right: solid 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
}
.technology {
  flex: 1;
  padding-left: 40px;
  height: 100%;
  font-size: 15px;
  section {
    margin-bottom: 12px;
  }
}
.el-image {
  opacity: 0.7;
  float: right;
  height: 200px;
  width: 280px;
}
</style>