## react-cli 全面分析

~~~
create-react-app 01.react-cli
~~~

### package.json 指令分析

~~~json
  "scripts": {
    "start": "react-scripts start", // 编译环境运行
    "build": "react-scripts build", // 生成环境打包
    "test": "react-scripts test", // 自动化测试
    "eject": "react-scripts eject" // 暴露配置文件
  },
~~~

~~~
npm run eject
~~~

### 配置结构目录分析

~~~makefile
01.react-cli
├── config
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── modules.js
│   ├── paths.js # 路径处理模块
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── scripts # node 目录目录
│   ├── build.js # 运行打包命令
│   ├── start.js # 运行编译命令
│   └── test.js  # 运行测试命令
└── src
~~~

### paths.js 路径处理模块

~~~js
const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// 项目根路径
const appDirectory = fs.realpathSync(process.cwd());
// 生成绝对路径的方法
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 所有资源的公共访问路径, 默认 /
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

// 可被解析的文件后缀名
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// 解析模块方法
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// 向外暴露多个路径
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
};


// 向外暴露可解析扩展名
module.exports.moduleFileExtensions = moduleFileExtensions;
~~~

