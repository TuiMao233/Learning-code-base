/*
 * @Author: 毛先生
 * @Date: 2020-06-08 10:45:36
 * @LastEditTime: 2020-08-29 14:02:59
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
// 抓取网络资源到空间
const qiniu = require('qiniu')
// 用户密匙
const ACCESS_KEY = '4RjWhCFFyxHHPXYBn8u0oGkJWtVGLaJWQxzDQpEd'
const SECRET_KEY = 'qEQXMw3iUIYT0xxuLZWsVGMdA5Tvt5rC7HnFasR9'
// 定义鉴权对象
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
// 定义配置对象
const config = new qiniu.conf.Config();
// 配置储存区域为z0(华东)
config.zone = qiniu.zone.Zone_z0;
// 创建资源管理对象，该功能模块可以进行管理资源的大部分操作
const bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = (resUrl, key) => (
  new Promise((resolve, reject) => {
    /*  bucketManager.fetch(resUrl, bucket, key, callback(err, respBody, respInfo))
    resUrl: 网络资源地址
    bucket: 储存空间名称
    key: 重命名网络资源名称
    callback: 请求回调
        err: 错误码, 请求成功时为空
        respBody: 请求成功响应体对象,该对象有以下属性
            key(文件名称), hash(文件哈希值), fsize(文件大小), mimeType(文件类型)
        respInfo: 请求状态对象, 该对象有以下属性
            statusCode: 请求状态码, 当状态码为200代表上传成功
*/
    const bucket = 'mr-mao-images'
    bucketManager.fetch(resUrl, bucket, key, (err, respBody, respInfo) => {
      if (respInfo.statusCode == 200 && !err) {
        console.log('文件上传成功:' + respBody.key); resolve('文件上传成功')
      } else { console.log('文件上传失败'); reject('文件上传失败') }
    });
  })
)