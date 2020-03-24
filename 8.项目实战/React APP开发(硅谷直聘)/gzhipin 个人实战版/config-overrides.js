const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true, // 改为true
  }),
  addLessLoader({ // 添加lessloader
    javascriptEnabled: true, // 启用
    modifyVars: { // 定义less全局变量
      "@brand-primary": "#109C82",
    },
  })
);