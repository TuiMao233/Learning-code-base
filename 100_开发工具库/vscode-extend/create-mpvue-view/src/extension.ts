import * as vscode from 'vscode';
import CreateView from './create-view-directory'
import { logger } from "./utils";
const { createPage, createComponent } = new CreateView

export function activate(context: vscode.ExtensionContext) {
  const createPageExt = vscode.commands.registerCommand('create-mpvue-view.createPage', uri => {
    // 拿到路径, 与组件名称, 创建页面
    vscode.window.showInputBox({ prompt: '输入页面名称' }).then(async inputValue => {
      if (!inputValue) {
        logger('error', '页面名称不能为空!', vscode);
        throw new Error('页面名称不能为空!');
      }
      const { status, msg } = await createPage(uri.fsPath, inputValue)
      if (status == 0)
        vscode.window.showInformationMessage(msg);
      if (status == 1)
        vscode.window.showWarningMessage(msg);
      if (status == 2)
        vscode.window.showErrorMessage(msg);
    })
  });
  const createComponentsExt = vscode.commands.registerCommand('create-mpvue-view.createComponent', uri => {
    // 拿到路径, 与组件名称, 创建组件
    vscode.window.showInputBox({ prompt: '输入组件名称' }).then(inputValue => {
      if (!inputValue) {
        logger('error', '组件名称不能为空!', vscode);
        throw new Error('组件名称不能为空!');
      }
      const { status, msg } = createComponent(uri.fsPath, inputValue)
      if (status == 0)
        vscode.window.showInformationMessage(msg);
      if (status == 1)
        vscode.window.showWarningMessage(msg);
      if (status == 2)
        vscode.window.showErrorMessage(msg);
    })
  });
  context.subscriptions.push(createPageExt);
  context.subscriptions.push(createComponentsExt);
}

// 停用您的扩展程序时调用此方法
export function deactivate() { }