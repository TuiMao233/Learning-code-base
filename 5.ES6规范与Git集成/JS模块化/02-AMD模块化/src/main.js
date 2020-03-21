require.config({ // 配置接口
	baseUrl: 'src/',// 从页面根目录开始找起的模块根路径
	// 如果不添加baseUrl,那么模块将从接口函数文件夹找起
	paths: { // 模块位置
		// 自定义模块
		'alerter': 'modules/alerter',
		'dataService': 'modules/dataService',
		// 第三方模块
		'jquery': 'lib/jquery-1.10.1',
		'angular': 'lib/angular'
	},
	shim: {
	    angular: {
	        exports: 'angular'
	    }
	}
})
require(['angular','jquery','alerter'], function(angular,$,alerter) { // 引入模块 
	console.log('angular模块',angular)
	console.log('jquery模块',$)
	console.log('自定义模块',alerter.getToName())
})
