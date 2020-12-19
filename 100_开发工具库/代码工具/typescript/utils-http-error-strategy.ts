/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-30 13:48:00
 * @LastEditTime: 2020-12-19 16:44:44
 * @Description: 请求错误处理
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

export const ERROR_STRATEGY = {
  /** 该请求参数不正确 */
  400: (err: HttpError) => {},
  /** 该请求需要用户登录 */
  401: (err: HttpError) => {},
  /** 该请求未得到授权 */
  403: (err: HttpError) => {},
  /** 该请求地址不存在 */
  404: (err: HttpError) => {},
  /** 服务器内部异常 */
  500: (err: HttpError) => {},
  /** 服务器请求超时 */
  1000: (err: HttpError) => {},
};

export type STRATEGY_KEYS = keyof typeof ERROR_STRATEGY;
