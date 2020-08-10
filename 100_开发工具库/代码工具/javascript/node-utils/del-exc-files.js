/*
 * @Author: 毛先生
 * @Date: 2020-08-05 10:43:47
 * @LastEditTime: 2020-08-05 10:45:57
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const fs = require('fs')
const path = require('path')

function delExcFiles (current_path, exc_str) {
  // 获取当前目录
  const catalogFiles = fs.readdirSync(current_path)
  // 获取当前目录需要删除的文件
  const del_files = catalogFiles.filter((file_str) => exc_str == path.extname(file_str))
  // 获取当前目录文件夹
  const folder = catalogFiles.filter((file_str) => !path.extname(file_str))

  // 删除需要删除的文件
  del_files.forEach((file_str) => { fs.unlinkSync(`${current_path}\\${file_str}`) });
  // 递归调用方法删除文件
  folder.forEach((file_str) => delExcFiles(`${current_path}\\${file_str}`, exc_str));
}
delExcFiles(__dirname, ".js")
delExcFiles(__dirname, ".json")