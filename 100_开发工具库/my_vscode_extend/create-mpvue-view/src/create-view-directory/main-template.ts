export default function (page_name = '') {
  const pageExaName = '_' + page_name.slice(0, 1).toUpperCase() + page_name.slice(1)
  return (
`import Vue from 'vue'
import ${pageExaName} from './${page_name}.vue'

const ${page_name} = new Vue(${pageExaName})
// 挂载当前页面
${page_name}.$mount()`
  )
}


