/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-11-27 13:47:23
 * @LastEditTime: 2020-12-19 16:45:44
 * @Description: Vue 工具模块
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// import Vue from "vue";
// import { format } from "date-fns";

// 定义媒体时间格式化过滤器
Vue.filter("mediatime", (timeStamp: number) => {
  let minute = Math.floor(timeStamp / 60).toString();
  let second = Math.floor(timeStamp - Number(minute) * 60).toString();
  second = second.length == 1 ? `0${second}` : second;
  minute = minute.length == 1 ? `0${minute}` : minute;
  return `${minute}:${second}`;
});
// 定义时间格式化过滤器
Vue.filter("format", (timeStamp: number, timeFormat: string) => {
  return format(timeStamp, timeFormat);
});
