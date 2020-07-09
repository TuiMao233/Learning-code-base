const path = require('path')
const fs = require('fs')

console.log()
class Rename {
    // 获取唯一标识
    nanoid(length = 10) {
        const data = Date.now() * (Math.random() * 1000)
        return data.toString().slice(0, length)
    }
    rename() {
        // 获取目录列表
        const readdirItems = fs.readdirSync('./')
        // 进行重命名
        readdirItems.forEach(item => {
            const ext = path.extname(item)
            if (ext == '.js') return;
            fs.renameSync(item, `${this.nanoid()}${ext}`)
        });
        console.log('----重命名成功----')
    }
}

const rename = new Rename
rename.rename()