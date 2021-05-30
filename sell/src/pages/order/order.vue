<template>
  <section class="order">
    <header class="header">
      <a class="header_title">
        <span class="header_title_text">订单列表</span>
      </a>
    </header>
    <div class="order_no_login" v-if="!this.$cookies.isKey('phone')">
      <img src="./img/person.png">
      <h3>登录后查看外卖订单</h3>
      <button @click="$router.push('/login')">立即登陆</button>
    </div>
    <div class="order_login" v-if="this.$cookies.isKey('phone')">
      <div class="shop_container">
        <ul class="shop_list" >
          <li class="shop_li border-1px" v-for="(item,key) in data">
            <a>
              <div class="shop_left">
                <img class="shop_img" v-bind:src="require('../home/all/shop/'+item.shop+'.jpg')"/>
              </div>
              <div class="shop_right">
                <div class="shop_detail_header">
                  <h4 class="shop_title" >{{item.shopname}}</h4>
                  <span class="state">{{item.state}}</span>
                </div>
                <div class="content">
                  <h2 class="name">购买：{{item.goodsname}}</h2>
                  <div class="money">总计：￥{{item.totalmoney}}</div>
                </div>
              </div>
              <div class="btn" @click="btn(item,key)" v-show="item.state!='已评论'">
                <el-button type="primary" round size="small" v-show="item.state!='已送达'">确定到达</el-button>
                <el-button type="success" round size="small" v-show="item.state==='已送达'">去评论</el-button>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        data:[]
      }
    },
    created () {
      this.getList()
    },
    methods:{
      getList(){
        const params = new URLSearchParams()
        params.append("phone", this.$cookies.get('phone'))
        axios.post('/orderinfo.php',params).then(response => {
          let res = response.data;
          this.data=res
        });
      },
      btn(item,key){
        if (item.state==='已送达'){
          this.$router.push('/pinglun')
        }else {
          const params = new URLSearchParams()
          params.append("state", '已送达')
          params.append("orderNo", item.no)
          axios.post('/setorder2.php',params).then(response => {
            this.$router.push('/pinglun')
            this.$cookies.set('pinglunshop',item.shop)
            this.$cookies.set('pinglunno',key)
          });
        }
      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .order
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
          font-size 20px
          color #fff
          display block
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #3080a7
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
    .order_login
      padding-top 45px
      width 100%
      margin 0 auto
      .shop_container
        width: 100%
        background: #fff;
        overflow:hidden
        margin-bottom 50px
        .shop_list
          .shop_li
            bottom-border-1px(#f1f1f1)
            width 100%
            >a
              clearFix()
              display block
              box-sizing border-box
              padding 15px 8px
              width 100%
              .shop_left
                float left
                box-sizing border-box
                width 23%
                height 75px
                padding-right 10px
                .shop_img
                  display block
                  width 100%
                  height 100%
              .shop_right
                float right
                width 77%
                .shop_detail_header
                  clearFix()
                  width 100%
                  .shop_title
                    text_ellipsis()
                    float left
                    width 70%
                    color #333
                    font-size 16px
                    line-height 16px
                    font-weight 700
                  .state
                    text_ellipsis()
                    float right
                    width 30%
                    font-size 15px
                .content
                  width 100%
                  margin-top 20px
                  font-size 13px
                  height 15px
                  .name
                    width 70%
                    float left
                  .money
                    width 30%
                    float right
              .btn
                float right
                margin-right 10px
                margin-top 10px

</style>
