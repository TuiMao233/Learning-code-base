const fs = require('fs')
const path = require('path')

// 深层读取制定后缀的文件
function readAllFiles (current_path, exc_str, callback) {
  // 获取当前目录
  const catalogFiles = fs.readdirSync(current_path)
  // 获取当前目录需要读取的文件
  const read_files = catalogFiles.filter((file_str) => exc_str == path.extname(file_str))
  // 获取当前目录文件夹
  const folder = catalogFiles.filter((file_str) => !path.extname(file_str))

  // 读取需要的文件
  read_files.forEach((file_str) => { callback && callback(`${current_path}\\${file_str}`) });
  // 递归调用方法查询文件
  folder.forEach((file_str) => readAllFiles(`${current_path}\\${file_str}`, exc_str, callback ));
}

module.exports = readAllFiles