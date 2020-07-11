// ajax-fly请求配置文件
import Fly from 'flyio/dist/npm/wx'
import dec_upload from '../lib/decorator/fly-upload'
const fly = new Fly
// 装饰器向fly函数对象添加方法-> fly.upload
dec_upload(fly)

fly.config.baseURL = "https://wendux.github.io"
fly.config.timeout = 10000;

fly.interceptors.request.use((request) => {
  if (request.isLoad) {
    wx.showLoading({ title: '加载中', mask: true });
  }
})
fly.interceptors.response.use(
  (response) => {
    if (response.request.isLoad) {
      wx.hideLoading();
    }
    return response
  },
  (err) => {
    if (err.request.isLoad) {
      wx.hideLoading();
    }
    return err
  }
)
export default fly