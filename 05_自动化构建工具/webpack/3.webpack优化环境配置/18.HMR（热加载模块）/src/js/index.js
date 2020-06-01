// 引入
import '../css/iconfont.css';
import '../css/index.less';
function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
import print from './print.js';
// 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
if(module.hot) {
	// 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
	module.hot.accept('./print.js', function() {
	    print();
	});
}

