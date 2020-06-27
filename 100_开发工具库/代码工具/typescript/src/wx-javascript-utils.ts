const wx: any = {}

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



/** 创建绘制海报矩形方法, 自动向画笔添加加载绘制图片方法(ctx.loadDrawImage), 绘制换行字体方法(warpFillText)
 * @param  {string} select_str 查询CSS选择器字符串
 * @returns {node, ctx, rpx} 返回canvas实例, 画笔, 适配值
 * @example const { node, ctx, rpx } = await createDrawPosterRect.build('#canvas')
 */
export class DrawPosterRect {
    rpx: number = 0
    node: any = null
    ctx: any = null
    constructor(rpx: number, node: any, ctx: any) {
        this.rpx = rpx
        this.node = node
        this.ctx = ctx
        this.ctx.loadDrawImage = this.loadDrawImage
        this.ctx.warpFillText = this.warpFillText
    }
    /** 构建绘制海报矩形方法, 传入canvas选择器字符串, 返回绘制对象 */
    static async build(select_str: string) {
        // 由于画布并没有像其他的一样支持小程序独有的 rpx 自适应尺寸单位, 所以要获取rpx适配的值
        // 计算公式为 设备视口宽度 / 设计图宽度(375) = 设计图中的一像素适配设备视口宽度的几像素
        const rpx = wx.getSystemInfoSync().windowWidth / 375
        // 获取canvas实例
        const node = await new Promise<any>(resolve => {
            const query = wx.createSelectorQuery()
            query.select(select_str)
                .node(({ node = null }) => resolve(node))
                .exec()
        })
        // 获取画笔
        const ctx = node.getContext('2d')
        return new DrawPosterRect(rpx, node, ctx)
    }
    /** ctx中添加等待绘制图片方法
     * @param  {string} path 本地图片地址(必须)
     * @param  {number} x 绘制x轴位置(必须)
     * @param  {number} y 绘制y轴位置(必须)
     * @param  {number} w 绘制图片宽度(必须)
     * @param  {number} h 绘制图片高度(必须)
     * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
     */
    loadDrawImage(path: string, x: number, y: number, w: number, h: number) {
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
    warpFillText(
        { text, maxWidth, fontHeight, layer, x, y }:
        { text: string, maxWidth: number, fontHeight: number, layer: number, x: number, y: number }
    ) {
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
}