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
/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:06:12
 * @LastEditTime: 2020-08-19 15:16:53
 * @LastEditors: 毛先生
 * @Description:
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
const template_1 = require("./template");
const utils_1 = require("../utils");
const fs = require("fs");
const path = require("path");
function createUniAppView(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { create_path, view_name, component, typescript, style_type } = options;
        try {
            fs.lstatSync(create_path);
        }
        catch (_a) {
            return { type: 'error', msg: '创建错误, 该路径不是文件夹' };
        }
        try {
            fs.mkdirSync(path.resolve(create_path, view_name));
        }
        catch (error) {
            return { type: 'error', msg: '创建错误, 该文件夹已存在!' };
        }
        fs.writeFile(path.resolve(create_path, view_name, `${view_name}.vue`), template_1.createViewTemplate({ view_name, typescript, style_type, component }), { flag: "w" }, () => { });
        if (component) {
            return { type: 'success', msg: '创建组件成功!' };
        }
        // 递归查找pages.json
        const appJson = yield utils_1.recursionGetFile(create_path, 'pages.json');
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
            style: { navigationBarTitleText: view_name }
        });
        app_json_data = JSON.stringify(app_json_data, null, "\t");
        // 修改文件
        fs.writeFile(appJson.path, app_json_data, { flag: "w" }, () => { });
        return { type: 'success', msg: '创建页面成功' };
    });
}
exports.default = createUniAppView;
//# sourceMappingURL=index.js.map