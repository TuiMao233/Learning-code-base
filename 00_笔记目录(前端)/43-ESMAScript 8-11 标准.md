# 赋值扩展

## 可选链操作符 ?.

~~~js
// 可选链操作符: ?.
function main (config) {
  // 这样组成的链式选择赋值, 太麻烦了
  // const dbHost = config && config.db && config.db.host

  const dbHost = config?.db?.host
  console.log(dbHost)
}
main({
  db: { host: '192.168.1.100', username: 'root' },
  cache: { host: '192.168.1.200', username: 'admin' }
})
// 函数的调用
const obj = {
  fn: ()=> (console.log('fn执行'))
}
obj.fn?.()
~~~

# 模块化扩展

## 动态引入

~~~js
// 使用动态引入按需加载
const btn = document.getElementById('btn')
btn.onclick = function () {
  import('./xxx.js').then(module => {
    module.hello()
  })
}

~~~

# 正则扩展

## 命名捕获

捕获组就是把正则表达式中子表达式匹配的内容,保存到内存中以数字编号或显式命名的组里,方便后面引用。ES8中提供了更加明确的命名捕获。

~~~js
// 原生匿名捕获(不能知道具体参数具体作用)
const toLocalDate = date => date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
console.log(toLocalDate('30-10-2019')) // -> 10-30-2019

// ES8中的命名捕获(在捕获时能清除的知道参数对应是什么)
const toLocalDate = date => date.replace(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/, "$<day>-$<month>-$<year>");
console.log(toLocalDate('30-10-2019')) // -> 10-30-2019

// 在match或exec中使用将返回一个对象, 命名对应值
const date = "04-25-2017".match(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/).groups
const { month, day, year } = date
~~~

## 正反向断言

断言用于查找在某些内容(但并不包括这些内容)之前或之后的东西，也就是说它们像\b,^,$那样用于指定一个位置，这个位置应该满足一定的条件(即断言)。

~~~js
let str = 'JS521131314你知道么555啦啦啦'
// 正向断言: 匹配字符串后面(?=) 如果\d前面不是啦啦啦, 则不满足条件
const reg = /\d+(?=啦)/
const result = reg.exec(str)
console.log(result[0]) // 555

// 反向断言: 匹配字符串前面(?<=) 如果\d后面不是么, 则不满足条件
const reg2 = /(?<=么)\d+/
const result2 = reg2.exec(str)
console.log(result2[0])
~~~

## 元字符

dot . 元字符 除换行符以外的任意单个字符

~~~js
let str = `
<ul>
<li>
  <a>肖申克的救赎</a>
</li>
<li>
  <a>阿甘正传</a>
</li>
</ul>`
// 声明匹配(不使用元字符)
// const reg = /<li>\s+<a>(.*?)<\/a>/
const reg = /<li>.*?<a>(.*?)<\/a>/s // .*? 后加个?是防止正则贪婪
// 执行匹配(使用元字符)
const result = reg.exec(str)
console.log(result)
~~~

# 对象扩展

## fromEntries

fromEntries 可以对数组/Set与对象之间的互相转换

~~~js
const result = Object.fromEntries([
  ['name', '尚硅谷'],
  ['xueke', 'Java,大数据,前端,云计算']
])
console.log(result) // 0> {name:xueke, 尚硅谷:Java...}

const m = new Map()
m.set('name', 'ATGUIGU')
const result2 = Object.fromEntries(m)
console.log(result2) // -> name:ATGUIGU

// Object.entries (ES8)
const arr = Object.entries({
  name: '尚硅谷'
})
console.log(arr)
~~~

# 字符串扩展

## trimStart or trimEnd

~~~js
let str = '      iloveyou          '
console.log(str)
// 清除左边空白
console.log(str.trimStart())
// 清除右边空白
console.log(str.trimEnd())
~~~

## matchAll

~~~js
let str = `
<ul>
<li>
  <a>肖申克的救赎</a>
</li>
<li>
  <a>阿甘正传</a>
</li>
</ul>`
// 声明正则
const reg = /<li>.*?<a>(.*?)<\/a>/s
// 调用方法
const result = str.matchAll(reg)
for (const v of result) {
  console.log(v) // 肖申克, 阿甘正传
}
// 可of(自定义遍历规则)遍历对象/数组都可用于扩展运算符
const arr = [...result]
console.log(arr) // [肖申克, 阿甘正传]
~~~

# 数组扩展

## flat or flatMap

将多维数组转换为低位数组

~~~js
// flat: 将多维数组转换为低维数组
const arr = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
// 参数为转换深度, 是一个数字
console.log(arr.flat(2))

// flatMap: 遍历如果返回的是多维数组, 转换为低维数组
const arr = [1,2,3,4]
const result = arr.flatMap(item=> [item*10])
~~~

# Symbol 扩展

## description

获取Symbol的命名值

~~~js
// 创建 Symbol
const s = Symbol('尚硅谷')
console.log(s.description) // 尚硅谷
~~~

# class 类扩展

## 私有属性

~~~js
class Person {
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight) {
    this.name = name
    this.#age = age
    this.#weight = weight
  }
  intro() {
    console.log(this.#age) // 18
    console.log(this.#weight) // 45kg
  }
}

const p = new Person('陈长春', 18, '45kg')
// console.log(p) // { name: '陈长春' }
console.log(p.name) // 陈长春
console.log(p.age) // undefined
console.log(p.weight) // undefined

p.intro()

~~~

# Promise 扩展

## allSettled

无论成功还是失败都会执行为成功状态的一个数组promise运算

~~~js
// allSettled无论成功还是失败都会执行为成功状态的一个数组promise运算
const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('商铺数据 - 1')
  })
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('商铺数据 - 2')
  })
})
// 使用allSettled方法
const result = Promise.allSettled([p1, p2])
result.then(val =>{
  console.log(val)
  /* 
  [
    { status: 'fulfilled', value: '商铺数据 - 1' },
    { status: 'rejected', reason: '商铺数据 - 2' }
  ] 
  */
})
~~~

# ES11 数据类型/特殊变量

## BigInt (大整型)

~~~js
// 大整型
let n = 521n
console.log(n) // 521n
console.log(typeof n) // bigint

// 函数
n = 123
console.log(BigInt(n))
// console.log(BigInt(1.2)) // 报错：不是整数

console.log('-------------------')

// 大数值运算
let max = Number.MAX_SAFE_INTEGER;
console.log(max)
console.log(max + 1)
console.log(max + 2)

console.log(BigInt(max))
console.log(BigInt(max)+ BigInt(1))
console.log(BigInt(max)+ BigInt(2))
~~~

## globalThis(全局对象)

~~~js
// globalThis 永远指向全局对象的一个特殊对象(无论浏览器和node都支持)
console.log(globalThis)
~~~



