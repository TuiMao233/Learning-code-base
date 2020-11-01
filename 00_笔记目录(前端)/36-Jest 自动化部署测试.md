---
title: Jest 自动化部署测试
date: 2020-11-01
categories:
  - 
tags: 
  - jest
---
## Jest 简介

随着前端的发展，项目变的越来越复杂，这时候就引入前端工程化的概念，有人认为前端工程化就是高质量的代码设计，高质量的代码实践，就是前端工程化。其实工程化还有一个很重要的环节，就是自动化代码测试。

随着前端的发展，前端设计的领域已经越来越多，也越来越复杂。这就对我们前端工程化能力，提出了更高的要求。 好的前端工程化一般包括三个大的方面：

- 前端自动化测试（前提条件）
- 高质量的代码设计
- 高质量的代码实现

虽然一些公司，到现在还是没有前端自动化测试，甚至BOSS会说前端自动化测试会拉低工作效率，认为用处不大。这是完全错误的想法，你可以看到Github上任何大型的前端项目都有自动化测试代码。

- Ant Design : React UI组件库
- Vue.js : 国内最流行的构建用户界面的渐进式JavaScript框架。
- React.js : 世界最流行的JavaScript MVC框架。

### [Jest前端测试框架优点介绍](https://jspang.com/detailed?id=63#toc311)

- 比较新：喜新厌旧是人的天性，出来后你总想动手尝试一下，这个就和家花没有野花香是一个道理。作为一个程序员，你更要有拥抱全新知识的态度。绝不能固步自封，顽固不化。
- 基础很好：曾是框架的基础就是性能好、功能多、简单易用，Jest在这三个方面你可以完全放心。绝对是一把好手，干就完事了。
- 速度快： 单独模块测试功能，比如说有两个模块A和B，以前都测试过了，这时候你只改动A模块，在次测试，模块B不会再跑一次，而是直接测试A模块。这就好比你去‘大宝剑’，你所有技师都试过了一次，下次你再来，直接就找最好的就行了。不用再测试一遍。（安心、放心）
- API简单 ：等你基础知识学完后，你就会发现API非常简单，数量也少。
- 隔离性好：Jest里会有很多的测试文件等待我们使用，Jest的执行环境都是隔离，这样就避免不同的测试文件执行的时候互相影响而造成出错。
- IDE整合：Jest直接可以和很多编辑器（VSCode）进行融合，让测试变的更加简单。
- 多项目并行：比如我们写了Node.js的后台项目，用React写了一个前台项目，Jest是支持他们并行运行，让我们的效率更加提高了。
- 快出覆盖率：（测试代码覆盖率） 对于一个项目的测试都要出覆盖率的，Jest就可以快速出这样的覆盖率统计结果，非常好用。

## Jest 基本使用

```makefile
npm install jest@24.8.0 -D ## 安装jest
```

**编写index.js**

在项目根目录，新建两个文件，一个文件是`index.js`(被测试文件)，另一个是`index.test.js`（测试文件）文件。

`index.js`文件比如是我们写的一些业务逻辑方法，我们就那他当一个例子，最后要测试的就是这个文件。这里我们模仿一次去按摩的经历。

~~~js
function baojian1(money){
    return money>=200? '至尊享受':'基本按摩'
}

function baojian2(money){
    return money>=1000? '双人服务':'单人服务'
}
module.exports = {
    baojian1,baojian2  
}
~~~

**编写index.test.js**

~~~js
const dabaojian = require('./dabaojian.js')
const { baojian1 , baojian2 }  = dabaojian
// 测试baojian1方法, toBe为预期值, 当预期值未达到时, 将视为测试失败
test('保健1 300元',()=>{
    expect(baojian1(300)).toBe('至尊享受')
})
test('保健2  2000元',()=>{
    expect(baojian2(2000)).toBe('双人服务')
})
~~~

**修改package.json**

~~~json
{
  "name": "jesttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": { // 修改scriptstest为jest命令
    "test": "jest"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^24.8.0"
  }
}
~~~

### 单元测试与集成测试的区别

- **单元测试**：英文是(unit testing) 单,是指对软件中的最小可测试单元进行检查和验证。前端所说的单元测试就是对一个模块进行测试。也就是说前端测试的时候，你测试的东西一定是一个模块。
- **集成测试**：也叫组装测试或者联合测试。在单元测试的基础上，将所有模块按照涉及要求组装成为子系统或系统，进行集成测试。

