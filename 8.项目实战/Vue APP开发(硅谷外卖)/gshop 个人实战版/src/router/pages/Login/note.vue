<template>
  <div class="note">
    <section class="mobile-number">
      <input type="tel" maxlength="11" placeholder="手机号" />
      <button disabled="disabled" class="get_verification">获取验证码</button>
    </section>
    <section class="login-verification">
      <input type="tel" maxlength="8" placeholder="验证码" />
    </section>
    <section class="login-hint">
      温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
      <a href="javascript:;">《用户服务协议》</a>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang='stylus'>
.note {
  section {
    width: 100%;
    height: 48px;
    margin-top: 16px;
    position: relative;

    &.login-hint {
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }

    input[type='tel'] {
      outline: none;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding-left: 10px;
      font: 400 14px Arial;
      width: 100%;
      height: 100%;

      &:focus {
        border: 1px solid #02A774;
      }
    }

    button {
      font-size: 14px;
      position: absolute;
      color: #ccc;
      top: 50%;
      right: 0;
      border: none;
      background: none;
      transform: translateY(-50%);

      &.on {
        color: #000;
      }
    }
  }
}
</style>