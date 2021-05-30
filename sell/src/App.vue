<template>
  <div id="app">
    <router-view></router-view>
    <footerguide v-show="$route.meta.showfooter"></footerguide>
  </div>
</template>

<script>
  import footerguide from './components/footerguide/footerguide.vue'

  export default{
    components:{
      footerguide
    }
  }
</script>

<style>
  #app{width: 100%;height: 100%;background-color: #f5f5f5}
</style>
