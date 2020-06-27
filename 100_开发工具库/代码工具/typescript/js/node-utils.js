"use strict";
var fs = require('fs');
var path = require('path');
var NodeUtils = /** @class */ (function () {
    function NodeUtils() {
    }
    /** 删除特定字符串后缀名 (!注意, 请先备份代码在执行)
     * @param  {string} exc_str 文件后缀名字符串 */
    NodeUtils.prototype.delExcFiles = function (current_path, exc_str) {
        var _this = this;
        // 获取当前目录
        var catalogFiles = fs.readdirSync(current_path);
        // 获取当前目录需要删除的文件
        var del_files = catalogFiles.filter(function (file_str) { return exc_str == path.extname(file_str); });
        // 获取当前目录文件夹
        var folder = catalogFiles.filter(function (file_str) { return !path.extname(file_str); });
        // 删除需要删除的文件
        del_files.forEach(function (file_str) { fs.unlinkSync(current_path + "\\" + file_str); });
        // 递归调用方法删除文件
        folder.forEach(function (file_str) { return _this.delExcFiles(current_path + "\\" + file_str, exc_str); });
    };
    /** 获取目录列表, 判断是否符合page, 对符合page的文件进行重命名
     * @param {number} fastPage  开始页码
     * @param {number} lastPage   最后页码
     * @param {number} addNumber  每个页码操作多少 默认是0
     * @param {string} pageSplit 分隔页码的符号 11-  11.  11_ 等等
     * @param {string} newPageSplit 新的分隔符, 不指定时默认对应pageSplit */
    NodeUtils.prototype.pageSetup = function (_a) {
        var fastPage = _a.fastPage, lastPage = _a.lastPage, addNumber = _a.addNumber, pageSplit = _a.pageSplit, newPageSplit = _a.newPageSplit;
        // 获取目录列表
        var readdirItems = fs.readdirSync('./');
        // 获取筛选后的文件名
        var filterReaddir = readdirItems.filter(function (item) {
            var index = Number(item.split(pageSplit)[0]);
            // 判断是否在fastPage和lastPage之间
            if (index >= fastPage && index <= lastPage) {
                return item;
            }
        });
        // 对文件进行重命名
        filterReaddir.forEach(function (item) {
            var itemIndex = Number(item.split(pageSplit)[0]);
            var itemFilterName = item.substring(item.indexOf(pageSplit) + 1);
            fs.renameSync(item, "" + (itemIndex + addNumber) + newPageSplit + itemFilterName);
        });
    };
    return NodeUtils;
}());
var utils = new NodeUtils();
// 删除.less文件
// utils.delExcFiles(__dirname, '.less')
/* // 注意:危险操作!! 执行前请备份资料
utils.pageSetup({
    fastPage: 8,   // 开始页码
    lastPage: 32,   // 最后页码
    addNumber: 1,  // 每个页码操作多少 默认是0
    pageSplit: '.', // 分隔页码的符号 11-  11.  11_ 等等
    newPageSplit: '-' // 新的分隔符, 不指定时默认对应pageSplit
}) */
