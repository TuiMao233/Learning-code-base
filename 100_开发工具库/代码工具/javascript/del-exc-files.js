

/** 擅长特定字符串后缀名 (!注意, 请先备份代码在执行)
 * @param  {string} exc_str 文件后缀名字符串
 */
const fs = require('fs')
const path = require('path')
function delExcFiles(current_path, exc_str) {
    // 获取当前目录
    const catalogFiles = fs.readdirSync(current_path)
    // 获取当前目录需要删除的文件
    const del_files = catalogFiles.filter(file_str => exc_str == path.extname(file_str))
    // 获取当前目录文件夹
    const folder = catalogFiles.filter(file_str => !path.extname(file_str))

    // 删除需要删除的文件
    del_files.forEach(file_str => { fs.unlinkSync(`${current_path}\\${file_str}`) });
    // 递归调用方法删除文件
    folder.forEach(file_str => delExcFiles(`${current_path}\\${file_str}`, exc_str));
}

delExcFiles(__dirname, '.less')