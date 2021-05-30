<template>
  <div class="shopinfo">
    <h3 class="shopinfo-title">商家信息</h3>
    <ul class="detail" >
      <li><span class="bold">品类</span> <span>{{$route.query.type}}</span></li>
      <li><span class="bold">商家电话</span> <span>{{$route.query.phone}}</span></li>
      <li><span class="bold">地址</span> <span>{{$route.query.address}}</span></li>
      <li><span class="bold">营业时间</span> <span>{{$route.query.time}}</span></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'

  export default {
    name: 'shopinfo',
    data() {
      return {
        shop:[]
      }
    },
    created () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      });
      this.getList(this.selectType);
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/mixins.styl"
  .shopinfo
    padding 0px 14px 14px
    font-size 16px
    background-color #fff
    color #666
    border-bottom 1px solid #eee
    .shopinfo-title
      color #000
      font-weight 700
      line-height 16px
    .detail
      margin-bottom -16px
      > li
        display flex
        justify-content space-between
        align-items center
        margin-right -10px
        padding 16px 12px 16px 0
        line-height 16px
        bottom-border-1px(#ddd)
        font-size 13px
        > .bold
          font-weight 700
          color #333
        &:last-child
          border-none()
</style>
