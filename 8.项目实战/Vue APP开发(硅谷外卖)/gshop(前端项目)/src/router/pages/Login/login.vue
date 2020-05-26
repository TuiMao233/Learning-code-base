<template>
  <div class="login-page">
    <div class="login-inner">
      <div class="login-logo">潍坊外卖</div>
      <div class="login-method">
        <a class="to_note" @click="toggleMethod(true)" :class="{active:isMethod}">短信登录</a>
        <a class="to_password" @click="toggleMethod(false)" :class="{active:!isMethod}">密码登录</a>
      </div>
      <form>
        <div class="note" :class="{on:isMethod}">
          <section class="mobile-number">
            <input type="number" maxlength="11" placeholder="手机号" v-model="mobileCode" />
            <button
              class="get_verification"
              @click="getCodeVerif"
              :class="{on:isMobile && !isCountDown}"
            >获取验证码</button>
          </section>
          <section class="login-verification">
            <input type="tel" maxlength="8" placeholder="验证码" v-model="codeVerif" />
          </section>
          <section class="login-hint">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </section>
        </div>
        <div class="password" :class="{on:!isMethod}">
          <section class="mobile-number">
            <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="userCode" />
          </section>
          <section class="login-password">
            <input
              type="password"
              maxlength="11"
              placeholder="密码"
              v-model="password"
              ref="pwsInput"
            />
            <div class="show-password" :class="{off:!isShowPwd,on:isShowPwd}" @click="showPwd">
              <div class="circle"></div>
              <div class="text" ref="showPwdText">...</div>
            </div>
          </section>
          <section class="login-verification">
            <input type="tel" maxlength="11" placeholder="验证码" v-model="verif" />
            <img class="get-verification" ref="captcha" />
            <button class="get_verification" @click="getVerif" ref="getVerifButton">获取验证码</button>
          </section>
        </div>
      </form>
      <button class="login-button" :disabled="!isSend" :class="{on:isSend}" @click="login">登录</button>
      <a class="about-us" href="javascript:;">关于我们</a>
    </div>
    <a href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </a>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapActions, mapState } from "vuex";
import { isMobile, removeStrCode } from "../../../units/units";
import { reqLoginPwd, reqLoginSms, reqSendCode } from "../../../api";
export default {
  data: () => ({
    userCode: "", // 手机/邮箱/用户名
    password: "", // 密码
    verif: "", // 账号密码登录验证码
    mobileCode: "", // 手机号码
    codeVerif: "", // 短信验证码
    isMethod: true, // true代表短信, false代表密码
    isShowPwd: false, // 是否显示密码
    isCountDown: false // 是否在倒计时
  }),
  methods: {
    toggleMethod(fool) { // 切换短信或密码登录
      if (this.isMethod === fool) {
        return;
      } else {
        this.isMethod = fool;
        this.mobileCode = "";
        this.userCode = "";
        this.password = "";
        this.verif = "";
        this.codeVerif = "";
      }
    },
    showPwd() {// 显示/隐藏密码
      this.isShowPwd = !this.isShowPwd;
      const { pwsInput } = this.$refs;
      if (this.isShowPwd) {
        this.$refs.showPwdText.innerText = "abc";
        pwsInput.setAttribute("type", "tel");
      } else {
        this.$refs.showPwdText.innerText = "...";
        pwsInput.setAttribute("type", "password");
      }
    },
    getVerif(ev) {// 获取图形验证码
      this.$refs.getVerifButton.innerText = "";
      this.$refs.captcha.src = "http://localhost:4000/captcha/?" + new Date().toString();
    },
    async getCodeVerif(ev) {// 发送短信验证码
      if (!isMobile(this.mobileCode)) {// 如果手机验证不成功, 不执行逻辑
        MessageBox({ title: "错误提示", message: "手机格式错误" });
        return;
      }
      const phone = this.codeVerif.trim();
      const result = await reqSendCode(phone);
      if (result.code === 1) {
        MessageBox({ title: "错误提示", message: result.msg });
        return;
      }
      this.isCountDown = true;
      // 点击后不能更改
      const el = ev.toElement;
      ev.toElement.setAttribute("disabled", "aaaaa");
      let countDown = 30;
      el.innerText = `已发送(${countDown}s)`;
      const timer = setInterval(() => {
        if (countDown !== 0) {
          // 倒计时
          countDown--;
          el.innerText = `已发送(${countDown}s`;
        } else {
          // 倒计时结束
          el.innerText = `获取验证码`;
          el.removeAttribute("disabled");
          this.isCountDown = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    async login() { // 进行登录
      let result = null;
      if (this.isMethod) {
        // 手机短信登录
        const phone = this.codeVerif.trim();
        const code = this.mobileCode;
        result = await reqLoginSms(phone, code);
      } else {
        // 账号密码登录
        const name = this.userCode.trim();
        const pwd = removeStrCode(this.password.trim());
        const captcha = this.verif.trim();
        result = await reqLoginPwd(name, pwd, captcha);
      }
      console.log(result)
      if (result.code === 0) {
        this.$store.dispatch("login", result.data);// 将登录数据保存
        this.$router.replace("/profile");// 切换界面
      } else {
        MessageBox({
          title: "错误提示",
          message: result.msg
        });
        this.getVerif()
      }
    }
  },
  computed: {
    isMobile() {
      return isMobile(this.mobileCode);
    },
    isSend() {
      // 判断是否可发送数据
      if (this.isMethod) {
        // 手机短信登录
        const codeVerif = this.codeVerif.trim();
        const mobileCode = this.mobileCode;
        return isMobile(mobileCode) && codeVerif.length > 3;
      } else {
        // 账号密码登录
        const userCode = this.userCode.trim();
        const password = removeStrCode(this.password.trim());
        const verif = this.verif.trim();
        return userCode.length > 3 && password.length > 3 && verif.length > 3;
      }
    }
  },
  mounted() {
    this.getVerif()
  },
};
</script>

<style lang='stylus'>
.error_msg {
  display: block;
  color: red;
  margin-top: 10px;
  opacity: 0.8;
}

.get_verification.on {
  color: #000;
}

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
    margin-top: 20px;

    &.on {
      background: #16d646;
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

      input[type='number'] {
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

      button {
        font-size: 14px;
        position: absolute;
        color: #ccc;
        top: 50%;
        right: 0;
        border: none;
        background: none;
        transform: translateY(-50%);
        width: 150px;
        height: 50px;

        &.on {
          color: #000;
        }
      }

      input[type='tel'], input[type='password'] {
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
          transition: 0.5s;
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