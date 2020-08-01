/*
 * @Author: 毛先生
 * @Date: 2020-08-01 15:47:16
 * @LastEditTime: 2020-08-01 20:02:20
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
import Watcher from './watcher';
import { forIn } from './utlis'
const watcher = new Watcher({ debugging: true })

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

  private definebinding: Record<string, Record<string, (state: any) => any>>
  private getters_name: string = ""
  constructor({ state, mutations, actions, getters }: EStore) {
    this._initState(state)
    this._initGetters(getters)
    this.state = state
    this.getters = getters
    this.mutations = mutations
    this.actions = actions
  }
  /** 处理state, 加入属性修饰符 */
  private _initState(state: any) {
    const _this = this
    forIn(state, key => {
      let oldValue = state[key]
      Object.defineProperty(state, key, {
        get() {
          if(_this.getters_name) {
            
          }
          return oldValue
        },
        set(val) {
          _this.getters.getCount
          oldValue = val
        }
      })
    })
    return state
  }
  /** 处理getters, 加入属性修饰符 */
  private _initGetters(getters: object) {
    const _this = this
    forIn(getters, key => {
      // 保存回调
      const cb = getters[key]

      // 修改get修饰符
      Object.defineProperty(getters, key, {
        set() { },
        get() {
          console.log('getters---')
          return cb.call(_this, _this.state)
        }
      })
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

const store = new Store({
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
    getCount(state) {
      return state.count + state.count_2
    }
  }
})
console.log(store.getters.getCount)