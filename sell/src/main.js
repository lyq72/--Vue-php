/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../static/css/reset.css'
import './common/font/iconfont.css'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios=axios;
axios.defaults.withCredentials = true;
import VueCookies from 'vue-cookies';
import BetterScroll from 'better-scroll'
Vue.use(VueCookies);
new Vue({
  el:'#app',
  render: h=>h(App),
  router,
})
