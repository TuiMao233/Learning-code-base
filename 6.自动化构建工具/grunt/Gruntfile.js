module.exports = function(grunt) {
	// 初始化配置grunt任务
	grunt.initConfig({
		// js合并
		concat: {
			options: { //可选项配置
				separator: ';' //js文件使用;连接合并
			},
			build: { //此名称任意
				src: ["src/js/*.js"], //合并哪些js文件 文件夹/*.js代表该文件夹所有js文件
				dest: "build/js/build.js" //输出的js文件目录
			}
		},
		// js压缩
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {},
			build: {
				files: { // 输出目录:['压缩文件'...]
					'build/js/build.min.js': ['build/js/build.js']
				}
			}
		},
		// 语法检测
		jshint: {
			options: {
				jshintrc: '.jshintrc' //指定配置文件
			},
			build: ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
		},
		// css压缩
		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1
			},
			build: {
				files: { // 输出目录/文件名:['压缩文件'...]
					'build/css/build.min.css': ['src/css/*.css']
				}
			}
		},
		// 监视原文件
		watch: {
			scripts: {
				files: ['src/js/*.js', 'src/css/*.css'], // 检测文件目录
				tasks: ['concat', 'uglify', 'cssmin', "jshint"],
				options: {
					spawn: false
				} // 变量更新, true 全局更新
			}
		},
	});
	// 加载插件任务
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 注册构建任务
	grunt.registerTask('default', ["concat","uglify","cssmin","jshint"]);
	grunt.registerTask('default', ["watch"]);
};
