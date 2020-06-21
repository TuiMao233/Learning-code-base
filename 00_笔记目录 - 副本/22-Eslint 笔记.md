# Eslint 简述

`ESLint` 是一个**开源的 JavaScript 代码检查工具**，由 `Nicholas C. Zakas` 于 2013 年 6 月 创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体 的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。 JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为 了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 `ESLint` 这样的可以**让程序员在编码的过程中发现问题**而不是在执行的过程中。 ESLint 的**初衷是为了让程序员可以创建自己的检测规则。**ESLint 的所有规则都被设计 成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖 于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中 **自定义规则**。 `ESLint` 使用 `Node.js` 编写，这样既可以有一个快速的运行环境的同时也便于安装。

## 编码规范

每个程序员都有自己的编码习惯

有的人写代码一行代码结尾必须加分号 ;，有的人觉得不加分号 ; 更好看
有的人写代码一行代码不会超过 80 个字符，认为这样看起来简洁明了
有的人喜 欢把所有逻辑都写在一行代码上，觉得别人看不懂的代码很牛逼
有的人使用变量必然会先定义 var a = 10;，而粗心的人写变量可能没有定义过就直 接使用 b = 10;

## Lint 的含义

如果你写自己的项目怎么折腾都没关系，但是在公司中老板希望每个人写出的代码 都要符合一个统一的规则，这样别人看源码就能够看得懂，因为源码是符合统一的编码 规范制定的。

那么问题来了，总不能每个人写的代码老板都要一行行代码去检查，这是一件很 蠢的事情。凡是重复性的工作，都应该被制作成工具来节约成本。这个工具应该做两件 事情：**提供编码规范**、**提供自动检验代码的程序**。并打印检验结果：告诉你哪一个文件哪一行代码不 符合哪一条编码规范，方便你去修改代码

Lint 是检验代码格式工具的一个统称，具体的工具有 Jslint 、 Eslint 等等

# Eslint 安装&使用

`确保电脑安装了 node 和 npm 环境`
`创建项目：npm init`
`本地安装：npm i eslint --save-dev`
`设置命令(package.json)："scripts": { "lint": "eslint src", "lint:create": "eslint --init" }`
																	  		`eslint src`[校验目录代码]   	`eslint init`[生成配置文件]
**脚本初始化：**`npm run lint:create`
**运行效验工具：**`npm run lint`

~~~gfm
// 你怎么检查语法？
? How would you like to use ESLint?
> To check syntax only		[只是检查语法]
	To check syntax and find problems		[检查语法并找到问题]
  To check syntax, find problems, and enforce code style	[检查语法并找到问题，并强制的保持风格]
  
// 使用哪一种模块化语法？
? What type of modules does your project use? (Use arrow keys)
> JavaScript modules (import/export)		[ES6模块化]
  CommonJS (require/exports)		[CommonJS模块化]
  None of these			[不使用模块化语法]
  
// 你使用哪一种框架？
? Which framework does your project use? (Use arrow keys)
> React
  Vue.js
  None of these		[不使用框架]

// 你是否使用TypeScript语法
? Does your project use TypeScript? (y/N) 

// 你的代码是运行在哪里？
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Browser		[浏览器]
 ( ) Node				[Node]

// 编码规范是？
? How would you like to define a style for your project? (Use arrow keys)
> Use a popular style guide		[使用流行的规范]
  Answer questions about your style		[选项自定义]	
  Inspect your JavaScript file(s)		[导入js配置文件]

// 选择哪个流行的编码规范？
? Which style guide do you want to follow? (Use arrow keys)
> Airbnb: https://github.com/airbnb/javascript				[Airbnb代码规范]
  Standard: https://github.com/standard/standard			[Standard代码规范]
  Google: https://github.com/google/eslint-config-google		[Google代码规范]
  
// 配置文件的类型？
? What format do you want your config file to be in? (Use arrow keys)
> JavaScript
  YAML
  JSON

// 你希望自动帮您安装相应的npm包吗？
? Would you like to install them now with npm? (Y/n)
~~~

## 检测文件效果

**文件内容 ：**`const lint = 'eslint'`

**错误信息**

~~~dart
1:7 error 'lint' is assigned a value but never used no-unused-vars 
	定义的变量没有被使用到 
1:22 error Newline required at end of file but not found eol-last
 	新行是必须的 但是没有找到
~~~

## 检测规则网址

https://cn.eslint.org/docs/rules/ 

## 修复基础错误(fix)

`"lint": "eslint src --fix"`, 加上 --fix 参数，是 Eslint 提供的自动修复基础错误的功能。 --fix 只能修复基础的不影响代码逻辑的错误，像 no-unused-vars 这种 错误只能手动修改

## 跳过 lint 校验

~~~javascript
const apple = "apple"; // eslint-disable-line
const balana = "balana"; // eslint-disable-line
/* eslint-disable */
alert('foo');
/* eslint-enable */
~~~

# eslintrc.js 解析

~~~javascript
module.exports = {
 	"env": {"browser": true,"commonjs": true,"es6": true},
 	"extends": "eslint:recommended",
 	"parserOptions": {"ecmaVersion": 2016, "sourceType": "module"},
 	"rules": {
 			"indent": ["error","tab"],
 			"linebreak-style": ["error","windows"],
 			"quotes": ["error","double"],
 			"semi": ["error","always"]
 	}
};
~~~

该文件导出一个对象，对象可以包含属性 `env`、`extends`、`parserOptions`、`plugins`、`rules`、`globals`

**env、parserOptions、plugin 、parse**
标识我们程序将要使用到的语法（交互式的指令 对我们来说不重要），Parse 代表使用的解析器

**extends**
值为 `"eslint:recommended"` 的 extends 属性启用一系列核心规则，这些规 则是经过前人验证的最佳实践（所谓最佳实践，就是大家伙都觉得应该遵 循的编码规范），想知道最佳实践具体有哪些编码规范，可以在 eslint 规 则表 中查看被标记为 √ 的规则项，
`eslint-config-recommended` 本质上是一个包

**rules**
用于覆盖继承来的规则，我们可以通过设置 rules 来定义我们自己的编码规范。	
ESLint 附带有大量的规则，修改规则应遵循如下要求
`off" 或 0 - 关闭规则`
`"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程 序退出)`
`"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的 时候，程序会退出)`

# 常用规则

`object-shorthand`
**设置该规则，表示对象属性要简写。**

~~~js
var foo = {x: x}; // 会报错
var bar = {a: function () {}}; // 会报错
var foo = {x}; // 不会报错
var bar = {a () {}}; // 不会报错
~~~

`prefer-arrow-callback`
**要求回调函数使用箭头函数**

~~~js
funciton bar() {} 						// 不是回调函数，不会报错
setTimeout(funciton(){}, 1000) // 报错
setTimeout(() => {}, 1000)		// 不报错
// setTimeout 的第一个参数就是回调函数，不用箭头函数会报错
~~~

`no-trailing-spaces`
**禁止行尾空格**

`no-shadow`
**禁止变量声明与外层作用域的变量同名**

~~~javascript
function sum (num) {
 var num = 2;
// 报错，因为 num 变量作为参数已经申明过了
}
~~~



