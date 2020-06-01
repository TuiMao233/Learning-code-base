const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({ // 添加lessloader编译, 这时候在react组件中任意地方都可以使用less
    javascriptEnabled: true,
    modifyVars: { // 定制less变量(antd主题颜色)
      // "@brand-primary": "#ff5722",
      // "@brand-primary-tap": "#ffccbc",
      // "@color-text-base-inverse": "#3f51b5"
    },
  })
);