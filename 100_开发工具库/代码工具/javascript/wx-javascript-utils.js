/** 封装所有微信API为promise
 * @param  {string} name wxAPI对应的名称
 * @param  {object} options wxAPI对应的参数
 * @returns {Promise} 返回微信API成功或失败的结果
 */
export const wxPromise = (name = "", options = {}) => new Promise((resolve, reject) => {
    wx[name]({
        ...options,
        success: resolve,
        fail: reject
    })
})

/** 根据CSS选择器字符串获取canvas与参数
 * @param  {string} select_str CSS选择器字符串
 * @param  {object} fields_options fields属性参数
 * @returns {node:object, width:number, height:number} // 返回canvas实例与canvas的尺寸
 */
export const getCanvasRect = (select_str = '', fields_options = {}) => new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(select_str)
        .fields({ ...fields_options, node: true, size: true }, function (canvasRect) {
            resolve(canvasRect)
        })
        .exec()
})


/** 获取ctx画笔, 以及往ctx中添加绘制图片的方法和绘制换行的方法
 * @param  {object} node canvas实例
 * @returns {rpx:number, ctx:object} // 返回canvas实例与canvas的尺寸
 */
export const createDrawRect = (node) => {
    // 由于画布并没有像其他的一样支持小程序独有的 rpx 自适应尺寸单位, 所以要获取rpx适配的值
    // 计算公式为 设备视口宽度 / 设计图宽度(375) = 设计图中的一像素适配设备视口宽度的几像素
    const rpx = wx.getSystemInfoSync().windowWidth / 375
    // 获取画笔
    const ctx = node.getContext('2d')


    /** ctx中添加等待绘制图片方法
     * @param  {string} path 本地图片地址(必须)
     * @param  {number} x 绘制x轴位置(必须)
     * @param  {number} y 绘制y轴位置(必须)
     * @param  {number} w 绘制图片宽度(必须)
     * @param  {number} h 绘制图片高度(必须)
     * @returns {Promise} 图片绘制成功时返回true
     */
    ctx.loadDrawImage = function (path, x, y, w, h) {
        return new Promise(resolve => {
            const imageObject = node.createImage()
            imageObject.src = path
            imageObject.onload = () => { ctx.drawImage(imageObject, x, y, w, h); resolve(true) }
        })
    }


    /** ctx中添加绘制换行字体方法
     * @param  {string} text 本地图片地址(必须)
     * @param  {number} maxWidth 绘制换行字体的最大宽度(必须)
     * @param  {number} fontHeight 字体高度(必须)
     * @param  {number} layer 绘制层数(必须)
     * @param  {number} x 绘制x轴位置(必须)
     * @param  {number} y 绘制y轴位置(必须)
     * @returns {null} 无返回值, 需ctx.restore()绘制出实体
     */
    ctx.warpFillText = function ({ text, maxWidth, fontHeight, layer, x, y }) {
        // timp(判断字符串), row(存入每行的字体), chr(分割每个字的字符串)
        let timp = '', row = [], chr = text.split("");
        for (let i = 0; i < chr.length; i++) {
            // 遍历添加字符串, 如果超出长度, 添加进row数组
            if (ctx.measureText(timp).width < maxWidth) timp += chr[i];
            //这里添加了i-- 是为了防止字符丢失
            else { i--; row.push(timp); timp = ""; }
        }
        if (timp) { row.push(timp) }
        // 如果数组长度大于2 则截取前两个, 并以...省略
        if (row.length > layer) {
            row = row.slice(0, layer);
            for (let i = 0; i < row[layer - 1].length; i++) {
                if (!(ctx.measureText(row[layer - 1] + '...').width < maxWidth)) {
                    row[layer - 1] = row[layer - 1].slice(0, row[layer - 1].length - 1)
                } else {
                    row[layer - 1] += '...'; break;
                }
            }
        }
        // 进行绘制
        row.forEach((item, index) => ctx.fillText(item, x, y + index * fontHeight));
    }


    // 将封装好的ctx与计算好的rpx返回
    return {rpx, ctx}
}
