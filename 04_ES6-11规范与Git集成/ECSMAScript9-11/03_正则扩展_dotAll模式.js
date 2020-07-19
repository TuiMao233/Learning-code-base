// dot . 元字符 除换行符以外的任意单个字符
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
const reg = /<li>.*?<a>(.*?)<\/a>/s
// 执行匹配(使用元字符)
const result = reg.exec(str)
console.log(result)