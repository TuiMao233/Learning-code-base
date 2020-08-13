/*
 * @Author: 毛先生
 * @Date: 2020-08-10 15:33:35
 * @LastEditTime: 2020-08-11 09:05:33
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */

declare interface DrawPosterCanvasCtx extends CanvasRenderingContext2D {
  /** 等待绘制图片
  * @param  {string} url 网络图片地址(必须)
  * @param  {number} x 绘制x轴位置(必须)
  * @param  {number} y 绘制y轴位置(必须)
  * @param  {number} w 绘制图片宽度(必须)
  * @param  {number} h 绘制图片高度(必须)
  * @returns {Promise} 图片绘制成功时返回true, 需ctx.restore()绘制出实体
  */
  loadDrawImage(url: string, x: number, y: number, w: number, h: number): Promise<boolean>;
  /** 绘制换行字体
   * @param  {string} text 本地图片地址(必须)
   * @param  {number} x 绘制x轴位置(必须)
   * @param  {number} y 绘制y轴位置(必须)
   * @param  {number} width 绘制换行字体的最大宽度(必须)
   * @param  {number} fontHeight 字体高度(必须)
   * @param  {number} layer 绘制层数(必须)
   * @returns {void} 无返回值, 需ctx.restore()绘制出实体
   */
  warpFillText(options: { text: string, x: number, y: number, width: number, fontHeight: number, layer: number }): void
  /** 绘制圆角矩形
   * @param {number} x x坐标轴(必须)
   * @param {number} y y坐标轴(必须)
   * @param {number} w 宽度(必须)
   * @param {number} h 高度(必须)
   * @param {number} r 圆角半径 默认为0
   */
  roundRect(x: number, y: number, w: number, h: number, r: number): void;
}
/** 创建绘制海报矩形方法, 自动向画笔添加加载绘制图片方法(ctx.loadDrawImage), 绘制换行字体方法(warpFillText)
 * @param  {string} select_str 查询CSS选择器字符串
 * @returns 返回绘制工具
 * @example const { node, rpx, draw, awaitCreate, createImgUrl } = await DrawPoster.build('#canvas')
 */
declare class DrawPoster {
  /** rpx适配单位 */
  rpx: number
  /** canvas节点 */
  node: HTMLCanvasElement
  /** 构建绘制海报矩形方法, 传入canvas选择器字符串, 返回绘制对象 */
  static build(select_str: string): Promise<DrawPoster>
  /** canvas画笔 */
  private ctx: DrawPosterCanvasCtx
  /** 绘制器容器 */
  private executeOnion: Array<any>
  /** 微信-创建本地图片地址 */
  private downloadImgUrl(url: string): Promise<string>
  /** ctx中添加等待绘制图片方法 */
  private loadDrawImage(url: string, x: number, y: number, w: number, h: number): Promise<boolean>
  /** ctx中添加绘制换行字体方法 */
  private warpFillText(options: { text: string, x: number, y: number, width: number, fontHeight: number, layer: number }): void
  /** ctx中添加绘制矩形方法 */
  private roundRect(x: number, y: number, w: number, h: number, r: number): void
  /** 绘制器, 接收执行器函数, 添加到绘制器容器中 */
  public draw(execute: (ctx: DrawPosterCanvasCtx, rpx: number) => any): void
  /** 等待创建绘画, 成功后清空绘制器容器 */
  public awaitCreate(): Promise<boolean[]>
  /** 创建canvas本地地址 @returns {string} 本地地址 */
  public createImgUrl(): Promise<string>
}
export default DrawPoster