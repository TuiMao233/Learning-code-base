/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-27 13:20:37
 * @LastEditTime: 2020-12-19 16:45:03
 * @Description: node 工具集
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import fs = require('fs')
import path = require('path')

/**
 * 删除指定目录下指定扩展名的所有文件
 * @param current_path 删除目录路径
 * @param exc_str 文件扩展名
 * @template 
 * `delExcFiles(__dirname, ".js")`     
 * `delExcFiles(__dirname, ".json")`
 */
export const delExcFiles = (current_path: fs.PathLike, exc_str: string) => {
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

/**
 * 深层读取制定后缀的文件
 * @param current_path 指定目录路径
 * @param exc_str 文件扩展名
 * @param callback 处理回调
 */
export const readAllFiles = (
  current_path: fs.PathLike,
  exc_str: string,
  callback: (path: fs.PathLike) => any
) => {
  // 获取当前目录
  const catalogFiles = fs.readdirSync(current_path)
  // 获取当前目录需要读取的文件
  const read_files = catalogFiles.filter((file_str) => exc_str == path.extname(file_str))
  // 获取当前目录文件夹
  const folder = catalogFiles.filter((file_str) => !path.extname(file_str))

  // 读取需要的文件
  read_files.forEach((file_str) => { callback && callback(`${current_path}\\${file_str}`) });
  // 递归调用方法查询文件
  folder.forEach((file_str) => readAllFiles(`${current_path}\\${file_str}`, exc_str, callback));
}

/**
 * 重新指定目录下指定文件扩展名的文件的随机命名
 * @param current_path 指定目录路径
 * @param length 重命名名称长度
 * @param filterRex 过滤文件名称正则
 */
export const renameFiles = (current_path: fs.PathLike, length = 10, filterRex?: RegExp) => {
  const readdirItems = fs.readdirSync(current_path)
  readdirItems.forEach(item => {
    const ext = path.extname(item)
    if (filterRex?.test(ext)) return false;
    const name = (Date.now() * (Math.random() * 1000)).toString().slice(0, length)
    fs.renameSync(item, `${name}${ext}`)
  });
}

/**
 * 对分页索引进行提升或下降
 * @param options 分页配置项
 */
export const pageSetup = (options: {
  fastPage: number,   // 开始页码
  lastPage: number,   // 最后页码
  addNumber: number,  // 每个页码操作多少 默认是0
  pageSplit: string, // 分隔页码的符号 11-  11.  11_ 等等
  newPageSplit: string // 新的分隔符, 不指定时默认对应pageSplit
}) => {
  const { fastPage, lastPage, addNumber, pageSplit, newPageSplit } = options
  // 获取目录列表
  // 判断是否符合page
  // 对符合page的文件进行重命名

  // 获取目录列表
  const readdirItems = fs.readdirSync('./')
  // 获取筛选后的文件名
  const filterReaddir = readdirItems.filter(item => {
    const index = Number(item.split(pageSplit)[0])
    // 判断是否在fastPage和lastPage之间
    if (index >= fastPage && index <= lastPage) {
      return item
    }
  })
  // 对文件进行重命名
  filterReaddir.forEach((item) => {
    const itemIndex = Number(item.split(pageSplit)[0])
    const itemFilterName = item.substring(item.indexOf(pageSplit) + 1)
    fs.renameSync(item, `${itemIndex + addNumber}${newPageSplit}${itemFilterName}`)
  });
}
