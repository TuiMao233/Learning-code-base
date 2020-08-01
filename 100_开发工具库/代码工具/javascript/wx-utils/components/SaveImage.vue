/* SaveImage */
<template xlang="wxml">
  <div class="SaveImage">
    <button class="button" v-if="is_save" @click="saveImage">保存图片</button>
    <button class="button" open-type="openSetting" @opensetting="getSetting" v-else>授权访问相册保存图片</button>
  </div>
</template>

<script>
export default {
  props: { imageUrl: String },
  data: () => ({ is_save: true }),
  methods: {
    // 问是否授权访问相册
    getSetting(event = {}) {
      // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
      if (
        event.mp.detail &&
        event.mp.detail.authSetting &&
        event.mp.detail.authSetting["scope.writePhotosAlbum"]
      ) {
        wx.showToast({ title: "授权成功" });
        this.is_save = true;
        this.saveImage();
        return;
      } else {
        this.is_save = false;
        wx.showModal({
          title: "温馨提示",
          content: "你关闭了访问相册的权限，无法保存，请允许访问相册",
          showCancel: false
        });
      }
    },
    // 保存图片
    saveImage() {
      wx.saveImageToPhotosAlbum({
        filePath: this.imageUrl,
        success: res => {},
        fail: err => {
          console.log(err);
          if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
            this.is_save = false;
            wx.showModal({
              title: "温馨提示",
              content:
                "你关闭了访问相册的权限，无法保存，再次点击按钮允许访问相册",
              showCancel: false
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
@theme-color: #d34632; // 主题色号
button.button {
  background: @theme-color;
  color: #ffffff;
  border: none;
  outline: none;
  font-weight: 700;
}
</style>