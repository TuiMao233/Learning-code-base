"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:03:10
 * @LastEditTime: 2020-08-04 16:52:44
 * @LastEditors: 毛先生
 * @Description:
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const vscode = require("vscode");
const create_view_directory_1 = require("./create-view-directory");
const utils_1 = require("./utils");
function activate(context) {
    const createPageExt = vscode.commands.registerCommand('create-uniapp-view.createPage', uri => {
        // 拿到路径, 与组件名称, 创建页面
        vscode.window.showInputBox({ prompt: '输入页面名称' }).then((inputValue) => __awaiter(this, void 0, void 0, function* () {
            if (!inputValue) {
                utils_1.logger("error", "页面名称不能为空!");
                throw new Error('页面名称不能为空!');
            }
            const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
            const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
            const status = yield create_view_directory_1.default({
                create_path: uri.fsPath,
                view_name: inputValue,
                typescript, style_type
            });
            utils_1.logger(status.type, status.msg);
        }));
    });
    const createComponentsExt = vscode.commands.registerCommand('create-uniapp-view.createComponent', uri => {
        // 拿到路径, 与组件名称, 创建组件
        vscode.window.showInputBox({ prompt: '输入组件名称' }).then((inputValue) => __awaiter(this, void 0, void 0, function* () {
            if (!inputValue) {
                utils_1.logger("error", "组件名称不能为空!");
                throw new Error('组件名称不能为空!');
            }
            const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
            const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
            const status = yield create_view_directory_1.default({
                create_path: uri.fsPath,
                component: true,
                view_name: inputValue,
                typescript, style_type
            });
            utils_1.logger(status.type, status.msg);
        }));
    });
    context.subscriptions.push(createPageExt);
    context.subscriptions.push(createComponentsExt);
}
exports.activate = activate;
// 停用您的扩展程序时调用此方法
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map