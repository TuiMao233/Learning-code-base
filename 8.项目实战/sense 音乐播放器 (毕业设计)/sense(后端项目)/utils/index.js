const crypto = require('crypto');
const multer = require('@koa/multer');
const path = require('path')
const { nanoid } = require('nanoid')
const utils = {
    md5(password) {
        const md5_hash = crypto.createHash('md5');
        md5_hash.update(password);
        return md5_hash.digest('hex')
    },
    upload: multer({
        // 路径, 名称修改器, 默认随机名称且无后缀 (可选)
        storage: multer.diskStorage({
            destination: function (req, file, cb) { cb(null, path.resolve(__dirname, '../public')) },
            filename: function (req, file, cb) {
                const ext = path.extname(file.originalname)
                file.originalname =  `${nanoid(10)}${ext}`
                cb(null, file.originalname)
            }
        }),
        // 文件大小相关设置 (可选)
        limits: {
            fields: 10, // 非文件字段的数量
            fileSize: 2097152 * 10,// 文件大小 8mb
            files: 2 // 文件数量
        }
    })
}
module.exports = utils
