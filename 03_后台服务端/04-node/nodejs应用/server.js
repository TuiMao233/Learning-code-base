const url = require('url')
const path = require('path')
const fs = require('fs')
module.exports = class {
    constructor() {
        // 引入本地服务器API
        const http = require('http')
        // 创建服务器实例
        this.server = http.createServer()
        // 定义请求事件对象, 结构为 {路径:执行器}
        this.reqEvent = {}
        // 绑定事件
        this.server.on('request', (req, res) => {
            // 获取路径信息
            const path_info = path.parse(req.url)
            // 如果是文件, 则不添加后缀, 如果不是, 添加后缀
            const isFile = path_info.base.indexOf('.') !== -1
            path_info.dir += isFile ? '' : `/${path_info.base}`
            // 判断请求事件中该路径是否存在
            if (path_info.dir in this.reqEvent) {
                req.path_info = path_info
                // 执行器执行并传入req, res
                this.reqEvent[path_info.dir](req, res)
            } else {
                res.setHeader('content-type', 'text/html; charset=UTF-8')
                res.end('<h1>404! 页面找不到</h1>')
            }
        })
    }
    // 添加路由路径
    on = (path, execution) => this.reqEvent[path] = execution
    getContentType(ext) {
        switch (ext) {
            case ".jpg":
                return "image/jpeg";
            case ".html":
                return "text/html;charset=utf-8";
            case ".js":
                return "text/javascript;charset=utf-8";
            case ".json":
                return "text/json;charset=utf-8";
            case ".gif":
                return "image/gif";
            case ".css":
                return "text/css"
            default: return "text/html;charset=utf-8"
        }
    }
    // 静态资源处理函数
    static(path_url) {
        this.on(path_url, (req, res) => {
            // 获取路径信息
            const path_info = path.parse(req.url)
            // 设置对应的响应头
            const contentType = this.getContentType(path_info.ext)
            res.setHeader("content-type", contentType)
            // 读取文件
            const rs = fs.createReadStream(path_info.dir)
            // 将文件可读流塞进响应中
            rs.pipe(res)
        })
    }
    // 开启服务器
    listen = (post, callback) => this.server.listen(post, callback)
}
