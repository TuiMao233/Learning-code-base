---
title: Grunt 开发与生产环境
date: 2020-11-01
categories:
  - 
tags: 
  - grunt
---
## Grunt基础配置

Grunt是一套前端**自动化构建**工具，一个基于nodeJs的命令行工具，它是一个**任务运行器**, 配合其丰富强大的**插件**

**常用功能：**合并文件`(js/css)`，压缩文件`(js/css)`，语法检查`(js)`，`less/sass`预编译处理，其它...

### 创建项目结构

~~~javascript
|- build----------构建生成的文件所在的文件夹
|- src------------源码文件夹   
    |- js---------------js源文件夹
    |- css--------------css源文件夹
|- index.html-----页面文件
|- Gruntfile.js---grunt配置文件(注意首字母大写)
|- package.json---项目包配置文件
{ 
   "name": "grunt_test",
  "version": "1.0.0"
}
~~~

**全局安装` grunt-cli`：**`npm install -g grunt-cli `
**项目安装`grunt`：**`npm install grunt --save-dev`

**配置`Gruntfile`接口文件：**`Gruntfile.js`

~~~javascript
module.exports = function(grunt){
  // 1. 初始化插件配置
  grunt.initConfig({
      //主要编码处
  });
  // 2. 加载插件任务
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // 3. 注册构建任务
  grunt.registerTask('default', []);
};
~~~

**运行构建项目命令：**`grunt`

## grunt插件

插件有`grunt`团队贡献的插件，插件名大都以`contrib-`开头，第三方提供的插件 : 大都不以`contrib-`开头；`grunt`官网的插件列表页面 http://www.gruntjs.net/plugins 

**grunt常用插件**
`grunt-contrib-htmlmin——压缩html文件`
`grunt-contrib-cssmin——压缩/合并css文件`
`grunt-contrib-uglify——压缩js文件`
`grunt-contrib-imagemin——压缩图片文件(无损)`
`grunt-contrib-jshint——javascript语法错误检查`
`grunt-contrib-concat——合并多个js文件的代码到一个文件中`
`grunt-contrib-watch——实时监控文件变化、调用相应的任务重新执行`
`grunt-contrib-clean——清除文件(打包处理生成的)``
``grunt-contrib-copy——复制文件、文件夹`
**`grunt-contrib-requirejs——合并压缩requirejs管理的所有js模块文件`**

[^注意]: grunt所有插件都不支持ES6语法，需要babel转义成ES5语法，在进行插件任务

### 插件合并JS

~~~javascript
// src/js/test1.js
(function(){console.log('test1')})
~~~

~~~javascript
// src/js/test2.js
(function(){console.log('test1')})
~~~

**安装`runt-contrib-concat插件`：**`npm i grunt-contrib-concat --save-dev`
**`Gruntfile.js`加载`concat`插件并配置`concat`任务

~~~javascript
module.exports = function (grunt) {
	// 初始化配置grunt任务
	grunt.initConfig({ //主要编码处
		concat: {
		  options: { //可选项配置
		    separator: ';'   //js文件使用;连接合并
		  },
		  build: { //此名称任意
		    src:  ["src/js/*.js"],  	//合并哪些js文件 文件夹/*.js代表该文件夹所有js文件
		    dest: "build/js/build.js" 	//输出的js文件目录
		  }
		}
	});
	// 加载插件任务
	grunt.loadNpmTasks('grunt-contrib-concat');
	// 注册构建任务
	grunt.registerTask('default', ["concat"]);
}
~~~

**执行`grunt`任务：**项目命令行输入`grunt`回车，**或命令行输入**`grunt 任务名`回车，但必须要配置文件加载对应任务

~~~javascript
// build/js/built.js
(function(){
	console.log('test1')
});(function(){
	console.log('test2')
})
~~~

### 插件压缩JS

~~~javascript
// build/js/built.js
(function(){
	console.log('test1')
});(function(){
	console.log('test2')
})
~~~

**安装`runt-contrib-uglify插件`：**`npm i grunt-contrib-uglify --save-dev`
**`Gruntfile.js`加载`uglify`插件并配置`uglify`任务**

