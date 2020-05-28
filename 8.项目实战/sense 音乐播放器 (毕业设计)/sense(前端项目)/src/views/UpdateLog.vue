/* 更新日志 */
<template>
  <div>
    <el-card class="box-card-dataLog">
      <div slot="header" class="clearfix">
        <span>开发日志</span>
      </div>
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
      <el-image 
      src="/images/psc.jpg">
      
      </el-image>
    </el-card>
    <img src alt />
  </div>
</template>


<script>
export default {
  data: () => ({
    reverse: true,
    activities: [
      {
        type: "primary",
        content: "完善歌曲上传",
        timestamp: "2020-05-29"
      },
      {
        content: "完善用户头像上传",
        timestamp: "2020-05-28"
      },
      {
        content: "构建用户接口",
        timestamp: "2020-05-26"
      },
      {
        content: "搭建整体架构",
        timestamp: "2020-05-24"
      }
    ]
  })
};
</script>

<style lang="less">
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
  float: left;
  .radio {
    margin-bottom: 20px;
  }
  border-right: solid 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
}
.technology {
  // border-left: solid 1px rgba(0,0,0,.3);
  padding-left: 40px;
  height: 100%;
  float: left;
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