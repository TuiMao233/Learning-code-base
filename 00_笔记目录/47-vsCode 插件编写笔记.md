# 关于vscode插件

VSCode是微软出的一款轻量级代码编辑器，免费而且功能强大，以功能强大、提示友好、不错的性能和颜值俘获了大量开发者的青睐，对JavaScript和NodeJS的支持非常好，自带很多功能，例如代码格式化，代码智能提示补全、Emmet插件等。

再强大的IDE那也不可能面面俱到什么功能都塞进去，那样只会导致IDE本身太臃肿。功能嘛，按需索取，所以，vscode的很多强大功能都是基于插件实现的，IDE只提供一个最基本的框子和最基本功能，由插件来丰富和扩展它的功能。

因为vscode本身都是用浏览器实现的，所以其插件不用说肯定也是基于`HTML+JS`等前端技术实现，从形式上看就是一个类似于npm包的`vsix`文件，只不过按照一些特殊规范来实现一些特殊功能，所以vscode插件开发难度不大，甚至可以说熟悉了相关API之后很容易。

## 有必要学习vscode插件开发吗

有！而且非常有必要！每个人都会多多少少有一些自己的特殊定制需求，当你不知道开发一个`IDE`插件其实也很容易、或者你没有意识到通过开发插件可以帮你提升多大效率时，你并不会下意识的将一些问题的解决方式往IDE插件开发上去想。至少我曾经就是这样的，提升开发效率大部分时候想到的都是写一些脚本工具、写一些浏览器插件、写一些客户端工具等，接触到IDE插件开发之后发现原来有些问题可以通过更高效的方式来解决，毕竟IDE才是我们程序员每天接触最多的东西。

# 脚手架创建插件项目

~~~makefile
npm install -g yo generator-code # 安装脚手架

#↓↓↓↓↓↓↓↓↓#

yo code

#↓↓↓↓↓↓↓↓↓#

? ==========================================================================
我们一直在寻找使您变得更好的方法！
我们可以匿名报告使用情况统计信息以改进工具吗？
更多信息：https：//github.com/yeoman/insight和http://yeoman.io
========================================================================== (Y/n)

#↓↓↓↓↓↓↓↓↓#

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
 
 #↓↓↓↓↓↓↓↓↓#
 
 ? What type of extension do you want to create? # 使用哪种扩展名
  New Extension (TypeScript)
  New Extension (JavaScript)
  New Color Theme
  New Language Support
  New Code Snippets
> New Keymap
  New Extension Pack
  New Language Pack (Localization)
  
#↓↓↓↓↓↓↓↓↓#
  
? What's the name of your extension? ' # 您的扩展名是什么(插件名)

#↓↓↓↓↓↓↓↓↓#

? What's the identifier of your extension? (create-mpvue-view))' # 您的扩展名的标识符是什么

#↓↓↓↓↓↓↓↓↓#

? What's the description of your extension?' # 您对扩展的描述是什么

#↓↓↓↓↓↓↓↓↓#

? Initialize a git repository? (Y/n) # 是否初始化Git仓库

#↓↓↓↓↓↓↓↓↓#

? Which package manager to use? (Use arrow keys) # 扩展安装方式使用哪种?
> npm
  yarn
~~~

## 项目目录文件解析

~~~markdown
# 项目总文件
  - .vsocde 		webpack相关配置
  - node_modules	用node安装的依赖包
  - src				资源文件夹
  - .eslintrc.json	代码规范配置
  - .vscodeignore	上传插件需要忽略的文件格式
  - .gitignore		上传需要忽略的文件格式
  - CHANGELOG.md	更改日志
  - README.md		说明文件
  - tsconfig.json	ts配置
  - package.json	项目基本信息(项目开发所需模块,项目名称,版本)
# src目录文件 > 项目资源
  - test		   单元测试文件
  - extension.ts	默认入口文件
~~~

## extension.ts 入口文件解析

~~~typescript
// 模块“ vscode”包含VS Code可扩展性API
// 导入模块，并在下面的代码中使用别名vscode引用该模块
import * as vscode from 'vscode';

// 激活您的扩展程序时将调用此方法
// 您的扩展程序在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {

	// 使用控制台输出诊断信息（console.log）和错误（console.error）
	// 这行代码只会在您的扩展程序激活后执行一次
	console.log('恭喜，您的扩展“ create-mpvue-view”现已激活！');

	// 该命令已在package.json文件中定义
	// 现在使用registerCommand提供命令的实现
	// commandId参数必须与package.json中的command字段匹配
	let disposable = vscode.commands.registerCommand('create-mpvue-view.helloWorld', () => {
		// 每次执行命令时都会执行您放置在此处的代码

		// 向用户显示一个消息框
		vscode.window.showInformationMessage('Hello World from create-mpvue-view!');
	});

	context.subscriptions.push(disposable);
}

// 停用您的扩展程序时调用此方法
export function deactivate() { }
~~~

## package.json 插件配置

