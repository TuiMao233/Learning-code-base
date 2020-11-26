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
    /** 命令基本流程: 拿到路径`uri` -> 组件名称`view_name` -> 创建页面`createUniAppView` */
    const getCommandExt = (options) => {
        return vscode.commands.registerCommand(options.extname, (uri) => __awaiter(this, void 0, void 0, function* () {
            const inputValue = yield vscode.window.showInputBox({ prompt: `输入${options.tipsViewNmae}名称` });
            if (!inputValue) {
                utils_1.logger("error", `${options.tipsViewNmae}名称不能为空!`);
                throw new Error(`${options.tipsViewNmae}名称不能为空!`);
            }
            const typescript = vscode.workspace.getConfiguration().get('create-uniapp-view.typescript');
            const style_type = vscode.workspace.getConfiguration().get('create-uniapp-view.style');
            const directory = vscode.workspace.getConfiguration().get('create-uniapp-view.directory');
            const status = yield create_view_directory_1.default(Object.assign(Object.assign({}, (options.options || {})), { create_path: uri.fsPath, view_name: inputValue, typescript, style_type,
                directory }));
            utils_1.logger(status.type, status.msg);
        }));
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
exports.activate = activate;
// 停用您的扩展程序时调用此方法
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map