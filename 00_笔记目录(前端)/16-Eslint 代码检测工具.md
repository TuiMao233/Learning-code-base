---
title: Eslint 代码检测工具
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - eslint
---
## Eslint 简述

`ESLint` 是一个**开源的 JavaScript 代码检查工具**，由 `Nicholas C. Zakas` 于 2013 年 6 月 创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体 的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。 JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为 了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 `ESLint` 这样的可以**让程序员在编码的过程中发现问题**而不是在执行的过程中。 ESLint 的**初衷是为了让程序员可以创建自己的检测规则。**ESLint 的所有规则都被设计 成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖 于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中 **自定义规则**。 `ESLint` 使用 `Node.js` 编写，这样既可以有一个快速的运行环境的同时也便于安装。

### 编码规范

每个程序员都有自己的编码习惯

有的人写代码一行代码结尾必须加分号 ;，有的人觉得不加分号 ; 更好看
有的人写代码一行代码不会超过 80 个字符，认为这样看起来简洁明了
有的人喜 欢把所有逻辑都写在一行代码上，觉得别人看不懂的代码很牛逼
有的人使用变量必然会先定义 var a = 10;，而粗心的人写变量可能没有定义过就直 接使用 b = 10;

### Lint 的含义

如果你写自己的项目怎么折腾都没关系，但是在公司中老板希望每个人写出的代码 都要符合一个统一的规则，这样别人看源码就能够看得懂，因为源码是符合统一的编码 规范制定的。

那么问题来了，总不能每个人写的代码老板都要一行行代码去检查，这是一件很 蠢的事情。凡是重复性的工作，都应该被制作成工具来节约成本。这个工具应该做两件 事情：**提供编码规范**、**提供自动检验代码的程序**。并打印检验结果：告诉你哪一个文件哪一行代码不 符合哪一条编码规范，方便你去修改代码

Lint 是检验代码格式工具的一个统称，具体的工具有 Jslint 、 Eslint 等等

## Eslint 安装&使用

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

### 检测文件效果

**文件内容 ：**`const lint = 'eslint'`

**错误信息**

~~~dart
1:7 error 'lint' is assigned a value but never used no-unused-vars 
	定义的变量没有被使用到 
1:22 error Newline required at end of file but not found eol-last
 	新行是必须的 但是没有找到
~~~

### 检测规则网址

https://cn.eslint.org/docs/rules/ 

### 修复基础错误(fix)

`"lint": "eslint src --fix"`, 加上 --fix 参数，是 Eslint 提供的自动修复基础错误的功能。 --fix 只能修复基础的不影响代码逻辑的错误，像 no-unused-vars 这种 错误只能手动修改

### 跳过 lint 校验

~~~javascript
const apple = "apple"; // eslint-disable-line
const balana = "balana"; // eslint-disable-line
/* eslint-disable */
alert('foo');
/* eslint-enable */
~~~

## eslintrc.js 解析

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

## 常用规则

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

**其余规则**

~~~js
"no-var": 2,//禁止使用var表达式
"no-alert": 0,//禁止使用alert confirm prompt
"no-array-constructor": 2,//禁止使用数组构造器
"no-bitwise": 0,//禁止使用按位运算符
"no-caller": 1,//禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2,//禁止给类赋值
"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
"no-console": 2,//禁止使用console
"no-const-assign": 2,//禁止修改const声明的变量
"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0,//禁止使用continue
"no-control-regex": 2,//禁止在正则表达式中使用控制字符
"no-debugger": 2,//禁止使用debugger
"no-delete-var": 2,//不能对var声明的变量使用delete操作符
"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2,//函数参数不能重复
"no-duplicate-case": 2,//switch中的case标签不能重复
"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
"no-empty": 2,//块语句中的内容不能为空
"no-empty-character-class": 2,//正则表达式中的[]内容不能为空
"no-empty-label": 2,//禁止使用空label
"no-eq-null": 2,//禁止对null使用==或!=运算符
"no-eval": 1,//禁止使用eval
"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
"no-extend-native": 2,//禁止扩展native对象
"no-extra-bind": 2,//禁止不必要的函数绑定
"no-extra-boolean-cast": 2,//禁止不必要的bool转换
"no-extra-parens": 2,//禁止非必要的括号
"no-extra-semi": 2,//禁止多余的冒号
"no-fallthrough": 1,//禁止switch穿透
"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
"no-func-assign": 2,//禁止重复的函数声明
"no-implicit-coercion": 1,//禁止隐式转换
"no-implied-eval": 2,//禁止使用隐式eval
"no-inline-comments": 0,//禁止行内备注
"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2,//禁止无效的正则表达式
"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,//不能有不规则的空格
"no-iterator": 2,//禁止使用__iterator__ 属性
"no-label-var": 2,//label名不能与var声明的变量名相同
"no-labels": 2,//禁止标签声明
"no-lone-blocks": 2,//禁止不必要的嵌套块
"no-lonely-if": 2,//禁止else语句内只有if语句
"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false],//声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
"linebreak-style": [0, "windows"],//换行风格
"no-multi-spaces": 1,//不能用多余的空格
"no-multi-str": 2,//字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
"no-native-reassign": 2,//不能重写native对象
"no-negated-in-lhs": 2,//in 操作符的左边不能有!
"no-nested-ternary": 0,//禁止使用嵌套的三目运算
"no-new": 1,//禁止在使用new构造一个实例后不赋值
"no-new-func": 1,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2,//禁止使用new require
"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2,//禁止使用八进制数字
"no-octal-escape": 2,//禁止使用八进制转义序列
"no-param-reassign": 2,//禁止给参数重新赋值
"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0,//禁止使用++，--
"no-process-env": 0,//禁止使用process.env
"no-process-exit": 0,//禁止使用process.exit()
"no-proto": 2,//禁止使用__proto__属性
"no-redeclare": 2,//禁止重复声明变量
"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
"no-return-assign": 1,//return 语句中不能有赋值表达式
"no-script-url": 0,//禁止使用javascript:void(0)
"no-self-compare": 2,//不能比较自身
"no-sequences": 0,//禁止使用逗号运算符
"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
"no-sync": 0,//nodejs 禁止同步方法
"no-ternary": 0,//禁止使用三目运算符
"no-trailing-spaces": 1,//一行结束后面不要有空格
"no-this-before-super": 0,//在调用super()之前不能使用this或super
"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
"no-undef": 1,//不能有未定义的变量
"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
"no-undefined": 2,//不能使用undefined
"no-unexpected-multiline": 2,//避免多行表达式
"no-underscore-dangle": 1,//标识符不能以_开头或结尾
"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2,//不能有无法执行的代码
"no-unused-expressions": 2,//禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"no-useless-call": 2,//禁止不必要的call和apply
"no-void": 2,//禁用void操作符
"no-var": 0,//禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
"no-with": 2,//禁用with

