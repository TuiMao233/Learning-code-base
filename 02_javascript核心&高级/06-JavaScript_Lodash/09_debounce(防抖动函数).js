const _ = require('./lib/lodash.min')

// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
