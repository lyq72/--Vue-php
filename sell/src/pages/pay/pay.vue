<template>
  <div class="pay" ref="orderWrapper">
    <header class="header">
      <a class="header_title">
        <span class="header_title_text">确定人订单</span>
      </a>
    </header>
    <div class="userinfo">
      <p class="tip">请填写真实的个人性息</p>
      <form class="user_message">
        <p>
          <label for="adress">地址：</label>
          <input type="text" maxlength="50" placeholder="xx市xx区xx街头xx号201" v-model="address" id="adress">
        </p>
        <p>
          <label for="name">姓名：</label>
          <input type="text" maxlength="8" placeholder="张三三" v-model="name"id="name">
        </p>
        <p>
          <label for="phone">手机：</label>
          <input type="tel" maxlength="11" placeholder="137********" v-model="phone"id="phone">
        </p>
        <p>
          <label for="beizhu">备注：</label>
          <input type="text" maxlength="50" placeholder="无" v-model="beizhu"id="beizhu">
        </p>
      </form>
    </div>
    <div class="foodsinfo" >
      <p class="tip">您的点单</p>
      <div class="foods-wrapper">
        <ul>
          <li class="food-item bottom-border-1px" v-for="item of data.slice(start,end)">
            <div class="icon">
              <img width="57" height="57" v-bind:src="require('../shop/goods/goods/'+$cookies.get('shop')+'/'+item[0]+'.jpg')"/>
            </div>
            <div class="content">
              <h2 class="name" >{{item[3]}}</h2>
              <div class="extra">
                <span class="count">x{{item[1]}}</span>
              </div>
              <div class="money">￥{{item[2]}}</div>
            </div>
          </li>
        </ul>
        <div class="page-bar">
          <el-pagination
            @prev-click="pre"
            @next-click="next"
            small
            layout="prev, pager, next"
            :total="data.length*10/2">
          </el-pagination>
        </div>
      </div>
      <div class="sentinfo">
        <span>配送费</span>
        <span class="sent_money">￥{{goodses.sent_money[0]}}</span>
      </div>
    </div>
    <div class="submit">
      <div class="order_control">
        <div class="content-left" >
          <div class="totalmoney" >合计：￥{{goodses.totalmoney[0]}}</div>
        </div>
        <div class="content-right">
          <div class="pay" @click="pay">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import BetterScroll from 'better-scroll'
  export default {
    name: 'pay',
    data () {
      return {
        address:'',
        name: '',
        phone: '',
        beizhu: '',
        goodses:'',
        data:[],
        value: false,
        start:0,
        end:2
      };
    },
    created () {
      this.getList();
    },
    methods:{
      pre(){
        this.start-=2;
        this.end-=2;
      },
      next(){
        this.start+=2;
        this.end+=2;
      },
      getList(){
        const params = new URLSearchParams()
        params.append("orderNo", this.$cookies.get('orderNo'))
        axios.post('/orderinfo.php',params).then(response => {
          let res = response.data;
          this.goodses=res;
          for (let i=0;i<res.goods.length;i++){
            let da = [];
            da.push(res.goods[i],res.num[i],res.prices[i],res.goodsname[i]);
            this.data.push(da);
          }
          this.all=Math.ceil(res.goods.length/3);
          for (let i=0;i<3;i++){
            this.showdata[i]=this.data[i];
          }
          this.$nextTick(()=> {
            this.orderScroll = new BetterScroll(this.$refs.orderWrapper, {
              click: true
            })
          })
        });
      },
      pay(){
        if (!this.beizhu){
          this.beizhu='无';
        }
        if (this.$cookies.get('orderNo')&&this.address&&this.name&&this.phone){
          const params = new URLSearchParams()
          params.append("orderNo", this.$cookies.get('orderNo'))
          params.append("address", this.address)
          params.append("name", this.name)
          params.append("phone", this.phone)
          params.append("beizhu", this.beizhu)
          axios.post('/setorder2.php',params).then(response => {
            this.$cookies.remove('orderNo')
            this.$cookies.remove('shop')
            this.$router.push('/order')
            alert('支付成功！')
          });
        }else {
          alert('请填写个人信息')
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .pay
    .header
      background-color #3080a7
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 18px
          color #fff
          display block
    .userinfo
      padding-top 48px
      width 100%
      .tip
        margin-left 5px
        margin-top 2px
        font 400 14px Arial
      .user_message
        position relative
        margin-top 8px
        p
          height 35px
          font-size 14px
          margin-top 5px
          label
            margin-left 15px
          input
            width 80%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #e0e0e0
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #3080a7
    .foodsinfo
      .tip
        margin-left 5px
        margin-top 2px
        font 400 14px Arial
      .foods-wrapper
        flex: 1
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 8px
          overflow hidden
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .content
            flex: 1
            .name
              margin: 3px 0 8px 3px
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
              margin-left 10px
              .count
                font-weight: 700
                line-height: 24px
                margin-right: 8px
                font-size: 10px
            .money
              position: absolute
              right: 10px
              top 8px
              font-size: 13px
              font-weight bold
        .page-bar
          text-align center
      .sentinfo
        font-size 13px
        padding-left 15px
        .sent_money
          font-size: 12px
          font-weight bold
          float right
          padding-right 30px
    .submit
      position: absolute
      right: 0
      bottom: 0px
      width 100%
      .order_control
        display flex
        right: 0
        bottom: 0
        z-index 50
        width 100%
        height 48px
        background #3080a7
        font-size 0
        .content-left
          flex 1
          display inline-block
          margin-top 8px
          line-height 24px
          margin-left  12px
          box-sizing border-box
          font-size 18px
          color red
        .content-right
          flex 0 0 105px
          width 105px
          .pay
            height 48px
            line-height 48px
            text-align center
            font-size 12px
            font-weight 700
            color black
            background yellow
</style>
