<template>
  <div class="profile">
    <HeaderTop>
      <div class="center" slot="center">我的</div>
    </HeaderTop>
    <!--  登录/注册 | 用户名称/头像 -->
    <div class="profile_header_message" @click="$router.push('/login')">
      <div class="profile_link">
        <div class="user-picture">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <div class="user-name">
            <h3>登录/注册</h3>
          </div>

          <div class="user-mobile-number">
            <i class="iconfont icon-shouji icon-mobile"></i>
            <span>暂无绑定手机号</span>
          </div>
        </div>
        <div class="arrows">
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </div>
    </div>

    <!-- 用户表单信息 -->
    <section class="user-from">
      <div class="balance">
        <span class="number">0.00</span>元
        <p>我的余额</p>
      </div>
      <div class="discounts">
        <span class="number">0</span>个
        <p>我的优惠</p>
      </div>
      <div class="integral">
        <span class="number">0</span>分
        <p>我的积分</p>
      </div>
    </section>

    <!-- 选项 -->
    <section class="options">
      <div class="my-order">
        <i class="iconfont icon-order-s"></i>
        <span>我的订单</span>
      </div>
      <div class="integral-shop">
        <i class="iconfont icon-jifen"></i>
        <span>积分商城</span>
      </div>
      <div class="member-card">
        <i class="iconfont icon-vip"></i>
        <span>外卖会员卡</span>
      </div>
    </section>

    <!-- 选项 -->
    <section class="options">
      <div class="service-center">
        <i class="iconfont icon-fuwu"></i>
        <span>服务中心</span>
      </div>
    </section>
  </div>
</template>

<style lang='stylus'>
@import '../../../assets/mixins.styl';
@import '../pages';
.profile{
  overflow auto
  padding-bottom 100px
}
.profile_header_message {
  margin-top: 45px;
  height: 100px;
  background-color: rgb(2, 167, 116);
  color: #ffffff;
  .profile_link { // 用户跳转
    padding: 20px 10px;
    position: relative;
    clearfix();

    .user-picture { // 用户头像
      float: left;
      border-radius: 50%;
      overflow: hidden;
      width: 60px;
      height: 60px;
      background-color: #e4e4e4;

      i {
        color: rgb(126, 140, 141);
        font-size: 62px;
      }
    }

    .user-info { // 用户名称/手机
      margin-top: -1px;
      margin-left: 15px;
      height: 63px;
      float: left;

      .user-name {
        h3 {
          margin-top: 8px;
          font-weight: bold;
          font-size: 18px;
        }
      }

      .user-mobile-number {
        i {
          font-size: 30px;
          vertical-align: middle;
          margin: 0 -15px;
        }

        span {
          font-size: 14px;
        }

        margin-top: 10px;
      }
    }

    .arrows {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;

      i {
        font-size: 5px;
      }
    }
  }
}

.user-from { // 用户表单信息
  display: flex;
  height: 81px;
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  div {
    flex: 1;
    border-right: 1px solid #f1f1f1;
    text-align center
    padding-top 13px
    font-size 14px
    span.number {
      font-weight bold
      font-size 30px
    }
    p {
      margin-top 10px
      color #666
    }
    &.balance span.number{
      color #FF9900
    }
    &.discounts span.number{
      color  #FF5F3E
    }
    &.integral span.number{
      color #6ac20b
    }
  }
  div:last-child {
    border-right: none;
  }
}

.options {
  margin-top 10px
  background #ffffff
  /* 
      <div class="my-order">
        <i class="iconfont icon-order-s"></i>
        <span>我的订单</span>
      </div>
   */
  div {
    padding: 10px 10px 10px 0;  
    border-bottom: 1px solid #f1f1f1;
    i {
      font-size 30px
      vertical-align middle // 文字对齐方向上下居中
    }
    &.my-order {
      color #02a774
    }
    &.integral-shop{
      color #ff5f3e
    }
    &.member-card{
      color #f90
    }
    &.service-center{
      color #02a774
    }
    span {
      color #333
    }
  }
  div:last-child {
    border-bottom none
  }
}
</style>

<script>
import HeaderTop from "../../../components/HeaderTop/HeaderTop";
export default {
  components: { HeaderTop }
};
</script>

