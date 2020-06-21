class DataHelper {
    dataKey: string // localStogae的键
    primaryKey: string // 数据项主键名称
    constructor(dataKey: string, primaryKey: string) {
        this.dataKey = dataKey
        this.primaryKey = primaryKey
    }
    // 读取本地数据, 返回数组(如果没有读取到数据就返回空数组)
    readData(): any {
        // 1. 读取本地缓存, 没有则返回'[]', 最终转换为数组或空数组
        return JSON.parse(
            localStorage.getItem(this.dataKey) || '[]'
        )
    }
    // 保存数据
    saveData(arrData: Array<object>): void {
        // 1. 将数组转为json字符串
        let JSONStr: string = JSON.stringify(arrData)
        localStorage.setItem(this.dataKey, JSONStr)
    }
    // 添加单条数据
    addData(conStr: string): number {
        // 1. 读取本地现有数据
        const commentArr: Array<object> = this.readData()
        // 2. 创建一个评论对象, 并设置评论内容属性
        // 3.1 自动生成主键值(评论ID值) {content: '讨厌'} 添加到对象中 {content: '讨厌', id:1}
        const commentItem: any = { content: conStr, id: commentArr.length }
        // 4. 将添加了主键值的对象追加到数据
        commentArr.push(commentItem)
        // 5. 将数组保存到localStrorage中
        this.saveData(commentArr)
        // 6. 返回评论ID
        return commentArr.length
    }
}