const result = Object.fromEntries([
  ['name', '尚硅谷'],
  ['xueke', 'Java,大数据,前端,云计算']
])
console.log(result) // 0> name:xueke, 尚硅谷:Java...

const m = new Map()
m.set('name', 'ATGUIGU')
const result2 = Object.fromEntries(m)
console.log(result2) // -> name:ATGUIGU

// Object.entries (ES8)
const arr = Object.entries({
  name: '尚硅谷'
})
console.log(arr)