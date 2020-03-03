# Gulp基础配置

`gulp`是与`grunt`功能类似的**前端项目构建**工具, 也是基于`Nodejs`的自动**任务运行器**
能自动化地完成` javascript/coffee/sass/less/html/image/css `等文件的合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务，**gulp比grunt更高效**(异步多任务), 更易于使用, 插件高质量

## 创建项目结构

~~~html
|- dist
|- src
  |- js
  |- css
  |- less
|- index.html
|- gulpfile.js-----gulp配置文件
|- package.json
{"name": "gulp_test",
 "version": "1.0.0"} 
~~~

**全局安装` gulp`：**`npm install -g gulp `
**项目安装`gulp`：**`npm install gulp --save-dev`

**配置`gulpfile`接口文件：**`gulpfile.js`

~~~javascript
//引入gulp模块
var gulp = require('gulp');
//定义默认任务
gulp.task('default', ['任务'])	//异步执行
// -----------------------------
gulp.task('任务名', function() { // 同步执行
  // 将你的任务的任务代码放在这
});
~~~

**运行构建项目命令：**`gulp`

# gulp插件

## 常用插件

`gulp-concat : 合并文件(js/css)`
`gulp-uglify : 压缩js文件`
`gulp-less : 编译less`
`gulp-clean-css : 压缩css`
`gulp-rename : 文件重命名`
`gulp-livereload : 实时自动编译刷新`

## 常用API

`gulp.src(filePath/pathArr)` 指向指定路径的所有文件, 返回文件流对象，用于读取文件
`gulp.dest(dirPath/pathArr)` 指向指定的所有文件夹，用于向文件夹中输出文件
`gulp.task(name, [deps], fn` 定义一个任务
`gulp.watch()` 						监视文件的变化

**gulpfile.js引入插件**

~~~javascript
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
~~~

## 合并压缩JS文件

**下载合并，压缩js，文件重命名插件**
`npm install gulp-concat gulp-uglify gulp-rename --save-dev`

~~~javascript
function javascript() {
	return gulp.src('src/js/*.js') 			// 操作的源目录文件
        .pipe(concat('built.js')) 			// 合并到临时文件     
        .pipe(gulp.dest('dist/js')) 		// 将临时文件拷贝到指定文件
        .pipe(rename({suffix: '.min'})) // 将临时文件重命名 rename方法suffix配置是添加后缀名
        .pipe(uglify())    						 // 临时文件进行压缩
        .pipe(gulp.dest('dist/js'));	  // 将临时文件拷贝到指定文件
}
// 执行minifyjs任务流程 default为默认任务
exports.default = javascript
~~~

**执行`gulp`任务：**项目命令行输入`gulp`回车执行默认任务，**或命令行输入**`gulp 任务名`回车执行指定任务

[^注意]: 当链式操作时没有用retrun时是同步的，用了return是异步的。

## 编译Less与合并压缩CSS

**下载css压缩合并和编译less插件**
`npm install gulp-less gulp-clean-css --save-dev` 

~~~javascript
// less编译任务 gulp-less不支持新版语法，需要用task定义规则
gulp.task('less',function () {
	return gulp.src('src/less/*.less') 
		.pipe(less())	 // 编译
		.pipe(gulp.dest('src/css')); //输出
})
var less = gulp.task('less')
// css合并,压缩任务
function css() {
	return gulp.src('src/css/*.css') 
		.pipe(concat('built.css'))						// 合并到临时文件
		.pipe(gulp.dest('dist/css'))					// 将临时文件拷贝到指定文件
		.pipe(rename({suffix: '.min'}))				// 将临时文件重命名 rename方法suffix配置是添加后缀名
		.pipe(cleanCss({compatibility:'ie8'})) // 临时文件压缩css并兼容ie8
		.pipe(gulp.dest('dist/css'))					// 将临时文件拷贝到指定文件
}
// 任务合并为lessCss
exports.lessCss = gulp.series(less, css)
~~~

**执行`gulp`任务：**项目命令行输入`gulp`回车，**或命令行输入**`gulp 任务名`回车

## 压缩HTML

**安装`gulp-htmlmin插件`：**`npm i gulp-htmlmin --save-dev`

~~~javascript
function html() { // 定义html压缩
	return gulp.src('index.html')
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
}
exports.html = html // 注册事件
~~~

**执行`gulp`任务：**项目命令行输入`gulp`回车，**或命令行输入**`gulp 任务名`回车

## 定义监听文件任务

~~~javascript
function wacth (cd) {
	// ignoreInitial运行时第一次会初始化
  // watch(目标路径,[,选项], 对应任务函数)
	var watchConfig = { ignoreInitial: false }
	gulp.watch(['src/js/*.js'], watchConfig, javascript)
	gulp.watch(['src/less/*.less'],watchConfig, less)
	gulp.watch(['src/css/*.css'], css)
	gulp.watch(['index.html'],watchConfig, html)
}// 注册监听任务
exports.default = wacth
~~~

## 热加载插件(实时加载)

**安装`gulp-connect插件`：**`npm i gulp-connect --save-dev`
**安装 `open`插件：**`npm install open --save-dev`

~~~javascript
1、 注册 热加载的任务 server，注意依赖build任务 
2、 注册热加载的任务
    //配置加载的选项
function c()
connect.server({
      root : 'dist/', // 监视的源目标文件路径
      livereload : true,// 是否实时刷新
      port : 5000//开启端口号
 });
 // 自动开启链接
 open('http://localhost:5000');//npm install open --save-dev
 // 监视目标文件
~~~

## 加载打包gulp插件 插件

**安装`gulp-connect插件`：**`npm install gulp-connect --save-dev`

~~~javascript
const {// 加载打包gulp插件 引入包得执行
concat,uglify,rename,less,	
cleanCss,htmlmin,connect
} = require('gulp-load-plugins')()
~~~

