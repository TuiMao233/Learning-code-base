const { parseString } = require('xml2js')
const {readFile,writeFile} = require('fs')
const path_resolve = require('path').resolve
__dirname+= '\\proof'
module.exports = {
    // 流体获取请求体数据
    getBodyAsync: (req) => new Promise((resolve, reject) => {
        let data = ''
        req.on('data', _data => {
            data += _data.toString()
        }).on('end', () => {
            resolve(data)
        })
    }),
    // xml数据转换为js对象
    parseXMLAsync: (xmlData) => new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
            if (!err) {
                resolve(result)
            } else { reject('xml2js出了问题', err) }
        })
    }),
    // 格式化代码
    formatJsMsg(jsMessageData) {
        jsMessageData = jsMessageData.xml
        // 获取key值
        const jsMegKeys = Object.keys(jsMessageData)
        // 返回合并的值
        return jsMegKeys.reduce((total, key) => {
            const value = jsMessageData[key]
            // 判断得是数组，并且不是空数组
            if (Array.isArray(value) && value.length > 0) {
                total[key] = value[0]
            }
            return total
        }, {})
    },
    // 异步读取文件
    readFileAsync(file_name) {
        return new Promise((resolve, reject) => {
            readFile(path_resolve(__dirname, file_name), (err, data) => {
                if (!err) { // 读取成功
                    console.log(`${file_name}读取成功`)
                    resolve(JSON.parse(data.toString()))
                } else {
                    console.log(`${file_name}读取失败`)
                    resolve(false)
                }
            })
        })
    },
    // 异步保存文件
    writeFileAsync(file_name, data) {
        return new Promise((resolve, reject) => {
            writeFile(path_resolve(__dirname, file_name), data, err => {
                if (!err) {
                    console.log(`${file_name}保存成功`)
                    resolve(true)
                } else {
                    console.log(`${file_name}保存失败`)
                    reject(false)
                }
            })
        })
    }
}
