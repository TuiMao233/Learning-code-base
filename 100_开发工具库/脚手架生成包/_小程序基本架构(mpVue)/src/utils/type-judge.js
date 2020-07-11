// 手机号判断; return: Boolean
export const isMobile = str => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(str);

// 身份证判断; return: Boolean
export const isID = str => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(str)

// 车牌号判断(非+新能源); return: Boolean
export const isLicensePlate = str => /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))$|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(str)

// 银行号判断
export const isBank = str => /^[1-9]\d{9,29}$/.test(str)

// 代码判断;  return: Boolean
export const isStrCode = str => /<[\/\!]*[^<>]*>/ig.test(str)

// 检测数据类型; return: String
export const checkedTypeof = (target) => Object.prototype.toString.call(target).slice(8, -1)

// 剔除字符串代码字段; return: String
export const removeStrCode = str => str.replace(/<[\/\!]*[^<>]*>/ig, "")