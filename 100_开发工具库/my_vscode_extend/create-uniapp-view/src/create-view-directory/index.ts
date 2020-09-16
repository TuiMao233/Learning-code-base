/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:06:12
 * @LastEditTime: 2020-08-19 15:16:53
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
import { createViewTemplate } from "./template";
import { recursionGetFile } from '../utils';
import fs = require('fs');
import path = require('path');
interface EcreateUniAppView {
  create_path: string,
  view_name: string,
  component?: boolean,
  typescript?: boolean | unknown,
  style_type?: string | unknown
}
export default async function createUniAppView(options: EcreateUniAppView) {
  const { create_path, view_name, component, typescript, style_type } = options;
  try { fs.lstatSync(create_path); }
  catch { return { type: 'error', msg: '创建错误, 该路径不是文件夹' }; }
  try { fs.mkdirSync(path.resolve(create_path, view_name)); }
  catch (error) { return { type: 'error', msg: '创建错误, 该文件夹已存在!' }; }

  fs.writeFile(
    path.resolve(create_path, view_name, `${view_name}.vue`),
    createViewTemplate({ view_name, typescript, style_type, component }),
    { flag: "w" }, () => { }
  );

  if (component) {
    return { type: 'success', msg: '创建组件成功!' };
  }
  // 递归查找pages.json
  const appJson = await recursionGetFile(create_path, 'pages.json');
  if (!appJson) {
    return { type: 'warning', msg: '创建页面成功! 但pages.json未找到' };
  }
  // 去除 // 与 /* */ 注释
  appJson.data = appJson.data.replace(/\/\/.*?\n/sg, "\n");
  appJson.data = appJson.data.replace(/\/\*.*?\*\//sg, "");
  // 进行添加数据
  let app_json_data = JSON.parse(appJson.data);
  app_json_data.pages.push({
    path: `pages/${view_name}/${view_name}`,
    stype: { navigationBarTitleText: view_name }
  });
  app_json_data = JSON.stringify(app_json_data, null, "\t");
  // 修改文件
  fs.writeFile(
    appJson.path,
    app_json_data,
    { flag: "w" }, () => { }
  );
  return { type: 'success', msg: '创建页面成功' };
}