"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
"arrow-parens": 0,//箭头函数用小括号括起来
"arrow-spacing": 0,//=>的前/后括号
"accessor-pairs": 0,//在对象中使用getter/setter
"block-scoped-var": 0,//块语句中使用var
"brace-style": [1, "1tbs"],//大括号风格
"callback-return": 1,//避免多次调用回调什么的
"camelcase": 2,//强制驼峰法命名
"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号 never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
"comma-spacing": 0,//逗号前后的空格
"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
"complexity": [0, 11],//循环复杂度
"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
"consistent-return": 0,//return 后面是否允许省略
"consistent-this": [2, "that"],//this别名
"constructor-super": 0,//非派生类不能调用super，派生类必须调用super
"curly": [2, "all"],//必须使用 if(){} 中的{}
"default-case": 2,//switch语句最后必须有default
"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
"eol-last": 0,//文件以单一的换行符结束
"eqeqeq": 2,//必须使用全等
"func-names": 0,//函数表达式必须有名字
"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0,//生成器函数*的前后空格
"guard-for-in": 0,//for in循环要用if语句过滤
"handle-callback-err": 0,//nodejs 处理错误
"id-length": 0,//变量名长度
"indent": [2, 4],//缩进风格
"init-declarations": 0,//声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
"lines-around-comment": 0,//行前/行后备注
"max-depth": [0, 4],//嵌套块深度
"max-len": [0, 80, 4],//字符串最大长度
"max-nested-callbacks": [0, 2],//回调嵌套深度
"max-params": [0, 3],//函数最多只能有3个参数
"max-statements": [0, 10],//函数内最多有几个声明
"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2,//new时必须加小括号
"newline-after-var": 2,//变量声明后是否需要空一行
"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
"object-shorthand": 0,//强制对象字面量缩写语法
"one-var": 1,//连续声明
"operator-assignment": [0, "always"],//赋值运算符 += -=什么的
"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
"padded-blocks": 0,//块语句内行首行尾是否要空行
"prefer-const": 0,//首选const
"prefer-spread": 0,//首选展开运算
"prefer-reflect": 0,//首选Reflect的方法
"quotes": [1, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
"radix": 2,//parseInt必须指定第二个参数
"id-match": 0,//命名检测
"require-yield": 0,//生成器函数必须有yield
"semi": [2, "always"],//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"sort-vars": 0,//变量声明时排序
"space-after-keywords": [0, "always"],//关键字后面是否要空一格
"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"],//小括号里面要不要有空格
"space-infix-ops": 0,//中缀操作符周围要不要有空格
"space-return-throw-case": 2,//return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
"spaced-comment": 0,//注释风格要不要有空格什么的
"strict": 2,//使用严格模式
"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0,//jsdoc规则
"valid-typeof": 2,//必须使用合法的typeof的值
"vars-on-top": 2,//var必须放在作用域顶部
"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
"wrap-regex": 0,//正则表达式字面量用小括号包起来
"yoda": [2, "never"]//禁止尤达条件
~~~

