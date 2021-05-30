<template>
  <div class="pinglun">
    <header class="header">
      <a class="header_title">
        <span class="fanhui" @click="quxiao">
          <i class="iconfont icon-fanhui1"></i>
        </span>
        <span class="header_title_text">评论区</span>
      </a>
    </header>
    <div class="block">
      <el-rate
        v-model="value"
        :colors="colors">
      </el-rate>
    </div>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      placeholder="请输入评论"
      v-model="textarea"
      maxlength="30"
      show-word-limit
    >
    </el-input>
    <div class="btn">
      <el-button type="info" plain @click="quxiao">取消评论</el-button>
      <el-button type="success" plain @click="submit">提交评论</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        text: '',
        textarea: ''
      }
    },
    methods:{
      quxiao(){
        this.$router.push('/order')
      },
      submit(){ const params = new URLSearchParams()
        params.append("ratings", this.value)
        params.append("comment", this.textarea)
        params.append("user", this.$cookies.get('phone'))
        params.append("shop", this.$cookies.get('pinglunshop'))
        params.append("no", this.$cookies.get('pinglunno'))
        axios.post('/setcomment.php',params).then(response => {
          alert('评论成功')
          this.$cookies.remove('pinglunshop');
          this.$cookies.remove('pinglunno');
          this.$router.push('/order')
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixins.styl"
  .pinglun
    margin auto
    text-align center
    .header
      background-color #3080a7
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .fanhui
        position absolute
        left 0
        top 0
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
    .block
      margin-top 50px
    .btn
      margin-top 20px
</style>