~~~javascript
module.exports = function (grunt) {
	grunt.initConfig({
		concat: {...} // 合并
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
		  options: {  // 可选项 不是必须的
		    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + // banner 头部注释
		    '<%= grunt.template.today("yyyy-mm-dd") %> */'
		  },
		build: {
		    files: { // 输出目录/文件名:['压缩文件'...]
		      'build/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/build.js']
		    }
		  }
		}
	});
	// 加载插件任务
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	// 注册构建任务
	grunt.registerTask('default', ["concat","uglify"]);
}
~~~

**执行`grunt`任务：**项目命令行输入`grunt`回车，**或命令行输入**`grunt 任务名`回车，但必须要配置文件加载对应任务

### 插件检测JS语法

**安装`runt-contrib-jshint插件`：**`npm i grunt-contrib-jshint --save-dev`
**`Gruntfile.js`加载`jshint`插件并配置`jshint`任务**

~~~javascript
jshint : { // grunt.initConfig{jshint}
  options: {
    jshintrc : '.jshintrc' //指定配置文件
  },
  build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
}
// 加载任务
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ['concat', 'uglify', 'jshint']);
~~~

**根目录配置.jshintrc，JSON文件**

~~~javascript
{	"curly": true,"eqeqeq": true,"eqnull": true,"expr" : true,
  "immed": true,"newcap": true,"noempty": true, "noarg": true,
  "regexp": true,"browser": true,"devel": true,"node": true,
  "boss": false,
  //不能使用未定义的变量
  "undef": true,
  //语句后面必须有分号
  "asi": false,
  //预定义不检查的全局变量
  "predef": [ "define", "BMap", "angular", "BMAP_STATUS_SUCCESS"]
}
~~~

**执行`grunt`任务：**项目命令行输入`grunt`回车，**或命令行输入**`grunt 任务名`回车，但必须要配置文件加载对应任务

~~~javascript
// src/test2.js
console.log('test2')
~~~

~~~javascript
// 语法不符合规则，后面要加分号
src/js/test2.js
1 |console.log('test2')
                       ^ Missing semicolon.
~~~

### 插件合并压缩CSS

**安装`grunt-contrib-cssmin插件`：**`npm i grunt-contrib-cssmin --save-dev`
**`Gruntfile.js`加载`cssmin`插件并配置`cssmin`任务**

~~~javascript
cssmin:{	// grunt.initConfig{cssmin}
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  build: {
    files: {	// 输出目录/文件名:['压缩文件'...]
        'build/css/build.min.css': ['src/css/*.css']
    }
  }
}
// 加载任务
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.registerTask('default', ['concat', 'uglify', 'jshint',"cssmin"]);
~~~

**执行`grunt`任务：**项目命令行输入`grunt`回车，**或命令行输入**`grunt 任务名`回车，但必须要配置文件加载对应任务

~~~css
#box2 { /*test1.css*/
    width: 400px;
    height: 400px;
    background: deeppink;
}
#box1 { /*test2.css*/
    width: 400px;
    height: 400px;
    background: deeppink;
}
~~~

~~~css
#box1{width:200px;height:200px;background:red;border:red solid 1px}#box2{width:400px;height:400px;background:#ff1493}
~~~

### 对源文件进行监视任务

当源文件发生改变时执行指定任务
**安装`grunt-contrib-watch插件`：**`npm i grunt-contrib-watch --save-dev`
**`Gruntfile.js`加载`watch`插件并配置`watch`任务**

~~~javascript
watch : { // grunt.initConfig{watch}
		scripts : {
		files : ['src/js/*.js', 'src/css/*.css'], // 检测文件目录
		tasks : ['concat', 'uglify', 'cssmin', 'jshint'], // 当检测对象更新时执行的任务名
		options : {spawn : false}  // 变量更新, true 全局更新
	}
}
// 加载任务
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
// 注册任务
grunt.registerTask('default', ["watch"]);
~~~

[^注意]:监视任务时，语法检测要放在任务列表的后面，不然检测到语法错误就会停止下面的任务
