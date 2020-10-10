import { defineRule } from 'vee-validate';

// 添加必须项规则
defineRule('required', value => {
  if (!value || !value.length) {
    return '该选项为必选';
  }
  return true;
});

// 添加邮箱规则
defineRule('email', value => {
  // 字段为空, 应通过
  if (!value || !value.length) {
    return true;
  }
  // 监测是否是邮箱
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return '邮箱格式不正确';
  }
  return true;
});

defineRule("positive", (value: any, params: any) => {
  return true
})