~~~json
{
	// 插件的名字，应全部小写，不能有空格
    "name": "vscode-plugin-demo",
	// 插件的友好显示名称，用于显示在应用市场，支持中文
    "displayName": "VSCode插件demo",
	// 描述
    "description": "VSCode插件demo集锦",
	// 关键字，用于应用市场搜索
    "keywords": ["vscode", "plugin", "demo"],
	// 版本号
    "version": "1.0.0",
	// 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
    "publisher": "sxei",
	// 表示插件最低支持的vscode版本
    "engines": {
        "vscode": "^1.27.0"
    },
	// 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
    "categories": [
        "Other"
    ],
	// 插件图标，至少128x128像素
    "icon": "images/icon.png",
	// 扩展的激活事件数组，可以被哪些事件激活扩展，后文有详细介绍
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
	// 插件的主入口
    "main": "./src/extension",
	// 贡献点，整个插件最重要最多的配置项
    "contributes": {
		// 插件配置项
		"configuration": {
            "type": "object",
			// 配置项标题，会显示在vscode的设置页
            "title": "vscode-plugin-demo",
            "properties": {
				// 这里我随便写了2个设置，配置你的昵称
                "vscodePluginDemo.yourName": {
                    "type": "string",
                    "default": "guest",
                    "description": "你的名字"
                },
				// 是否在启动时显示提示
                "vscodePluginDemo.showTip": {
                    "type": "boolean",
                    "default": true,
                    "description": "是否在每次启动时显示欢迎提示！"
                }
            }
        },
		// 命令
        "commands": [
            {
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ],
		// 快捷键绑定
        "keybindings": [
            {
                "command": "extension.sayHello",
                "key": "ctrl+f10",
                "mac": "cmd+f10",
                "when": "editorTextFocus"
            }
        ],
		// 菜单
        "menus": {
			// 编辑器右键菜单
            "editor/context": [
                {
					// 表示只有编辑器具有焦点时才会在菜单中出现
                    "when": "editorFocus",
                    "command": "extension.sayHello",
					// navigation是一个永远置顶的分组，后面的@6是人工进行组内排序
                    "group": "navigation@6"
                },
                {
                    "when": "editorFocus",
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation@5"
                },
                {
					// 只有编辑器具有焦点，并且打开的是JS文件才会出现
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "z_commands"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ],
			// 编辑器右上角图标，不配置图片就显示文字
            "editor/title": [
                {
                    "when": "editorFocus && resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 编辑器标题右键菜单
            "editor/title/context": [
                {
                    "when": "resourceLangId == javascript",
                    "command": "extension.demo.testMenuShow",
                    "group": "navigation"
                }
            ],
			// 资源管理器右键菜单
            "explorer/context": [
                {
                    "command": "extension.demo.getCurrentFilePath",
                    "group": "navigation"
                },
                {
                    "command": "extension.demo.openWebview",
                    "group": "navigation"
                }
            ]
        },
		// 代码片段
        "snippets": [
            {
                "language": "javascript",
                "path": "./snippets/javascript.json"
            },
            {
                "language": "html",
                "path": "./snippets/html.json"
            }
        ],
		// 自定义新的activitybar图标，也就是左侧侧边栏大的图标
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "beautifulGirl",
                    "title": "美女",
                    "icon": "images/beautifulGirl.svg"
                }
            ]
        },
		// 自定义侧边栏内view的实现
        "views": {
			// 和 viewsContainers 的id对应
            "beautifulGirl": [
                {
                    "id": "beautifulGirl1",
                    "name": "国内美女"
                },
                {
                    "id": "beautifulGirl2",
                    "name": "国外美女"
                },
                {
                    "id": "beautifulGirl3",
                    "name": "人妖"
                }
            ]
        },
		// 图标主题
        "iconThemes": [
            {
                "id": "testIconTheme",
                "label": "测试图标主题",
                "path": "./theme/icon-theme.json"
            }
        ]
    },
	// 同 npm scripts
    "scripts": {
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "node ./node_modules/vscode/bin/test"
    },
	// 开发依赖
    "devDependencies": {
        "typescript": "^2.6.1",
        "vscode": "^1.1.6",
        "eslint": "^4.11.0",
        "@types/node": "^7.0.43",
        "@types/mocha": "^2.2.42"
    },
	// 后面这几个应该不用介绍了
    "license": "SEE LICENSE IN LICENSE.txt",
    "bugs": {
        "url": "https://github.com/sxei/vscode-plugin-demo/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/sxei/vscode-plugin-demo"
    },
	// 主页
    "homepage": "https://github.com/sxei/vscode-plugin-demo/blob/master/README.md"
}
~~~

## 常用API

~~~js
// 替换当前编辑器全部内容：
vscode.window.activeTextEditor.edit(editBuilder => {
    // 从开始到结束，全量替换
    const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
	const text = '新替换的内容';
    editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
});
// 打开文件并选中某段文字
const path = '/Users/somefile.txt';
const options = {
	// 选中第3行第9列到第3行第17列
	selection: new vscode.Range(new vscode.Position(2, 8), new vscode.Position(2, 16));
	// 是否预览，默认true，预览的意思是下次再打开文件是否会替换当前文件
	preview: false,
	// 显示在第二个编辑器
	viewColumn: vscode.ViewColumn.Two
};
vscode.window.showTextDocument(vscode.Uri.file(path), options);

vscode.window.showInformationMessage('我是info信息！');
vscode.window.showErrorMessage('我是错误信息！');
vscode.window.showInformationMessage('是否要打开小茗同学的博客？', '是', '否', '不再提示').then(result => {
	if (result === '是') {
		exec(`open 'https://haoji.me'`);
	} else if (result === '不再提示') {
		// 其它操作
	}
});
// 修改状态栏
vscode.window.setStatusBarMessage('你好，前端艺术家！');
~~~

