export default {
  getArgs (func) {
      var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]
      // 用逗号来分隔参数(arguments string).
      return args.split(',').map(function (arg) {
        // 去除注释(inline comments)以及空格
        return arg.replace(/\/\*.*\*\//, '').trim()
      }).filter(function (arg) {
        // 确保没有 undefined.
        return arg
      })
  },
  getVueFunArgs (fun) {
    const Reg = /_ref[0-9]{0,1}\.\w{0,}[,;]/g
    return fun.toString().match(Reg).map((value) => {
      return value.replace(/[,;]/, '').replace(/_ref[0-9]{0,1}\./, '')
    })
  }
}
