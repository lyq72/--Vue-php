<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item":class="{'current':currentIndex===index}" v-for="(value,key,index) in goodses" @click="selectMenu(index,$event)">
            <span class="text bottom-border-1px">{{key}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul >
        <li class="food-list-hook" v-for="(value,key,index) in goodses">
          <h1 class="title">{{key}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(value,key,index) in goodses[key]">
              <div class="icon">
                <img width="57" height="57" v-bind:src="require('./goods/'+$cookies.get('shop')+'/'+value.no+'.jpg')"/>
              </div>
              <div class="content">
                <h2 class="name">{{value.name}}</h2>
                <div class="extra">
                  <span class="order_section">月售份{{value.order_section}}</span>
                  <span class="money">￥{{value.money}}</span>
                </div>
                <div class="numcontrol-wrapper">
                  <numcontrol :food="value"></numcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <goodscontrol ref="goodscontrol":select-foods="selectFoods"></goodscontrol>
  </div>
</template>

<script>
  import axios from 'axios'
  import BetterScroll from 'better-scroll'
  import numcontrol from '../../../components/numcontrol/numcontrol'
  import goodscontrol from '../../../components/goodscontrol/goodscontrol'
  export default {
    name: 'goods',
    data(){
      return{
        goodses:[],
        listHeight:[],
        scrollY:0
      };
    },
    components:{
      numcontrol,
      goodscontrol
    },
    computed:{
      currentIndex(){
        for (let i=0;i<this.listHeight;i++){
          let height1=this.listHeight[i];
          let height2=this.listHeight[i+1];
          if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods=[];
        for (const key in this.goodses){
          for (const food of this.goodses[key]){
            if (food.count){
              foods.push(food);
            }
          }
        }
        return foods;
      }
    },
    created () {
      this.getList();
    },
    methods:{
      getList(){
        const params = new URLSearchParams()
        params.append("shop", this.$cookies.get('shop'))
        axios.post('/goodslist.php',params).then(response => {
          let res = response.data;
          this.goodses=res;
          this.$nextTick(()=>{
            this.initScroll();
            this.calculateHeight();
          });
        });
      },
      initScroll(){
        this.menuScroll=new BetterScroll(this.$refs.menuWrapper,{
          click: true
        })
        this.foodsScroll=new BetterScroll(this.$refs.foodsWrapper,{
          click: true,
          probeType:3
        });
        this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y));
        // 的到实时的y坐标
        })
      },
      calculateHeight(){
        let foodlist=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let  height=0;
        this.listHeight.push(height);
        for (let i=0;i<foodlist.length;i++){
          let  item=foodlist[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index,event){
        if(!event._constructed){
          return;
        }
        let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let ref=foodList[index];
        this.foodsScroll.scrollToElement(ref,300);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/mixins.styl"
  .goods
    display flex
    position absolute
    top 110px
    bottom 46px
    width: 100%
    background: #fff;
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      font-size 13px
      .menu-item
        display: table
        height: 30px
        width: 56px
        padding: 8px 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: #1296db
          font-weight: 700
          .text
            border-none()
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
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
            .order_section
              margin-right: 12px
            .money
              font-weight: 700
              line-height: 24px
              margin-right: 8px
              font-size: 13px
              color: rgb(240, 20, 20)
          .numcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0px
</style>
