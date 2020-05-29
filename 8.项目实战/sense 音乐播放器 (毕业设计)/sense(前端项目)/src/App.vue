<template>
  <div id="app">
    <el-container>
      <div class="header">
        <transition name="masking_anim">
          <div class="masking" v-show="scroll_pos > 80"></div>
        </transition>
        <el-avatar
          class="head_img"
          shape="circle"
          :src="userInfo.avatar_file_path ? userInfo.avatar_file_path : '/images/user_head.jpg'"
          @click="$router.replace('/personal')"
        />
      </div>

      <el-aside width="200px">
        <section class="aside_head">
          <i class="el-icon-s-operation" /> 菜单
        </section>
        <router-link to="/home" class="router-link" replace>
          <i class="el-icon-collection-tag" /> 首页
        </router-link>

        <router-link to="/personal" class="router-link" replace v-if="userInfo.email">
          <i class="el-icon-key" /> 个人中心
        </router-link>
        <router-link to="/my_song_list" class="router-link" replace v-if="userInfo.email">
          <i class="el-icon-key" /> 我的歌单
        </router-link>

        <router-link to="/login" class="router-link" replace v-if="!userInfo.email">
          <i class="el-icon-key" /> 登录
        </router-link>
        <router-link to="/register" class="router-link" replace v-if="!userInfo.email">
          <i class="el-icon-magic-stick" /> 注册
        </router-link>

        <router-link to="/search" class="router-link" replace>
          <i class="el-icon-search" /> 搜索歌曲
        </router-link>

        <router-link to="/post_song" class="router-link" replace>
          <i class="el-icon-search" /> 发布歌曲
        </router-link>

        <router-link to="/up_dateLog" class="router-link" replace>
          <i class="el-icon-date" /> 开发日志
        </router-link>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
      <div class="footer">
        <AudioPlayer />
      </div>
    </el-container>
  </div>
</template>

<script>
import { onScroll } from "./assets/utils";
import { reqAutoLogin } from "./api";
import { mapState, mapActions } from "vuex";
import AudioPlayer from './components/AudioPlayer'
export default {
  data: () => ({
    scroll_pos: 0
  }),
  computed: {
    ...mapState(["userInfo"])
  },
  // 绑定浏览器滚动事件, 获取滚动值
  async mounted() {
    onScroll(window, scroll_pos => (this.scroll_pos = scroll_pos));
    const result = await reqAutoLogin();
    if (result.code !== 0) return false;
    this.receiveUserInfo(result.data);
  },
  methods: {
    ...mapActions(["receiveUserInfo"])
  },
  components: { AudioPlayer }
};
</script>

<style lang="less">
@import "./assets/style/index.less";
.footer {
  position: fixed;
  left: 240px;
  right: 0;
  bottom: 0;
}
* {
  color: #303133;
}

#app,
#app .el-container {
  position: relative;
}

#app .el-container {
  .header {
    // 头部
    z-index: 1;
    text-align: right;
    color: #333;
    height: 60px;
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    // vue动画样式
    .masking_anim-enter-active,
    .masking_anim-leave-active {
      transition: 0.5s;
    }
    .masking_anim-enter,
    .masking_anim-leave-to {
      opacity: 0;
    }
    .masking {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      position: absolute;
      height: 60px;
      width: 100%;
      background-color: @sub_color;
    }
    .head_img {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 15px;
      border: #dcdfe6 1px solid;
      border-radius: 50%;
      display: inline-block;
      width: 32px;
      height: 32px;
    }
  }
  .el-aside {
    // 左侧菜单栏
    width: 240px !important;
    z-index: 25;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 100%;
    position: fixed;
    section,
    .router-link {
      padding: 0 16px;
    }
    .aside_head {
      height: 56px;
      line-height: 56px;
      border-bottom: #dcdfe6 1px solid;
      font-size: 18px;
    }
    .router-link {
      color: #303133;
      line-height: 48px;
      display: block;
      height: 48px;
      background: #ffffff;
      text-align: left;
      font-size: 15px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }
  .el-main {
    // 右侧内容区
    position: relative;
    color: #333;
    min-width: 680px;
    text-align: center;
    margin-left: 240px;
    padding: 0 0 !important;
    padding-top: 60px !important;
    padding-bottom: 100px !important;
    overflow: hidden;
   /*  &::-webkit-scrollbar {
      width: 12px;
      background-color: #f1f1f1;
    } // 滚动条整体部分
    &::-webkit-scrollbar-thumb {
      // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
      border-radius: 15px;
      background-color: rgba(0, 0, 0, 0.12);
      &:hover {
        background-color: rgba(0, 0, 0, 0.27);
      }
    } */
  }
}
</style>
