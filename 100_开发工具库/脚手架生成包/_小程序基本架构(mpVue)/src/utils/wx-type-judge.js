import { errorMsg } from "./index";
const strategy = {
  // 手机号判断;
  isPhone(str) {
    const reg_exp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(str)
    if (reg_exp) return '';
    else return errorMsg('请输入正确的手机号');
  },
  // 验证码长度判断;
  idCard(str) {
    const reg_exp = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(str)
    if (reg_exp) return '';
    else return errorMsg('请输入正确的身份证');
  },
  // 车牌号判断(非+新能源);
  licensePlate(str) {
    const reg_exp = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))$|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(str)
    if (reg_exp) return '';
    else return errorMsg('请输入正确的车牌号');
  },
  // 银行号判断;
  bank(str) {
    const reg_exp = /^[1-9]\d{9,29}$/.test(str)
    if (reg_exp) return '';
    else return errorMsg('请输入正确的银行号');
  }
}
export function formStrategy(type, value = "") {
  value = value.trim()
  return strategy[type] ? strategy[type](value) : errorMsg('没有该检测方法, 请手动添加')
}