随着前端的发展，现在无论我们些React还是写Vue，其实代码已经全部都模块化了，所以使用Jest测试不需要额外加入任何的操作了。

### Jest 初始化配置

~~~makefile
jest --init ### 执行初始化配置

#↓↓↓↓↓↓↓↓↓#

The following questions will help Jest to create a suitable configuration for your project ## 以下问题将帮助Jest为您的项目创建合适的配置
? Would you like to use Jest when running "test" script
in "package.json"? » (Y/n) ## 运行测试脚本是否使用package.json中?

#↓↓↓↓↓↓↓↓↓#

? Choose the test environment that will be used for testing » - Use arrow-keys. Return to submit. ## 选择测试环境
>   node
    jsdom (browser-like)

#↓↓↓↓↓↓↓↓↓#

? Do you want Jest to add coverage reports? » (y/N) ## 您是否希望Jest添加覆盖率报告(y)

#↓↓↓↓↓↓↓↓↓#

? Which provider should be used to instrument code for coverage? » - Use arrow-keys. Return to submit. ## 使用哪个提供程序检测覆盖率代码
>   v8
    babel

#↓↓↓↓↓↓↓↓↓#

? Automatically clear mock calls and instances between every test? » (y/N) ## 是否自动清除每个测试之间的模拟调用和实例？(y)

## 自动化测试
jest --watchAll
## 测试覆盖率
jest --coverage
~~~

### Jest.config.js配置项

~~~js
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true, // 是否清除测试模拟调用和实例
  coverageDirectory: "coverage", // 生成覆盖率目录文件名称
  testEnvironment: "node", // 默认值jsdom,
};
~~~

### Jest 配置支持ES6 模块化

**安装babel模块**

~~~makefile
cnpm i @babel/core@7.4.5 @babel/preset-env@7.4.5 --dev ## 安装
~~~

**配置babel模块(.babelrc)**

~~~js
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
~~~

**运行jest命令：**`jest`

## Jest 匹配器

### 内容匹配

~~~js
test('测试严格相等',()=>{
  const a = {number:'007'}   
  expect(a).toBe({number:'007'}) // -> 不通过, toBe为完全匹配才算通过
}) 
test('测试内容相等',()=>{
  const a = {number:'007'}   
  expect(a).toEqual({number:'007'}) // -> 通过
})
~~~

### 空 / 不存在匹配

~~~js
test('测试null匹配',()=>{
  const a = null   
  expect(a).toBeNull() // -> 通过
}) 
test('测试undefined匹配',()=>{
  const a = undefined   
  expect(a).toBeUndefined() // -> 通过
})
test('测试不为undefined匹配',()=>{
  const a = 'jspang'  
  expect(a).toBeDefined() // -> 通过
}) 
~~~

### 布尔值匹配

~~~js
test('测试为true匹配',()=>{
  const a = 0
  expect(a).toBeTruthy() // 不通过
}) 
test('测试为false匹配',()=>{
  const a = 0
  expect(a).toBeTruthy() // 通过
}) 
~~~

### 数值匹配

~~~js
test('大于指定值的数匹配', () => {
  expect(10).toBeGreaterThan(9) // ->通过
})
test('小于指定值的数匹配', () => {
  expect(10).toBeLessThan(11) // ->通过
})
test('大于等于指定值的数匹配', () => {
  expect(10).toBeGreaterThanOrEqual(10) // ->通过
})
test('小于等于指定值的数匹配', () => {
  expect(10).toBeLessThanOrEqual(10) // ->通过
})
test('匹配浮点数结果(忽略精度存在问题)', () => {
  const one = 0.1
  const tow = 0.2
  expect(one + tow).toBeCloseTo(0.3) // ->通过
})
~~~

### 字符串匹配

~~~js
test('匹配字符串是否存在指定字符串', () => {
  const str = "谢大脚,刘英,小红"
  expect(str).toMatch('谢大脚')
})
~~~

### 数组 / Set匹配

~~~js
test('匹配数组/Set中某个元素', () => {
  const arr = ["谢大脚", "刘英", "小红"]
  const set = new Set(arr)
  expect(arr).toContain('谢大脚') // -> 通过
  expect(set).toContain('谢大脚') // -> 通过
})
~~~

