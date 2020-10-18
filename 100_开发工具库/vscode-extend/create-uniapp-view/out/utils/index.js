"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursionGetFile = exports.logger = void 0;
/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:05:06
 * @LastEditTime: 2020-08-04 16:51:38
 * @LastEditors: 毛先生
 * @Description:
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
// 打印信息
exports.logger = (type, msg = '') => {
    switch (type) {
        case 'success':
            return vscode.window.showInformationMessage(`Success: ${msg}`);
        case 'warning':
            return vscode.window.showWarningMessage(`Warning: ${msg}`);
        case 'error':
            return vscode.window.showErrorMessage(`Failed: ${msg}`);
    }
};
// 递归查找并读取文件, 未找到返回false
exports.recursionGetFile = (current_path, file_name) => {
    return new Promise(resolve => {
        function recursion(app_path) {
            const recurs_path = path.resolve(app_path, file_name);
            // 递归出口: 路径是根路径, 停止递归
            if (recurs_path.length === (3 + file_name.length)) {
                return false;
            }
            // 文件是否存在
            fs.access(recurs_path, function (error) {
                if (!error) {
                    // 递归出口: 文件存在, 返回文件信息
                    fs.readFile(recurs_path, (error, data) => {
                        if (error) {
                            return resolve(null);
                        }
                        resolve({ path: recurs_path, data: data.toString() });
                    });
                    // 递归点: 当该文件不存在, 往上一级目录总
                }
                else {
                    recursion(path.resolve(app_path, '../'));
                }
            });
        }
        recursion(current_path);
    });
};
//# sourceMappingURL=index.js.map