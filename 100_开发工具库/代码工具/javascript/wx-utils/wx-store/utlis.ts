/*
 * @Author: 毛先生
 * @Date: 2020-08-01 19:23:31
 * @LastEditTime: 2020-08-01 19:24:37
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
export function forIn(object: any, callback: (key: string, val: any) => void) {    // for in封装
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      callback(key, object[key])
    }
  }
  return object
}