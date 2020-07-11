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
  console.log(v)
}
// 扩展运算符
const arr = [...result]
console.log(arr)