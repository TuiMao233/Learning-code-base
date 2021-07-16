/*
 * @Author: Mr.Mao
 * @Date: 2021-06-27 19:37:54
 * @LastEditTime: 2021-06-29 20:07:51
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const compilerSFC = require('@vue/compiler-sfc')
const compilerDOM = require('@vue/compiler-dom')
// 创建实例
const app = new Koa()
// 裸模块地址重写
// import xx from 'vue'
// import xx from '/@modules/vue'
const rewriteImport = (content) => {
  return content.replace(/ from ['"](.*)['"]/g, (str1, str2) => {
    // 浏览器可解析地址
    const solvableUrl = ['/', './', '../'].some(v => str2.startsWith(v))
    if (solvableUrl) {
      return str1
    } else {
      return ` from '/@modules/${str2}'`
    }
  })
}
// 处理路由
app.use(async ctx => {
  const { url, query } = ctx.request
  if (url === '/') {
    // 首页请求, 加载index.html
    ctx.type = 'text/html'
    ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
  } else if (url.endsWith('.js')) {
    // js 文件加载处理
    const p = path.join(__dirname, url)
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'))
  } else if (url.startsWith('/@modules/')) {
    // 裸模块名称
    const moduleName = url.replace('/@modules/', '')
    // 去 node_modules 中查找
    const prefix = path.join(__dirname, '../node_modules', moduleName)
    // package.json 中获取模块地址
    const modulePath = require(`${prefix}/package.json`).module
    const filePath = path.join(prefix, modulePath)
    // 处理引入地址, 将响应结果返回（这时候将会形成一个模块引入递归）
    // 引入, 解析模块地址, 响应 -> 引入, 解析模块地址, 响应,.....
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(fs.readFileSync(filePath, 'utf8'))
  } else if (url.indexOf(".vue") > -1) {
    // SFC 请求处理, 读取vue文件, 解析为js文件
    const p = path.join(__dirname, url.split('?')[0])
    // 解析 SFC 部分
    const sfcRet = compilerSFC.parse(fs.readFileSync(p, 'utf8'))
    if (!query.type) {
      // 处理 script 请求
      const scriptContent = sfcRet.descriptor.script.content
      // 替换默认导出为一个常量, 方便后续的修改
      const script = scriptContent.replace('export default ', 'const __script = ')
      ctx.type = "application/javascript"
      ctx.body = `
      ${rewriteImport(script)}
      // 解析Template, 携带参数为 template, 在将解析后的 render 带入常量中
      import {render as __render} from '${url}?type=template'
      __script.render = __render
      export default __script
    `
    } else if (query.type === 'template') {
      const templateContent = sfcRet.descriptor.template.content
      // 编译为 render, 选择模块导出
      const render = compilerDOM.compile(templateContent, { mode: 'module' }).code
      ctx.type = 'application/javascript'
      ctx.body = rewriteImport(render)
    }
  }
})

// 启动服务器
app.listen(3000, () => {
  console.log('kvite startup!!!')
})