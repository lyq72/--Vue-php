<template>

  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">登录/注册</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">注册</a>
        </div>
      </div>
      <div class="login_content">
        <div>
          <div :class="{on: loginWay}">
            <form class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
            </form>
            <button class="aa" @click="login()">登录</button>
          </div>
          <div :class="{on: !loginWay}">
            <form class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <input type="text" placeholder="用户名" v-model="user">
              <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
            </form>
            <button class="aa" @click="zhuce()">注册</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
  export default {

    data () {
      return {
        loginWay: true,
        computeTime: 0, // 计时的时间
        showPwd: false, // 是否显示密码
        user: '', // 用户名
        phone: '', // 电话号
        pwd: '' // 密码
      };
    },
    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      // 异步注册
      zhuce () {
        if(!this.rightPhone) {
          // 手机号不正确
          alert('手机号不正确')
          return
        }
        const params = new URLSearchParams();
        params.append("user", this.user);
        params.append("phone", this.phone);
        params.append("pwd", this.pwd);
        axios.post('/zhuce.php', params).then(response => {
          let res = response.data.data;
          if (res == 1) {
            alert('注册成功')
          } else {
            alert('注册失败')
          }
        });
      },
      //异步登录
      login () {
        const {phone, pwd} = this;
        const params = new URLSearchParams();
        params.append("phone", phone);
        params.append("pwd", pwd);
        axios.post('/login.php', params).then(response => {
          let res = response.data;
          if (res == 1) {
            alert('登录成功');
            this.$cookies.set('phone',this.phone);
            this.$router.push('/user');
          } else {
            alert('登录失败')
          }
        });
      },
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #3080a7
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #3080a7
              font-weight 700
              border-bottom 2px solid #3080a7

      .login_content
        > div
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #3080a7

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.right_phone
                  color black

              .btn
                display block
                width 100%
                height 42px
                margin-top 30px
                border-radius 4px
                background #90a3ab
                color #fff
                text-align center
                font-size 16px
                line-height 42px
                border 0
            .aa
              display block
              width 100%
              height 42px
              margin-top 100px
              border-radius 4px
              background #90a3ab
              color #393351
              text-align center
              font-size 16px
              line-height 42px
              border 0
</style>
