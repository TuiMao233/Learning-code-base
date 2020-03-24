<template>
  <div class="login-page">
    <div class="login-inner">
      <div class="login-logo">硅谷外卖</div>
      <div class="login-method">
        <a class="to_note" @click="isMethod = true" :class="{active:isMethod}">短信登录</a>
        <a class="to_password" @click="isMethod = false" :class="{active:!isMethod}">密码登录</a>
      </div>
      <form>
        <div class="note" :class="{on:isMethod}">
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
        <div class="password" :class="{on:!isMethod}">
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
            <img class="get-verification" src alt />
          </section>
        </div>
      </form>
      <button class="login-button">登录</button>
      <a class="about-us" href="javascript:;">关于我们</a>
    </div>
    <a href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMethod: true // true代表短信, false代表密码
    };
  }
};
</script>

<style lang='stylus'>
.login-page {
  height: 100%;

  .go_back {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
  }
}

.login-inner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
  text-align: center;

  .login-logo {
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
  }

  .login-method {
    margin-top: 40px;
    font-size: 14px;

    a {
      color: #333;
      width: 50%;
      margin: 0 20px;
      padding-bottom: 5px;
    }

    .active {
      font-weight: bold;
      color: #02a774;
      border-bottom: 2px solid #02a774;
    }
  }

  .login-button {
    width: 100%;
    height: 42px;
    background: #4cd96f;
    border: none;
    color: #ffffff;
    font-size: 16px;
    margin-top: 30px;

    &.on {
      color: #16d646;
    }
  }

  .about-us {
    display: inline-block;
    margin-top: 20px;
    font-size: 12px;
    color: #999;
  }

  .note {
    display: none;

    &.on {
      display: block;
    }

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

  .password {
    display: none;

    &.on {
      display: block;
    }

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
          margin: 0 8px;
        }

        &.off {
          background: #ffffff;

          .circle {
            transform: translateX(0);
          }

          .text {
            color: #ddd;
            text-align: right;
          }
        }

        &.on {
          background: #02a774;

          .circle {
            transform: translateX(25px);
          }

          .text {
            color: #ddd;
            text-align: left;
          }
        }
      }
    }

    .login-verification {
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }
  }
}
</style>