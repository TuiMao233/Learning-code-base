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
  /** 命令基本流程: 拿到路径`uri` -> 组件名称`view_name` -> 创建页面`createUniAppView` */
  const getCommandExt = (options: GetCommandExtOpts) => {
    return vscode.commands.registerCommand(options.extname, async uri => {
      const inputValue = await vscode.window.showInputBox({ prompt: `输入${options.tipsViewNmae}名称` });
      if (!inputValue) {
        logger("error", `${options.tipsViewNmae}名称不能为空!`);
        throw new Error(`${options.tipsViewNmae}名称不能为空!`);
      }
      const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
      const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
      const directory = vscode.workspace.getConfiguration().get('create-uniapp-view.directory');
      const status = await createUniAppView({
        ...(options.options || {}),
        create_path: uri.fsPath,
        view_name: inputValue,
        typescript, style_type,
        directory
      });
      logger(status.type, status.msg);
    });
  };
  /** 声明创建页面命令 */
  const createPageExt = getCommandExt({
    tipsViewNmae: '页面',
    extname: 'create-uniapp-view.createPage'
  });
  /** 声明创建分包页面目录 */
  const createSubcontractPage = getCommandExt({
    tipsViewNmae: '页面',
    options: { subcontract: true },
    extname: 'create-uniapp-view.createSubcontractPage'
  });
  /** 声明创建组件命令 */
  const createComponentsExt = getCommandExt({
    tipsViewNmae: '组件',
    options: { component: true },
    extname: 'create-uniapp-view.createComponent'
  });

  /** 进行添加命令 */
  context.subscriptions.push(createPageExt);
  context.subscriptions.push(createSubcontractPage);
  context.subscriptions.push(createComponentsExt);
}

// 停用您的扩展程序时调用此方法
export function deactivate() { }