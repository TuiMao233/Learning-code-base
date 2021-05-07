import { Ref, ref } from '@vue/composition-api';

/*
 * @Author: Mr.Mao
 * @Date: 2021-04-29 15:34:29
 * @LastEditTime: 2021-04-29 15:38:24
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
export const useMobileSeconds = (option: {
  phone: Ref<string>;
  getPhoneCodeHook?: () => void | Promise<any>;
}) => {
  // 验证码倒计时
  const seconds = ref(0);
  // 获取验证码
  const getPhoneCode = async () => {
    // 倒计时验证
    if (seconds.value > 0) {
      uni.$u.toast('倒计时结束后再发送');
      return false;
    }
    // 手机号验证
    if (!uni.$u.test.mobile(option.phone.value)) {
      uni.$u.toast('请输入正确的手机号');
      return false;
    }
    // 发送验证码
    uni.showLoading({ title: '正在获取验证码' });
    await option.getPhoneCodeHook?.();
    uni.hideLoading();
    uni.$u.toast('验证码已发送');
    // 进行倒计时
    seconds.value = 60;
    const timer = setInterval(() => {
      if (seconds.value === 0) clearInterval(timer);
      else seconds.value--;
    }, 1000);
  };
  return { seconds, getPhoneCode };
};
