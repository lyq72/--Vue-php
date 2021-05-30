<template>
  <div class="search">
    <header class="header">
      <a class="header_title">
        <span class="header_title_text">搜索</span>
      </a>
    </header>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="searchVal">
      <input type="submit" class="search_submit">
    </form>
      <ul class="shop_list" v-if="items.length">
        <li class="shop_li border-1px" v-for="item of NewItems">
          <a>
            <div class="shop_left">
              <img class="shop_img" />
            </div>
            <div class="shop_right">
              <div class="shop_detail_header">
                <h4 class="shop_title" >{{item.name}}</h4>
              </div>
              <div class="shop_rating_order">
                <div class="shop_rating_order_left">
                <span class="rating_section">
                  {{item.ratings}}分
                </span>
                  <span class="order_section">
                  月售{{item.order_section}}单
                </span>
                </div>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_left">{{item.sent_type}}</span>
                  <span class="delivery_style delivery_right">准时达</span>
                </section>
              </div>
              <section class="home_money">
                <p class="shop_delivery_msg">
                  <span>¥{{item.up_money}} 起送</span>
                  <span class="segmentation">/</span>
                  <span>配送费约¥{{item.sent_money}}</span>
                </p>
              </section>
            </div>
          </a>
        </li>
      </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {

    data () {
      return {
        searchVal:'',
        items:{},
        noSearchShops:false,
      }
    },
    created () {
      this.getList()
    },
    watch: {
      searchShops (value) {
        if(!value.length) { // 没有数据
          this.noSearchShops = true
        } else {// 有数据
          this.noSearchShops = false
        }
      }
    },
    computed: {
      NewItems() {
        let _this = this;
        let NewItems = [];
        this.items.map(function(item) {
          if (item.name.search(_this.searchVal) != -1) {
            NewItems.push(item);
          }
        });
        console.log(NewItems)
        return NewItems;
      }
    },
    methods: {
      getList(){
        axios.post('/shoplist.php').then(response => {
          let res = response.data;
          this.items=res;
          console.log(res)
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
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
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 16%
          border 2px solid #3080a7
          font-size 16px
          color #fff
          background-color #3080a7
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
                font-size 5px
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
              font-size 5px
              margin-left 3px
              .shop_delivery_msg
                float left
                transform-origin 0
                transform scale(.9)
                width: 200px
                color #666
              .segmentation
                color #ccc

</style>
