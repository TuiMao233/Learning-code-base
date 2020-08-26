/*
 * @Author: 毛先生
 * @Date: 2020-08-20 18:06:20
 * @LastEditTime: 2020-08-20 18:06:24
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const obj ={
  // 选择地址
  async onChoiceAddress() {
    if (!this.setting) return;
    if (this.carInfo.step_status == "2" || this.carInfo.step_status == "1")
      return;
    let location = null;
    try {
      location = await wxPromise("chooseLocation");
    } catch (error) {
      // 查询授权情况
      const getSettingRes = await wxPromise("getSetting");
      const status = getSettingRes.authSetting;
      if (status["scope.userLocation"]) return;
      wx.authorize({
        scope: "scope.userLocation",
        success: () => {
          this.onChoiceAddress();
        },
        fail: async () => {
          // 弹出对话框
          wxPromise("showModal", {
            title: "是否授权当前位置",
            content:
              "需要获取您的地理位置，请再次点击授权，否则地图功能将无法使用",
            showCancel: false,
          });
          this.setting = false;
        },
      });
      return;
    }
    this.modiCarInfo({ registration_address: location.address });
  },
  // 弹出授权框
  async openSetting({ target: { authSetting } }) {
    // 查询授权情况
    if (!authSetting["scope.userLocation"]) return errorMsg("授权失败");
    this.setting = true;
    this.onChoiceAddress();
  },
}