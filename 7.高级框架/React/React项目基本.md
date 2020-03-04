# 一、脚手架安装

安装`create-react-app`脚手架模块

```undefined
cnpm i create-react-app -g
```

**运行命令生成项目基础结构**

```undefined
create-react-app react-demo
```

**安装`antd-mobile`**

```undefined
cnpm i antd-mobile --save
```



# 二、组件的按需打包/加载

> 本节主要引自antd官方

- **下载所需插件**



```swift
npm install react-app-rewired babel-plugin-import customize-cra --save-dev
```

[^注意]:由于新的 react-app-rewired@2.x 版本的关系，我们还需要安装 customize-cra

- **修改`package.json`中脚本**

```bash
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

- **创建`config-overrides.js`文件**



```csharp
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: "css",
  })
);
```

- **更改引用方式**



```jsx
import { Button } from 'antd-mobile';
```

# 三、定制antd主题（颜色等）

- **下载antd所需less插件**

> 因为antd的样式文件是用less来编写的，我们正常使用的是less生成后的css，而需要定制的话，得修改less来重新生成css，这就要用到less模块（和webpack用到的less-loader插件）



```undefined
cnpm i less less-loader -D
```

- **为`config-overrides.js`文件添加配置项**



```csharp
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    //注意改为true
    style: true,
  }),
  //添加less加载器	
  addLessLoader({
    javascriptEnabled: true,
    //修改默认主题样式
    modifyVars: {
      "@brand-primary": "hotpink",
      "color-text-base": "#333",
      //other...
    }
  })
);
```

> 这里需要注意一下，antd的less全局变量更改过，所以现在在网上找到的一些教程中提到的`primary-color`等变量名不起效了。还有就是`fixBabelImports`中`style`选项需要修改成`true`，否则就加载不到less了。

- **效果：**