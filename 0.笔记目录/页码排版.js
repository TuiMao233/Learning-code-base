const fs = require('fs')
const { resolve } = require('path'); // node 内置核心模块，用来处理路径问题。
function pageSetup(options) {
    const { fastPage, lastPage, addNumber } = options
    // 获取目录列表
    // 判断是否符合page
    // 对符合page的文件进行重命名


    // 获取目录列表
    const readdirItems =  fs.readdirSync('./')

    // 获取筛选后的文件名
    const filterReaddir = readdirItems.filter(item =>{
        const index = Number(item.split('-')[0])
        // 判断是否在fastPage和lastPage之间
        if(index >= fastPage && index <= lastPage) {
            return item
        }
    })

    // 对文件进行重命名
    filterReaddir.forEach(item => {
        const itemIndex = Number(item.split('-')[0])
        const itemFilterName = item.split('-')[1]
        fs.renameSync(item, `${itemIndex + addNumber}-${itemFilterName}`)
    });
}
pageSetup({
    fastPage: 14,
    lastPage: 35,
    addNumber: 1
})