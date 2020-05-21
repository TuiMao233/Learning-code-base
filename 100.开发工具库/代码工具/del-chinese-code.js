// 过滤掉文件名中的中文（也包含日文和韩文），包含中文符号
// var RegExp = /[\u4E00-\u9FA5\uF900-\uFA2D]|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
const RegExp = /：[^\n]*\n/g

// 文件路径
const old_file_path = 'text2.text'
const new_file_path = '自考本英语二.txt'


// 引入fs文件模块(读取, 写入)
const { readFileSync, writeFileSync } = require('fs')
// 读取文件并转换并转换为字符串
const oldText = readFileSync(old_file_path).toString()
// 过滤中文与中文符号并小写
const newText = oldText.replace(RegExp, "").toLowerCase()


// 写入新的文件路径
writeFileSync(new_file_path, newText)