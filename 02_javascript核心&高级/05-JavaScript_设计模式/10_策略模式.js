/* 
策略模式指的是定义一系列的算法，把它们一个个封装起来。
将不变的部分和变化的部分隔开是每个设计模式的主题，
策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，
策略类封装了具体 的算法，并负责具体的计算过程。
第二个部分是环境类Context，Context接受客户的请求，
随后把请求委托给某一个策略类。要做到这点，
说明 Context中要维持对某个策略对象的引用。
*/

// 粗糙的实现, 问题：calculateBonus 函数比较庞大，包含了很多 if-else 语句
/* var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4;
  }
  if (performanceLevel === 'A') {
    return salary * 3;
  }
  if (performanceLevel === 'B') {
    return salary * 2;
  }
};

calculateBonus('B', 20000); // 输出：40000
calculateBonus('S', 6000); // 输出：24000


// 在 JavaScript 语言中，函数也是对象，
// 所以更简单和直接的做法是把 strategy 直接定义为函数
const strategies = {
  S: salary => salary * 4,
  A: salary => salary * 3,
  B: salary => salary * 2
};
const calculateBonus = function (level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus('S', 20000)); // 输出：80000
console.log(calculateBonus('A', 10000)); // 输出：30000 */


const fromStrategu = (function (){
  const strategy = {
    notEmpty: val => val.length ? '' : '请填写内容',
    isNumber: val => /^[0-9]+(\.[0-9]+)$/.test(val) ? '' : '请填写一个数字',
    isPhone: val => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val) ? '' : '手机号格式不正确',
  }
  return {
    validate: function (type, value) {
      value = value.trim()
      return strategy[type] ? strategy[type](value) : '没有该检测方法, 请手动添加'
    },
    addStrategy: function (type, fn) {
      if (strategy[type]){
        return '该方法已存在'
      }
      strategy[type] = fn
    }
  }
})()

console.log(fromStrategu('isPhone', '17325869'))