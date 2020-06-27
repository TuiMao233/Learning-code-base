/// <reference path="./javascript-utils.ts"/>
const fs = require('fs')
const path = require('path')
interface Options {
    fastPage: number
    lastPage: number
    addNumber: number
    pageSplit: string
    newPageSplit: string
}
class NodeUtils {
    /** 删除特定字符串后缀名 (!注意, 请先备份代码在执行)
     * @param  {string} exc_str 文件后缀名字符串 */
    delExcFiles(current_path: string, exc_str: string) {
        // 获取当前目录
        const catalogFiles = fs.readdirSync(current_path)
        // 获取当前目录需要删除的文件
        const del_files = catalogFiles.filter((file_str: any) => exc_str == path.extname(file_str))
        // 获取当前目录文件夹
        const folder = catalogFiles.filter((file_str: any) => !path.extname(file_str))

        // 删除需要删除的文件
        del_files.forEach((file_str: any) => { fs.unlinkSync(`${current_path}\\${file_str}`) });
        // 递归调用方法删除文件
        folder.forEach((file_str: any) => this.delExcFiles(`${current_path}\\${file_str}`, exc_str));
    }
    /** 获取目录列表, 判断是否符合page, 对符合page的文件进行重命名
     * @param {number} fastPage  开始页码
     * @param {number} lastPage   最后页码
     * @param {number} addNumber  每个页码操作多少 默认是0
     * @param {string} pageSplit 分隔页码的符号 11-  11.  11_ 等等
     * @param {string} newPageSplit 新的分隔符, 不指定时默认对应pageSplit */
    pageSetup({ fastPage, lastPage, addNumber, pageSplit, newPageSplit }: Options) {
        // 获取目录列表
        const readdirItems = fs.readdirSync('./')
        // 获取筛选后的文件名
        const filterReaddir = readdirItems.filter((item: any) => {
            const index = Number(item.split(pageSplit)[0])
            // 判断是否在fastPage和lastPage之间
            if (index >= fastPage && index <= lastPage) { return item }
        })
        // 对文件进行重命名
        filterReaddir.forEach((item: any) => {
            const itemIndex = Number(item.split(pageSplit)[0])
            const itemFilterName = item.substring(item.indexOf(pageSplit) + 1)
            fs.renameSync(item, `${itemIndex + addNumber}${newPageSplit}${itemFilterName}`)
        });
    }
}
const utils = new NodeUtils()

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