### 错误匹配

~~~js
const throwNewErrorFunc = () => { throw new Error('this is Error') }
test('匹配该函数是否抛出错误',() => {
  expect(throwNewErrorFunc).toThrow() // -> 通过
  // 匹配该异常字符串是否符合
  expect(throwNewErrorFunc).toThrow('this is Error') // -> 通过
  // 匹配不存在异常(not)
  expect(throwNewErrorFunc).not.toThrow() // -> 不通过
})
~~~

## 异步回调测试

在工作中我们很多方法都包含异步操作，所以测试异步代码成了工作中必不可少的一部分。

~~~js
import axios from 'axios'
export const fetchData = fn => {
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => fn(response.data))
}
export const pmsFetchData = () => (
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => response.data)
)
export const fetchThreeData = () => (
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => response.data)
)
~~~

### promise 异步测试

~~~js
test('异步方法测试', done => {
  // promise需返回, 且done要放在请求完毕后
  return pmsFetchData().then(data => {
    expect(data).toEqual({
      success: true
    })
    // done代表所有操作已完成
    done()
  })
})
~~~

### async 异步测试

~~~js
test('async异步方法测试', async done => {
  // promise需返回, 且done要放在请求完毕后
  const data = await pmsFetchData();
  expect(data).toEqual({
    success: true
  });
  // done代表所有操作已完成
  done();
})
~~~

### 404 错误测试

~~~js
test('异步404错误测试', done => {
  expect.assertions(1) // 断言, 必须执行一次expect(不然则不通过)
  // promise需返回, 且done要放在请求完毕后
  return fetchThreeData().catch(err => {
    expect(err.toString().indexOf('404') > -1).toBe(true)
    // done代表所有操作已完成
    done()
  })
})
~~~

## Jest 钩子回调与分组测试

~~~js
export default class {
  gongzhu(number) {
    this.user = number == 1 ? '大脚' : '刘英'
  }
  anjiao() {
    this.fuwu = this.user + '走进房间为你足疗'
  }
  anmo() {
    this.fuwu = this.user + '走进房间为你按摩'
  }
}
~~~

### 四个钩子回调

~~~js
// beforeAll: 测试案例执行之前
beforeAll(()=>console.log('beforeAll: 吃完饭后，走进了红浪漫区域'))
// afterAll: 测试案例执行之后
afterAll(()=>console.log('afterAll: 有钱人的生活就是这么枯燥且乏味'))
// beforeEach: 每个测试用例执行前
beforeEach(()=>console.log('beforeEach: 给了300元后'))
// afterEach: 每个测试用例之后
afterEach(()=>console.log('afterEach: 完成后, 我心满意足的坐在沙发上'))
test('测试 大脚足疗 方法', ()=>{
  baojian.gongzhu(1)
  baojian.anjiao()
  expect(baojian.fuwu).toEqual('大脚走进房间为你足疗')
})
test('测试 刘英按摩 方法', ()=>{
  baojian.gongzhu(2)
  baojian.anmo()
  expect(baojian.fuwu).toEqual('刘英走进房间为你按摩')
})
~~~

### 分组测试

~~~js
import NewBaoJian from './newBaoJian'
const baojian = new NewBaoJian()
describe('大脚相关服务', () => {
  test('测试 大脚足疗 方法', () => {
    baojian.gongzhu(1)
    baojian.anjiao()
    expect(baojian.fuwu).toEqual('大脚走进房间为你足疗')
  })
  test('测试 大脚泰式保健 方法', () => {
    baojian.gongzhu(1)
    baojian.taishi()
    expect(baojian.fuwu).toEqual('大脚走进房间为你_泰式保健')
  })
})
describe('刘英相关服务', () => {
  test('测试 刘英按摩 方法', () => {
    baojian.gongzhu(2)
    baojian.anmo()
    expect(baojian.fuwu).toEqual('刘英走进房间为你按摩')
  })
  test('测试 刘英宫廷御疗 方法', () => {
    baojian.gongzhu(2)
    baojian.gongting()
    expect(baojian.fuwu).toEqual('刘英走进房间为你_宫廷御疗')
  })
})
~~~

### 钩子函数作用域

钩子函数在父级分组可作用域子集，类似继承。钩子函数同级分组作用域互不干扰，各起作用。先执行外部的钩子函数，在执行内部的钩子函数