export default {
  // 读取数据
  // readCache(缓存名)
  readCache (cachesName) {
   const cache = JSON.parse(window.localStorage.getItem(cachesName) || '[]')
   return cache
  },
  // 写入数据
  // writeCache(缓存名, 存入值)
  writeCache (w, v) {
    const writeName = w
    const writevalue = v
    window.localStorage.setItem(writeName, JSON.stringify(writevalue))
  }
}
