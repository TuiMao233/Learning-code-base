// allSettled无论成功还是失败都会执行为成功状态的一个数组promise运算
const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('商铺数据 - 1')
  })
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('商铺数据 - 2')
  })
})
// 使用allSettled方法
const result = Promise.allSettled([p1, p2])
result.then(val =>{
  console.log(val)
  /* 
  [
    { status: 'fulfilled', value: '商铺数据 - 1' },
    { status: 'rejected', reason: '商铺数据 - 2' }
  ] 
  */
})