//已知有字符串foo='get-element-by-id',写一个function将其转化成驼峰表示法”getElementById”
const strToCamelCase = (str, splitStr) => (
    // 进行分割合并
    str.split(splitStr).reduce((total, item, index) => {
        // 第一个单词不执行操作
        if (index === 0) { return item }
        // 首字母大写
        const initial = item.slice(0, 1).toLocaleUpperCase()
        // 剩余字母
        const remainLetter = item.slice(1)
        // 字母进行拼接
        return (total += initial + remainLetter)
    }, "")
)
let str = 'get-element-by-id'

console.log(strToCamelCase(str, '-'))


