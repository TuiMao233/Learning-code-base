<template>
  <div id="app">
    <el-container>

      <div class="header">
        <transition name="masking_anim">
          <div class="masking" v-show="scroll_pos > 80"></div>
        </transition>
        <img class="head_img" src alt="" />
      </div>

      <el-aside width="200px">
        <section class="aside_head"><i class="el-icon-s-operation" /> 菜单 </section>
        <router-link to="/home" class="router-link" replace>
          <i class="el-icon-collection-tag" /> 首页 
        </router-link>
        <router-link to="/login" class="router-link" replace>
          <i class="el-icon-key" /> 登录 
        </router-link>
        <router-link to="/register" class="router-link" replace>
          <i class="el-icon-magic-stick" /> 注册 
        </router-link>
        <router-link to="/search" class="router-link" replace>
          <i class="el-icon-search" /> 搜索歌曲 
        </router-link>

      </el-aside>

      <el-main>
        <router-view> </router-view>
      </el-main>
      
    </el-container>
  </div>
</template>

<script>
import { onScroll } from './assets/utils'
export default {
  data: () =>({
    scroll_pos: 0
  }),
  mounted() {
    // 绑定浏览器滚动事件, 获取滚动值
    onScroll(window, (scroll_pos)=> this.scroll_pos = scroll_pos )
  },
  methods: {},
  components: {}
};
</script>

<style lang="less">
@import './assets/style/index.less';
* { color: #303133; }

#app, #app .el-container {
  position: relative;
}

#app .el-container {
  .header { // 头部
    z-index: 1; text-align: right; color: #333; height: 60px;
    position: fixed;top: 0;left: 240px;right: 0;
    // vue动画样式
    .masking_anim-enter-active, .masking_anim-leave-active{ transition: 0.5s; }
    .masking_anim-enter, .masking_anim-leave-to { opacity: 0; }
    .masking {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      position: absolute;
      height: 60px; width: 100%;
      background-color: @sub_color; 
    }
    .head_img {
      background: blueviolet;
      position: absolute; top: 12px; right: 15px;
      border: #DCDFE6 1px solid;border-radius: 50%;
      display: inline-block;width: 32px; height: 32px;
    }
  }
  .el-aside { // 左侧菜单栏
    width: 240px !important;z-index: 10;color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 100%;position: fixed;
    section , .router-link{padding: 0 16px}
    .aside_head {
      height: 56px; line-height: 56px;
      border-bottom: #DCDFE6 1px solid;
      font-size: 18px;
    }
    .router-link {
      color: #303133;line-height: 48px;
      display: block; height: 48px;
      background: #ffffff;text-align: left; font-size: 15px;
      margin-top: 10px; cursor: pointer;
      &:hover { background:rgba(0,0,0,.08) }
    }
    
  }
  .el-main { // 右侧内容区
    position: relative;color: #333;text-align: center;
    margin-left: 240px;
    padding-top: 60px !important;
    &::-webkit-scrollbar { width: 12px; background-color: #F1F1F1; } // 滚动条整体部分
	  &::-webkit-scrollbar-thumb{
      // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
      border-radius: 15px;  
      background-color: rgba(0,0,0,.12);
      &:hover{ background-color: rgba(0,0,0,.27); }
	  }
  }
}
</style>
