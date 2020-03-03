import getArgs from './getArgs.js'
export default {
  addMethod (state) {
    // 保存对象this为acMuAgg
    const Ac = this
    // 保存actions
    this.actions = this.acMu.actions
    // 保存mutations
    this.mutations = this.acMu.mutations
    // 获取形参名的方法保存在this中
    this.getVueFunArgs = getArgs.getVueFunArgs
    // 获取调用的state数据
    this.state = state
    // 保存，保存函数的对象
    const addAcMu = this.addAcMu
    // 保存addAggregate方法
    var addAggregate = this.addAggregate
    // 遍历保存函数的对象
    Object.keys(addAcMu).forEach(function (key) {
      // 调用addAggregate方法 并绑定this是acMuAgg
      addAggregate.call(Ac, addAcMu[key])
    })
  },
  addAggregate (fun) {
    // 保存方法名字并更改为大写字符
    const mutationFun = fun.name.toLocaleUpperCase() // 提取调用
    // 向actions添加方法
    this.actions[fun.name] = ({commit}, Args) => {
        if (Args instanceof Array) { // 判断传入的是否是数组
          // 提取形参名为数组
          const FunAge = this.getVueFunArgs(fun)
          const obj = {}
          // 定制commit传入的对象，里面的格式是 参数名：触发后传入的参数值(Args)，参数名必须得和方法内的参数名一致
          for (var i = 0; i < FunAge.length; i++) { obj[FunAge[i]] = Args[i] }
          // 执行commit，传入大写方法名，并传入定制的commit形参对象
          commit(mutationFun, obj)
        } else {
          // 如不是数组，则直接执行commit指令并传入形参
          commit(mutationFun, Args)
        }
   }
   // 最后给mutations的大写命名fun添加方法
    this.mutations[mutationFun] = fun
  }
}
