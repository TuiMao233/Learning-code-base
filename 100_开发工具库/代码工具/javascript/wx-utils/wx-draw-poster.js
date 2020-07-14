/** 创建绘制海报矩形方法, 自动向画笔添加加载绘制图片方法(ctx.loadDrawImage), 绘制换行字体方法(warpFillText)
 * @param  {string} select_str 查询CSS选择器字符串
 * @returns {node, ctx, rpx} 返回canvas实例, 画笔, 适配值
 * @example const { node, ctx, rpx } = await DrawPoster.build('#canvas')
 */
export class DrawPoster {
  constructor({ rpx, node, ctx }) {
    this.rpx = rpx
    this.node = node
    this.ctx = ctx
    this.ctx.loadDrawImage = this.loadDrawImage
    this.ctx.warpFillText = this.warpFillText
    this.ctx.roundRect = this.roundRect
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
    return new this({ rpx, node, ctx })
  }

  /** ctx中添加等待绘制图片方法
   * @param  {string} path 本地图片地址(必须)
   * @param  {number} x 绘制x轴位置(必须)
   * @param  {number} y 绘制y轴位置(必须)
   * @param  {number} w 绘制图片宽度(必须)
   * @param  {number} h 绘制图片高度(必须)
   * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
   */
  loadDrawImage = ({ path, x, y, width, height }) => {
    const { node, ctx } = this
    return new Promise(resolve => {
      const imageObject = node.createImage()
      imageObject.src = path
      imageObject.onload = () => { ctx.drawImage(imageObject, x, y, width, height); resolve(true) }
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
  warpFillText = ({ text, maxWidth, fontHeight, layer, x, y }) => {
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
   * @param {number} x x坐标轴
   * @param {number} y y坐标轴
   * @param {number} w 宽度
   * @param {number} h 高度
   * @param {number} r 圆角半径
   */
  roundRect = (x, y, w, h, r, c = '#000') => {
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

  // 绘制器容器
  executeOnion = []
  /** 绘制器, 接收执行器函数, 添加到绘制器容器中 */
  draw = execute => {
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
  awaitCreate = async () => {
    const result = []
    for (let i = 0; i < this.executeOnion.length; i++) {
      const execute = this.executeOnion[i];
      result.push(await execute())
    }
    this.executeOnion = []
    return result;
  }
  /** 创建canvas本地地址
   * @returns {string} 本地地址
   */
  createImgUrl = async () => {
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
// 使用案例
(async function () {
  const { node, draw, awaitCreate, createImgUrl } = await DrawPoster.build("#canvas");
  const { windowWidth, windowHeight } = wx.getSystemInfoSync();
  node.width = windowWidth;
  node.height = windowHeight;

  // 背景与图片框架的绘制
  draw(async (ctx, rpx) => {
    // 背景绘制
    ctx.fillStyle = "#F4F4F4";
    ctx.fillRect(0, 0, node.width, node.height);
    // 卡片矩形绘制
    ctx.fillStyle = "#fff";
    ctx.roundRect(15 * rpx, 179 * rpx, 345 * rpx, 365.5 * rpx, 10 * rpx);
    // 窗布绘制
    await ctx.loadDrawImage({
      x: 88 * rpx,
      y: 174.94 * rpx,
      path: lcClothImgUrl, // 本地图片地址
      width: 198.98 * rpx,
      height: 36 * rpx
    });
    // 二维码绘制
    await ctx.loadDrawImage({
      x: 85 * rpx,
      y: 308.5 * rpx,
      path: lcQRCodeUrl, // 本地图片地址
      width: 205.5 * rpx,
      height: 205.5 * rpx
    });
  });

  // 顶部字体绘制
  draw(async (ctx, rpx) => {
    // 字体默认样式
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.fillStyle = "white";
    // 名称绘制
    ctx.font = `bold ${22 * rpx}px sans-serif`;
    ctx.fillText(name, 76.2 * rpx, 38.5 * rpx);
    // 标签和手机号绘制
    ctx.font = `${14 * rpx}px sans-serif`;
    ctx.fillText(`${label}  ${phone}`, 76.2 * rpx, 69.5 * rpx);
    // 地址绘制
    ctx.fillText(address, 76.2 * rpx, 94.5 * rpx);
  });

  // 卡片字体绘制
  draw(async (ctx, rpx) => {
    // 名片字段
    ctx.fillStyle = "white";
    ctx.font = `bold ${22 * rpx}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("个人名片", node.width / 2, 195 * rpx);
    ctx.restore();

    ctx.fillStyle = "#333333";
    ctx.font = `bold ${12 * rpx}px sans-serif`;
    ctx.warpFillText({
      text: `您好，我是${address}车行经理何生，我负责${address}车行的商务合作，如果您在汽车方面等商务合作需求，请直接咨询我。`,
      maxWidth: 300.97 * rpx,
      fontHeight: 20 * rpx,
      layer: 3,
      x: 37 * rpx,
      y: 241.21 * rpx
    });
  });

  // 等待绘制
  const result = await awaitCreate();
  console.log("draw绘制状况:", result);

  const posterImgUrl = await createImgUrl();
  console.log("绘制生成本地地址:", posterImgUrl);
})

