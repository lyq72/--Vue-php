<template>
  <div class="footer_guide">
    <div class="guide_item"@click="go('/home')" :class="{on:'/home'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-waimai-"></i>
      </span>
      <span>外卖</span>
    </div>
    <div class="guide_item"@click="go('/order')" :class="{on:'/order'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-waimaidingdan0101"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="guide_item"@click="go('/user')" :class="{on:'/user'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      go(path) {
        this.$router.replace(path)
      },
      isCurrent(path) {
        return this.$route.path === path
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #3080a7
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>

