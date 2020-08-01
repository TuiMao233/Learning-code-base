/*
 * @Author: 毛先生
 * @Date: 2020-08-01 15:42:10
 * @LastEditTime: 2020-08-01 16:11:28
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
export default class Observe {
  type: string;
  id: string;
  constructor(type: string, execute: (message: string) => any) {
    this.type = type
    this.id = this.Guid()
    if (typeof execute == 'function') {
      this.execute = execute
    }
  }
  execute(message: string) {
    console.log(`id: ${this.id}, value: ${message}`)
  }
  private Guid(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}