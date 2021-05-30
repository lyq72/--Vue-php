<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="title">综合评分</div>
        <el-rate
          v-model=$route.query.ratings
          disabled
          show-score
          text-color="#ff9900"
          score-template='{value}'>
        </el-rate>
      </div>
    </div>
    <div class="ratingsinfo">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="好评" name="second"></el-tab-pane>
        <el-tab-pane label="差评" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="rating-wrapper" ref="ratingsWrapper">
      <ul>
        <li class="rating-item border-1px" v-for="item of NewItems">
          <div class="avatar" >
            <i class="iconfont icon-geren5" ></i>
          </div>
          <div class="content">
            <h1 class="name">{{item.user}}</h1>
            <div class="star-wrapper">
              <el-rate
                v-model="item.ratings"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <p class="text">{{item.comment}}</p>
            <div class="time">{{item.time}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import axios from 'axios'
  export default {
    data() {
      return {
        activeName: 'first',
        selectType:0,
        ratings: [],
        shop:[],
        value:this.$route.query.ratings
      }
    },
    computed: {
      NewItems() {
        let NewItems = [];
        if (this.selectType==0){
          return this.ratings
        }else if(this.selectType==1){
          this.ratings.map(function(item) {
            if (parseInt(item.ratings)>=4) {
              NewItems.push(item);
            }
          });
          return NewItems
        }else if (this.selectType==2){
          this.ratings.map(function(item) {
            if (parseInt(item.ratings)<=2) {
              NewItems.push(item);
            }
          });
          return NewItems
        }
      }
    },
    created () {
      const params = new URLSearchParams()
      params.append("shop",this.$cookies.get('shop'))
      axios.post('/getcomment.php',params).then(response => {
        let res = response.data;
        this.ratings=res
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          });
        });
      });
    },
    methods: {
      handleClick (tab, event) {
        switch (tab.name) {
          case 'first':
            this.selectType= 0
            break
          case 'second':
            this.selectType= 1
            break
          case 'third':
            this.selectType= 2
            break
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/mixins.styl"
  .ratings
    position: absolute
    top: 110px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      text-align center
      margin-top 10px
      font-size 13px
    .ratingsinfo
      margin-top 10px
    .rating-wrapper
      padding: 0 18px;
      .rating-item
        display: flex;
        padding: 18px 0;
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          i
            border-radius: 50%;
            font-size 30px
        .content
          flex: 1;
          position: relative;
          .name
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          .star-wrapper
            margin-bottom: 6px;
            font-size: 0;
          .text
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          .time
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
</style>
