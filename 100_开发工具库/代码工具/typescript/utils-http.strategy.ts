/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-30 13:48:00
 * @LastEditTime: 2021-05-07 10:29:06
 * @Description: 请求错误处理
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { debounce } from 'lodash'
const debounceErr = <T>(func: T extends (...args: any[]) => void ? any : any) => {
  return debounce(func, 500, { leading: true, trailing: false })
}

export const ERROR_STRATEGY = {
  /** 该请求参数不正确 */
  400: debounceErr((err: any) => {}),
  /** 该请求需要用户登录 */
  401: debounceErr((err: any) => {}),
  /** 该请求未得到授权 */
  403: debounceErr((err: any) => {}),
  /** 该请求地址不存在 */
  404: debounceErr((err: any) => {}),
  /** 服务器内部异常 */
  500: debounceErr((err: any) => {}),
  /** 服务器请求超时 */
  1000: debounceErr((err: any) => {}),
};

export type STRATEGY_KEYS = keyof typeof ERROR_STRATEGY;
