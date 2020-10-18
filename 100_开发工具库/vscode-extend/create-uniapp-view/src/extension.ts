/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:03:10
 * @LastEditTime: 2020-08-04 16:52:44
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
import * as vscode from 'vscode';
import createUniAppView from './create-view-directory';
import { logger } from "./utils";
export function activate(context: vscode.ExtensionContext) {
  const createPageExt = vscode.commands.registerCommand('create-uniapp-view.createPage', uri => {

    // 拿到路径, 与组件名称, 创建页面
    vscode.window.showInputBox({ prompt: '输入页面名称' }).then(async inputValue => {
      if (!inputValue) {
        logger("error", "页面名称不能为空!");
        throw new Error('页面名称不能为空!');
      }
      const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
      const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
      const status = await createUniAppView({
        create_path: uri.fsPath,
        view_name: inputValue,
        typescript, style_type
      });
      logger(status.type, status.msg);
    });
  });
  const createComponentsExt = vscode.commands.registerCommand('create-uniapp-view.createComponent', uri => {
    // 拿到路径, 与组件名称, 创建组件
    vscode.window.showInputBox({ prompt: '输入组件名称' }).then(async inputValue => {
      if (!inputValue) {
        logger("error", "组件名称不能为空!");
        throw new Error('组件名称不能为空!');
      }
      const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
      const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
      const status = await createUniAppView({
        create_path: uri.fsPath,
        component: true,
        view_name: inputValue,
        typescript, style_type
      });
      logger(status.type, status.msg);
    });
  });
  context.subscriptions.push(createPageExt);
  context.subscriptions.push(createComponentsExt);
}

// 停用您的扩展程序时调用此方法
export function deactivate() { }