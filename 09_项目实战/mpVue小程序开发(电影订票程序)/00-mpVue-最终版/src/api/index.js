import { get } from "./ajax";
// 获取电影列表
export const reqSubjects = () => get('http://t.yushu.im/v2/movie/top250')