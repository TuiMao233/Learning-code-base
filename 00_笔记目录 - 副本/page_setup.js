const fs = require('fs')

function pageSetup(options) {
  const { fastPage, lastPage, addNumber, pageSplit, newPageSplit } = options
  // 获取目录列表
  // 判断是否符合page
  // 对符合page的文件进行重命名

  // 获取目录列表
  const readdirItems = fs.readdirSync('./')
  // 获取筛选后的文件名
  const filterReaddir = readdirItems.filter(item => {
    const index = Number(item.split(pageSplit)[0])
    // 判断是否在fastPage和lastPage之间
    if (index >= fastPage && index <= lastPage) {
      return item
    }
  })
  // 对文件进行重命名
  filterReaddir.forEach((item) => {
    const itemIndex = Number(item.split(pageSplit)[0])
    const itemFilterName = item.substring(item.indexOf(pageSplit) + 1)
    fs.renameSync(item, `${itemIndex + addNumber}${newPageSplit}${itemFilterName}`)
  });
}
/* 注意:危险操作!! 执行前请备份资料  */
pageSetup({
  fastPage: 38,   // 开始页码
  lastPage: 44,   // 最后页码
  addNumber: 1,  // 每个页码操作多少 默认是0
  pageSplit: '-', // 分隔页码的符号 11-  11.  11_ 等等
  newPageSplit: '-' // 新的分隔符, 不指定时默认对应pageSplit
})
