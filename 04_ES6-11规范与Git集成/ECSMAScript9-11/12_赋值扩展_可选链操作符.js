// 可选链操作符: ?.
function main(config) {
  // 这样组成的链式选择赋值, 太麻烦了
  // const dbHost = config && config.db && config.db.host

  const dbHost = config?.db?.host
  console.log(dbHost)
}

main({
  db: {
    host: '192.168.1.100',
    port: "2000",
    username: 'root'
  },
  cache: {
    host: '192.168.1.200',
    username: 'admin'
  }
})

// 函数的调用
const obj = {
  fn: () => (console.log('fn执行'))
}
obj.fn?.()