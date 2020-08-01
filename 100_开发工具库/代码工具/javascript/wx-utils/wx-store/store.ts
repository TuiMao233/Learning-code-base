/*
 * @Author: 毛先生
 * @Date: 2020-08-01 15:47:16
 * @LastEditTime: 2020-08-01 21:37:52
 * @LastEditors: Mr_Mao
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
import { forIn } from './utlis'

// 构造器接口
interface EStore {
  state: any;
  mutations: Record<string, (state: any, data?: any) => void>;
  actions: Record<string, (
    context: {
      commit: (type: string, data?: any) => any,
      params?: any
    },
  ) => any>;
  getters: Record<string, (state: any) => void>;
  [name: string]: any;
}

class Store implements EStore {
  state: any;
  mutations: Record<string, (state: any, data?: any) => void>;
  actions: Record<string, (
    context: {
      commit: (type: string, data?: any) => any,
      params?: any
    },
  ) => any>;
  getters: Record<string, (state: any) => void>;
  [name: string]: any;

  private definebinding: Record<string, Array<string>> = {}
  private getter_name: string | null
  constructor({ state, mutations={}, actions={}, getters }: EStore) {
    this.defineReactive(state)
    this.state = state
    this.defineComputed(getters)
    this.getters = getters
    this.mutations = mutations
    this.actions = actions
  }
  /** 处理state, 加入属性修饰符 */
  private defineReactive(state: any) {
    forIn(state, key => {
      let oldValue = state[key]
      Object.defineProperty(state, key, {
        get: () => {
          // 如果getter_name存在, 添加到绑定对象中
          if (this.getter_name) {
            if (Array.isArray(this.definebinding[key])) {
              this.definebinding[key].push(this.getter_name)
            } else {
              this.definebinding[key] = [this.getter_name]
            }
          }
          return oldValue
        },
        set: val => {
          setTimeout(() => {
            if (this.definebinding[key]) {
              this.definebinding[key].forEach(g_key => this.getters[g_key])
            }
          })
          oldValue = val
        }
      })
    })
    return state
  }
  /** 处理getters, 加入属性修饰符 */
  private defineComputed(getters: object) {
    forIn(getters, key => {
      // 保存回调
      const cb = getters[key]
      this.getter_name = key
      // 修改get修饰符
      Object.defineProperty(getters, key, {
        set() { },
        get: () => {
          const val = cb.call(this, this.state)
          console.log(`getter-${key}: `, val)
          return val
        }
      })
      getters[key];
      this.getter_name = null;
    })
  }
  // 提交函数
  commit = (mt_name: string, params?: any) => {
    this.mutations[mt_name](this.state, params)
  }
  // 派遣函数, 调用该函数寻找对应的actions/mutations执行, 改变状态
  dispatch(type: string, params?: any) {
    if (this.actions[type]) {
      this.actions[type]({
        commit: this.commit.bind(this),
        params
      })
      return;
    }
    if (this.mutations[type]) {
      this.mutations[type](this.state, params)
      return;
    }
  }
}

const $store = new Store({
  state: {
    count: 2,
    count_2: 6
  },
  mutations: {
    ADD_ONE_COUNT(state) { state.count += 1 }
  },
  actions: {
    addOneCount({ commit }) { commit('ADD_ONE_COUNT') }
  },
  getters: {
    // 统计所有count
    statisticsCount(state) {
      return state.count + state.count_2
    },
    total(state) {
      return state.count
    }
  }
})

$store.state.count = 100

