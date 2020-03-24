<template>
  <div class="password">
    <section class="mobile-number">
      <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" />
    </section>
    <section class="login-password">
      <input type="tel" maxlength="11" placeholder="密码" />
      <div class="show-password off">
        <div class="circle"></div>
        <div class="text">...</div>
      </div>
    </section>
    <section class="login-verification">
      <input type="tel" maxlength="11" placeholder="验证码" />
      <img class='get-verification' src="" alt="">
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang='stylus'>
.password {
  section {
    width: 100%;
    height: 48px;
    margin-top: 16px;
    position: relative;
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
    .show-password {
      font-size: 14px;
      width: 44px;
      height: 18px;
      border: 1px solid #ddd;
      border-radius: 15px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      transition: 0.8s;
      .circle {
        transition: 0.8s;
        background: #ffffff;
        margin: -1px -1px;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        border: 1px solid #ddd;
        position: absolute;
      }
      .text {
        line-height: 18px;
        transition: 0.8s;
        margin 0 8px
      }
      &.off {
        background: #ffffff;

        .circle {
            transform translateX(0)
        }

        .text {
          color: #ddd;
          text-align right
        }
      }
      &.on {
        background: #02a774;

        .circle {
            transform translateX(25px)
        }

        .text {
          color: #ddd;
          text-align left
        }
      }
    }
  }
  .login-verification {
      img {
          position absolute
          top 50%
          transform translateY(-50%)
          right 10px
      }
  }
}
</style>