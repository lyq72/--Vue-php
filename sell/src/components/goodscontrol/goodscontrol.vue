<template>
    <div class="goodscontrol">
      <div class="content" @click="toggleList">
        <div class="content-left" >
          <div class="logo-wrapper">
            <div class="logo":class="{'highlight':totalCount>0}" >
              <i class="iconfont icon-shopingcart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price":class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="sent_money">另需配送费￥{{shop.sent_money}}元</div>
        </div>
        <div class="content-right">
          <div class="pay":class="payClass" @click="pay">{{toUpmoney}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">￥{{food.money*food.count}}</div>
                <div class="numcontrol-wrapper">
                  <numcontrol :food="food"></numcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import axios from 'axios'
  import numcontrol from '../numcontrol/numcontrol'
  import BetterScroll from 'better-scroll'
  export default {
    name: 'goodscontrol',
    components: {
      numcontrol
    },
    data () {
      return {
        shop:[],
        fold:true
      }
    },
    props:{
      food:{
        type:Object
      },
      selectFoods:{
        type:Array,
        default(){
          return [
          ];
        }
      },
    },
    computed:{
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=parseFloat(food.money)*parseInt(food.count);
        });
        return total;
      },
      totalCount(){
        let count=0;
        this.selectFoods.forEach((food)=>{
          count+=food.count;
        });
        return count;
      },
      toUpmoney(){
        if (this.totalPrice===0){
          return '￥'+this.shop.up_money+'起送';
        }else if (this.totalPrice<this.shop.up_money){
          let dif=this.shop.up_money-this.totalPrice;
          return '还差￥'+dif+'元起送';
        }else{
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice<this.shop.up_money){
          return'not-enough'
        }else {
          return 'enough'
        }
      },
      listShow(){
        if (!this.totalCount){
          this.fold=true;
          return false;
        }
        let show=!this.fold;
        if(show){
          this.$nextTick(()=>{
            if (!this.scroll){
              this.scroll=new BetterScroll(this.$refs.listContent,{
                click:true
              });
            }else { // 重算better-scroll高度
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
   },
    created () {
      this.getShopInfo();
    },
    methods: {
      getShopInfo () {
        const params = new URLSearchParams()
        params.append("shop", this.$cookies.get('shop'))
        axios.post('/shoplist.php', params).then(response => {
          let res = response.data[0];
          this.shop = res;
        });
      },
      toggleList(){
        if (!this.totalCount){
          return;
        }
        this.fold=!this.fold;
      },
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count=0
        });
      },
      pay(){
        //没到起送价
        if (this.totalPrice<this.shop.up_money){
          return;
        }
        //没登陆
        var date
        if (!this.$cookies.isKey('phone')) {
          alert('请先登录!')
          this.$router.push('/login')
        } else {
          //到了起送价，存入订单数据，只要点进去就是一个待付款订单模式
          const goodsno = []
          const goodsmoney = []
          const goodscount = []
          let totalmoney=0
          this.selectFoods.forEach((food) => {
            totalmoney+=parseFloat(food.money)*parseInt(food.count)
            goodsno.push(food.no)
            goodsmoney.push(food.money)
            goodscount.push(food.count)
          })
          totalmoney+=parseFloat(this.shop.sent_money)
          //生成随机的订单号
          let orderNo = '' //订单号
          for (let i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
          {
            orderNo += Math.floor(Math.random() * 10)
          }
          date = new Date()
          orderNo = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()) + String(orderNo)
          const params = new URLSearchParams();
          params.append("orderNo", orderNo);
          params.append("phone", this.$cookies.get('phone'));
          params.append("shop", this.$cookies.get('shop'));
          params.append("goodsno", goodsno.toString());
          params.append("goodsmoney", goodsmoney.toString());
          params.append("goodscount", goodscount.toString());
          params.append("totalmoney", totalmoney);
          axios.post('/setorder.php', params).then(response => {
            this.$cookies.set('orderNo',orderNo);
            this.$router.push('/pay');
          });
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/mixins.styl"
  .goodscontrol
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            .iconfont
              font-size 30px
            &.highlight
              color #1296db
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 20px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .sent_money
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff

    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform  translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s;
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .numcontrol-wrapper
            position absolute
            right 0
            bottom 6px
</style>
