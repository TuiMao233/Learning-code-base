module.exports = {
  outputDir: "dist", //build输出目录
  // lintOnSave: false, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8081",
    https: false, //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: null // 代理
  }
};
