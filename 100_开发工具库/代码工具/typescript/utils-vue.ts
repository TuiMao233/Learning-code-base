declare const Vue:any;
declare const format:any;

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
