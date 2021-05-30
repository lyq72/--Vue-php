<template>
  <div class="shop">
    <div class="shop-header">
      <h2 class="content-title">
        <span class="arrow" @click="out">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <span class="content-tag">
          <span class="mini-tag">品牌</span>
        </span>
        <span class="content-name">{{shop.name}}</span>
      </h2>
      <div class="shop-message">
        <span class="shop-message-detail">{{shop.ratings}}分</span>
        <span class="shop-message-detail">月售{{shop.order_section}}单</span>
        <span class="shop-message-detail">配送方式：{{shop.sent_type}}</span>
      </div>
      <div class="shop-talk">
        <span class="shop-talk-detail">公告:{{shop.talk}}</span>
      </div>
    </div>
    <div class="type">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="点餐" name="first" ></el-tab-pane>
        <el-tab-pane label="评价" name="second"></el-tab-pane>
        <el-tab-pane label="商家" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        activeName: 'first',
        shop: []
      };
    },
    created () {
      this.getShopInfo();
    },
    methods: {
      handleClick (tab, event) {
        switch (tab.name) {
          case 'first':
            this.first();
            break;
          case 'second':
            this.second();
            break;
          case 'third':
            this.third();
            break;
        }
      },
      first () {
        this.$router.push('goods');
      },
      second () {
        this.$router.push({
          path:'ratings',
          query:{
            ratings:this.shop.ratings
          }
        });
      },
      third () {
        this.$router.push({
          path:'shopinfo',
          query:{
            type:this.shop.type,
            phone:this.shop.phone,
            address:this.shop.address,
            time:this.shop.sent_time,
          }
        });
      },
      getShopInfo () {
        const params = new URLSearchParams()
        params.append("shop", this.$cookies.get('shop'))
        axios.post('/shoplist.php', params).then(response => {
          let res = response.data[0];
          this.shop= res;
        });
      },
      out(){
        this.$cookies.remove('shop')
        this.$router.push('/home')
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/mixins.styl"
  .shop-header
    height 70px
    position relative
    background #fff
    color #fff
    overflow hidden
    .content-title
      font-size 20px
      line-height 24px
      font-weight 700
      white-space nowrap
      position relative
      display flex
      align-items center
      justify-content center
      color #333
      .arrow
        position absolute
        left 3px
        top 0
      .content-tag
        border-radius 2px
        background-image linear-gradient(90deg, #fff100, #ffe339)
        width 36px
        height: 18px
        margin-right 10px
        color #6a3709
        font-style normal
        font-weight 700
        position relative
        .mini-tag
          position absolute
          left 0
          top 0
          right -100%
          bottom -100%
          font-size 24px
          font-weight 600
          transform scale(.5)
          transform-origin 0 0
          display flex
          align-items center
          justify-content center
      .content-name
        font-weight 700
        text-align left
        overflow hidden
        text-overflow ellipsis
    .shop-message
      white-space nowrap
      height 12px
      margin-top 8px
      font-size 11px
      color #333
      text-align center
    .shop-talk
      color: #90a3ab;
      font-size 11px
      text-align center
      margin-top 8px
</style>
