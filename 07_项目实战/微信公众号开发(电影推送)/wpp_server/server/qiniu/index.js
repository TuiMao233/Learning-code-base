/*
 * @Author: 毛先生
 * @Date: 2020-06-08 10:45:36
 * @LastEditTime: 2020-08-29 14:03:19
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
// 引入抓取网络资源上传七牛服务器函数
const upload = require('./upload')
// 引入生成唯一key值函数
const { nanoid } = require('nanoid')

/*  该函数用于根据数据库的某个url文件, 抓取资源到七牛服务器中, 在将该资源更改的key值, 保存到指定数据库文档中
    Model: 文档集合
    find_url_doc: 查询对应url的文档名称
    set_url_doc: 保存传入七牛服务器文件key值的文档
*/

module.exports = async (Model, find_url_doc, set_url_doc) => {
  const dbFindResult = await Model.find({
    $or: [ // 该值为 '' | null | 并且该字段不存在
      { [set_url_doc]: '' },
      { [set_url_doc]: null },
      { [set_url_doc]: { $exists: false } }
    ]
  })
  for (let i = 0; i < dbFindResult.length; i++) {
    const doc = dbFindResult[i];
    // 每个文件的链接
    const resUrl = doc[find_url_doc]
    if (!resUrl) { console.log('未查找到对应数据, 将不会上传文件至七牛服务器') } else {
      // 计算链接文件后缀名
      const ext = resUrl.slice(resUrl.lastIndexOf('.'))
      // 生成key加.后缀名
      const key = nanoid(10) + ext
      // 上传七牛云服务器
      await upload(resUrl, key)
      // 保存key值
      doc[set_url_doc] = key
      await doc.save()
      console.log('数据库存入七牛文件key值:' + key)
    }
  }
}

module.exports()