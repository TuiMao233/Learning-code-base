/*
 * @Author: 毛先生
 * @Date: 2020-08-01 14:24:43
 * @LastEditTime: 2020-08-01 15:02:26
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
export default class DrawPoster {
  /** rpx适配单位 */
  rpx: number;
  /** canvas节点 */
  node: any;
  /** canvas画笔 */
  private ctx: any;
  /** 绘制器容器 */
  private executeOnion: Array<any> = []
  constructor(rpx: number, node: any, ctx: any) {
    this.rpx = rpx
    this.node = node
    this.ctx = ctx
    this.ctx.loadDrawImage = this.loadDrawImage
    this.ctx.warpFillText = this.warpFillText
    this.ctx.roundRect = this.roundRect
  }
  /** 微信-创建本地图片地址 */
  private downloadImgUrl(url: string) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: (val) => resolve(val.tempFilePath),
        fail: reject
      })
    })
  }
  /** ctx中添加等待绘制图片方法
 * @param  {string} url 网络图片地址(必须)
 * @param  {number} x 绘制x轴位置(必须)
 * @param  {number} y 绘制y轴位置(必须)
 * @param  {number} w 绘制图片宽度(必须)
 * @param  {number} h 绘制图片高度(必须)
 * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
 */
  private loadDrawImage = async (
    { url, x, y, width, height }:
      { url: string, x: number, y: number, width: number, height: number }
  ): Promise<Boolean> => {
    const path = await this.downloadImgUrl(url)
    return new Promise(resolve => {
      const imageObject = this.node.createImage()
      imageObject.src = path
      imageObject.onload = () => {
        this.ctx.drawImage(imageObject, x, y, width, height);
        resolve(true)
      }
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
  private warpFillText = (
    { text, maxWidth, fontHeight, layer, x, y }:
      { text: string, maxWidth: number, fontHeight: number, layer: number, x: number, y: number }
  ) => {
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
  /** ctx中添加绘制矩形方法
   * @param {number} x x坐标轴(必须)
   * @param {number} y y坐标轴(必须)
   * @param {number} w 宽度(必须)
   * @param {number} h 高度(必须)
   * @param {number} r 圆角半径 默认为0
   */
  private roundRect = (x: number, y: number, w: number, h: number, r = 0) => {
    const ctx = this.ctx
    if (w < 2 * r) { r = w / 2; }
    if (h < 2 * r) { r = h / 2; }

    ctx.beginPath();//开始绘制

    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y); //移动复制
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);

    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);//(x,y,z,j,f) x,y圆心z半径,j起始弧度f，终止弧度
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);

    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);

    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);

    ctx.fill();//填充
    ctx.closePath();//剪裁
  }
  
  /** 构建绘制海报矩形方法, 传入canvas选择器字符串, 返回绘制对象 */
  static async build(select_str: string) {
    // 由于画布并没有像其他的一样支持小程序独有的 rpx 自适应尺寸单位, 所以要获取rpx适配的值
    // 计算公式为 设备视口宽度 / 设计图宽度(375) = 设计图中的一像素适配设备视口宽度的几像素
    const rpx: number = wx.getSystemInfoSync().windowWidth / 375
    // 获取canvas实例
    const node: any = await new Promise(resolve => {
      const query = wx.createSelectorQuery()
      query.select(select_str)
        .node(({ node }) => resolve(node))
        .exec()
    })
    // 获取画笔
    const ctx = node.getContext('2d')
    return new DrawPoster(rpx, node, ctx)
  }
  /** 绘制器, 接收执行器函数, 添加到绘制器容器中 */
  public draw = (execute: Function) => {
    this.executeOnion.push(async () => {
      try {
        this.ctx.save();
        await execute(this.ctx, this.rpx);
        this.ctx.restore();
        return true
      } catch (error) { return false }
    })
  }
  /** 等待创建绘画, 成功后清空绘制器容器 */
  public awaitCreate = async () => {
    const result: Array<Boolean> = []
    for (let i = 0; i < this.executeOnion.length; i++) {
      const execute = this.executeOnion[i];
      result.push(await execute())
    }
    this.executeOnion = []
    return result;
  }
  /** 创建canvas本地地址 @returns {string} 本地地址 k*/
  public createImgUrl = (): Promise<any> => {
    const { node } = this
    return new Promise(resolve => {
      wx.canvasToTempFilePath({
        x: 0, y: 0,
        width: node.width,
        height: node.height,
        destWidth: node.width,
        destHeight: node.height,
        canvas: node,
        success(res) {
          resolve(res.tempFilePath)
        }
      })
    })
  }
}