// 创建插件工具类
const fs = require('fs')
const path = require('path')
import createVueTemplate from './vue-template'
import createMainTemplate from './main-template'
import { recursionGetFile } from '../utils'
export default class {
  // 生成page页面目录
  async createPage(create_path: string, view_name: string) {
    // 判断是否是文件夹目录
    const isDirectory = fs.lstatSync(create_path)
    if (!isDirectory) {
      return { status: 2, msg: '创建错误, 该路径不是文件夹!' }
    }
    // 创建page文件
    try { fs.mkdirSync(path.resolve(create_path, view_name)) }
    catch (error) { return { status: 2, msg: '创建错误, 该文件夹已存在!' } }
    fs.writeFile(
      path.resolve(create_path, view_name, `${view_name}.vue`),
      createVueTemplate(view_name),
      { flag: 'w' }, () => { }
    )
    fs.writeFile(
      path.resolve(create_path, view_name, `main.js`),
      createMainTemplate(view_name),
      { flag: 'w' }, () => { }
    )
    // 递归查找app.json
    const appJson: any = await recursionGetFile(create_path, 'app.json')
    if (!appJson) return { status: 2, msg: '创建页面成功! 但app.json未找到' }
    // 进行添加页面路径
    let app_json_data = JSON.parse(appJson.data)
    app_json_data.pages.push(`page/${view_name}/main.js`)
    app_json_data = JSON.stringify(app_json_data, null, "\t")
    // 修改文件
    fs.writeFile(
      appJson.path,
      app_json_data,
      { flag: 'w' }, () => { }
    )
    return { status: 0, msg: '创建页面成功!' }
  }
  createComponent(create_path: string, view_name: string) {
    const isDirectory = fs.lstatSync(create_path)
    if (!isDirectory) {
      return { status: 2, msg: '创建错误, 该路径不是文件夹!' }
    }
    // 创建[createComponent].vue
    fs.writeFile(
      path.resolve(create_path, `${view_name}.vue`),
      createVueTemplate(view_name),
      { flag: 'w' }, () => { }
    )
    return { status: 0, msg: '创建组件成功!' }
  }
}