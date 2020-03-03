// 引入gulp模块
const gulp = require('gulp')
/* var concat = require('gulp-concat');var uglify = require('gulp-uglify');var rename = require('gulp-rename')
var less = require('gulp-less');var cleanCss = require('gulp-clean-css');var htmlmin = require('gulp-htmlmin')
var connect = require('gulp-connect') */
const {concat,uglify,rename,less,	// 加载打包gulp插件 
		cleanCss,htmlmin,connect} = require('gulp-load-plugins')()
const open = require('open')
// js合并,压缩任务
function javascript() {
	return gulp.src('src/js/**/*.js')
		.pipe(concat('build.js')) 		// 合并到临时文件
		.pipe(gulp.dest('dist/js')) 	// 将临时文件拷贝到指定文件
		.pipe(rename({suffix: '.min'})) // 将临时文件重命名 rename方法suffix配置是添加后缀名
		.pipe(uglify())					// 临时文件进行压缩
		.pipe(gulp.dest('dist/js'))		// 将临时文件拷贝到指定文件
		.pipe(connect.reload())
}
// less编译任务
gulp.task('less',function () {
	return gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
		.pipe(connect.reload())
})
var lessPars = gulp.task('less')
// css合并,压缩任务
function css() {
	return gulp.src('src/css/*.css')
		.pipe(concat('build.css'))				// 合并到临时文件
		.pipe(gulp.dest('dist/css'))			// 将临时文件拷贝到指定文件
		.pipe(rename({suffix: '.min'}))			// 将临时文件重命名 rename方法suffix配置是添加后缀名
		.pipe(cleanCss({compatibility:'ie8'}))  // 临时文件压缩css并兼容ie8
		.pipe(gulp.dest('dist/css'))			// 将临时文件拷贝到指定文件
		.pipe(connect.reload())
}
// html压缩任务
function html() {
	return gulp.src('index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
}
// 监视文件任务
function wacth() {
	// ignoreInitial运行时第一次会初始化
	var watchConfig = { ignoreInitial: false }
	gulp.watch(['src/js/*.js'], watchConfig, javascript)
	gulp.watch(['src/less/*.less'],watchConfig, lessPars)
	gulp.watch(['src/css/*.css'], css)
	gulp.watch(['index.html'],watchConfig, html)
}
// 热加载+监视任务,模拟虚拟服务端
function hodWacth() {
	connect.server({
		root: 'dist/', // 监视的源目标文件路径
		livereload: true, // 是否实时刷新
		port: 5000 		  //开启端口号
	});
	// 自动开启链接
	open('http://localhost:5000'); //npm install open --save-dev
	// 监视目标文件
	wacth()
}
// 注册基础任务
exports.javascript = javascript 
exports.html = html
exports.lessCss = gulp.series(less, css)
// 注册监听文件任务
exports.wacth = wacth

// 注册热加载+监听文件任务
exports.connect = hodWacth
