/*
 * @Author: Mr.Mao
 * @Date: 2021-06-03 09:24:39
 * @LastEditTime: 2021-06-03 14:29:08
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosStatic } from 'axios'
import { assign, cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'

interface AxiosPolingConfig {
  /** 当前正常轮询的总次数，初始值：0 */
  count: number
  /** 正常轮询时，请求延迟毫秒数，默认：1000毫秒 */
  dalay: number
  /**  轮询请求间隔递增毫秒数，默认：0毫秒（建议不要超过1000） */
  delayGaps: number
  /** 发生错误时，当前已重试的次数，初始值：0 */
  retryCount: number
  /** 当发生错误时请求的最大次数，默认：10次 */
  retryLimit: number
  /** 第一次发送请求毫秒数，默认：1000毫秒 */
  retryAfter: number
}

declare module 'axios' {
  interface AxiosRequestConfig {
    custom?: any
    poling?: Partial<AxiosPolingConfig>
  }
  interface AxiosInstance {
    poling: InstanceType<typeof AxiosPoling>
  }
}

class AxiosPoling {
  constructor(
    /** axios 请求实例 */
    private instance = axios
  ) {}
  /** 订阅者对象集合 */
  private observes: {
    [key: string]: {
      stacks: {
        request: ((config: AxiosRequestConfig) => void)[]
        response: ((response: AxiosResponse) => void)[]
        error: ((error: AxiosError) => void)[]
      }
      loop: boolean
    }
  } = {}

  /** 循环调用模型 */
  private loopCallModel = (callback: () => void) => {
    const call = (time = 1000) => setTimeout(callback, time)
    return { call }
  }

  /** 发送轮询请求, 返回监视者实例 */
  emit = (config: AxiosRequestConfig = {}) => {
    // 记录监视者, 生成循环模型
    const OBSERVE_ID = nanoid(10)
    this.observes[OBSERVE_ID] = {
      stacks: { request: [], response: [], error: [] },
      loop: true
    }
    const observe = this.observes[OBSERVE_ID]
    const loopModel = this.loopCallModel(async () => {
      // 当前监视者循环调用关闭时, 阻止 loop
      if (!this.observes[OBSERVE_ID]?.loop) return undefined
      try {
        // 调用当前监视者请求前堆栈
        observe['stacks']['request'].forEach((callback) => callback(config))
        // 再次发送请求
        const response = await this.instance(config || {})
        // 调用当前监视者请求完毕堆栈
        observe['stacks']['response'].forEach((callback) => callback(response))
        // 记录请求长度
        const poling = response.config?.poling as AxiosPolingConfig
        poling.delayGaps += poling.delayGaps
        poling.count += 1
        // 再次进入 loop
        loopModel.call(poling.dalay + poling.delayGaps)
      } catch (e) {
        const poling = e.config?.poling as AxiosPolingConfig
        // 调用当前监视者失败堆栈
        observe['stacks']['error'].forEach((callback) => callback(e))
        // 当错误超出限制, 阻止 loop
        if (poling.retryCount >= poling.retryLimit) return
        // 记录失败请求长度
        poling.delayGaps += poling.delayGaps
        poling.retryCount += 1
        config.poling = poling
        // 再次进入 loop
        loopModel.call(poling.dalay + poling.delayGaps)
      }
    })
    // 初次调用循环请求
    loopModel.call(config?.poling?.retryAfter || this.instance['defaults'].poling?.retryAfter)
    function on(event: 'request', callback: (config: AxiosRequestConfig) => void): void
    function on(event: 'response', callback: (response: AxiosResponse) => void): void
    function on(event: 'error', callback: (error: AxiosError) => void): void
    function on(event: 'request' | 'response' | 'error', callback: any) {
      observe['stacks'][event].push(callback)
    }
    const off = () => {
      this.observes[OBSERVE_ID].loop = false
      delete this.observes[OBSERVE_ID]
    }
    return { on, off }
  }
}

/**
 * axios 轮询装饰器
 * @param axios axios 实例
 * @param config poling 配置
 */
const axiosPoling = (axios: AxiosStatic, config?: Partial<AxiosPolingConfig>) => {
  const defaultConfig = {
    count: 0,
    dalay: 1000,
    delayGaps: 0,
    retryCount: 0,
    retryLimit: 10,
    retryAfter: 1000
  }
  axios.poling = new AxiosPoling(axios)
  axios['defaults'].poling = assign(cloneDeep(defaultConfig), config)
}
export { axiosPoling }
