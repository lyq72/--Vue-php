<template>
  <section class="user">
    <header class="header">
      <div class="header_title">
        <span class="header_title_text">我的</span>
      </div>
    </header>
    <section class="profile-number">
      <div class="profile-link" @click="nologin">
        <div class="profile_image">
          <i class="iconfont icon-geren5"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-show="islogin">你好{{ac}}</p>
          <p class="user-info-top" v-show="islogin">点击可退出</p>
          <p class="user-info-top" v-show="!islogin">登录/注册</p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou"></i>
        </span>
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    data(){
      return {
        ac: "",
      }
    },
    computed: {
      islogin () {
        if (this.$cookies.isKey('phone')){
          this.ac=this.$cookies.get('phone');
          return true;
        }else {
          return false;
        }
      }
    },
    methods:{
      nologin(){
        this.$cookies.remove('phone');
        if (this.$cookies.isKey('shop')){
          this.$cookies.remove('shop');
        }
        this.$router.push('/login');
      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/mixins.styl"
  .user
    width 100%
    .header
      background-color #3080a7
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .iconfont
          font-size 22px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 30%
        color #fff
        font-size 22px
        text-align center
    .profile-number
      margin-top 45.5px
      .profile-link
        clearFix()
        position relative
        display block
        background #3080a7
        padding 20px 10px
        .profile_image
          float left
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon-geren5
            background #e4e4e4
            font-size 62px
        .user-info
          float left
          margin-top 8px
          margin-left 25px
          p
            font-weight: 700
            font-size 18px
            color #fff
            &.user-info-top
              padding-bottom 10px
        .arrow
          width 12px
          height 12px
          position absolute
          right 15px
          top 40%
          .icon-jiantou
            color #fff
            font-size 5px
</style>
