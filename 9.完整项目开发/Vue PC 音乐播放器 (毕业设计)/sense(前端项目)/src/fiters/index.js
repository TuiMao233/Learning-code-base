// 引入js时间格式库
// 返回经过时间库改造的字符串
import Vue from 'vue';
// 自动补0
const PrefixInteger = (num, n) => (Array(n).join(0) + num).slice(-n)
// 使用date-fns进行按需加载
Vue.filter('date-format', (value) => {
    const minute = PrefixInteger(Math.floor(value / 60), 2)
    const second = PrefixInteger(Math.floor(value % 60), 2)
    return `${minute}:${second}`
})
