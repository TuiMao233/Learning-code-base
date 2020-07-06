# 项目准备

## 项目描述

~~~
1) 此项目为一个前后台分离的后台管理的 SPA, 包括前端 PC 应用和后端应用
2) 包括用户管理 / 商品分类管理 / 商品管理 / 权限管理等功能模块
3) 前端: 使用 React 全家桶 + Antd + Axios + ES6 + Webpack 等技术
4) 后端: 使用 Node + Express + Mongodb 等技术
5) 采用模块化、组件化、工程化的模式开发
~~~



# 记录工作

项目结构图

antd的表单标签验证与获取表单标签所有信息的方法

# antd 新版表单获取

~~~jsx
// 引入组件
import { Form, Input, Button } from 'antd';
onFinish = (fromData)=> {
  // 该函数会在所有表单规则都通过时, 接收from数据对象, 并执行
}
<Form onFinish={this.onFinish} >
  {/* onFinish是表单收集的回调函数, 该函数会在表单中按钮触发时调用 */}
  <Form.Item
    name="username"
    {/* name是表单收集的别名, 该值会在from表单收集中被传入形参, 值为当前表单项输入值 */}
    rules={[...RuleConfig, { required: true, message: '请输入账号!' }]}
    {/* rules是表单的规则, 可以进行自定义规则回调, 或者正则, 字符串等判断 */}
  >
    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
    {/* Input是对应该表单项的结构, 也可作为单独使用, 但单独使用不具备表单收集的功能 */}
    {/* Input也可以指定type类型, 例如密码, 或者其他 */}
    {/* prefix是表单项左边的结构, 可以是icon组件 */}
    {/* placeholder是表单未输入时的提示文本 */}
  </Form.Item>
  <Form.Item>
		<Button
		    type="primary"
      	{/* 该type指定的是对应主题, 一般有一般, 成功, 警告, 失败等等 */}
		    htmlType="submit"
      	{/* 该htmlType指定的是该按钮对应的标签行为, submit代表表单提交 */}
		    className="login-form-button"
		>登录</Button>
  </Form.Item>
</Form>
~~~



# jsonp 发送外链SDK请求

**安装：**`cnpm i jsonp -D`

### jsonp（URL，opts，fn）

- `url`（`String`）提取网址

- `opts`（Object），可选
  `param`（`String`）用于指定回调的查询字符串参数的名称（默认为`callback`）
  `timeout`（`Number`）发出超时错误后的时间。`0`禁用（默认为`60000`）
  `prefix`（`String`）处理jsonp响应的全局回调函数的前缀（默认为`__jp`）
  `name`（`String`）处理jsonp响应的全局回调函数的名称（默认为`prefix`+递增计数器）

- `fn` 回调函数

  使用`err, data`参数调用回调。
  如果超时，`err`将是一个`Error`对象，它`message`是 `Timeout`。
  返回一个函数，该函数在被调用时将取消正在进行的jsonp请求（`fn`不会被调用）。

# stroe 浏览器储存对象

store.js 提供了一套跨浏览器的本地存储解决方案。

store.js 优先选择 localStorage 来进行存储，在 IE6 和 IE7 下降级使用userData来达到目的。 没有使用 flash ，不会减慢你的页面加载速度。也没有使用 cookies ，不会使你的网络请求变得臃肿。

**安装：**`cnpm i store -D`

~~~js
import store from 'store'
// 储存当前储存对象
store.set('user', { name:'Marcus' })

// 获取当前储存对象, 当该值不存在时, 返回null
store.get('user')

// 删除当前储存对象
store.remove('user')

// 清楚所有储存对象
store.clearAll()

// 遍历所有储存对象
store.each(function(value, key) {
	console.log(key, '==', value)
})
~~~



# 明日工作



利用antd的卡片组件与列表组件实现商品的品类管理页面

接口获取商品的分类列表数据

根据添加分类接口定义添加分类按钮

根据更新分类名称接口定义修改分类名称按钮

设置没有获取数据时，显示列表加载图标

# 未完待续...