/* eslint-disable @typescript-eslint/no-unused-vars */

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
