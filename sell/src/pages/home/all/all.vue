<template>
  <div class="shop_container">
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="searchVal">
      <input type="submit" class="search_submit">
    </form>
    <div class="paixu">
    <el-tag @click="fenshu">评分排行</el-tag>
    <el-tag type="success"@click="yuexiao">月销排行</el-tag>
    </div>
    <div class="shop-wrapper" ref="shopWrapper">
      <ul class="shop_list" v-show="shops.length">
        <li class="shop_li border-1px" v-for="shop of NewItems.slice(start,end)" @click="$cookies.set('shop',shop.no),$router.push('/shop')" >
          <a>
            <div class="shop_left">
              <img class="shop_img" v-bind:src="require('./shop/'+shop.no+'.jpg')"/>
            </div>
            <div class="shop_right">
              <div class="shop_detail_header">
                <h4 class="shop_title" >{{shop.name}}</h4>
              </div>
              <div class="shop_rating_order">
                <div class="shop_rating_order_left">
                  <span class="rating_section">
                    {{shop.ratings}}分
                  </span>
                  <span class="order_section">
                    月售{{shop.order_section}}单
                  </span>
                </div>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_left">{{shop.sent_type}}</span>
                  <span class="delivery_style delivery_right">准时达</span>
                </section>
              </div>
              <section class="home_money">
                <p class="shop_delivery_msg">
                  <span>¥{{shop.up_money}} 起送</span>
                  <span class="segmentation">/</span>
                  <span>配送费约¥{{shop.sent_money}}</span>
                </p>
              </section>
            </div>
          </a>
        </li>
        <div class="xiala" @click="xiala" v-show="end%5==0&&end<NewItems.length">点击显示更多</div>
        <div class="wuxiala" v-show="end>=NewItems.length">无更多店铺</div>
      </ul>
    </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import Scroll from 'better-scroll'
  export default {
    name: 'all',
    data(){
      return{
        shops:[],
        searchVal:'',
        start:0,
        end:5,
        fen:false,
        xiao:false
      };
    },
    props:{
      type:{
        type:String,
        default:'',
      },
    },
    created () {
      this.getList()
    },
    computed: {
      NewItems() {
        let NewItems = [];
        let _this = this;
        if(_this.fen){
          this.shops.sort(function (a,b) {
            var x=a['ratings'];
            var y=b['ratings']
            return(x>y?-1:(y-x)?1:0)
          })
        }
        if(_this.xiao){
          this.shops.sort(function (a,b) {
            var x=a['order_section'];
            var y=b['order_section']
            return(x>y?-1:(y-x)?1:0)
          })
        }
        if (this.searchVal!=''){
          this.shops.map(function(item) {
            if (item.name.search(_this.searchVal) != -1) {
              NewItems.push(item);
            }
          });
          return NewItems
        }
        if (this.type===''){
          return this.shops
        }else {
          this.shops.map(function(item) {if (item.type === _this.type) {
              NewItems.push(item);
            }
          });
          return NewItems
        }
      },
    },
    methods:{
      getList(){
        axios.post('http://localhost:8080/api/shoplist.php').then(response => {
        // axios.post('/shoplist.php').then(response => {
          let res = response.data;
          this.shops=res;
          this.$nextTick(()=> {
            this.shopsScroll = new Scroll(this.$refs.shopWrapper, {
              click: true
            })
            console.log(this.shopsScroll )
          })
        });
      },
      xiala(){
        this.end+=5
        this.$nextTick(()=> {
          this.shopsScroll = new Scroll(this.$refs.shopWrapper, {
            click: true
          })
        })
      },
      fenshu(){
        this.fen=true
      },
      yuexiao(){
        this.xiao=true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/mixins.styl"
  .shop_container
    width: 100%
    margin-bottom 50px
    overflow:hidden
    flex 1
    .search_form
      clearFix()
      background-color #fff
      padding 0px 8px 10px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        outline none
        &.search_input
          float left
          width 80%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 15%
          font-size 13px
          color #fff
          background-color #3080a7
    .paixu
      margin-left 8px
    .shop-wrapper
      height 500px
      width 100%
      overflow hidden
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
                  width 100%
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content ' 品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 15px
                .shop_rating_order_left
                  .rating_section
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    font-size 10px
                    color #666
                .shop_rating_order_right
                  float right
                  font-size 10px
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .home_money
                clearFix()
                width 100%
                font-size 10px
                margin-left 3px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  width: 200px
                  color #666
                .segmentation
                  color #ccc
        .xiala
          text-align center
          font-size 13px
          color #999999
      .wuxiala
        text-align center
        font-size 13px
        color #999999
</style>
