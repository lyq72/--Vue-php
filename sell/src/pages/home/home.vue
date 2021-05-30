<template>
  <div class="shop">
    <div class="type">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="美食" name="second"></el-tab-pane>
        <el-tab-pane label="饮料" name="third"></el-tab-pane>
        <el-tab-pane label="蔬果" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <all :type="this.type"></all>
  </div>
</template>

<script>
  import all from './all/all'
  export default {
    data() {
      return {
        activeName: 'first',
        type:'',
      };
    },
    components:{
      all
    },
    methods: {
      handleClick(tab, event) {
        switch (tab.name) {
          case 'first':
            this.type='';
            break
          case 'second':
            this.type='MS';
            break
          case 'third':
            this.type='YL';
            break
          case 'fourth':
            this.type='GS';
            break
        }
      },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .shop
    width 100%
    background-color #fff
    .type
      background-color #fff
      height 50px
</style>
