---
title: 表单策略验证 form-strategy
---
## form-strategy 表单策略验证简述

[![NPM version](https://img.shields.io/npm/v/form-strategy.svg)](https://www.npmjs.com/package/form-strategy)

根据 [javaScript 策略模式 ](https://zhuanlan.zhihu.com/p/93853801)设计的表单验证插件，提供了对开放—封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。

支持批量，单一验证校验，提示字符串使用`{__field__}`字符串表达式从而使代码复用更加强大。

如果使用`TypeScript`，建议使用[create-from-strategy](https://github.com/TuiMao233/form-strategy/blob/master/docs/create-from-strategy.md)

form-strategy 内置了大量规则，但默认只携带了`empty(非空字符串)`，`email(邮箱校验)`两个验证。如需使用其他内置规则，则需要动态引入。具体查看规则引入说明：[rules-validate](https://github.com/TuiMao233/form-strategy/blob/master/docs/rules-validate.md)

## 具体使用

首先，先将该库进行引入。
~~~sh
npm install form-strategy --save
~~~

进行引入使用，如果使用Vue，可以在main.js中挂载到Vue.prototype中进行使用。

~~~js
import { validate, validateAll, extend } from "form-strategy";
// 添加手机校验规则
extend("phone", {
  validate(value) {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value);
  },
  massage: "{__field__}格式不正确",
});
const status = validate("phone", "17a3x66a4d91", "手机号");
// status -> { validate: false, error: "手机号格式不正确" }
~~~

~~~js
// 在vue中使用
import Vue from "vue"
import { validate, validateAll, extend } from "form-strategy"
extend("phone", {
  validate(value) {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)
  },
  massage: "{__field__}格式不正确"
})
Vue.prototype.$validate = validate
Vue.prototype.$validateAll = validateAll
// 在组件中使用...
{
  mounted() {
    const status = this.$validate("phone", "17a3x66a4d91", "手机号")
    // status -> { validate: false, error: "手机号格式不正确" }
  }
}
~~~

### 所有静态方法

~~~js
formStrategy.extend(type, options)
formStrategy.validate(type, value[, name[, params]])
formStrategy.validateAll(...args[type, value[, name[, params]]])
~~~

### 单次校验表单

在使用中，validateContainer(策略容器中)，默认自带了`empty(非空字符串)`，`email(邮箱校验)`两个验证。在以下例子中，将使用自带的校验规则`empty / email`进行演示，用户可自行进行添加校验规则。

~~~js
// 校验成功的情况
import { validate } from "../lib/form-strategy"
const status = validate("email", "9561416545@qq.com")
// ↓↓ status ↓↓
{
  validate: true, // 表单是否通过验证, true为通过, 相反则不通过
  error: "" // 错误信息
}
~~~

~~~js
// 校验失败的情况
import { validate } from "../lib/form-strategy"
const status = validate("email", "9561416545com")
// ↓↓ status ↓↓
{
  validate: false,
  error: "邮箱格式不正确"
}
~~~

### 添加自定义校验规则

~~~js
import { validate, extend } from "../lib/form-strategy"
extend("phone", {
  // validate函数为校验规则, value是在进行校验中所传入的值
  // 在这里进行判断是否通过, 返回布尔值为true代表校验成功, 反之失败
  validate(value) {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)
  },
  // message 为提升错误字段, 校验失败时, 将传入error中
  // {__field__} 是字符串表达式, 可在校验中传入, 也可在name字段中定义默认别名
  // {__field__} 使用覆盖层级为, 校验中传入 -> name -> type
  message: "{__field__}格式不正确",
  // 校验规则默认别名, 当校验未传入时, {__field__} 则为该字段(可选项)
  name: "手机号"
})

// 进行校验时, 第三个参数为该项的别名, 将会显示在 {__field__} 表达式中
const status = validate("phone", "173a11x62579", "1号手机号")
// ↓↓ status ↓↓
{
  validate: false,
  error: "1号手机号格式不正确"
}
~~~

### 多次校验表单

~~~js
import { validateAll } from "../lib/form-strategy"
// validateAll 每项数组传入的参数, 都与 validate 方法传入的参数相同
const status = validateAll(
  ["empty", "", "名称"],
  ["email", "9561416545@qq.com", "邮箱"],
)
// ↓↓ status ↓↓
{
  validate: false,
  error: "名称不能为空"
}
~~~

## 在校验中接收自定义参数

~~~js
import { validate, extend } from "../lib/form-strategy"
extend("max", {
  // 在添加校验时, validate接收两个参数, 第二个参数则为传入参数
  validate(value, params) {
    return value.length <= params
  },
  // 如果message是个函数, 那么将传入params参数, 且必须返回一个字符串
  message: (params) => {
    return `{__field__}超出了${params}个长度限制`
  }
})
// 传入参数的插糟在validate的第四位参数中, 该项可传入任意数据类型, 校验时传入params中
const status = validate("max", "12123131231231231", "手机号", 11)
// ↓↓ status ↓↓
{
  validate: false,
  error: "手机号超出了11个长度限制"
}
~~~

