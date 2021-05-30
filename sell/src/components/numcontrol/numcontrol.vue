<template>
  <div class="numcontrol">
    <div class="decrease" v-show="food.count" @click="decrease($event)">
      <i class="iconfont icon-iconless"></i>
    </div>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="add" @click="add($event)">
      <i class="iconfont icon--"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'numcontrol',
    props:{
      food:{
        type:Object,
        default:() => ({})
      }
    },
    methods:{
      add(event){
        if(!event._constructed){
          return;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else {
          this.food.count++;
        }
      },
      decrease(event){
        if(!event._constructed){
          return;
        }
        if (this.food.count){
          this.food.count--;
        }
      },

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/style/mixins.styl"
  .numcontrol
    font-size: 0
    .decrease,.add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color  #1296db
    .cart-count
      display: inline-block
      vertical-align: top
      width: 8px
      padding-top: 8.5px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
      color  #1296db
</style>
