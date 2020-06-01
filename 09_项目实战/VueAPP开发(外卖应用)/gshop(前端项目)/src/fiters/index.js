import Vue from 'vue';
// 引入js时间格式库(moment)
import moment from 'moment';
Vue.filter('date-format', (value, format_str='YYY-MM-DD HH:mm:ss')=>{
    // 返回经过时间库改造的字符串
    return moment(value).format(format_str)
})