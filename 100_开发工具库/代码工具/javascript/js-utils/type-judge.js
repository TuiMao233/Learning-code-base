import { errorMsg } from "./index";
const strategy = {
  // 手机号判断;
  is_phone(str) {
    const reg_exp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(str)
    return reg_exp ? '' : '请输入正确的手机号'
  },
  // 身份证判断;
  card_id(str) {
    const reg_exp = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(str)
    return reg_exp ? '' : '请输入正确的身份证'
  },
  // 银行号判断;
  bank(str) {
    const reg_exp = /^[1-9]\d{9,29}$/.test(str)
    return reg_exp ? '' : '请输入正确的银行卡'
  },
  // 用户姓名判断(中文/英文3-16字以内)
  name(str) {
    const reg_exp = /^(?:[\u4e00-\u9fa5·a-zA-Z]{2,16})$/.test(str)
    return reg_exp ? '' : '请输入正确的姓名'
  },
  // 判断是否为空
  empty(str) {
    return str.length ? '' : '该项不能为空'
  }
}
export function formStrategy(type, value = "") {
  if (!type) throw new Error('错误! formStrategy函数中缺少判断类型');
  value = String(value)
  value = value == 'undefined' || value == 'null' ? '' : value;
  return strategy[type] ? strategy[type](value) : '没有该检测方法, 请手动添加';
}