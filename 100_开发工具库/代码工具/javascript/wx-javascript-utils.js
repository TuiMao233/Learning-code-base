/** 封装所有微信API为promise
 * @param  {string} name wxAPI对应的名称
 * @param  {object} options wxAPI对应的参数
 * @returns {Promise} 返回微信API成功或失败的结果
 * @example const result = await wxPromise('api名称', {配置参数})
 */
export const wxPromise = (name = "", options = {}) => new Promise((resolve, reject) => {
    wx[name]({
        ...options,
        success: resolve,
        fail: reject
    })
})
// 错误信息提示
export const errorMsg = title => wx.showToast({ icon: 'none', title })
// 成功信息提示
export const successMsg = (title, isBack) => {
    wx.showToast({ icon: 'success', title })
    if (isBack) setTimeout(() => wx.navigateBack(), 1500);
}
/** 创建绘制海报矩形方法, 自动向画笔添加加载绘制图片方法(ctx.loadDrawImage), 绘制换行字体方法(warpFillText)
 * @param  {string} select_str 查询CSS选择器字符串
 * @returns {node, ctx, rpx} 返回canvas实例, 画笔, 适配值
 * @example const { node, ctx, rpx } = await createDrawPosterRect.build('#canvas')
 */
export class DrawPosterRect {
    rpx = Number
    node = Object
    ctx = Object
    constructor({ rpx, node, ctx }) {
        this.rpx = rpx
        this.node = node
        this.ctx = ctx
        this.ctx.loadDrawImage = this.loadDrawImage
        this.ctx.warpFillText = this.warpFillText
    }
    /** 构建绘制海报矩形方法, 传入canvas选择器字符串, 返回绘制对象 */
    static async build(select_str) {
        // 由于画布并没有像其他的一样支持小程序独有的 rpx 自适应尺寸单位, 所以要获取rpx适配的值
        // 计算公式为 设备视口宽度 / 设计图宽度(375) = 设计图中的一像素适配设备视口宽度的几像素
        const rpx = wx.getSystemInfoSync().windowWidth / 375
        // 获取canvas实例
        const node = await new Promise(resolve => {
            const query = wx.createSelectorQuery()
            query.select(select_str)
                .node(({ node }) => resolve(node))
                .exec()
        })
        // 获取画笔
        const ctx = node.getContext('2d')
        return new DrawPosterRect({ rpx, node, ctx })
    }
    /** ctx中添加等待绘制图片方法
     * @param  {string} path 本地图片地址(必须)
     * @param  {number} x 绘制x轴位置(必须)
     * @param  {number} y 绘制y轴位置(必须)
     * @param  {number} w 绘制图片宽度(必须)
     * @param  {number} h 绘制图片高度(必须)
     * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
     */
    loadDrawImage(path, x, y, w, h) {
        const { node, ctx } = this
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
    warpFillText({ text, maxWidth, fontHeight, layer, x, y }) {
        const { ctx } = this
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
        // 添加绘制信息
        row.forEach((item, index) => ctx.fillText(item, x, y + index * fontHeight));
    }
    /** 绘制器, 接收执行器函数, 有细微bug, 不推荐使用 */
    async draw(execute) {
        return false;
        const { ctx } = this
        ctx.save();
        await execute()
        ctx.restore();
    }
}
// 使用案例
/* 
(async function () {
    // 获取绘制工具
    const { rpx, ctx, node } = await DrawPosterRect.build('#canvas')
    // 设置画布宽高
    node.width = 602 * rpx, node.height = 836 * rpx

    ctx.save()

    // 白色背景
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, node.width, node.height)
    // 换行字体绘制
    ctx.fillStyle = "#333333";
    ctx.font = `bold ${26 * rpx}px sans-serif`
    ctx.warpFillText({
        text: '----------------------------------------',
        x: 124 * rpx,
        y: 599 * rpx,
        maxWidth: 395 * rpx,
        fontHeight: 24 * rpx,
        layer: 1,
    })
    // 标签与二维码图片 必须使用await等待, 不然保存后图片不能及时显示
    await Promise.all([
        ctx.loadDrawImage(labelUrl, (node.width / 2) - (106 / 2 * rpx), 210 * rpx, 106 * rpx, 34 * rpx),
        ctx.loadDrawImage(QRCodeUrl, (node.width / 2) - (312 / 2 * rpx), 250 * rpx, 312 * rpx, 292 * rpx)
    ])

    ctx.restore()
})
 */